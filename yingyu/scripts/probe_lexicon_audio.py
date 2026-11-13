#!/usr/bin/env python3
"""离线探测词库美音真人 mp3。

策略（慢工细活，可断点）：
1) 直连 gstatic 20200429 / oxford（不走代理，最快）
2) 漏网再用代理打 Cambridge + dictionaryapi
落盘：yingyu/audio-us.json + lexicon-audio.js
"""
from __future__ import annotations

import concurrent.futures
import json
import pathlib
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

SSL_CTX = ssl._create_unverified_context()

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / "audio-us.json"
OUT_JS = ROOT / "lexicon-audio.js"
PROGRESS = ROOT / "scripts" / "_audio_probe_progress.json"
PROXY = "http://127.0.0.1:7890"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
WORKERS = 20
TIMEOUT_FAST = 6
TIMEOUT_SLOW = 12


def load_words() -> list[str]:
    words: list[str] = []
    for name in ("lexicon.js", "lexicon-extra.js"):
        text = (ROOT / name).read_text(encoding="utf-8")
        words.extend(re.findall(r'^\s*"([a-zA-Z][a-zA-Z\'-]*)"\s*:\s*\{', text, re.M))
    return sorted(set(w.lower() for w in words))


def norm(word: str) -> str:
    return re.sub(r"[^a-z'-]", "", word.lower())


def cam_us(word: str) -> str:
    w = norm(word)
    if not w:
        return ""
    pad = (w + "_____")[:5]
    return (
        "https://dictionary.cambridge.org/media/english/us_pron/"
        f"{w[0]}/{w[:3]}/{pad}/{w}.mp3"
    )


def gstatic_urls(word: str) -> list[str]:
    w = norm(word)
    if not w:
        return []
    return [
        f"https://ssl.gstatic.com/dictionary/static/sounds/20200429/{w}--_us_1.mp3",
        f"https://ssl.gstatic.com/dictionary/static/sounds/oxford/{w}--_us_1.mp3",
    ]


def make_opener(use_proxy: bool):
    # macOS Python 常缺本地 CA；探测 CDN 用未校验上下文（只读公开 mp3）
    https = urllib.request.HTTPSHandler(context=SSL_CTX)
    if use_proxy:
        return urllib.request.build_opener(
            urllib.request.ProxyHandler({"http": PROXY, "https": PROXY}),
            https,
        )
    return urllib.request.build_opener(urllib.request.ProxyHandler({}), https)


OP_DIRECT = make_opener(False)
OP_PROXY = make_opener(True)


def url_ok(url: str, use_proxy: bool, timeout: float) -> bool:
    op = OP_PROXY if use_proxy else OP_DIRECT
    # 优先 Range GET：比 HEAD 兼容，直连 gstatic 很快
    req = urllib.request.Request(
        url,
        headers={"User-Agent": UA, "Range": "bytes=0-2", "Accept": "*/*"},
    )
    try:
        with op.open(req, timeout=timeout) as resp:
            code = getattr(resp, "status", None) or resp.getcode()
            if code not in (200, 206):
                return False
            chunk = resp.read(3)
            # mp3 常以 ID3 或 0xFFEx 开头；404 html 没有
            if not chunk:
                return False
            if chunk[:3] == b"ID3" or chunk[:1] == b"\xff":
                return True
            # 少数 CDN 仍给 206 但 body 怪，只要不是 HTML 就认
            if chunk[:1] == b"<":
                return False
            ctype = (resp.headers.get("Content-Type") or "").lower()
            if "html" in ctype or "text/" in ctype:
                return False
            return True
    except Exception:
        return False


def dictapi_audio(word: str) -> str:
    url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + urllib.parse.quote(word)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    try:
        with OP_PROXY.open(req, timeout=TIMEOUT_SLOW) as resp:
            data = json.loads(resp.read().decode("utf-8", "replace"))
    except Exception:
        try:
            with OP_DIRECT.open(req, timeout=TIMEOUT_SLOW) as resp:
                data = json.loads(resp.read().decode("utf-8", "replace"))
        except Exception:
            return ""
    if not isinstance(data, list) or not data:
        return ""
    found = []
    for entry in data:
        for p in entry.get("phonetics") or []:
            a = (p or {}).get("audio") or ""
            if not a:
                continue
            low = a.lower()
            if any(x in low for x in ("-us", "_us", "/us", "us.mp3")):
                found.insert(0, a)
            else:
                found.append(a)
    for a in found:
        # dictapi 音源多在国外 CDN，优先代理
        if url_ok(a, True, TIMEOUT_SLOW) or url_ok(a, False, TIMEOUT_FAST):
            return a
    return ""


