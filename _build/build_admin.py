"""RO 노점 검색 보안 강화 — 03_admin.html (계정블록 정보 · 노점 검색 차단 추가) 빌더.
python -I -X utf8 build_admin.py <기획서 폴더>
Gravity Admin Tools (MEM > 계정 관리) 화면 틀. 핀 ↔ 디스크립션 카드.
"""
import pathlib
import sys

D = pathlib.Path(sys.argv[1])

RAIL = [("fa-user", "MEM", True), ("fa-gamepad", "GAME", False), ("fa-sack-dollar", "PAY", False),
        ("fa-globe", "WEB", False), ("fa-chart-pie", "CRM", False), ("fa-gear", "SET", False)]
SUB = ["계정 조회", "게임블록 정보", "계정블록 정보", "Fraud 가입 제한 로그", "도메인 블록", "로그 정보"]

# 기존 계정블록 정보 표 그대로 — 노점 검색 차단 행이 같은 목록에 쌓인다 (처리 일시 최신순)
# No · ID · AID · 블록 상태 · 처리 구분 · 처리 일시 · 블록 해제
ROWS = [
    ("24", "carlos.m88@gmail.com", "2041877", "3차 · 5분 30회 초과", "노점 검색", "2026-10-27 14:22:05", "2026-10-28 14:22:05"),
    ("23", "lu_vendas@hotmail.com", "1988302", "보안 확인 5회 실패", "노점 검색", "2026-10-27 14:05:47", "2026-10-27 15:05:47"),
    ("22", "rag.trader01@gmail.com", "2050114", "3차 · 5분 30회 초과", "노점 검색", "2026-10-27 13:41:19", "2026-10-28 13:41:19"),
    ("21", "pedro_ro@yahoo.com", "1730021", "2차 · 1분 10회 초과", "노점 검색", "2026-10-27 13:30:02", "2026-10-27 13:31:02"),
    ("20", "anaclara.s@gmail.com", "2011736", "보안 확인 5회 실패", "노점 검색", "2026-10-27 09:58:11", "2026-10-27 10:58:11"),
    ("19", "kafra_m@outlook.com", "1890245", "2차 · 1분 10회 초과", "노점 검색", "2026-10-27 09:20:33", "2026-10-27 09:21:33"),
    ("18", "latamgmid_s002@gnjoylatam.com", "1000123", "충전 블록", "FRAUD BLOCK", "2026-08-13 18:52:43", "2026-08-13 19:02:43"),
    ("17", "mytest13@gravity.co.kr", "1000279", "충전 블록", "FRAUD BLOCK", "2026-07-31 04:27:45", "2026-07-31 04:37:45"),
]


def rail():
    return "".join(f'<div class="ad-rail-i{" on" if on else ""}"><i class="fa-solid {ic}"></i><b>{n}</b></div>' for ic, n, on in RAIL)


def sub():
    items = "".join(f'<div class="ad-sub-i{" on" if n == "계정블록 정보" else ""}">{n}</div>' for n in SUB)
    return f'<div class="ad-sub-head">계정 관리 <i class="fa-solid fa-chevron-up"></i></div>{items}'


def pin(pid, label, style="top: -12px; left: -12px;"):
    return f'<span class="pin pin-abs" data-pin="{pid}" style="{style}">{label}</span>' if pid else ""


def card(pid, label, title, tag, lis):
    return (f'<div class="spec-card" id="spec-{pid}"><div class="spec-card-head"><span class="pin" data-pin="{pid}">{label}</span>'
            f'<span class="spec-card-title" data-edit="title:spec-{pid}">{title}</span><span class="spec-card-tag">{tag}</span></div>'
            f'<ul class="spec-list" data-edit="list:spec-{pid}">' + "".join(f"<li>{x}</li>" for x in lis) + "</ul></div>\n")


HEAD = ('<div class="ad-th"><span>No.</span><span>ID</span><span>AID</span><span>블록 상태</span>'
        '<span>처리 구분</span><span>처리 일시</span><span>블록 해제</span></div>')


def table():
    return HEAD + "".join(
        f'<div class="ad-tr{" new" if k == "노점 검색" else ""}"><span>{no}</span><span>{i}</span><span>{a}</span><span>{st}</span>'
        f'<span>{k}</span><span>{t}</span><span class="ad-end">{end}</span></div>' for no, i, a, st, k, t, end in ROWS)


