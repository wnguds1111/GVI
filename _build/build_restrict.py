"""RO 노점 검색 보안 강화 — 02_restrict.html (이용 제한 페이지) 빌더.
python -I -X utf8 build_restrict.py <기획서 폴더>
2차 · 3차 · 보안 확인 실패로 제한된 계정이 RO 웹 어느 메뉴에 들어가도 보는 페이지. 헤더 · GNB 는 build_ss.py 와 같은 모양.
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


TITLE = "Access Temporarily Restricted"
DESC = "Unusual activity has been detected on your account, so access to the website is temporarily restricted. Please try again later."


# ───────────────────────── PC ─────────────────────────
def box(p=None, p2=None, compact=False):
    pp = pin(p, p[1:]) if p else ""
    pq = pin(p2, p2[1:], "top: -6px; left: -26px;") if p2 else ""
    return (f'<div class="rs-box{" sm" if compact else ""}" data-pin-area>{pp}<span class="rs-ic"><i class="fa-solid fa-user-lock"></i></span>'
            f'<b>{TITLE}</b><span class="rs-desc">{DESC}</span>'
            f'<div class="rs-btn" style="position: relative;">{pq}<span class="ss-btn"><i class="fa-solid fa-headset"></i>&nbsp; CUSTOMER SUPPORT</span></div></div>')


def full(p=None, inner="", compact=False):
    """헤더 · GNB · 푸터 없는 흰 전체 화면 — 가운데 안내만."""
    pp = pin(p, p[1:], "top: 16px; left: 16px;") if p else ""
    return (f'<div class="rs-full{" sm" if compact else ""}" data-pin-area>{pp}'
            f'{inner}'
            '<span class="rs-copy">© Gravity Co.,Ltd &amp; Lee Myoungjin (Studio DTDS)</span></div>')


S1 = full("r2", box("r1", "r3"))

C1 = (card("r1", "1", "이용 제한 페이지", "Page", ["2차(1분) · 3차(1일) · 보안 확인 실패(1시간) 모두 이 페이지 하나 · 같은 문구",
                                                "제한 중인 계정으로 RO 웹 어느 메뉴에 들어가도 이 페이지 (주소는 그대로)",
                                                "사유 · 남은 시간은 표시 안 함 (차단 기준 노출 방지)",
                                                "문구 RO_RESTRICT_TITLE · RO_RESTRICT_DESC (표지 안내 ①)"])
      + card("r2", "2", "전체 화면 · 차단 범위", "Scope", ["헤더 · GNB · 푸터 없이 전체 화면 한 장 (흰 배경 + 가운데 안내) → 다른 메뉴로 갈 길 없음",
                                            "RO 웹 전체 메뉴: NEWS · GAME INFO · REDEEM · COMMUNITY · DOWNLOAD · 노점 검색",
                                            "메뉴 이동 · 새로고침 모두 이 페이지 · 데이터 조회 요청도 서버에서 거절",
                                            "고객센터는 제한 중에도 열림 (문의 · 이의 제기 경로) · 이 페이지에서 나가는 링크는 고객센터 하나",
                                            f"GNJOY 공통 Payment 포함 여부 {WARN}"])
      + card("r3", "3", "CUSTOMER SUPPORT", "Link", ["누르면 GNJOY 고객센터 (새 창) · 제한 중에도 문의 가능",
                                                    "문구 RO_RESTRICT_CS (표지 안내 ①)",
                                                    "제한 시간이 지나면 자동 해제 → 새로고침 · 메뉴 이동 시 원래 화면",
                                                    "로그아웃 후 공개 메뉴는 계정을 알 수 없어 제한 안 됨 · 노점 검색은 로그인 필수라 계속 막힘"]))


# ───────────────────────── 반응형 ─────────────────────────
def mo_frame():
    return full(inner=box(compact=True), compact=True)


M1 = (f'<div class="mo-device" data-mo-w="1024"><div class="mo-device-label"><span class="mo-dev-name">Tablet</span><span class="mo-dev-size">1024</span><span class="mo-dev-note">상자 폭 560</span></div><div class="mo-frame mo-frame--tab">{mo_frame()}</div></div>'
      f'<div class="mo-device" data-mo-w="360"><div class="mo-device-label"><span class="mo-dev-name">Mobile</span><span class="mo-dev-size">360</span><span class="mo-dev-note">버튼 꽉 차게</span></div><div class="mo-frame mo-frame--mo"><div class="mo-statusbar"></div>{mo_frame()}</div></div>')

RS_CSS = """
        /* ── rs-* : 이용 제한 페이지 ── */
        .rs-full { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; min-height: 760px; padding: 60px 24px 40px; background: #FFFFFF; }
        .rs-full .rs-box { border: 0; }
        .rs-full .rs-box { width: 100%; }
        .rs-copy { position: absolute; left: 0; right: 0; bottom: 24px; text-align: center; font-size: 11.5px; color: #94A3B8; }
        .rs-full.sm { min-height: 640px; gap: 22px; padding: 50px 16px 24px; }
        .mo-frame--tab .rs-full.sm { min-height: 720px; }
        .rs-box { position: relative; max-width: 560px; margin: 0 auto; padding: 44px 36px 36px; border: 1px solid #CBD5E1; border-radius: 12px; background: #FFFFFF; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .rs-ic { display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; margin-bottom: 6px; border-radius: 50%; background: #FEF3C7; color: #B45309; font-size: 24px; }
        .rs-box b { font-size: 22px; font-weight: 900; color: #0F172A; }
        .rs-desc { font-size: 14px; line-height: 1.7; color: #64748B; }
        .rs-btn { margin-top: 16px; }
        .rs-box.sm { padding: 30px 18px 22px; }
        .rs-box.sm b { font-size: 17px; }
        .rs-box.sm .rs-desc { font-size: 13px; }
        .rs-box.sm .rs-btn, .rs-box.sm .ss-btn { width: 100%; }
"""

CSS = (pathlib.Path(__file__).with_name("ss.css")).read_text(encoding="utf-8") + RS_CSS
TREE = pathlib.Path(__file__).with_name("tree.js").read_text(encoding="utf-8")
SID, LABEL = "restrict01", "① 이용 제한 페이지"

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SCR-02 이용 제한 페이지 | RO 노점 검색 보안 강화 기획서</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="spec.css">
    <!-- 문서 목록 — index.html 과 내용이 같아야 한다 -->
    <script>
{TREE}
    </script>
    <!-- ss-* 는 SCR-01 과 같은 부품 · rs-* 는 이 문서만 -->
    <style>
{CSS}
    </style>
</head>
<body>
    <aside class="app-sidebar" id="app-sidebar" data-doc-id="SCR-02"></aside>
    <main class="app-main">
        <header class="app-topbar">
            <div class="topbar-left-zone">
                <button class="sidebar-toggle-trigger" id="sidebar-toggle-btn" title="메뉴 열기" onclick="toggleSidebar()"><i class="fa-solid fa-bars"></i></button>
                <span class="page-badge">SCR-02</span>
                <span class="page-heading">이용 제한 페이지</span>
            </div>
            <div class="topbar-page-nav"></div>
        </header>
        <div class="app-content-body">
            <div id="pc-spec-view" class="screen-spec-grid">
                <div class="canvas-col">
<div class="canvas-section" id="{SID}" data-screen data-screen-code="SCR-02" data-screen-label="{LABEL}"><div class="canvas-card"><div class="wf-hub-canvas">{S1}</div></div></div>
                </div>
                <div class="spec-scroll-panel">
<div class="spec-group" data-screen-for="{SID}">{C1}</div>
                </div>
            </div>
            <div id="responsive-spec-view" style="display: none; width: 100%;">
<div class="mo-screen" data-mo-for="{SID}"><div class="mo-stage">{M1}</div></div>
            </div>
        </div>
    </main>
    <script src="spec.js"></script>
</body>
</html>
"""
(D / "02_restrict.html").write_text(html, encoding="utf-8")
print("ok", len(html))
