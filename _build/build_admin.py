"""RO 노점 검색 보안 강화 — 02_admin.html (노점 검색 제한 로그) 빌더.
python -I -X utf8 build_admin.py <기획서 폴더>
Gravity Admin Tools (MEM > 계정 관리) 화면 틀. 핀 ↔ 디스크립션 카드.
"""
import pathlib
import sys

D = pathlib.Path(sys.argv[1])

RAIL = [("fa-user", "MEM", True), ("fa-gamepad", "GAME", False), ("fa-sack-dollar", "PAY", False),
        ("fa-globe", "WEB", False), ("fa-chart-pie", "CRM", False), ("fa-gear", "SET", False)]
SUB = ["계정 조회", "게임블록 정보", "계정블록 정보", "Fraud 가입 제한 로그", "노점 검색 제한 로그", "도메인 블록", "로그 정보"]

# 차단시간 · 처리 구분 · IP · AID · 해제시간 (최신순)
ROWS = [
    ("2026-10-27 14:22:05", "3차 · 1일 차단", "177.38.214.12", "2041877", "2026-10-28 14:22:05"),
    ("2026-10-27 14:05:47", "보안 확인 실패", "189.4.77.201", "1988302", "2026-10-27 15:05:47"),
    ("2026-10-27 13:41:19", "3차 · 1일 차단", "45.89.120.33", "2050114", "2026-10-28 13:41:19"),
    ("2026-10-27 13:30:02", "2차 · 1분 대기", "200.155.9.88", "1730021", "2026-10-27 13:31:02"),
    ("2026-10-27 11:12:40", "3차 · 1일 차단", "177.38.214.12", "1655480", "2026-10-28 11:12:40"),
    ("2026-10-27 09:58:11", "보안 확인 실패", "187.62.3.140", "2011736", "2026-10-27 10:58:11"),
    ("2026-10-27 09:20:33", "2차 · 1분 대기", "201.17.44.9", "1890245", "2026-10-27 09:21:33"),
    ("2026-10-26 22:47:10", "2차 · 1분 대기", "45.89.120.33", "2050114", "2026-10-26 22:48:10"),
    ("2026-10-26 08:15:27", "3차 · 1일 차단", "179.108.12.75", "1902663", "2026-10-27 08:15:27"),
]


def rail():
    return "".join(f'<div class="ad-rail-i{" on" if on else ""}"><i class="fa-solid {ic}"></i><b>{n}</b></div>' for ic, n, on in RAIL)


def sub():
    items = "".join(f'<div class="ad-sub-i{" on" if n == "노점 검색 제한 로그" else ""}">{n}</div>' for n in SUB)
    return f'<div class="ad-sub-head">계정 관리 <i class="fa-solid fa-chevron-up"></i></div>{items}'


WARN = '<span class="tag tag--warn">확정 필요</span>'
TYPES = ["전체", "2차 · 1분 대기", "3차 · 1일 차단", "보안 확인 실패"]


def pin(pid, label, style="top: -12px; left: -12px;"):
    return f'<span class="pin pin-abs" data-pin="{pid}" style="{style}">{label}</span>' if pid else ""


def card(pid, label, title, tag, lis):
    return (f'<div class="spec-card" id="spec-{pid}"><div class="spec-card-head"><span class="pin" data-pin="{pid}">{label}</span>'
            f'<span class="spec-card-title" data-edit="title:spec-{pid}">{title}</span><span class="spec-card-tag">{tag}</span></div>'
            f'<ul class="spec-list" data-edit="list:spec-{pid}">' + "".join(f"<li>{x}</li>" for x in lis) + "</ul></div>\n")


HEAD = '<div class="ad-th"><span>차단시간</span><span>처리 구분</span><span>IP</span><span>AID</span><span>해제시간</span></div>'


def table():
    return HEAD + "".join(f'<div class="ad-tr">' + "".join(f"<span>{x}</span>" for x in r) + "</div>" for r in ROWS)


def frame(main, modal=""):
    return (f'<div class="ad"><aside class="ad-side"><div class="ad-logo"><b>GRAVITY</b><em>Admin Tools</em><span class="ad-lang"><i class="fa-solid fa-globe"></i> KO <i class="fa-solid fa-chevron-down"></i></span></div>'
            f'<div class="ad-side-body"><div class="ad-rail">{rail()}</div><div class="ad-sub"><div class="ad-user"><b>이주형</b><span class="ad-out">로그아웃</span></div>{sub()}</div></div></aside>'
            f'<main class="ad-main">{main}</main>{modal}</div>')


def dd(opts, on):
    """펼친 셀렉트 목록 (브라우저 기본 셀렉트 모양)."""
    return '<div class="ad-dd">' + "".join(f'<span class="{"on" if o == on else ""}">{o}</span>' for o in opts) + "</div>"


