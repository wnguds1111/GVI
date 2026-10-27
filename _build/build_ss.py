"""RO 노점 검색 보안 강화 — 01_stall_search.html 빌더.
python -I -X utf8 build_ss.py <기획서 폴더>
화면 3개(비로그인 잠금 · 보안 확인 · 조회 결과)가 같은 GNB · 탭 · 검색줄을 쓰므로 부품으로 묶어 그린다.
"""
import pathlib
import sys

D = pathlib.Path(sys.argv[1])
WARN = '<span class="tag tag--warn">확정 필요</span>'


def pin(pid, label, style="top: -12px; left: -12px;"):
    return f'<span class="pin pin-abs" data-pin="{pid}" style="{style}">{label}</span>'


def card(pid, label, title, tag, lis):
    return (f'<div class="spec-card" id="spec-{pid}"><div class="spec-card-head"><span class="pin" data-pin="{pid}">{label}</span>'
            f'<span class="spec-card-title" data-edit="title:spec-{pid}">{title}</span><span class="spec-card-tag">{tag}</span></div>'
            f'<ul class="spec-list" data-edit="list:spec-{pid}">' + "".join(f"<li>{x}</li>" for x in lis) + "</ul></div>\n")


# ───────────────────────── PC 부품 ─────────────────────────
def gnjoy_bar(logged, p=None):
    right = ('<span class="ss-acc"><i class="fa-regular fa-circle-user"></i> ro_merchant07</span><span class="ss-pill">Logout</span>'
             if logged else '<span class="ss-link">Sign Up</span><span class="ss-pill ss-pill--red">Login</span>')
    pp = pin(p, p[1:], "top: 8px; right: 210px; left: auto;") if p else ""
    return (f'<div class="ss-gnjoy" data-pin-area>{pp}<span class="ss-gnjoy-logo">GNJOY</span>'
            '<span class="ss-gnjoy-menu"><span>Game <i class="fa-solid fa-chevron-down"></i></span><span>Payment</span><span>Announcements</span><span>Customer Support</span></span>'
            f'<span class="ss-gnjoy-right">{right}</span></div>')


def ro_gnb():
    items = "".join(f'<span class="{"on" if n == "GAME INFO" else ""}">{n}</span>' for n in ("NEWS", "GAME INFO", "REDEEM", "COMMUNITY", "DOWNLOAD", "CUSTOMER SUPPORT"))
    return f'<div class="ss-gnb"><span class="ss-ro-logo">RO 로고</span><span class="ss-gnb-menu">{items}</span></div>'


def ts_widget(p=None, state="ok", compact=False):
    """Turnstile 위젯 — 한국 노점 사이트처럼 탭 위에 항상 표시 (Managed 모드)."""
    pp = pin(p, p[1:], "top: -12px; left: -12px;") if p else ""
    left = {"ok": '<i class="fa-solid fa-circle-check ok"></i> Success!',
            "run": '<i class="fa-solid fa-spinner run"></i> Verifying...',
            "fail": '<i class="fa-solid fa-circle-xmark ng"></i> Verification failed. <span class="ss-retry">Retry</span>'}[state]
    return (f'<div class="ss-tsw{" sm" if compact else ""}{" err" if state == "fail" else ""}" data-pin-area>{pp}<span class="ss-tsw-l">{left}</span>'
            '<span class="ss-tsw-r"><b>CLOUDFLARE</b><small><u>Privacy</u> · <u>Terms</u></small></span></div>')


def hero(p=None, ts="", tab="trading"):
    pp = pin(p, p[1:], "top: -12px; left: -12px;") if p else ""
    a, b = ("on", "") if tab == "trading" else ("", "on")
    return (f'<div class="ss-hero"><span class="ss-bg-label">배경 이미지 (현행 유지)</span>'
            '<div class="ss-title"><i class="fa-regular fa-comment-dots"></i> Stall Shop</div>'
            f'{ts}<div class="ss-tabs" data-pin-area>{pp}<span class="{a}"><i class="fa-solid fa-sack-dollar"></i> Transaction Item Inquiry</span>'
            f'<span class="{b}"><i class="fa-solid fa-chart-line"></i> Item Market Price Inquiry</span></div></div>')