def frame(main, modal=""):
    return (f'<div class="ad"><aside class="ad-side"><div class="ad-logo"><b>GRAVITY</b><em>Admin Tools</em><span class="ad-lang"><i class="fa-solid fa-globe"></i> KO <i class="fa-solid fa-chevron-down"></i></span></div>'
            f'<div class="ad-side-body"><div class="ad-rail">{rail()}</div><div class="ad-sub"><div class="ad-user"><b>이주형</b><span class="ad-out">로그아웃</span></div>{sub()}</div></div></aside>'
            f'<main class="ad-main">{main}</main>{modal}</div>')


def head(n):
    return ('<div class="ad-crumb">계정 관리 <i class="fa-solid fa-circle-chevron-right"></i> 계정블록 정보</div>'
            f'<div class="ad-bar"><div class="ad-tt">계정블록 정보 <span class="cnt">(전체 : {n})</span> '
            '<span class="ad-dl"><i class="fa-solid fa-arrow-down"></i> Download</span></div>'
            '<div class="ad-filter"><span class="ad-in date">2026-01-28 <i class="fa-regular fa-calendar"></i></span>'
            '<span class="ad-in date">2026-10-28 <i class="fa-regular fa-calendar"></i></span>'
            '<span class="ad-in ph">AID</span><span class="ad-btn">검색</span></div></div>')


def main_list():
    return (head(len(ROWS))
            + '<div class="ad-table ad-acct" data-pin-area style="position: relative;">'
            + pin("a1", "1", "top: 38px; left: 49%;") + pin("a2", "2", "top: 38px; left: 63%;") + pin("a3", "3", "top: 38px; right: 4%; left: auto;")
            + table() + '</div>')


C1 = (card("a1", "1", "블록 상태", "Status", ["노점 검색 차단 기준 그대로 표시",
                                            "2차 · 1분 10회 초과 (1분) / 3차 · 5분 30회 초과 (1일) / 보안 확인 5회 실패 (1시간)"])
      + card("a2", "2", "처리 구분", "Type", ["노점 검색 → 기존 FRAUD BLOCK 과 같은 목록에서 구분"])
      + card("a3", "3", "블록 해제", "Release", ["제한 시간 끝나는 시각 · 지나면 자동 해제 (기존과 같음)"]))

SECS = [("adm01", "ADM-01", "① 계정블록 정보", frame(main_list()), C1)]

CSS = (pathlib.Path(__file__).with_name("admin.css")).read_text(encoding="utf-8")
TREE = pathlib.Path(__file__).with_name("tree.js").read_text(encoding="utf-8")

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADM-01 계정블록 정보 | RO 노점 검색 보안 강화 기획서</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="spec.css">
    <script>
{TREE}
    </script>
    <!-- ad-* : 어드민 화면 부품 — build_admin.py 가 admin.css 를 넣는다 -->
    <style>
{CSS}
    </style>
</head>
<body>
    <aside class="app-sidebar" id="app-sidebar" data-doc-id="ADM-01"></aside>
    <main class="app-main">
        <header class="app-topbar">
            <div class="topbar-left-zone">
                <button class="sidebar-toggle-trigger" id="sidebar-toggle-btn" title="메뉴 열기" onclick="toggleSidebar()"><i class="fa-solid fa-bars"></i></button>
                <span class="page-badge">ADM-01</span>
                <span class="page-heading">계정블록 정보 (MEM &gt; 계정 관리)</span>
            </div>
            <div class="topbar-page-nav"></div>
        </header>
        <div class="app-content-body">
            <div id="pc-spec-view" class="screen-spec-grid">
                <div class="canvas-col">
{chr(10).join(f'<div class="canvas-section" id="{s}" data-screen data-screen-code="{c}" data-screen-label="{l}"><div class="canvas-card"><div class="wf-hub-canvas">{cv}</div></div></div>' for s, c, l, cv, _ in SECS)}
                </div>
                <div class="spec-scroll-panel">
{chr(10).join(f'<div class="spec-group" data-screen-for="{s}">{cd}</div>' for s, _, _, _, cd in SECS)}
                </div>
            </div>
        </div>
    </main>
    <script src="spec.js"></script>
</body>
</html>
"""
(D / "03_admin.html").write_text(html, encoding="utf-8")
print("ok", len(html))