def filt(pins=False, word="", open_=False):
    p1, p2, p3 = ("a1", "a2", "a3") if pins else (None, None, None)
    w = f'<span class="ad-in">{word}</span>' if word else '<span class="ad-in ph">검색어</span>'
    t_dd = dd(TYPES, "전체") if open_ else ""
    k_dd = dd(["선택", "IP", "AID"], "IP") if open_ else ""
    return (f'<div class="ad-filter">'
            f'<span class="ad-grp" data-pin-area>{pin(p1, "1")}<span class="ad-in date">2026-10-01 <i class="fa-regular fa-calendar"></i></span><span class="ad-in date">2026-10-27 <i class="fa-regular fa-calendar"></i></span></span>'
            f'<span class="ad-grp" data-pin-area>{pin(p2, "2")}<span class="ad-in sel">전체 <i class="fa-solid fa-chevron-down"></i>{t_dd}</span></span>'
            f'<span class="ad-grp" data-pin-area>{pin(p3, "3")}<span class="ad-in sel2">선택 <i class="fa-solid fa-chevron-down"></i>{k_dd}</span>{w}<span class="ad-btn">검색</span></span></div>')


def head(n, f, p_dl=None):
    return ('<div class="ad-crumb">계정 관리 <i class="fa-solid fa-circle-chevron-right"></i> 노점 검색 제한 로그</div>'
            f'<div class="ad-bar"><div class="ad-tt">노점 검색 제한 로그 <span class="cnt">(전체 : {n})</span> '
            f'<span class="ad-dl" style="position: relative;">{pin(p_dl, "4", "top: -14px; right: -14px; left: auto;")}<i class="fa-solid fa-arrow-down"></i> Download</span></div>{f}</div>')


def main_list():
    return (head(len(ROWS), filt(True, open_=True), "a4")
            + f'<div class="ad-table" data-pin-area style="position: relative;">{pin("a5", "5")}{table()}</div>'
            '<div class="ad-pager"><i class="fa-solid fa-angles-left"></i><i class="fa-solid fa-angle-left"></i><b>1</b><i class="fa-solid fa-angle-right"></i><i class="fa-solid fa-angles-right"></i></div>')


def main_empty():
    return (head(0, filt(word="9999999"))
            + f'<div class="ad-table" data-pin-area style="position: relative;">{HEAD}<div class="ad-empty" style="position: relative;">{pin("a6", "6", "top: 12px; left: 16px;")}데이터가 존재하지 않습니다</div></div>')


C1 = (card("a1", "1", "기간", "Date", ["차단시간 기준 시작일 ~ 종료일 · 기본: 이번 달 1일 ~ 오늘", "날짜 칸 클릭 → 달력"])
      + card("a2", "2", "처리 구분", "Select", ["전체 · 2차 · 1분 대기 · 3차 · 1일 차단 · 보안 확인 실패", "기본 전체 → 고른 구분만 조회"])
      + card("a3", "3", "검색 기준 · 검색어", "Search", ["선택 · IP · AID 중 고르고 검색어 입력 → 검색 (Enter 동일)",
                                                     "선택 상태에서 검색어 입력 → 기준 선택 안내 · 검색어 없으면 기간 · 처리 구분만으로 조회"])
      + card("a4", "4", "Download", "Action", ["현재 검색 조건의 전체 결과 엑셀 다운로드 (페이지 무관)"])
      + card("a5", "5", "제한 로그 목록", "List", ["차단시간 최신순 · 페이지당 20개",
                                                 "처리 구분 = 2차 · 1분 대기 / 3차 · 1일 차단 / 보안 확인 실패 · 해제시간 = 자동 해제 시각"]))
C2 = card("a6", "6", "검색 결과 없음", "Empty", ["조건에 맞는 로그 없음 → '데이터가 존재하지 않습니다' · 전체 : 0"])

SECS = [("adm01", "ADM-01", "① 제한 로그 목록", frame(main_list()), C1),
        ("adm02", "ADM-01", "② 검색 결과 없음", frame(main_empty()), C2)]

CSS = (pathlib.Path(__file__).with_name("admin.css")).read_text(encoding="utf-8")
TREE = pathlib.Path(__file__).with_name("tree.js").read_text(encoding="utf-8")

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADM-01 노점 검색 제한 로그 | RO 노점 검색 보안 강화 기획서</title>
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
                <span class="page-heading">노점 검색 제한 로그 (MEM &gt; 계정 관리)</span>
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
(D / "02_admin.html").write_text(html, encoding="utf-8")
print("ok", len(html))