def search(word="", p=None, off=False, tab="trading"):
    pp = pin(p, p[1:], "top: -12px; left: -12px;") if p else ""
    val = f'<span class="ss-in">{word}</span>' if word else '<span class="ss-in ph">Please enter an item name.</span>'
    dv = '<i class="fa-solid fa-chevron-down"></i>'
    sels = ([f"Transaction: Sell {dv}", f"Server: Freya {dv}"] if tab == "trading"
            else [f"Item: All {dv}", f"Server: Freya {dv}", f"Period: All {dv}"])
    return (f'<div class="ss-search{" m3" if tab != "trading" else ""}" data-pin-area>{pp}' + "".join(f'<span class="ss-sel">{x}</span>' for x in sels) + f'{val}'
            f'<span class="ss-go{" off" if off else ""}"><i class="fa-solid fa-magnifying-glass"></i></span><span class="ss-reset"><i class="fa-solid fa-rotate-right"></i></span></div>')


def foot():
    return ('<div class="ss-notice-row"><span class="ss-notice"><i class="fa-solid fa-circle-exclamation"></i> Notice</span></div>'
            '<div class="ss-foot"><span>Privacy Policy</span><span>Terms of Service</span><span>Account Policy</span><span>Refund Policy</span><span>Punishment Policy</span></div>'
            '<div class="ss-copy">© Gravity Co.,Ltd &amp; Lee Myoungjin (Studio DTDS), All Rights Reserved. Published by Gravity Interactive, Inc.</div>')


def lock_box(p=None, p2=None, compact=False):
    """비로그인 결과 영역 — 로그인 안내 + LOGIN · SIGN UP (보안 확인은 로그인 후 ② 에서)."""
    pp = pin(p, p[1:], "top: -12px; left: -12px;") if p else ""
    pq = pin(p2, p2[1:], "top: 8px; left: -26px;") if p2 else ""
    return (f'<div class="ss-lock{" sm" if compact else ""}" data-pin-area>{pp}<span class="ss-lock-ic"><i class="fa-solid fa-lock"></i></span>'
            '<b>Log in to search stall shops</b><span>Stall shop search is available to GNJOY Americas members.</span>'
            f'<div class="ss-btns" style="position: relative;">{pq}<span class="ss-btn">LOGIN</span><span class="ss-btn ss-btn--line">SIGN UP</span></div></div>')


def verify_box(p=None, p2=None, state="idle"):
    pp = pin(p, p[1:], "top: -12px; left: -12px;") if p else ""
    pq = pin(p2, p2[1:], "top: -6px; left: -26px;") if p2 else ""
    if state == "fail":
        widget = '<div class="ss-widget err"><i class="fa-solid fa-circle-xmark"></i> Verification failed. Please try again. <span class="ss-retry">Retry</span></div>'
    else:
        widget = '<div class="ss-widget"><span class="ss-chk"></span> Verify you are human <span class="ss-widget-brand">보안 확인 위젯</span></div>'
    return (f'<div class="ss-verify" data-pin-area>{pp}<span class="ss-lock-ic"><i class="fa-solid fa-shield-halved"></i></span>'
            '<b>Quick security check</b><span>Please complete the security check to start searching.</span>'
            f'{widget}<div class="ss-legal" style="position: relative;">{pq}Protected by Cloudflare Turnstile · <u>Privacy</u> · <u>Terms</u></div></div>')


def guide_box(compact=False):
    """로그인 · 검색 전 — 현행 안내 그대로."""
    return (f'<div class="ss-guide{" sm" if compact else ""}"><div class="ss-guide-t"><b>Stall Shop Guide</b>'
            '<span>After selecting a server and entering an item name, you can check the list of items currently being sold at stalls.</span></div>'
            '<span class="ss-guide-img">캐릭터 이미지 (현행)</span></div>')


