#!/usr/bin/env python3
"""로컬 열람 서버 — python serve.py  →  http://localhost:8080/index.html

`python -m http.server` 와 두 가지가 다르다.

① **no-store** 를 붙인다. 브라우저가 옛 파일을 캐시해 두는 바람에 이미 지운
   잠금 화면이 다시 뜨는 일을 막는다.

② **디스크에 되쓰는 창구(`/__save`)가 있다.** 브라우저 디스크립션 편집은 원래
   GitHub 에만 커밋했는데, localhost 로 보는 동안 화면에 뜨는 것은 *디스크의 파일*
   이라 커밋해도 다른 브라우저에서는 원본이 그대로 보였다. 이 창구가 있으면
   고친 내용이 디스크에 바로 들어가 새로고침 한 번으로 어디서나 보인다.

   127.0.0.1 에만 바인딩하고, 받은 내용을 그대로 믿지 않는다 — 아래 다섯 가지를
   통과하지 못하면 쓰지 않는다. 사람이 유지하는 원본을 덮어쓰는 창구이기 때문이다.
"""
import json
import os
import re
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

SAVE_PATH = '/__save'
MAX_BODY = 8 * 1024 * 1024
# 앞이 `_` 인 파일도 받는다 — _template.html 이 그렇다.
# 막는 것은 경로다: `/` `\` `..` 가 섞이면 이 규칙에 걸린다.
NAME_RE = re.compile(r'^[A-Za-z0-9_][A-Za-z0-9_.-]*\.html$')
LOCALHOST = ('127.0.0.1', '::1', 'localhost')


def _count(s, pat):
    return len(re.findall(pat, s))


def check(before, after):
    """저장 전 자기검사 — 브라우저 쪽과 같은 기준을 서버에서 한 번 더 본다.

    브라우저에도 같은 검사가 있지만, 덮어쓰는 쪽은 여기다. 한쪽만 믿지 않는다.
    """
    if not after.strip():
        return '내용이 비어 있습니다'
    if len(after) < len(before) * 0.5:
        return '결과가 원본의 절반도 되지 않습니다 (%d → %d)' % (len(before), len(after))
    a = sorted(re.findall(r'data-edit="[^"]+"', before))
    b = sorted(re.findall(r'data-edit="[^"]+"', after))
    if a != b:
        return '편집 주소가 %d개에서 %d개로 달라졌습니다' % (len(a), len(b))
    for tag in (r'<div\b', r'</div>'):
        if _count(before, tag) != _count(after, tag):
            return '%s 태그 수가 달라졌습니다' % tag.strip('<>\\b/')
    return ''


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    # ---- 응답 도우미 ----
    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _local(self):
        return self.client_address[0] in LOCALHOST

    # ---- GET /__save : 이 서버가 저장을 받는지 알려 준다 ----
    def do_GET(self):
        if self.path.split('?')[0] == SAVE_PATH:
            return self._json(200, {'ok': True, 'save': self._local()})
        return super().do_GET()

    # ---- POST /__save : 디스크에 되쓴다 ----
    def do_POST(self):
        if self.path.split('?')[0] != SAVE_PATH:
            return self._json(404, {'error': '없는 주소입니다'})
        if not self._local():
            return self._json(403, {'error': '로컬에서만 저장할 수 있습니다'})

        try:
            n = int(self.headers.get('Content-Length') or 0)
        except ValueError:
            n = 0
        if n <= 0 or n > MAX_BODY:
            return self._json(400, {'error': '본문 길이가 이상합니다 (%d)' % n})

        try:
            req = json.loads(self.rfile.read(n).decode('utf-8'))
        except Exception as e:
            return self._json(400, {'error': 'JSON 을 읽지 못했습니다: %s' % e})

        name = str(req.get('file') or '')
        text = req.get('text')
        if not NAME_RE.match(name):
            return self._json(400, {'error': '파일 이름이 규칙에 맞지 않습니다: %r' % name})
        if not isinstance(text, str):
            return self._json(400, {'error': 'text 가 문자열이 아닙니다'})

        # 서빙 루트 밖으로는 절대 나가지 않는다
        root = os.path.realpath(os.getcwd())
        path = os.path.realpath(os.path.join(root, name))
        if os.path.dirname(path) != root:
            return self._json(400, {'error': '서빙 폴더 밖입니다'})
        # **새 파일을 만들지 않는다** — 고치는 창구이지 만드는 창구가 아니다
        if not os.path.isfile(path):
            return self._json(404, {'error': '%s 가 없습니다' % name})

        with open(path, 'r', encoding='utf-8', newline='') as f:
            before = f.read()
        bad = check(before, text)
        if bad:
            return self._json(400, {'error': '자기검사 실패 — %s' % bad})
        if text == before:
            return self._json(200, {'ok': True, 'file': name, 'bytes': len(before), 'same': True})

        # 원자적으로 바꾼다 — 쓰다 죽어도 반쪽 파일이 남지 않는다.
        # newline='' 이라 원본의 CRLF / LF 가 그대로 간다.
        tmp = path + '.tmp'
        with open(tmp, 'w', encoding='utf-8', newline='') as f:
            f.write(text)
        os.replace(tmp, path)
        print('  저장 %s  %d → %d bytes' % (name, len(before), len(text)))
        return self._json(200, {'ok': True, 'file': name, 'bytes': len(text)})


if __name__ == '__main__':
    print('http://localhost:%d/index.html  (캐시 없음 · 디스크 저장 켜짐 · Ctrl+C 로 종료)' % PORT)
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