def resolve_fast(word: str) -> tuple[str, str, str]:
    for url in gstatic_urls(word):
        if url_ok(url, False, TIMEOUT_FAST):
            src = "gstatic" if "20200429" in url else "oxford"
            return word, url, src
    return word, "", "miss"


def resolve_slow(word: str) -> tuple[str, str, str]:
    # 再试一遍 gstatic（防偶发）
    for url in gstatic_urls(word):
        if url_ok(url, False, TIMEOUT_FAST) or url_ok(url, True, TIMEOUT_SLOW):
            src = "gstatic" if "20200429" in url else "oxford"
            return word, url, src
    cam = cam_us(word)
    if cam and (url_ok(cam, True, TIMEOUT_SLOW) or url_ok(cam, False, TIMEOUT_SLOW)):
        return word, cam, "cambridge"
    extras = [
        f"https://api.dictionaryapi.dev/media/pronunciations/en/{norm(word)}-us.mp3",
        f"https://api.dictionaryapi.dev/media/pronunciations/en/{norm(word)}-1-us.mp3",
    ]
    for url in extras:
        if url_ok(url, True, TIMEOUT_SLOW) or url_ok(url, False, TIMEOUT_FAST):
            return word, url, "dictcdn"
    api = dictapi_audio(word)
    if api:
        return word, api, "dictapi"
    return word, "", "miss"


def save(done: dict) -> None:
    PROGRESS.parent.mkdir(parents=True, exist_ok=True)
    PROGRESS.write_text(json.dumps(done, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    audio = {w: v["url"] for w, v in sorted(done.items()) if v.get("url")}
    miss = sorted(w for w, v in done.items() if not v.get("url"))
    payload = {
        "v": 1,
        "type": "fuxi-yingyu-audio-us",
        "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "count": len(audio),
        "missCount": len(miss),
        "miss": miss,
        "audio": audio,
        "meta": {w: {"src": v.get("src", "")} for w, v in sorted(done.items()) if v.get("url")},
    }
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    js = (
        "/* auto-generated by scripts/probe_lexicon_audio.py — US real audio map */\n"
        "window.EN_LEXICON_AUDIO = "
        + json.dumps(audio, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT_JS.write_text(js, encoding="utf-8")


def run_pool(label: str, words: list[str], fn, done: dict) -> None:
    if not words:
        print(f"[{label}] nothing", flush=True)
        return
    print(f"[{label}] todo={len(words)} workers={WORKERS}", flush=True)
    t0 = time.time()
    n = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = {ex.submit(fn, w): w for w in words}
        for fut in concurrent.futures.as_completed(futs):
            w, url, src = fut.result()
            prev = done.get(w) or {}
            done[w] = {
                "url": url,
                "src": src,
                "tries": int(prev.get("tries", 0)) + 1,
                "at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            }
            n += 1
            if n % 50 == 0 or n == len(words):
                save(done)
                ok = sum(1 for v in done.values() if v.get("url"))
                miss = sum(1 for v in done.values() if not v.get("url"))
                rate = n / max(0.1, time.time() - t0)
                print(
                    f"[{label}] {n}/{len(words)} ok={ok} miss={miss} {rate:.1f}/s last={w}:{src}",
                    flush=True,
                )
    save(done)


def main() -> int:
    words = load_words()
    print(f"[info] words={len(words)}", flush=True)
    done: dict = {}
    if PROGRESS.exists():
        try:
            done = json.loads(PROGRESS.read_text(encoding="utf-8"))
            print(f"[info] resume {len(done)}", flush=True)
        except Exception:
            done = {}

    # pass1: fast gstatic direct for all missing / empty
    need_fast = [w for w in words if not (done.get(w) or {}).get("url")]
    run_pool("pass1-gstatic", need_fast, resolve_fast, done)

    # pass2: slow sources for remaining misses
    need_slow = [w for w in words if not (done.get(w) or {}).get("url")]
    run_pool("pass2-slow", need_slow, resolve_slow, done)

    ok = sum(1 for v in done.values() if v.get("url"))
    miss = [w for w, v in done.items() if not v.get("url")]
    print(f"[done] ok={ok}/{len(words)} miss={len(miss)}", flush=True)
    if miss:
        print("[miss]", ", ".join(miss), flush=True)
    print(f"[out] {OUT_JSON.name} + {OUT_JS.name}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