CARDS = [("Gold Gastronomic Coin", "0", "9,999,999", "4,407", "78598009"),
         ("Yggdrasil Berry", "5,000", "199,999", "38,804", "76127"),
         ("Elastic Band", "2,000", "490,000", "65,780", "70977"),
         ("HP Increase Potion (Large)", "3,290", "24,999", "8,509", "59781"),
         ("Yggdrasil Seed", "1,500", "60,000", "9,870", "41205"),
         ("Treat Basket", "800", "35,000", "4,120", "38772"),
         ("Silver Gastronomic Coin", "0", "4,999,999", "2,310", "35018"),
         ("SP Increase Potion (Large)", "4,100", "29,999", "9,980", "30655")]


def mp_card(n, mn, mx, av, vol):
    return (f'<div class="ss-card"><div class="ss-card-top"><i class="ss-ic"></i><b>{n}</b></div>'
            f'<div class="ss-card-row"><span>Minimum</span><em class="mn">{mn} z</em></div>'
            f'<div class="ss-card-row"><span>Maximum</span><em class="mx">{mx} z</em></div>'
            f'<div class="ss-card-row"><span>Avg</span><em class="av">{av} z</em></div>'
            f'<div class="ss-card-vol"><span>Vol</span><em>{vol}</em></div></div>')


def result_bar(word="as", compact=False):
    head = f'<span class="ss-rb-n">{"" if compact else f"&#39;{word}&#39; Search Results "}<b>260</b></span>'
    return (f'<div class="ss-rb">{head}<span class="ss-rb-r"><span><i class="fa-solid fa-arrow-down-up-across-line"></i> By Relevance <i class="fa-solid fa-chevron-down"></i></span>'
            '<span>20 <i class="fa-solid fa-chevron-down"></i></span><span class="ss-vt"><i class="fa-solid fa-list"></i><i class="fa-solid fa-table-cells-large on"></i></span></span></div>')


def results(p=None, p2=None):
    pp = pin(p, p[1:], "top: -4px; left: -28px;") if p else ""
    pq = pin(p2, p2[1:], "top: -6px; left: -26px;") if p2 else ""
    cards = "".join(mp_card(*c) for c in CARDS)
    return (f'<div class="ss-result" data-pin-area>{pp}{result_bar()}<div class="ss-grid">{cards}</div>'
            f'<div class="ss-pager" style="position: relative;">{pq}<i class="fa-solid fa-angle-left"></i><b>1</b><span>2</span><span>3</span><span>4</span><span>5</span><i class="fa-solid fa-angle-right"></i></div></div>')


def msg_box(ic, title, body, btn=None, tone=""):
    b = f'<div class="ss-btns"><span class="ss-btn">{btn}</span></div>' if btn else ""
    return f'<div class="ss-msg {tone}"><span class="ss-lock-ic"><i class="fa-solid {ic}"></i></span><b>{title}</b><span>{body}</span>{b}</div>'


def screen_pc(logged, body, word="", pins=None, off=False, ts="", tab="trading"):
    pins = pins or {}
    return (f'{gnjoy_bar(logged, pins.get("gnb"))}{ro_gnb()}<div class="ss-page">{hero(pins.get("tab"), ts, tab)}'
            f'<div class="ss-wrap">{search(word, pins.get("search"), off, tab)}<div class="ss-body">{body}</div></div>{foot()}</div>')


def case(pid, label, title, when, lead, inner):
    return (f'<div class="case-card" data-pin-area><div class="case-card-head"><span class="pin pin--case" data-pin="{pid}">{label}</span>'
            f'<span class="case-title">{title}</span><span class="case-when">{when}</span></div>'
            f'<div class="case-body"><p class="case-lead">{lead}</p>{inner}</div></div>')


CASES = "".join([
    case("e1", "E1", "2차 · 1분 대기", "1분 내 조회 10회 초과 (11번째부터) · 결과 영역 대체",
         "1분 동안 검색해도 미들서버를 부르지 않고 남은 시간만 보여 줍니다. 지나면 자동으로 다시 검색할 수 있습니다.",
         msg_box("fa-hourglass-half", "Please wait a moment", "You've searched too many times in a short period. Please wait 1 minute and try again.",
                 None, "warn").replace("</div>", '<div class="ss-wait">00:42</div></div>', 1)),
    case("e2", "E2", "3차 · 1일 차단", "5분 내 조회 30회 초과 (31번째부터) · 결과 영역 대체",
         "검색 버튼은 눌러도 미들서버를 부르지 않고 이 안내만 보입니다.",
         msg_box("fa-ban", "Search is temporarily unavailable", "Due to a high number of searches, Stall Shop search is temporarily unavailable. Please try again later.", None, "warn")),
    case("e3", "E3", "검색어 오류", "검색어 2글자 미만 · 검색어 없이 검색 · 검색줄 아래",
         "미들서버를 부르지 않고 입력칸 아래에 안내합니다.",
         '<div class="ss-search mini"><span class="ss-in err">P</span><span class="ss-go"><i class="fa-solid fa-magnifying-glass"></i></span></div>'
         '<div class="ss-err">Please enter at least 2 characters.</div>'),
    case("e4", "E4", "보안 확인 실패", "Turnstile 검증 실패 · 만료 · 이미 쓴 토큰 · 탭 위 위젯 대체",
         "Retry 로 토큰을 새로 받아 같은 조건으로 다시 조회합니다.",
         ts_widget(state="fail")),
    case("e5", "E5", "검색 결과 0건", "조건에 맞는 노점이 없을 때 · 결과 영역 대체 (현행 유지)",
         "현행 문구 그대로입니다.",
         '<div class="ss-empty">No records found.</div>'),
    case("e6", "E6", "Turnstile 확인 중", "진입 직후 · 조회 직후 위젯이 다시 도는 동안 · 탭 위 위젯 + 검색 버튼",
         "Success! 가 뜨기 전에는 검색 버튼이 비활성이라 검색할 수 없습니다.",
         ts_widget(state="run") + '<div class="ss-search mini" style="margin-top: 12px;"><span class="ss-in">White Potion</span><span class="ss-go off"><i class="fa-solid fa-magnifying-glass"></i></span></div>'),
])


def case_zone():
    return ('<div class="case-zone"><div class="case-zone-inner"><div class="case-zone-label">예외 케이스</div>'
            '<p class="case-zone-desc">평소에 보이지 않는 상태입니다. 조건이 되면 지정한 자리를 대체합니다. 흐름 핀과 별도로 <b>E 코드</b>로 셉니다.</p>'
            f'<div class="case-grid">{CASES}</div></div></div>')


# ───────────────────────── 화면 3개 ─────────────────────────
S1 = screen_pc(False, lock_box("p4", "p5"), pins={"gnb": "p1", "tab": "p2", "search": "p3"})
S2 = screen_pc(True, guide_box(), pins={"gnb": "p6"}, ts=ts_widget("p7"))
S3 = screen_pc(True, results("p8", "p9"), word="as", ts=ts_widget(), tab="market") + case_zone()

C1 = (card("p1", "1", "로그인 · 회원가입 (헤더)", "Header", ["Login → 로그인 페이지 → 로그인 후 보던 화면(검색 조건 그대로)으로 복귀",
                                                        "Sign Up → 회원가입 새 창"])
      + card("p2", "2", "탭", "Tab", ["Item Market Price Inquiry 탭도 같은 규칙 (로그인 → 조회마다 Turnstile)"])
      + card("p3", "3", "검색줄 (비로그인)", "Search", ["거래 유형 · 서버 · 검색어는 그대로 입력 가능",
                                                   "검색 클릭 → 결과 대신 4 안내 (미들서버 조회 안 함)"])
      + card("p4", "4", "로그인 안내", "Lock", ["비로그인 진입 시 결과 자리에 표시",
                                              "검색 조건이 붙은 주소로 들어와도 동일 · 서버에서 데이터 조회 안 함"])
      + card("p5", "5", "LOGIN · SIGN UP", "Action", ["LOGIN → 로그인 페이지 → 로그인 후 같은 검색 조건으로 복귀 (조건이 있으면 바로 조회)",
                                                    "SIGN UP → 회원가입 새 창"]))
C2 = (card("p6", "6", "로그인 상태 헤더", "Header", ["계정명 + Logout만 표시", "Logout → 비로그인 상태(1 화면)로"])
      + card("p7", "7", "Turnstile 위젯", "Verify", ["로그인 상태에서 탭 위에 항상 표시 (한국 노점 사이트와 같은 Managed 모드)",
                                                 "Success! 가 떠야 검색 버튼 활성 · 확인 중에는 검색 · Enter 막음 (E6)",
                                                 "진입 · 조회(검색 · 페이지 이동 · 상세)마다 실행 → Success! 토큰 1개로 조회 · 서버 검증",
                                                 "Cloudflare 가 요구하면 위젯 안에 체크박스 · 실패 → E4",
                                                 f"위젯 안 Privacy · Terms 링크로 고지 · 개인정보 처리방침 반영 (LGPD) {WARN} 법무"]))
C3 = (card("p8", "8", "조회 결과 (시세 조회 예시)", "List", ["결과 바(건수 · 정렬 · 개수 · 보기 전환) · 카드 구성은 현행 유지 · 거래 아이템 조회도 같은 규칙",
                                            "조회마다 Turnstile 검증 + IP별 조회 수 집계 → 2차 E1 · 3차 E2 · 카드 클릭 → 4 상세 팝업",
                                            "로그아웃 상태로 조회 → 1 화면으로"])
      + card("p9", "9", "페이지 이동", "Pager", ["페이지당 20개 고정 (주소의 limit 값 무시)",
                                               "최대 50페이지 · 페이지 이동 · 정렬 · 개수 변경도 조회 1회 (Turnstile 실행 · 횟수 포함)"])
      + card("e1", "E1", "2차 · 1분 대기", "Case", ["1분 내 조회 10회 초과 → 11번째부터 1분 동안 검색 중지 · 남은 시간 표시", "1분 지나면 자동 해제 · 대기 중 시도도 3차 횟수에 포함"])
      + card("e2", "E2", "3차 · 1일 차단", "Case", ["5분 내 조회 30회 초과 → 1일 노점 검색 차단 (IP 기준)", "차단 중 조회 → 이 안내만 (미들서버 조회 안 함)"])
      + card("e3", "E3", "검색어 오류", "Case", ["2글자 미만 · 빈 검색 → 입력칸 아래 안내 · 검색 안 함"])
      + card("e4", "E4", "보안 확인 실패", "Case", ["위젯 안 Retry → Turnstile 다시 실행 → 같은 조건 다시 조회", "10분 내 5회 실패 → 1시간 노점 검색 차단 (표지 안내 ④)"])
      + card("e5", "E5", "검색 결과 0건", "Case", ["현행 문구 유지 · 조회 횟수에는 포함"])
      + card("e6", "E6", "Turnstile 확인 중", "Case", ["위젯 Success! 전까지 검색 버튼 비활성 · Enter 도 검색 안 됨",
                                                      "조회가 끝나면 위젯 다시 실행 → Success! 뜨면 다음 검색 가능"]))


# ───────────────────────── 반응형 ─────────────────────────
def mo_head(logged, tab="trading"):
    acc = "fa-circle-user" if logged else "fa-user"
    a, b = ("on", "") if tab == "trading" else ("", "on")
    return (f'<div class="ss-mo-gnb"><i class="fa-solid fa-bars"></i><span class="ss-ro-logo sm">RO 로고</span><i class="fa-regular {acc}"></i></div>'
            '<div class="ss-mo-hero"><div class="ss-title sm"><i class="fa-regular fa-comment-dots"></i> Stall Shop</div>'
            f'<div class="ss-mo-tabs"><span class="{a}"><i class="fa-solid fa-sack-dollar"></i> Transaction Item Inquiry</span>'
            f'<span class="{b}"><i class="fa-solid fa-chart-line"></i> Item Market Price Inquiry</span></div></div>')


def mo_search(word="", tab="trading"):
    val = f'<span class="ss-in">{word}</span>' if word else '<span class="ss-in ph">Please enter an item name.</span>'
    cols = [("Transaction", "Sell"), ("Server", "Freya")] if tab == "trading" else [("Item", "All"), ("Server", "Freya"), ("Period", "All")]
    f = "".join(f'<span><small>{k}</small><b>{v}</b></span>' for k, v in cols)
    return (f'<div class="ss-mo-search"><div class="ss-mo-filter">{f}<i class="fa-solid fa-chevron-down"></i></div>'
            f'<div class="ss-mo-row">{val}<span class="ss-go"><i class="fa-solid fa-magnifying-glass"></i></span><span class="ss-reset"><i class="fa-solid fa-rotate-right"></i></span></div></div>')


def mo_results():
    return result_bar(compact=True) + '<div class="ss-mo-grid">' + "".join(mp_card(*c) for c in CARDS[:2]) + "</div>"


def mo_frame(logged, body, word="", ts=False, tab="trading"):
    w = f'<div class="ss-mo-ts">{ts_widget(compact=True)}</div>' if ts else ""
    return (f'<div class="ss-mo">{mo_head(logged, tab)}{w}{mo_search(word, tab)}<div class="ss-mo-body">{body}</div>'
            '<div class="ss-mo-foot">© Gravity Co.,Ltd &amp; Lee Myoungjin (Studio DTDS)</div></div>')


def devices(tab, mo, tn, mn):
    return (f'<div class="mo-device" data-mo-w="1024"><div class="mo-device-label"><span class="mo-dev-name">Tablet</span><span class="mo-dev-size">1024</span><span class="mo-dev-note">{tn}</span></div><div class="mo-frame mo-frame--tab">{tab}</div></div>'
            f'<div class="mo-device" data-mo-w="360"><div class="mo-device-label"><span class="mo-dev-name">Mobile</span><span class="mo-dev-size">360</span><span class="mo-dev-note">{mn}</span></div><div class="mo-frame mo-frame--mo"><div class="mo-statusbar"></div>{mo}</div></div>')


M1 = devices(mo_frame(False, lock_box(compact=True)), mo_frame(False, lock_box(compact=True)), "검색줄 2줄", "검색줄 2줄 · 안내 문구 줄바꿈")
M2 = devices(mo_frame(True, guide_box(compact=True), ts=True), mo_frame(True, guide_box(compact=True), ts=True), "위젯 = 탭 아래", "위젯 = 탭 아래 · 안내 이미지 생략")
M3 = devices(mo_frame(True, mo_results(), "as", ts=True, tab="market"), mo_frame(True, mo_results(), "as", ts=True, tab="market"), "카드 2열", "카드 1열 (현행)")


# ───────────────────────── ④ 상세 팝업 ─────────────────────────
DAYS = [("26/10/26", "13,999", "40,000", "24,865", "3422"), ("25/10/26", "14,999", "79,999", "22,155", "1727"),
        ("24/10/26", "18,000", "100,000", "25,072", "2431"), ("23/10/26", "16,000", "89,999", "25,830", "1767"),
        ("22/10/26", "18,000", "115,000", "26,860", "1003")]


def detail_modal(p=None, p2=None, compact=False):
    """검색 결과에서 연 상세 팝업 — 맨 위 Turnstile 위젯, 아래 내용은 현행 그대로."""
    pq = pin(p2, p2[1:], "top: -12px; left: -12px;") if p2 else ""
    rows = "".join(f'<div class="ss-dt-tr"><span>{d}</span><span class="r v">{a} z</span><span class="r v">{b} z</span><span class="r v">{c} z</span><span class="r">{q}</span></div>'
                   for d, a, b, c, q in (DAYS[:3] if compact else DAYS))
    return (f'<div class="ss-modal{" sm" if compact else ""}"><div class="ss-modal-head"><i class="fa-solid fa-xmark"></i></div>'
            f'{ts_widget(p, compact=compact)}'
            f'<div class="ss-dt" data-pin-area>{pq}<div class="ss-dt-asof">Latest market price information as of 26/10/26</div>'
            '<div class="ss-dt-mm"><span class="k">Minimum</span><span class="v min">5,000 z</span><span class="k">Maximum</span><span class="v max">199,999 z</span></div>'
            '<div class="ss-dt-chart">가격 추이 그래프 (Minimum · Maximum · Avg · 현행)</div>'
            '<div class="ss-dt-th"><span>Date</span><span class="r">Minimum</span><span class="r">Maximum</span><span class="r">Avg</span><span class="r">qty</span></div>'
            f'{rows}</div></div>')


S4 = f'<div class="ss-dim">{detail_modal("p10", "p11")}</div>'
C4 = (card("p10", "10", "Turnstile 위젯 (팝업 상단)", "Verify", ["상세 팝업을 열 때마다 맨 위에서 실행 → Success! 후 상세 데이터 조회 (조회 1회)",
                                                          "실패 → 위젯 Retry · 아래 내용은 비워 둠 (E4 와 같은 처리)",
                                                          "2차 · 3차 걸린 상태 → 내용 자리에 E1 · E2 안내"])
      + card("p11", "11", "상세 내용", "Detail", ["거래 아이템 상세 · 시세 상세 모두 내용은 현행 유지",
                                                 "닫기(X) → 검색 결과로 · 다시 열면 Turnstile 다시 실행"]))
M4 = devices(f'<div class="ss-mo ss-dim">{detail_modal()}</div>', f'<div class="ss-mo ss-dim sm">{detail_modal(compact=True)}</div>',
             "팝업 폭 720", "전체 화면 팝업 · 표 3줄 예시")


def section(sid, code, label, canvas):
    return (f'<div class="canvas-section" id="{sid}" data-screen data-screen-code="{code}" data-screen-label="{label}">'
            f'<div class="canvas-card"><div class="wf-hub-canvas">{canvas}</div></div></div>')


SECS = [("screen01", "SCR-01", "① 비로그인 · 잠금", S1, C1, M1),
        ("screen02", "SCR-01", "② 로그인 · 검색 전", S2, C2, M2),
        ("screen03", "SCR-01", "③ 조회 결과 (시세) · 예외 케이스", S3, C3, M3),
        ("screen04", "SCR-01", "④ 상세 팝업", S4, C4, M4)]

CSS = (pathlib.Path(__file__).with_name("ss.css")).read_text(encoding="utf-8")
TREE = pathlib.Path(__file__).with_name("tree.js").read_text(encoding="utf-8")

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SCR-01 노점 검색 (거래 · 시세 조회) | RO 노점 검색 보안 강화 기획서</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="spec.css">
    <!-- 문서 목록 — index.html 과 내용이 같아야 한다 -->
    <script>
{TREE}
    </script>
    <!-- ss-* : 이 문서(Stall Shop)만 쓰는 부품 — build_ss.py 가 ss.css 를 넣는다 -->
    <style>
{CSS}
    </style>
</head>
<body>
    <aside class="app-sidebar" id="app-sidebar" data-doc-id="SCR-01"></aside>
    <main class="app-main">
        <header class="app-topbar">
            <div class="topbar-left-zone">
                <button class="sidebar-toggle-trigger" id="sidebar-toggle-btn" title="메뉴 열기" onclick="toggleSidebar()"><i class="fa-solid fa-bars"></i></button>
                <span class="page-badge">SCR-01</span>
                <span class="page-heading">노점 검색 (거래 · 시세 조회)</span>
            </div>
            <div class="topbar-page-nav"></div>
        </header>
        <div class="app-content-body">
            <div id="pc-spec-view" class="screen-spec-grid">
                <div class="canvas-col">
{chr(10).join(section(s, c, l, cv) for s, c, l, cv, _, _ in SECS)}
                </div>
                <div class="spec-scroll-panel">
{chr(10).join(f'<div class="spec-group" data-screen-for="{s}">{cd}</div>' for s, _, _, _, cd, _ in SECS)}
                </div>
            </div>
            <div id="responsive-spec-view" style="display: none; width: 100%;">
{chr(10).join(f'<div class="mo-screen" data-mo-for="{s}"><div class="mo-stage">{m}</div></div>' for s, _, _, _, _, m in SECS)}
            </div>
        </div>
    </main>
    <script src="spec.js"></script>
</body>
</html>
"""
(D / "01_stall_search.html").write_text(html, encoding="utf-8")
print("ok", len(html))
