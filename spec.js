/* ============================================================================
   spec.js — GNJOY.HK 포털 리뉴얼 기획서 공통 스크립트
   ----------------------------------------------------------------------------
   문서를 추가할 때는 아래 DOC_TREE에 항목만 추가한다.
   사이드바 · 이전/다음 내비게이션은 전 페이지에서 자동 갱신된다.
   사이드바 HTML을 각 파일에 복붙하지 말 것.

   각 HTML은 다음 두 가지만 갖추면 된다.
     1) <aside class="app-sidebar" id="app-sidebar" data-doc-id="MAIN-01"></aside>
     2) </body> 직전에 <script src="spec.js"></script>
   ========================================================================= */

/* ============================== DOC_TREE ================================= */
/* href: null 이면 링크 대신 '예정' 뱃지로 렌더된다. 404를 만들지 않기 위한 장치.

   페이지가 <head> 에서 window.DOC_TREE_OVERRIDE 를 정의하면 그걸 쓴다.
   새 프로젝트를 시작할 때 _template.html 한 장만으로도 사이드바가 제대로 뜨게 하는 장치다.
   **문서가 둘 이상이 되면 override 를 지우고 아래 배열에 옮긴다** —
   페이지마다 목록을 들고 있으면 파일마다 메뉴가 어긋난다. */
var DOC_TREE = window.DOC_TREE_OVERRIDE || [
  {
    group: 'DOCUMENT INFO',
    items: [
      { id: 'DOC-00', label: '00. 표지 &amp; 개정이력', href: 'index.html' },
      { id: 'DOC-01', label: '01. 정보 구조 (IA)', href: '01_sitemap.html' },
      { id: 'DOC-02', label: '02. 중화권 시장 분석', href: '02_benchmark.html' },
      { id: 'DOC-03', label: '03. 어드민 분석', href: '03_admin.html' }
    ]
  },
  {
    group: 'FRONT',
    tone: 'front',
    items: [
      { id: 'MAIN-01', label: '메인 페이지', href: '04_main.html' },
      {
        id: 'BILL-01', label: '캐시충전', href: '05_billing.html',
        children: [
          { id: 'BILL-01', label: '온라인 캐시 충전', href: '05_billing.html#billing01' },
          { id: 'BILL-01', label: '충전 완료', href: '05_billing.html#billing04' },
          { id: 'BILL-02', label: '거래 및 결제내역', href: '05_billing.html#billing02' }
        ]
      },
      {
        id: 'NEWS-01', label: '새소식', href: '06_news.html',
        children: [
          { id: 'NEWS-01', label: '공지사항 목록', href: '06_news.html#news01' },
          { id: 'NEWS-02', label: '공지사항 상세', href: '06_news.html#news02' },
          { id: 'NEWS-03', label: '이벤트 목록 (썸네일)', href: '06_news.html#news03' },
          { id: 'NEWS-04', label: '이벤트 상세', href: '06_news.html#news04' }
        ]
      },
      {
        id: 'CS-01', label: '고객지원', href: '07_support.html',
        children: [
          { id: 'CS-01', label: 'FAQ 자주 묻는 질문', href: '07_support.html#support01' },
          { id: 'CS-02', label: '1:1 문의 내역', href: '07_support.html#support02' },
          { id: 'CS-03', label: '1:1 문의 등록', href: '07_support.html#support03' }
        ]
      },
      {
        id: 'MEM-01', label: '로그인 · 회원가입', href: '08_member.html',
        children: [
          { id: 'MEM-01', label: '로그인', href: '08_member.html#member01' },
          { id: 'MEM-02', label: '회원가입', href: '08_member.html#member02' },
          { id: 'MEM-02', label: '회원가입 완료', href: '08_member.html#member04' }
        ]
      },
      {
        id: 'MEM-03', label: '마이페이지', href: '09_mypage.html',
        children: [
          { id: 'MEM-03', label: '회원정보 &amp; 계정관리', href: '09_mypage.html#mypage01' },
          { id: 'MEM-04', label: '신원 본인인증 &amp; MID', href: '09_mypage.html#mypage02' },
          { id: 'MEM-05', label: 'SNS 계정 연동', href: '09_mypage.html#mypage03' },
          { id: 'MEM-06', label: '개인 메시지함', href: '09_mypage.html#mypage04' }
        ]
      },
      { id: 'COM-01', label: '공통 컴포넌트', href: null }
    ]
  },
  {
    // 어드민 기획서 — 03_admin.html(어드민 분석) 사이트맵 기준. 문서가 생기면 href 를 채운다
    group: 'ADMIN',
    tone: 'admin',
    items: [
      { id: 'ADM-01', label: '회원 관리', href: '10_adm_member.html', children: [
          { id: 'ADM-MEM-01', label: '회원 목록', href: '10_adm_member.html#mem01' },
          { id: 'ADM-MEM-02', label: '회원 상세', href: '10_adm_member.html#mem02' },
          { id: 'ADM-MEM-03', label: '정지 목록', href: '10_adm_member.html#mem03' },
          { id: 'ADM-MEM-04', label: '정지 등록', href: '10_adm_member.html#mem04' },
          { id: 'ADM-MEM-05', label: '메시지 목록', href: '10_adm_member.html#mem05' },
          { id: 'ADM-MEM-06', label: '메시지 발송', href: '10_adm_member.html#mem06' },
          { id: 'ADM-MEM-07', label: '로그인 기록', href: '10_adm_member.html#mem07' }
      ] },
      { id: 'ADM-02', label: '본인인증', href: null, children: [
          { id: 'ADM-02', label: '휴대폰 인증 기록', href: null },
          { id: 'ADM-02', label: 'MID 인증 기록', href: null }
      ] },
      { id: 'ADM-03', label: '결제 관리', href: null, children: [
          { id: 'ADM-03', label: '충전 내역', href: null },
          { id: 'ADM-03', label: '결제수단 관리', href: null },
          { id: 'ADM-03', label: '충전 이벤트', href: null },
          { id: 'ADM-03', label: '충전 테스트 계정', href: null }
      ] },
      { id: 'ADM-04', label: '콘텐츠 관리', href: null, children: [
          { id: 'ADM-04', label: '게임 관리', href: null },
          { id: 'ADM-04', label: '배너 관리', href: null },
          { id: 'ADM-04', label: '공지 관리', href: null },
          { id: 'ADM-04', label: '이벤트 관리', href: null },
          { id: 'ADM-04', label: 'FAQ 관리', href: null }
      ] },
      { id: 'ADM-05', label: '고객지원', href: null, children: [
          { id: 'ADM-05', label: '1:1 문의 관리', href: null },
          { id: 'ADM-05', label: '문의 유형 관리', href: null }
      ] },
      { id: 'ADM-06', label: '쿠폰', href: null, children: [
          { id: 'ADM-06', label: '시리얼 발급', href: null },
          { id: 'ADM-06', label: '시리얼 사용 조회', href: null }
      ] },
      { id: 'ADM-07', label: '통계', href: null, children: [
          { id: 'ADM-07', label: '회원 통계', href: null },
          { id: 'ADM-07', label: '충전 통계', href: null },
          { id: 'ADM-07', label: '본인인증 통계', href: null },
          { id: 'ADM-07', label: '문의 통계', href: null },
          { id: 'ADM-07', label: '일일 통계', href: null },
          { id: 'ADM-07', label: 'SMS 통계', href: null }
      ] },
      { id: 'ADM-08', label: '사이트 설정', href: null, children: [
          { id: 'ADM-08', label: '점검 고지', href: null },
          { id: 'ADM-08', label: '공식 SNS 채널', href: null },
          { id: 'ADM-08', label: '상담 운영시간', href: null },
          { id: 'ADM-08', label: '약관 관리', href: null }
      ] },
      { id: 'ADM-09', label: '어드민 계정', href: null, children: [
          { id: 'ADM-09', label: '계정 · 권한 관리', href: null }
      ] }
    ]
  }
];

var DOC_META = window.DOC_META_OVERRIDE || {
  title: 'GGV (GNJOY.HK)',
  subtitle: '포털 웹 기획서 v2.0',
  version: 'v2.0.0'
};

/* ============================ 내부 유틸 ================================== */
function _currentFile() {
  var path = window.location.pathname.split('/').pop();
  if (!path) return 'index.html';
  // 배포 서버(Cloudflare)는 .html 을 뗀 주소(/01_stall_search)를 쓴다 — 메뉴 링크와 맞추려 다시 붙인다
  return /\.[a-z0-9]+$/i.test(path) ? path : path + '.html';
}

/* DOC_TREE를 평탄화 — 이전/다음 내비게이션 순서의 기준 */
function _flatDocs() {
  var out = [];
  DOC_TREE.forEach(function (g) {
    g.items.forEach(function (it) { out.push(it); });
  });
  return out;
}

function _isCurrent(href) {
  if (!href) return false;
  return href.split('#')[0] === _currentFile();
}

/* ============================ 사이드바 렌더 ============================== */
function renderSidebar() {
  var mount = document.getElementById('app-sidebar');
  if (!mount) return;

  var activeId = mount.getAttribute('data-doc-id');
  var html = '';

  html += '<div class="sidebar-brand">' +
            '<div class="brand-content">' +
              '<div class="brand-icon"><i class="fa-solid fa-diamond"></i></div>' +
              '<div class="brand-text"><h1>' + DOC_META.title + '</h1><p>' + DOC_META.subtitle + '</p></div>' +
            '</div>' +
            '<button class="sidebar-collapse-btn" onclick="toggleSidebar()" title="사이드바 접기">' +
              '<i class="fa-solid fa-angles-left"></i>' +
            '</button>' +
          '</div>';

  html += '<nav class="sidebar-nav">';
  DOC_TREE.forEach(function (g) {
    html += '<div class="nav-group' + (g.tone ? ' nav-group--' + g.tone : '') + '">' +
            '<div class="nav-group-title">' + g.group + '</div><ul class="nav-list">';
    g.items.forEach(function (it) {
      html += '<li>' + _navItem(it, activeId);
      if (it.children && it.children.length) {
        html += '<ul class="nav-sub-tree">';      // 2뎁스는 항상 펼쳐 전체 구조를 보여준다
        it.children.forEach(function (c) {
          html += '<li>' + _navSubItem(c, !it.href) + '</li>';
        });
        html += '</ul>';
      }
      html += '</li>';
    });
    html += '</ul></div>';
  });
  html += '</nav>';

  html += '<div class="sidebar-footer">' +
            '<span>Status: 작성 중</span><span>' + DOC_META.version + '</span>' +
          '</div>';

  mount.innerHTML = html;
}

function _navItem(it, activeId) {
  if (!it.href) {
    return '<span class="nav-item-btn is-todo">' +
             '<span class="nav-item-left">' + it.label + '</span>' +
             '<span class="nav-item-badge">예정</span>' +
           '</span>';
  }
  var isActive = (activeId && activeId === it.id) || _isCurrent(it.href);
  return '<a href="' + it.href + '" class="nav-item-btn' + (isActive ? ' active' : '') + '">' +
           '<span class="nav-item-left">' + it.label + '</span>' +
         '</a>';
}

function _navSubItem(c, parentTodo) {
  if (!c.href) {
    // 부모가 이미 '예정'이면 2뎁스마다 뱃지를 반복하지 않는다
    return '<span class="nav-sub-btn is-todo">' + c.label +
           (parentTodo ? '' : '<span class="nav-item-badge">예정</span>') + '</span>';
  }
  var frag = c.href.split('#')[1] || '';
  var isActive = _isCurrent(c.href) && (!frag || frag === _activeScreen());
  return '<a href="' + c.href + '" class="nav-sub-btn' + (isActive ? ' active' : '') +
         '" data-screen-link="' + frag + '">' + c.label + '</a>';
}

/* 좌측 2뎁스 메뉴의 활성 표시를 현재 화면에 맞춘다 */
function _syncSubNav() {
  var active = _activeScreen();
  document.querySelectorAll('.nav-sub-btn[data-screen-link]').forEach(function (a) {
    var frag = a.getAttribute('data-screen-link');
    if (!frag) return;
    var samePage = _isCurrent(a.getAttribute('href'));
    a.classList.toggle('active', samePage && frag === active);
  });
}

/* ====================== 이전 / 다음 문서 내비게이션 ====================== */
/* .topbar-page-nav 요소가 있으면 DOC_TREE 순서대로 채운다. */
function renderPageNav() {
  var host = document.querySelector('.topbar-page-nav');
  if (!host) return;

  var docs = _flatDocs().filter(function (d) { return d.href; });
  var idx = -1;
  for (var i = 0; i < docs.length; i++) {
    if (_isCurrent(docs[i].href)) { idx = i; break; }
  }
  if (idx === -1) return;

  var prev = docs[idx - 1];
  var next = docs[idx + 1];
  var html = '';
  html += prev
    ? '<a href="' + prev.href + '" class="topbar-nav-link"><i class="fa-solid fa-chevron-left"></i> ' + prev.label + '</a>'
    : '<span class="topbar-nav-link is-disabled">이전 문서 없음</span>';
  html += next
    ? '<a href="' + next.href + '" class="topbar-nav-link">' + next.label + ' <i class="fa-solid fa-chevron-right"></i></a>'
    : '<span class="topbar-nav-link is-disabled">다음 문서 없음</span>';
  host.innerHTML = html;
}

/* ============================ 공통 인터랙션 ============================= */
function toggleSidebar() {
  var sb = document.getElementById('app-sidebar');
  if (!sb) return;
  sb.classList.toggle('collapsed');
  var btn = document.getElementById('sidebar-toggle-btn');
  if (btn) btn.style.display = sb.classList.contains('collapsed') ? 'flex' : 'none';
  // 접히면서 생긴 폭만큼 기획서가 곧바로 커지도록 전환 내내 다시 잰다
  if (typeof _vpRelayout === 'function') _vpRelayout();
}

/* ======================= 화면 전환 (클릭 전용) ==========================
   한 문서에 화면이 여러 개여도 한 번에 하나만 보여준다. 스크롤로 넘기지 않는다.
     canvas : <div class="canvas-section" id="mypage01" data-screen data-screen-label="…">
     명세   : <div class="spec-group" data-screen-for="mypage01">
   좌측 2뎁스 메뉴 · 캔버스 위 스위처 · URL 해시가 모두 같은 상태를 가리킨다.
   ====================================================================== */
var _screens = [];
var _screenId = '';

function _activeScreen() { return _screenId; }

function _collectScreens() {
  var nodes = document.querySelectorAll('[data-screen]');
  if (!nodes.length) nodes = document.querySelectorAll('.canvas-section[id]');

  var out = [];
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var id = el.id || el.getAttribute('data-screen');
    if (!id) continue;

    var label = el.getAttribute('data-screen-label');
    var code = el.getAttribute('data-screen-code');
    if (!label) {
      var t = el.querySelector('.section-title');
      label = t ? t.textContent.replace(/\s+/g, ' ').trim() : id;
    }
    out.push({
      id: id,
      label: label,
      code: code || '',
      section: el,
      spec: document.querySelector('[data-screen-for="' + id + '"]')
    });
  }
  return out;
}

function showScreen(id, opts) {
  if (!_screens.length) return;

  var found = null;
  for (var i = 0; i < _screens.length; i++) {
    if (_screens[i].id === id) { found = _screens[i]; break; }
  }
  if (!found) found = _screens[0];
  _screenId = found.id;

  _screens.forEach(function (s) {
    var on = (s === found);
    s.section.classList.toggle('is-hidden', !on);
    if (s.spec) s.spec.classList.toggle('is-hidden', !on);
  });

  /* MO 뷰에서도 같은 화면 하나만 보여준다 */
  document.querySelectorAll('[data-mo-for]').forEach(function (el) {
    el.classList.toggle('is-hidden', el.getAttribute('data-mo-for') !== found.id);
  });

  document.querySelectorAll('.screen-btn').forEach(function (b) {
    b.classList.toggle('active', b.getAttribute('data-screen-btn') === found.id);
  });
  _syncSubNav();

  if (!opts || opts.setHash !== false) {
    if (window.location.hash !== '#' + found.id) {
      history.replaceState(null, '', '#' + found.id);
    }
  }

  // 화면을 갈아끼우면 캔버스 높이가 달라진다
  if (typeof _vpApply === 'function') _vpApply();
  if (typeof _moApply === 'function') _moApply();

  // 스크롤로 넘기는 게 아니라 갈아끼우는 것이므로 항상 위에서 시작한다
  var body = document.querySelector('.app-content-body');
  if (body && (!opts || opts.scrollTop !== false)) body.scrollTop = 0;

  if (typeof _admOnScreen === 'function') _admOnScreen();
}

function _buildScreenSwitcher() {
  if (_screens.length < 2) return;

  var bar = document.createElement('div');
  bar.className = 'screen-switcher';

  _screens.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'screen-btn';
    b.setAttribute('data-screen-btn', s.id);
    b.title = (s.code ? s.code + ' · ' : '') + s.label;   // 말줄임 된 라바을 hover 로 보여 준다
    b.innerHTML = (s.code ? '<span class="sid">' + s.code + '</span>' : '') +
                  '<span>' + s.label + '</span>';
    b.addEventListener('click', function () { showScreen(s.id); });
    bar.appendChild(b);
  });

  // 캔버스가 아니라 상단바에 붙인다. 기획서 영역에는 도구 UI를 얹지 않는다.
  var host = document.querySelector('.topbar-left-zone') ||
             document.querySelector('.app-topbar');
  if (host) host.appendChild(bar);
}

function initScreens() {
  _screens = _collectScreens();
  if (!_screens.length) return;

  _buildScreenSwitcher();

  var fromHash = (window.location.hash || '').replace('#', '');
  showScreen(fromHash || _screens[0].id, { setHash: false, scrollTop: false });

  // 좌측 2뎁스 메뉴에서 같은 문서의 다른 화면을 누른 경우
  window.addEventListener('hashchange', function () {
    var id = (window.location.hash || '').replace('#', '');
    if (id) showScreen(id, { setHash: false });
  });
}

/* ========================= 뷰포트 전환 (PC 기준) =========================
   와이어프레임은 실제 뷰포트 폭 그대로 그리고, 화면에 다 안 들어가면 축소해서 보여준다.
   각 문서의 HTML은 건드리지 않는다 — .canvas-card를 찾아 런타임에 감싼다.

     .canvas-card
       └ .canvas-header      (있으면 축소 대상에서 제외)
       └ .vp-stage           (칸 폭에 맞춰 잘라내는 무대)
           └ .vp-frame       (width = 뷰포트 폭, transform: scale)
   ====================================================================== */
var VIEWPORTS_PC = [2560, 1920, 1440];
var VIEWPORTS_MO = [1024, 360];
var VIEWPORTS = VIEWPORTS_PC.concat(VIEWPORTS_MO);
var VP_DEFAULT = 1440;
var VP_MOBILE_MAX = 768;      // 이 아래는 모바일 취급

/* 뷰포트별 콘텐츠 컨테이너 폭.
   .wf-container / .hub-container 가 --wf-w 를 읽는다.
   1920 이상은 1600으로 묶는다 — 그 위로 더 넓히면 한 줄이 너무 길어진다. */
var VP_CONTAINER = { 360: '100%', 1024: '100%', 1440: '1400px', 1920: '1600px', 2560: '1600px' };
var VP_STORE = 'ggv_viewport';

var _vpCurrent = VP_DEFAULT;
var _vpStages = [];

function _vpRead() {
  try {
    var v = parseInt(sessionStorage.getItem(VP_STORE), 10);
    return VIEWPORTS.indexOf(v) !== -1 ? v : VP_DEFAULT;
  } catch (e) { return VP_DEFAULT; }
}
function _vpWrite(v) {
  try { sessionStorage.setItem(VP_STORE, String(v)); } catch (e) {}
}

/* .canvas-card 안쪽을 무대/프레임으로 감싼다 (헤더는 그대로 둔다) */
function _vpBuildStages() {
  var cards = document.querySelectorAll('.canvas-card');
  var respView = document.getElementById('responsive-spec-view');
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.querySelector(':scope > .vp-stage')) continue;
    if (respView && respView.contains(card)) continue;   // 모바일 뷰는 원래 폭 그대로 둔다

    var stage = document.createElement('div');
    stage.className = 'vp-stage';
    var frame = document.createElement('div');
    frame.className = 'vp-frame';

    var node = card.firstChild;
    while (node) {
      var next = node.nextSibling;
      var isHeader = node.nodeType === 1 && node.classList.contains('canvas-header');
      if (!isHeader) frame.appendChild(node);
      node = next;
    }
    stage.appendChild(frame);
    card.appendChild(stage);
    _vpStages.push(stage);
  }
}

/* 캔버스 가장자리 여백 비율. 1이면 사용 가능한 폭을 그대로 다 쓴다.
   0.94였을 때 좌우에 40~80px씩 빈 띠가 생겨 기획서가 좁아 보였다.
   바깥 여백은 .app-content-body 의 --canvas-padding 하나로만 준다. */
var VP_FIT = 1;
/* 확대 상한. 캔버스가 아무리 넓어도 이 배율을 넘기지 않는다 —
   1440 도안을 2배로 늘리면 실제 서비스와 인상이 달라진다. */
var VP_MAX_UP = 1.45;

/* MO 뷰의 두 기기를 한 줄에 두고, 폭이 모자라면 통째로 줄인다.
   PC 프레임과 같은 방식이지만 대상이 .mo-stage 하나다. */
function _moBuildStage() {
  var view = document.getElementById('responsive-spec-view');
  if (!view) return;
  /* 화면이 여러 개면 무대도 여러 개다 — 각각 따로 감싼다 */
  view.querySelectorAll('.mo-stage').forEach(function (stage) {
    if (stage.parentNode && stage.parentNode.classList.contains('mo-scale')) return;
    var wrap = document.createElement('div');
    wrap.className = 'mo-scale';
    stage.parentNode.insertBefore(wrap, stage);
    wrap.appendChild(stage);
  });
}

function _moApply() {
  var view = document.getElementById('responsive-spec-view');
  if (!view) return;
  var shown = 0, first = 1;
  view.querySelectorAll('.mo-scale').forEach(function (wrap) {
    var stage = wrap.firstElementChild;
    if (!stage) return;

    stage.style.transform = 'none';
    stage.style.marginLeft = '';

    var avail = wrap.clientWidth;
    if (avail <= 0) { wrap.style.height = ''; return; }   // 감춤진 화면

    var natural = stage.offsetWidth;
    if (!natural) { wrap.style.height = ''; return; }

    var sc = Math.min(1, avail / natural);
    stage.style.transform = 'scale(' + sc + ')';
    var gap = Math.max(0, (avail - natural * sc) / 2);
    if (gap > 0) stage.style.marginLeft = Math.round(gap) + 'px';
    wrap.style.height = Math.ceil(stage.offsetHeight * sc) + 'px';
    if (!shown) { first = sc; shown = 1; }
  });

  var label = document.querySelector('.vp-scale');
  if (label && !label.hidden && shown) label.textContent = Math.round(first * 100) + '%';
}

/* 좌측 메뉴 접기 · 캔버스 넓게는 0.25s 애니메이션이다.
   한 번만 재면 전환 전 폭으로 계산되고 끝난다. 전환 중·후로 여러 번 잰다. */
function _vpRelayout() {
  _vpApply();
  requestAnimationFrame(_vpApply);
  setTimeout(_vpApply, 140);
  setTimeout(_vpApply, 320);
}

function _vpApply() {
  var shown = null;
  for (var i = 0; i < _vpStages.length; i++) {
    var stage = _vpStages[i];
    var frame = stage.firstElementChild;
    if (!frame) continue;

    // 지난 실행이 무대 폭을 px로 고정해 뒀다. 그대로 재면 늘어난 공간을 영영 못 본다 —
    // 풀어주고, 폭은 무대가 아니라 바깥 칸(.canvas-section / .canvas-col)에서 잰다.
    var card = stage.parentElement;
    var host = card ? card.parentElement : null;
    stage.style.width = '';
    frame.style.width = _vpCurrent + 'px';
    frame.style.transform = 'none';
    frame.style.marginLeft = '';

    var avail = host ? host.clientWidth : stage.clientWidth;
    if (avail <= 0) { stage.style.height = ''; continue; }   // 감춰진 화면

    // 남는 폭을 흰 여백으로 두지 않는다. 모자라면 줄이고, 남으면 키운다.
    // 1440 도안을 그대로 확대하는 것이라 글자는 또렷하다(will-change 를 쓰지 않으므로).
    var s = Math.min(VP_MAX_UP, (avail * VP_FIT) / _vpCurrent);
    if (shown === null) shown = s;

    frame.style.transform = 'scale(' + s + ')';

    // 카드가 프레임을 딱 감싸도록 무대 폭을 그린 크기에 맞춘다
    var drawn = _vpCurrent * s;
    stage.style.width = Math.round(drawn) + 'px';
    stage.style.height = Math.ceil(frame.offsetHeight * s) + 'px';
  }

  var label = document.querySelector('.vp-scale');
  if (label) label.textContent = Math.round((shown === null ? 1 : shown) * 100) + '%';

  _moApply();
}

/* 모바일 폭에서: 반응형 뷰가 있으면 그걸 쓰고, 없으면 미작성이라고 알린다 */
function _vpMobileView(isMobile) {
  var pcView = document.getElementById('pc-spec-view');
  var respView = document.getElementById('responsive-spec-view');
  if (pcView && respView) {
    pcView.style.display = isMobile ? 'none' : 'grid';
    respView.style.display = isMobile ? 'block' : 'none';
    return;
  }

  var body = document.querySelector('.app-content-body') ||
             document.querySelector('.spec-workspace') ||
             (document.querySelector('.screen-spec-grid') || {}).parentNode;
  if (!body) return;
  var notice = document.getElementById('vp-notice');
  if (isMobile && !notice) {
    notice = document.createElement('div');
    notice.id = 'vp-notice';
    notice.className = 'vp-notice';
    notice.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>' +
      '<span>이 문서는 PC 기준으로만 작성돼 있습니다. 모바일 화면 설계는 ' +
      '<span class="tag tag--warn">미작성</span> 입니다 — 아래는 PC 와이어프레임을 360px 폭에 넣어본 결과입니다.</span>';
    body.insertBefore(notice, body.firstChild);
  } else if (!isMobile && notice) {
    notice.parentNode.removeChild(notice);
  }
}

function setViewport(px, opts) {
  px = parseInt(px, 10);
  if (VIEWPORTS.indexOf(px) === -1) px = VP_DEFAULT;
  _vpCurrent = px;
  _vpWrite(px);

  var buttons = document.querySelectorAll('.vp-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('active', parseInt(buttons[i].getAttribute('data-vp'), 10) === px);
  }

  document.documentElement.style.setProperty('--wf-w', VP_CONTAINER[px] || '1400px');

  _vpMobileView(_isMoViewport(px));
  // display 가 막 바뀌었으므로 레이아웃이 잡힌 뒤 한 번 더 잰다
  requestAnimationFrame(function () { _moApply(); _vpApply(); });

  // 해상도를 고른다고 명세 패널을 접지 않는다.
  // 접으면 디스크립션이 통째로 사라져 무엇을 보는 문서인지 알 수 없다.
  // 캔버스를 넓히고 싶으면 '캔버스 넓게' 버튼을 직접 누른다.
  _syncDeviceBtns();
  _vpApply();
}

/* 좌측 메뉴 · 우측 명세를 접어 캔버스를 넓히는 모드 */
function setFocusMode(on) {
  document.body.classList.toggle('vp-focus', !!on);

  var sb = document.getElementById('app-sidebar');
  if (sb) sb.classList.toggle('collapsed', !!on);
  var toggleBtn = document.getElementById('sidebar-toggle-btn');
  if (toggleBtn) toggleBtn.style.display = on ? 'flex' : 'none';

  var btn = document.querySelector('.vp-panel-btn');
  if (btn) {
    btn.classList.toggle('active', !!on);
    btn.innerHTML = on
      ? '<i class="fa-solid fa-table-columns"></i> 패널 펼치기'
      : '<i class="fa-solid fa-compress"></i> 캔버스 넓게';
  }

  // 사이드바가 0.25s에 걸쳐 접힌다. 전환이 끝난 폭으로 다시 재야 비율이 맞는다.
  _vpRelayout();
}

/* 현재 뷰포트가 MO 그룹인가 */
function _isMoViewport(px) {
  return VIEWPORTS_MO.indexOf(px) !== -1;
}

/* PC / MO 버튼 활성 상태와, 그 아래 해상도 버튼 목록을 맞춘다.
   PC → 2560 / 1920 / 1440,  MO → 1024 / 360 */
function _syncDeviceBtns() {
  var mo = _isMoViewport(_vpCurrent);
  document.querySelectorAll('.vp-dev-btn').forEach(function (b) {
    b.classList.toggle('active', (b.getAttribute('data-dev') === 'mo') === mo);
  });
  document.querySelectorAll('.vp-btn[data-vp]').forEach(function (b) {
    b.hidden = VIEWPORTS_PC.indexOf(parseInt(b.getAttribute('data-vp'), 10)) === -1;
  });

  // MO는 태블릿·모바일을 한 화면에 같이 그린다 — 고를 해상도가 없다.
  // 다만 둘을 한 줄에 넣느라 축소하므로 배율 표시는 남긴다.
  var group = document.querySelector('.vp-res-group');
  if (group) group.hidden = mo;
}

function _vpBuildUI() {
  var bar = document.createElement('div');
  bar.className = 'viewport-bar';

  // 반응형 뷰가 준비된 문서에만 PC / MO 전환을 붙인다
  if (document.getElementById('responsive-spec-view')) {
    var dev = document.createElement('div');
    dev.className = 'viewport-group';
    [['pc', 'PC', VP_DEFAULT], ['mo', 'MO', 1024]].forEach(function (d) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'vp-btn vp-dev-btn';
      b.setAttribute('data-dev', d[0]);
      b.textContent = d[1];
      b.title = d[0] === 'pc' ? 'PC 와이어프레임 + 디스크립션' : '태블릿 · 모바일 화면설계';
      b.addEventListener('click', function () { setViewport(d[2], { userInitiated: true }); });
      dev.appendChild(b);
    });
    bar.appendChild(dev);
  }

  var group = document.createElement('div');
  group.className = 'viewport-group vp-res-group';
  VIEWPORTS.forEach(function (v) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'vp-btn';
    b.setAttribute('data-vp', v);
    b.textContent = String(v);
    b.title = v + 'px 뷰포트로 보기';
    b.hidden = VIEWPORTS_PC.indexOf(v) === -1;   // 첫 화면은 PC
    b.addEventListener('click', function () { setViewport(v, { userInitiated: true }); });
    group.appendChild(b);
  });

  var scale = document.createElement('span');
  scale.className = 'vp-scale';
  scale.title = '현재 축소 배율';
  scale.textContent = '100%';

  var panelBtn = document.createElement('button');
  panelBtn.type = 'button';
  panelBtn.className = 'vp-panel-btn';
  panelBtn.innerHTML = '<i class="fa-solid fa-compress"></i> 캔버스 넓게';
  panelBtn.addEventListener('click', function () {
    setFocusMode(!document.body.classList.contains('vp-focus'));
  });

  bar.appendChild(group);
  bar.appendChild(scale);

  // 어드민 와이어프레임에만 '클릭 요소' 표시 버튼을 단다
  if (document.querySelector('.adm-canvas')) bar.appendChild(_admHitButton());

  // 디스크립션이 있는 문서에만 편집 버튼을 단다
  if (document.querySelector('.spec-card')) {
    var editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'vp-panel-btn vp-edit-btn';
    editBtn.title = '우측 디스크립션을 이 화면에서 바로 고친다';
    editBtn.innerHTML = _editBtnHtml();
    editBtn.addEventListener('click', function () { setEditMode(!_editOn); });
    bar.appendChild(editBtn);
  }

  bar.appendChild(panelBtn);

  // 기존 PC/MO 토글이 있으면 그 자리를 넘겨받는다
  var old = document.querySelector('.device-toggle-group');
  if (old) {
    old.parentNode.replaceChild(bar, old);
  } else {
    var topbar = document.querySelector('.app-topbar');
    if (topbar) topbar.appendChild(bar);
  }
}

function initViewport() {
  if (!document.querySelector('.canvas-card')) return;   // 표·리포트 문서에는 붙이지 않는다

  _vpBuildUI();
  _vpBuildStages();
  _moBuildStage();
  setViewport(_vpRead());
  _syncDeviceBtns();

  var pending = null;
  function recalc() {
    if (pending) cancelAnimationFrame(pending);
    pending = requestAnimationFrame(function () { pending = null; _vpApply(); });
  }
  window.addEventListener('resize', recalc);

  if (window.ResizeObserver) {
    // 높이를 직접 건드리는 stage는 관찰하지 않는다 — 관찰하면 콜백이 스스로를 다시 부른다.
    var ro = new ResizeObserver(recalc);
    var main = document.querySelector('.app-main');
    if (main) ro.observe(main);
    var grid = document.querySelector('.screen-spec-grid');
    if (grid) ro.observe(grid);
    _vpStages.forEach(function (st) {
      var fr = st.firstElementChild;
      if (fr) ro.observe(fr);      // 내용 높이가 바뀌면 무대 높이를 다시 잡는다
    });
  }
  // 타이머가 아니라 전환이 실제로 끝나는 시점에도 잰다 (애니메이션 시간이 바뀌어도 안전)
  var sb = document.getElementById('app-sidebar');
  if (sb) sb.addEventListener('transitionend', function (e) {
    if (e.propertyName === 'margin-left' || e.propertyName === 'width') _vpApply();
  });

  // 폰트·이미지가 늦게 들어와 높이가 바뀌는 경우
  window.addEventListener('load', recalc);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recalc);
}

/* 예전 문서가 부르던 이름 — 뷰포트 전환으로 넘긴다 */
function switchDevice(mode) {
  setViewport(mode === 'pc' ? VP_DEFAULT : 360, { userInitiated: true });
}

/* 핀 ↔ 명세 박스 연동.
   문서마다 명세 박스 id 규칙이 달라 아래 순서로 탐색한다.
     spec-pin1 → pin1 → spec-1
   신규 문서는 CLAUDE.md §5-3대로 id="spec-pN"을 쓴다. */
function _resolveSpecBox(pinId) {
  var num = String(pinId).replace(/\D/g, '');
  var candidates = ['spec-' + pinId, String(pinId), 'spec-' + num, 'spec-pin' + num, 'pin' + num];
  for (var i = 0; i < candidates.length; i++) {
    var el = document.getElementById(candidates[i]);
    if (el) return el;
  }
  return null;
}

/* 문서마다 강조 클래스명이 달라(active / highlight / highlighted) 전부 붙인다.
   각 페이지가 이미 갖고 있는 강조 스타일을 그대로 살리기 위한 것. */
var _HL_CLASSES = ['spec-is-active', 'active', 'highlight', 'highlighted'];

function _clearSpecSelection() {
  document.querySelectorAll('.spec-is-selected').forEach(function (el) {
    el.classList.remove('spec-is-selected');
  });
  document.querySelectorAll('.pin.is-selected').forEach(function (el) {
    el.classList.remove('is-selected');
  });
}

/* 와이어프레임의 핀을 누르면 해당 명세를 고른다.
   선택은 다음 핀을 누를 때까지 유지된다 — 잠깐 반짝이면 어디였는지 놓친다. */
function highlightSpec(pinId) {
  var target = _resolveSpecBox(pinId);
  if (!target) return;
  // 캔버스를 넓혀 둔 상태라면 명세를 봐야 하니 패널을 도로 펼친다
  if (document.body.classList.contains('vp-focus')) setFocusMode(false);

  _clearSpecSelection();
  document.querySelectorAll('.spec-is-active').forEach(function (el) {
    _HL_CLASSES.forEach(function (c) { el.classList.remove(c); });
  });

  target.classList.add('spec-is-selected');
  document.querySelectorAll('.pin[data-pin="' + pinId + '"]').forEach(function (el) {
    el.classList.add('is-selected');
  });

  // 짧은 플래시로 시선을 끌고, 선택 표시는 남긴다
  _HL_CLASSES.forEach(function (c) { target.classList.add(c); });
  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(function () {
    _HL_CLASSES.forEach(function (c) { target.classList.remove(c); });
  }, 1200);
}

/* 반대 방향 — 명세 카드 머리를 누르면 캔버스의 핀으로 데려간다 */
function bindSpecCardHeads() {
  document.querySelectorAll('.spec-card[id^="spec-"] .spec-card-head').forEach(function (head) {
    var card = head.closest('.spec-card');
    var pinId = card.id.replace(/^spec-/, '');
    head.style.cursor = 'pointer';
    head.addEventListener('click', function (ev) {
      if (ev.target && ev.target.isContentEditable) return;   // 편집 중엔 캠럿만 옮긴다
      var pin = document.querySelector('.pin[data-pin="' + pinId + '"][class*="pin-abs"]') ||
                document.querySelector('.canvas-col .pin[data-pin="' + pinId + '"]');
      _clearSpecSelection();
      card.classList.add('spec-is-selected');
      document.querySelectorAll('.pin[data-pin="' + pinId + '"]').forEach(function (el) {
        el.classList.add('is-selected');
      });
      if (pin) pin.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

/* 08_member.html이 쓰던 이름 */
var scrollToSpec = highlightSpec;

/* 선언형 핀 — <span class="pin" data-pin="p3">3</span> */
function bindDeclarativePins() {
  document.querySelectorAll('.pin[data-pin]').forEach(function (el) {
    var pinId = el.getAttribute('data-pin');
    /* 짝 명세가 없는 핀(예외 카드의 E 코드)은 코드 표식일 뿐이다 — 누르는 시늉을 하지 않는다 */
    if (!_resolveSpecBox(pinId)) { el.classList.add('pin--static'); return; }
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () { highlightSpec(pinId); });
  });
}

/* 비로그인 / 로그인 상태 토글 — data-state-view="out|in" */
function setStateView(state) {
  document.querySelectorAll('[data-state-view]').forEach(function (el) {
    el.style.display = (el.getAttribute('data-state-view') === state) ? '' : 'none';
  });
  document.querySelectorAll('[data-state-btn]').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-state-btn') === state);
  });
}


/* ---- 코드 블록 복사 ----------------------------------------------------
 * 가이드의 코드 블록은 읽는 것이 아니라 **복붙해 쓰는 것**이다.
 * -------------------------------------------------------------------- */
function initCodeCopy() {
  document.querySelectorAll('.code-block').forEach(function (box) {
    var head = box.querySelector('.code-block-head');
    var pre = box.querySelector('pre');
    if (!head || !pre || head.querySelector('.code-copy')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.innerHTML = '<i class="fa-regular fa-copy"></i> 복사';
    btn.addEventListener('click', function () {
      var txt = pre.textContent;
      var ok = false;
      try {
        var ta = document.createElement('textarea');
        ta.value = txt;
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        ta.remove();
      } catch (e) { ok = false; }
      if (!ok && navigator.clipboard) navigator.clipboard.writeText(txt);
      btn.innerHTML = '<i class="fa-solid fa-check"></i> 복사됨';
      setTimeout(function () { btn.innerHTML = '<i class="fa-regular fa-copy"></i> 복사'; }, 1400);
    });
    head.appendChild(btn);
  });
}

/* ---- 템플릿 ZIP 내려받기 -----------------------------------------------
 * 저장소의 살아 있는 파일을 그대로 받아 압축한다 — 미리 만든 zip 을 두면
 * 원본이 바뀔 때마다 갈라진다. 그래서 누를 때 만든다.
 * JSZip 은 00_howto.html 에서만 불러온다(spec.js 는 의존하지 않는다).
 * -------------------------------------------------------------------- */

var TPL_FILES = ['spec.css', 'spec.js', 'serve.py'];

/* 저장소의 파일 이름 → zip 안에서의 이름.
 * 표지가 index.html 이어야 압축을 풀고 바로 더블클릭할 수 있다. */
var TPL_RENAME = {
  '_template_cover.html': 'index.html',
  '_template.html': '01_screen.html'
};

function initTplDownload() {
  var btn = document.getElementById('tpl-download');
  if (!btn) return;
  var note = document.getElementById('tpl-download-note');

  function say(msg, bad) {
    if (!note) return;
    note.textContent = msg;
    note.className = 'guide-dl-note' + (bad ? ' is-bad' : '');
  }

  btn.addEventListener('click', function () {
    if (typeof JSZip === 'undefined') {
      say('압축 라이브러리를 불러오지 못했습니다. 네트워크를 확인하고 새로고침해 주세요.', true);
      return;
    }
    if (location.protocol === 'file:') {
      say('file:// 에서는 받을 수 없습니다. python serve.py 로 열어 주세요.', true);
      return;
    }
    btn.disabled = true;
    say('묶는 중…');

    var zip = new JSZip();
    var jobs = TPL_FILES.concat(Object.keys(TPL_RENAME)).map(function (f) {
      return fetch(f, { cache: 'no-store' }).then(function (r) {
        if (!r.ok) throw new Error(f + ' (' + r.status + ')');
        return r.text().then(function (t) { return [f, t]; });
      });
    });

    Promise.all(jobs).then(function (got) {
      got.forEach(function (pair) {
        var name = pair[0], text = pair[1];
        if (TPL_RENAME[name]) {
          /* 파일 이름을 바꾸면 서로 건 링크도 같이 바꿔야 한다 — 안 바꾸면 404 다.
           * 긴 이름부터 치환한다(_template_cover 가 _template 로 먼저 잘리면 깨진다). */
          Object.keys(TPL_RENAME).sort(function (a, b) { return b.length - a.length; })
            .forEach(function (from) { text = text.split(from).join(TPL_RENAME[from]); });
          name = TPL_RENAME[name];
        }
        zip.file(name, text);
      });
      zip.file('README.md', TPL_README);
      return zip.generateAsync({ type: 'blob' });
    }).then(function (blob) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '기획서-템플릿.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      say('내려받았습니다 — 압축을 풀고 그 폴더에서 Claude Code 를 열어 아래 프롬프트를 붙이세요.');
    }).catch(function (e) {
      say('실패: ' + String(e.message || e), true);
    }).then(function () {
      btn.disabled = false;
    });
  });
}

var TPL_README = [
  '# 기획서 템플릿',
  '',
  '## 시작',
  '',
  '1. `index.html` 을 열어 봅니다 — 표지가 스타일 그대로 떠 있습니다.',
  '   **파일을 더블클릭해도 보입니다. 서버를 띄울 필요 없습니다.**',
  '2. 이 폴더에서 Claude Code 를 열고 아래 프롬프트를 붙입니다.',
  '',
  '- `spec.css` · `spec.js` — 그대로 씁니다',
  '- `index.html` — **표지.** 프로젝트 개요 · 개정 이력 · 정보 구조(IA) 세 표가 들어 있습니다',
  '- `01_screen.html` — **화면 한 장.** 와이어프레임 + 명세 카드 + 예외 케이스 한 벌.',
  '  이 파일을 복사해 `02_`, `03_` 으로 늘립니다',
  '- `serve.py` — **선택.** 브라우저에서 디스크립션을 직접 고치거나',
  '  저장소에 바로 커밋할 때만 씁니다 (`python serve.py` → localhost:8080)',
  '',
  '두 HTML 의 `<head>` 에 문서 목록(`DOC_TREE_OVERRIDE`)이 같은 내용으로 들어 있습니다.',
  '**한쪽만 고치면 문서를 오갈 때 좌측 메뉴가 서로 달라집니다.**',
  '문서가 서너 개를 넘으면 두 곳에서 지우고 `spec.js` 의 `DOC_TREE` 로 옮기세요.',
  '',
  '## Claude Code 프롬프트',
  '',
  '```',
  '이 폴더를 기준 스타일로 삼아 [프로젝트명] 기획서를 만들어줘.',
  'index.html 이 표지(개요 · 개정 이력 · 정보 구조), 01_screen.html 이 화면 한 장이다.',
  '',
  '먼저 두 파일의 <head> 에서 프로젝트 이름과 문서 목록을 같은 내용으로 바꾸고,',
  'spec.css 의 --brand-primary 를 [브랜드 색]으로 바꿔줘.',
  '',
  '- spec.css / spec.js 는 그 밖에는 고치지 않는다',
  '- 표지의 정보 구조(IA) 표를 먼저 채운다. 안 그린 화면도 행은 먼저 만들고 예정으로 둔다',
  '- 화면 하나 = canvas-section + 짝 spec-group. 핀 번호로 잇는다',
  '- 명세는 카드 1장 = 핀 1개, 카드당 4~7줄, 한 줄에 규칙 하나',
  '- 형용사만으로 된 명세를 쓰지 않는다 (직관적 · 심플하게 · 가독성 있게 금지).',
  '  개발자가 그대로 구현할 수 있는 조건문으로 쓴다',
  '- 0건 · 오류 · 완료처럼 평소에 안 보이는 상태는 화면 맨 아래 case-zone 으로 뺀다',
  '- 샘플 값은 대괄호 자리표시 대신 실제 길이의 값으로 채운다',
  '- 미확정 항목은 임의로 정하지 말고 확정 필요 태그와 담당 팀을 적는다',
  '- 태블릿 1024 · 모바일 360 도 같이 그린다. PC 에 있는 내용은 모두 들어가야 한다',
  '',
  '먼저 1차 메뉴(IA)를 정하고, 화면 하나를 끝까지 완성한 뒤 다음으로 넘어가줘.',
  '```',
  ''
].join('\n');

/* ====================== 프로토타입 인터랙션 ============================= *
 * 와이어프레임은 그림이지만, **고르고 넘기고 여는 것**은 실제로 되게 한다.
 * 리뷰에서 "이걸 누르면 어떻게 되냐"는 질문이 가장 많고, 눌러 보면 그 질문이
 * 사라진다. 대신 아래 선을 넘지 않는다 —
 *
 *   - 화면을 떠나지 않는다 (링크 이동은 원래 있던 것만)
 *   - 없는 데이터를 만들지 않는다. 셀렉트는 `data-opts` 가 있을 때만 열린다
 *   - 편집 모드에서는 전부 쉰다 (contenteditable 과 싸우지 않게)
 * ---------------------------------------------------------------------- */

/* 한 그룹에서 하나만 켜지는 것들 — 칩 · 프리셋 · 결제수단 · 인증수단 */
var PROTO_PICK = [
  '.bl-chip', '.nw-chip', '.sp-chip', '.mp-chip', '.mo-chip',
  '.mo-chip-row > span', '.mo-tabs > span',
  '.bl-amt', '.bl-pay', '.mo-amt', '.mo-pay',
  '.mp-method', '.nw-evt-tab', '.hub-filter-btn'
].join(', ');

/* 켜짐 표시가 .on 이 아닌 것들 */
var PROTO_ON = { 'hub-filter-btn': 'active' };

function _protoKey(el) {
  /* 상태 클래스는 빼고 본다 — 칩은 활성일 때만 class="on" 이라
   * 첫 클래스로 비교하면 켜진 칩과 꺼진 칩이 형제로 묶이지 않는다 */
  return el.className.split(' ').filter(function (c) {
    return c && c !== 'on' && c !== 'active' && c !== 'off' && c !== 'dim';
  })[0] || '';
}

function _protoSiblings(el) {
  var box = el.parentElement;
  if (!box) return [el];
  var key = _protoKey(el);
  return Array.prototype.filter.call(box.children, function (c) {
    return c.tagName === el.tagName && _protoKey(c) === key;
  });
}

function _protoBusy() {
  return document.body.classList.contains('spec-editing');
}

/* ---- 셀렉트 드롭다운 ---- */
function _protoCloseMenus(except) {
  document.querySelectorAll('.proto-menu').forEach(function (m) {
    if (m !== except) m.remove();
  });
  document.querySelectorAll('.is-open').forEach(function (e) { e.classList.remove('is-open'); });
}

function _protoOpenSelect(sel) {
  var opts = (sel.getAttribute('data-opts') || '').split('|').filter(Boolean);
  if (!opts.length) { sel.classList.add('is-focus'); return; }   // 데이터가 없으면 열지 않는다
  _protoCloseMenus();
  var cur = sel.textContent.replace(/\s+/g, ' ').trim();
  var menu = document.createElement('div');
  menu.className = 'proto-menu';
  menu.innerHTML = opts.map(function (o) {
    return '<span class="proto-opt' + (o === cur ? ' on' : '') + '">' + o + '</span>';
  }).join('');
  sel.classList.add('is-open');
  sel.appendChild(menu);
  menu.addEventListener('click', function (e) {
    var o = e.target.closest('.proto-opt');
    if (!o) return;
    e.stopPropagation();
    var icon = sel.querySelector('i');
    sel.textContent = o.textContent + ' ';
    if (icon) sel.appendChild(icon);
    sel.classList.remove('is-open');
    menu.remove();
  });
}

/* ---- 페이지네이션 ---- */
function _protoPaging(el) {
  var box = el.parentElement;
  var nums = Array.prototype.filter.call(box.children, function (c) {
    return /^\d+$/.test(c.textContent.trim());
  });
  if (!nums.length) return;
  var txt = el.textContent.trim();
  var cur = nums.findIndex(function (n) { return n.classList.contains('on'); });
  var to = cur;
  if (/^\d+$/.test(txt)) to = nums.indexOf(el);
  else if (/[<‹«]|이전|prev/i.test(txt)) to = Math.max(0, cur - 1);
  else if (/[>›»]|다음|next/i.test(txt)) to = Math.min(nums.length - 1, cur + 1);
  else return;
  if (to === cur || to < 0) return;
  nums.forEach(function (n) { n.classList.remove('on'); });
  nums[to].classList.add('on');
  /* 목록 맨 위로 — 실제 게시판과 같게 */
  var list = box.previousElementSibling;
  if (list && list.scrollIntoView) list.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initPrototype() {
  document.addEventListener('click', function (e) {
    if (_protoBusy()) return;
    if (e.target.closest && e.target.closest('.adm-canvas, .adm-modal')) return;   // 어드민 그림은 initAdminProto 가 맡는다

    /* 열린 메뉴 밖을 누르면 닫는다 */
    if (!e.target.closest('.proto-menu')) _protoCloseMenus(null);

    /* 1) 셀렉트 */
    var sel = e.target.closest('.bl-select, .nw-select, .sp-select, .mp-select, .mo-select, .tp-input');
    if (sel && !e.target.closest('.proto-menu')) {
      if (sel.classList.contains('is-open')) { _protoCloseMenus(null); return; }
      _protoOpenSelect(sel);
      return;
    }

    /* 2) 입력 칸 — 포커스 표시만 */
    var inp = e.target.closest('.bl-input, .nw-input, .sp-input, .mb-input, .mp-input, .mo-input, .mo-textarea, .sp-textarea');
    if (inp) {
      document.querySelectorAll('.is-focus').forEach(function (x) { x.classList.remove('is-focus'); });
      inp.classList.add('is-focus');
      return;
    }

    /* 3) 한 그룹에서 하나만 */
    var pick = e.target.closest(PROTO_PICK);
    if (pick && !pick.classList.contains('off')) {
      var flag = PROTO_ON[_protoKey(pick)] || 'on';
      _protoSiblings(pick).forEach(function (s) { s.classList.remove(flag); });
      pick.classList.add(flag);
      return;
    }

    /* 4) 체크박스 */
    var chk = e.target.closest('.mb-check, .bl-check, .mp-check, .sp-check');
    if (chk) { chk.classList.toggle('on'); return; }
    var row = e.target.closest('.mb-agree-row, .mb-agree-all, .bl-agree-row, .sp-agree-row, .sp-bot');
    if (row) {
      var box = row.querySelector('.mb-check, .bl-check, .sp-check');
      if (box) {
        box.classList.toggle('on');
        /* 전체 동의 — 같은 묶음 전부 */
        if (row.classList.contains('mb-agree-all')) {
          var all = box.classList.contains('on');
          row.parentElement.querySelectorAll('.mb-agree-row .mb-check').forEach(function (b) {
            b.classList.toggle('on', all);
          });
        }
      }
      return;
    }

    /* 5) 페이지네이션 */
    var pg = e.target.closest('.bl-page, .nw-page, .sp-page, .mp-page, .mo-paging > span');
    if (pg) { _protoPaging(pg); return; }

    /* 6) FAQ 아코디언 — 열린 것은 하나만 */
    var faq = e.target.closest('.sp-faq');
    if (faq) {
      var open = faq.classList.contains('on');
      var list = faq.parentElement;
      list.querySelectorAll('.sp-faq').forEach(function (q) {
        q.classList.remove('on');
        var a = q.nextElementSibling;
        if (a && a.classList.contains('sp-answer')) a.classList.remove('is-open');
        var ar = q.querySelector('.sp-faq-arrow i');
        if (ar) { ar.classList.remove('fa-chevron-up'); ar.classList.add('fa-chevron-down'); }
      });
      if (!open) {
        faq.classList.add('on');
        var ans = faq.nextElementSibling;
        if (ans && ans.classList.contains('sp-answer')) ans.classList.add('is-open');
        var a2 = faq.querySelector('.sp-faq-arrow i');
        if (a2) { a2.classList.remove('fa-chevron-down'); a2.classList.add('fa-chevron-up'); }
      }
      return;
    }

    /* 7) 태블릿 · 모바일 햄버거 → 메뉴 서랍 */
    var burger = e.target.closest('.mo-burger');
    if (burger) {
      var frame = burger.closest('.mo-frame');
      var dr = frame && frame.querySelector('.mo-drawer');
      if (dr) dr.classList.toggle('is-open');
      return;
    }
    var dim = e.target.closest('.mo-drawer-dim, .mo-drawer-close');
    if (dim) {
      var d2 = dim.closest('.mo-drawer');
      if (d2) d2.classList.remove('is-open');
      return;
    }
  });

  /* 키보드 — 열린 메뉴 · 서랍 닫기 */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || _protoBusy()) return;
    _protoCloseMenus(null);
    document.querySelectorAll('.mo-drawer.is-open').forEach(function (d) { d.classList.remove('is-open'); });
  });
}

/* ====================== 어드민 와이어프레임 (adm-*) ====================== *
 * 어드민 기획서(좌측 ADMIN 그룹)만 쓴다. FRONT 문서에는 .adm-canvas 가 없어
 * 아래는 아무 일도 하지 않는다.
 *
 * 좌측 메뉴 · 브레드크럼은 ADM_NAV 한 곳에서 그린다. 문서 9개 · 화면 50개가
 * 메뉴 마크업을 각자 들고 있으면 반드시 어긋난다(§4 사이드바 사고와 같다).
 *   <div class="adm-left" data-adm-nav="mem.list"></div>        활성 메뉴 키
 *   <div class="adm-crumb" data-adm-crumb="회원 상세"></div>      메뉴 아래 화면이면 끝 토큰
 *
 * 클릭 동작은 속성으로 건다 — 문서에 onclick 을 쓰지 않는다.
 *   href="#mem02" · href="12_adm_billing.html#pay01"   화면 이동(평범한 링크)
 *   data-adm-modal="dlg-mem01-excel"   예외 존 카드에 그려 둔 .adm-dialog 를 복제해 띄운다
 *   data-adm-close                     모달 닫기
 *   data-adm-toast="문구"               토스트 (data-adm-toast-type="warn" 이면 경고)
 *   data-adm-set="st-mem02:stop"       상태 상자 값 바꾸기. "a|b" 는 번갈아, 공백으로 여러 개
 *   data-adm-go="#mem03"               처리 뒤 이동 (토스트는 이동한 화면에 뜬다)
 *   data-adm-fold="acc-mem02-log"      펼치기 · 접기 (data-adm-fold-label="펼치기|접기")
 *   data-adm-tab="tpl"                 같은 화면 안 탭 → [data-adm-panel="tpl"]
 *   data-adm-move="up|down|top"        표 행 순서 바꾸기 (.adm-ord 칸 번호를 다시 매긴다)
 *   data-adm-all                       머리 체크박스 — 같은 표의 체크박스 전부
 * 상태 상자: <div id="st-mem02" data-adm-state="normal"> … <b data-adm-when="stop"> …
 * 저절로 되는 것: .adm-select[data-opts] 드롭다운 · .adm-radio · .adm-check · .adm-switch ·
 *   .adm-lang-tab · .adm-seg > span · .adm-page · .adm-group-head · 입력 칸 포커스
 *
 * 선은 FRONT 프로토타입과 같다 — 없는 데이터를 만들지 않는다(바뀐 상태는 문서에 미리
 * 그려 둔 것을 보여 줄 뿐이다), 편집 모드에서는 전부 쉰다, 예외 존 그림은 누르지 않는다.
 * ---------------------------------------------------------------------- */
var ADM_NAV = [
  { code: 'MEM', icon: 'fa-user', groups: [
    { label: '회원 관리', items: [
      { key: 'mem.list',  label: '회원 목록',      href: '10_adm_member.html#mem01' },
      { key: 'mem.stop',  label: '이용 정지 관리', href: '10_adm_member.html#mem03' },
      { key: 'mem.msg',   label: '개인 메시지',    href: '10_adm_member.html#mem05' },
      { key: 'mem.login', label: '로그인 기록',    href: '10_adm_member.html#mem07' }
    ] },
    { label: '본인인증', items: [
      { key: 'idv.phone', label: '휴대폰 인증 기록', href: '11_adm_identity.html#idv01' },
      { key: 'idv.mid',   label: 'MID 인증 기록',   href: '11_adm_identity.html#idv02' }
    ] }
  ] },
  { code: 'CS', icon: 'fa-headset', groups: [
    { label: '고객지원', items: [
      { key: 'cs.list',  label: '1:1 문의',          href: '14_adm_support.html#cs01' },
      { key: 'cs.proxy', label: '문의 대리 등록',     href: '14_adm_support.html#cs03' },
      { key: 'cs.tpl',   label: '답변 템플릿 · 유형', href: '14_adm_support.html#cs04' }
    ] }
  ] },
  { code: 'PAY', icon: 'fa-sack-dollar', groups: [
    { label: '결제 관리', items: [
      { key: 'pay.order',  label: '충전 내역',        href: '12_adm_billing.html#pay01' },
      { key: 'pay.method', label: '결제수단 관리',    href: '12_adm_billing.html#pay03' },
      { key: 'pay.amount', label: '충전 금액 설정',   href: '12_adm_billing.html#pay04' },
      { key: 'pay.event',  label: '충전 이벤트',      href: '12_adm_billing.html#pay05' },
      { key: 'pay.test',   label: '충전 테스트 계정', href: '12_adm_billing.html#pay07' }
    ] },
    { label: '쿠폰', items: [
      { key: 'cpn.list', label: '시리얼 관리',      href: '15_adm_coupon.html#cpn01' },
      { key: 'cpn.use',  label: '시리얼 사용 조회', href: '15_adm_coupon.html#cpn03' },
      { key: 'cpn.stat', label: '수령 통계',        href: '15_adm_coupon.html#cpn04' }
    ] }
  ] },
  { code: 'WEB', icon: 'fa-globe', groups: [
    { label: '콘텐츠 관리', items: [
      { key: 'cnt.game',   label: '게임 관리',   href: '13_adm_content.html#cnt01' },
      { key: 'cnt.banner', label: '배너 관리',   href: '13_adm_content.html#cnt03' },
      { key: 'cnt.notice', label: '공지 관리',   href: '13_adm_content.html#cnt05' },
      { key: 'cnt.event',  label: '이벤트 관리', href: '13_adm_content.html#cnt07' },
      { key: 'cnt.faq',    label: 'FAQ 관리',    href: '13_adm_content.html#cnt09' }
    ] }
  ] },
  { code: 'STAT', icon: 'fa-chart-column', groups: [
    { label: '통계', items: [
      { key: 'stat.daily',   label: '일일 통계',     href: '16_adm_stats.html#stat01' },
      { key: 'stat.member',  label: '회원 통계',     href: '16_adm_stats.html#stat02' },
      { key: 'stat.billing', label: '충전 통계',     href: '16_adm_stats.html#stat03' },
      { key: 'stat.idv',     label: '본인인증 통계', href: '16_adm_stats.html#stat04' },
      { key: 'stat.cs',      label: '문의 통계',     href: '16_adm_stats.html#stat05' },
      { key: 'stat.sms',     label: 'SMS 통계',      href: '16_adm_stats.html#stat06' }
    ] }
  ] },
  { code: 'SET', icon: 'fa-gear', groups: [
    { label: '사이트 설정', items: [
      { key: 'site.maint', label: '점검 고지',     href: '17_adm_site.html#site01' },
      { key: 'site.sns',   label: '공식 SNS 채널', href: '17_adm_site.html#site02' },
      { key: 'site.hours', label: '상담 운영시간', href: '17_adm_site.html#site03' },
      { key: 'site.terms', label: '약관 관리',     href: '17_adm_site.html#site04' }
    ] },
    { label: '어드민 계정', items: [
      { key: 'acc.list', label: '계정 관리', href: '18_adm_account.html#acc01' },
      { key: 'acc.role', label: '권한 그룹', href: '18_adm_account.html#acc03' },
      { key: 'acc.log',  label: '작업 기록', href: '18_adm_account.html#acc04' }
    ] }
  ] }
];
var ADM_USER = 'GGV 운영자';
var ADM_TOAST_KEY = 'ggv_adm_toast';
var ADM_HITS_KEY = 'ggv_adm_hits';

function _admFind(key) {
  for (var i = 0; i < ADM_NAV.length; i++) {
    for (var j = 0; j < ADM_NAV[i].groups.length; j++) {
      var g = ADM_NAV[i].groups[j];
      for (var k = 0; k < g.items.length; k++) {
        if (g.items[k].key === key) return { cat: ADM_NAV[i], group: g, item: g.items[k] };
      }
    }
  }
  return null;
}

/* 같은 문서 안이면 해시만 — 다시 불러오지 않고 화면만 갈아끼운다 */
function _admHref(href) {
  var p = href.split('#');
  return (p[0] === _currentFile() && p[1]) ? '#' + p[1] : href;
}

function _admRenderLeft(el) {
  var hit = _admFind(el.getAttribute('data-adm-nav'));
  var cat = hit ? hit.cat : ADM_NAV[0];
  var h = '<div class="adm-logo">' +
            '<img class="adm-logo-img" src="gravity_logo.png" alt="GRAVITY">' +
            '<span class="adm-logo-text">Admin Tools</span><span class="adm-logo-div">|</span>' +
            '<span class="adm-lang adm-select" data-opts="KO|繁中|EN"><i class="fa-solid fa-earth-americas"></i> ' +
            '<span class="adm-sv">KO</span> <i class="fa-solid fa-chevron-down"></i></span>' +
          '</div><div class="adm-sides"><nav class="adm-primary">';
  ADM_NAV.forEach(function (c) {
    h += '<a class="adm-pnav' + (c === cat ? ' active' : '') + '" href="' + _admHref(c.groups[0].items[0].href) + '">' +
         '<i class="fa-solid ' + c.icon + '"></i>' + c.code + '</a>';
  });
  h += '</nav><div class="adm-secondary"><div class="adm-user">' + ADM_USER +
       ' <span class="adm-logout" data-adm-toast="로그아웃 — 어드민 로그인 화면으로 이동합니다">로그아웃</span></div>';
  cat.groups.forEach(function (g) {
    var open = !hit || hit.group === g;      // 지금 화면이 속한 그룹만 펼친다
    h += '<div class="adm-group"><div class="adm-group-head' + (open ? '' : ' collapsed') + '">' + g.label +
         ' <i class="fa-solid fa-chevron-' + (open ? 'up' : 'down') + '"></i></div>' +
         '<ul class="adm-group-list"' + (open ? '' : ' hidden') + '>';
    g.items.forEach(function (it) {
      h += '<li><a class="adm-group-item' + (hit && hit.item === it ? ' active' : '') + '" href="' +
           _admHref(it.href) + '">' + it.label + '</a></li>';
    });
    h += '</ul></div>';
  });
  h += '</div></div>';
  // 문서가 넣어 둔 자식(공통 셸 카드의 핀)은 살린다
  var keep = Array.prototype.slice.call(el.children);
  el.innerHTML = h;
  keep.forEach(function (k) { el.appendChild(k); });
}

function _admRenderCrumb(el) {
  var scr = el.closest('[data-screen]') || document;
  var left = scr.querySelector('.adm-left[data-adm-nav]');
  var hit = left && _admFind(left.getAttribute('data-adm-nav'));
  if (!hit) return;
  var tail = el.getAttribute('data-adm-crumb');
  var item = tail ? '<a href="' + _admHref(hit.item.href) + '">' + hit.item.label + '</a>' : hit.item.label;
  var parts = [hit.cat.code, hit.group.label, item];
  if (tail) parts.push(tail);
  el.innerHTML = parts.join(' <i class="fa-solid fa-chevron-right"></i> ');
}

/* ---- 상태 상자 ---- */
function _admApplyState(box) {
  var v = box.getAttribute('data-adm-state');
  box.querySelectorAll('[data-adm-when]').forEach(function (el) {
    // 안쪽 상태 상자에 딸린 것은 그 상자가 맡는다 (자기 자신이 상태 상자면 바깥을 본다)
    var owner = (el.hasAttribute('data-adm-state') ? el.parentElement : el).closest('[data-adm-state]');
    if (owner !== box) return;
    el.hidden = el.getAttribute('data-adm-when').split(/\s+/).indexOf(v) === -1;
  });
}

function _admSet(spec) {
  spec.split(/\s+/).forEach(function (one) {
    var i = one.indexOf(':');
    if (i < 1) return;
    var box = document.getElementById(one.slice(0, i));
    if (!box) return;
    var vals = one.slice(i + 1).split('|');
    var cur = box.getAttribute('data-adm-state');
    box.setAttribute('data-adm-state', vals.length > 1 ? (vals[0] === cur ? vals[1] : vals[0]) : vals[0]);
    _admApplyState(box);
  });
}

/* 캔버스는 축소돼 있다 — 화면 좌표를 캔버스 좌표로 되돌려 잰다 */
function _admRelTop(el, canvas) {
  var r = el.getBoundingClientRect(), c = canvas.getBoundingClientRect();
  var s = (c.height / canvas.offsetHeight) || 1;
  return (r.top - c.top) / s;
}

function _admMainCenter(canvas) {
  var main = canvas.querySelector('.adm-main');
  return main ? main.offsetLeft + main.offsetWidth / 2 : canvas.offsetWidth / 2;
}

/* ---- 토스트 ---- */
function _admToast(near, text, type, atTop) {
  var canvas = near && near.closest ? near.closest('.adm-canvas') : null;
  if (!canvas || !text) return;
  canvas.querySelectorAll('.adm-toast').forEach(function (t) { t.remove(); });
  var t = document.createElement('div');
  t.className = 'adm-toast' + (type === 'warn' ? ' warn' : '');
  var ic = document.createElement('i');
  ic.className = 'fa-solid ' + (type === 'warn' ? 'fa-circle-exclamation' : 'fa-circle-check');
  t.appendChild(ic);
  t.appendChild(document.createTextNode(text));
  canvas.appendChild(t);
  t.style.left = _admMainCenter(canvas) + 'px';
  t.style.top = Math.max(16, atTop ? 28 : _admRelTop(near, canvas) - 58) + 'px';
  setTimeout(function () { t.classList.add('out'); }, 2300);
  setTimeout(function () { t.remove(); }, 2700);
}

/* ---- 모달 ---- */
function _admCloseModals() {
  document.querySelectorAll('.adm-modal').forEach(function (m) { m.remove(); });
}

function _admOpenModal(from, id) {
  var canvas = from && from.closest ? from.closest('.adm-canvas') : null;
  if (!canvas) return;
  var src = document.getElementById(id);
  if (!src) { _admToast(from, '모달 그림이 없습니다 — ' + id, 'warn'); return; }
  _admCloseModals();
  var ov = document.createElement('div');
  ov.className = 'adm-modal';
  var dlg = src.cloneNode(true);
  dlg.removeAttribute('id');
  dlg.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
  dlg.querySelectorAll('[data-edit]').forEach(function (n) { n.removeAttribute('data-edit'); });
  dlg.querySelectorAll('.pin').forEach(function (n) { n.remove(); });
  ov.appendChild(dlg);
  canvas.appendChild(ov);
  ov._admFrom = from;
  // 캔버스가 길다 — 가운데가 아니라 누른 자리 근처에 띄운다
  var top = _admRelTop(from, canvas) - 140;
  var max = canvas.offsetHeight - dlg.offsetHeight - 24;
  dlg.style.top = Math.max(24, Math.min(top, max)) + 'px';
  dlg.style.left = _admMainCenter(canvas) + 'px';
  _admMarkHits(ov);
  try { dlg.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
}

/* ---- 처리 실행 — 모달 안 버튼이면 먼저 모달을 닫는다 ---- */
function _admRun(el) {
  var ov = el.closest('.adm-modal');
  var from = ov ? ov._admFrom : el;
  var modal = el.getAttribute('data-adm-modal');
  var set = el.getAttribute('data-adm-set');
  var toast = el.getAttribute('data-adm-toast');
  var go = el.getAttribute('data-adm-go');
  var type = el.getAttribute('data-adm-toast-type');
  if (ov) ov.remove();
  if (set) _admSet(set);
  if (modal) { _admOpenModal(from, modal); return; }
  if (go) { _admGo(go, toast, type); return; }
  if (toast) _admToast(from, toast, type);
}

function _admGo(target, toast, type) {
  var p = target.split('#');
  if (!p[0] || p[0] === _currentFile()) {
    showScreen(p[1]);
    var sec = document.getElementById(p[1]);
    var c = sec && sec.querySelector('.adm-canvas');
    if (toast && c) _admToast(c, toast, type, true);
    return;
  }
  if (toast) { try { sessionStorage.setItem(ADM_TOAST_KEY, JSON.stringify([toast, type || ''])); } catch (e) {} }
  window.location.href = target;
}

function _admFold(el) {
  var tgt = document.getElementById(el.getAttribute('data-adm-fold'));
  if (!tgt) return;
  var open = tgt.hidden;
  tgt.hidden = !open;
  el.classList.toggle('adm-expanded', open);
  var lab = el.getAttribute('data-adm-fold-label');
  var txt = el.querySelector('.adm-fold-txt');
  if (lab && txt) {
    var ls = lab.split('|');
    txt.textContent = open ? (ls[1] || ls[0]) : ls[0];
  }
}

function _admTab(el) {
  var key = el.getAttribute('data-adm-tab');
  var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) {
    return c.hasAttribute('data-adm-tab');
  });
  var keys = sibs.map(function (s) { return s.getAttribute('data-adm-tab'); });
  sibs.forEach(function (s) { s.classList.toggle('active', s === el); });
  var scope = el.closest('.adm-dialog') || el.closest('.adm-main') || document;
  scope.querySelectorAll('[data-adm-panel]').forEach(function (p) {
    var k = p.getAttribute('data-adm-panel');
    if (keys.indexOf(k) !== -1) p.hidden = (k !== key);
  });
}

function _admPaging(el) {
  var nums = Array.prototype.filter.call(el.parentElement.querySelectorAll('.adm-page'), function (c) {
    return /^\d+$/.test(c.textContent.trim());
  });
  if (!nums.length) return;
  var cur = 0;
  nums.forEach(function (n, i) { if (n.classList.contains('active')) cur = i; });
  var to = cur;
  var ic = el.querySelector('i');
  var cls = ic ? ic.className : '';
  if (/^\d+$/.test(el.textContent.trim())) to = nums.indexOf(el);
  else if (/angles-left/.test(cls)) to = 0;
  else if (/angles-right/.test(cls)) to = nums.length - 1;
  else if (/angle-left|chevron-left/.test(cls)) to = Math.max(0, cur - 1);
  else if (/angle-right|chevron-right/.test(cls)) to = Math.min(nums.length - 1, cur + 1);
  if (to === cur || to < 0) return;
  nums.forEach(function (n) { n.classList.remove('active'); });
  nums[to].classList.add('active');
}

function _admMove(el) {
  var tr = el.closest('tr');
  if (!tr) return;
  var tb = tr.parentElement;
  var how = el.getAttribute('data-adm-move');
  if (how === 'up' && tr.previousElementSibling) tb.insertBefore(tr, tr.previousElementSibling);
  else if (how === 'down' && tr.nextElementSibling) tb.insertBefore(tr.nextElementSibling, tr);
  else if (how === 'top' && tb.firstElementChild !== tr) tb.insertBefore(tr, tb.firstElementChild);
  else return;
  var n = 1;
  Array.prototype.forEach.call(tb.children, function (r) {
    var c = r.querySelector('.adm-ord');
    if (c) c.textContent = n;
    n++;
  });
  tr.classList.remove('adm-moved');
  void tr.offsetWidth;
  tr.classList.add('adm-moved');
}

function _admOpenSelect(sel) {
  var opts = (sel.getAttribute('data-opts') || '').split('|').filter(Boolean);
  _protoCloseMenus();
  if (!opts.length) { sel.classList.add('is-focus'); return; }   // 옵션이 없으면 열지 않는다
  var val = sel.querySelector('.adm-sv');
  var cur = (val ? val.textContent : sel.textContent).replace(/\s+/g, ' ').trim();
  var menu = document.createElement('div');
  menu.className = 'proto-menu adm-menu';
  opts.forEach(function (o) {
    var s = document.createElement('span');
    s.className = 'proto-opt' + (o === cur ? ' on' : '');
    s.textContent = o;
    menu.appendChild(s);
  });
  sel.classList.add('is-open');
  sel.appendChild(menu);
  menu.addEventListener('click', function (e) {
    var o = e.target.closest('.proto-opt');
    if (!o) return;
    e.stopPropagation();
    if (val) {
      val.textContent = o.textContent;
    } else {
      var tn = null;                                           // 글자 노드만 바꾼다 — 아이콘은 둔다
      for (var n = sel.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3 && n.textContent.trim()) { tn = n; break; }
      }
      if (tn) tn.textContent = o.textContent + ' ';
      else sel.insertBefore(document.createTextNode(o.textContent + ' '), sel.firstChild);
    }
    sel.classList.remove('is-open');
    menu.remove();
  });
}

/* ---- 클릭 요소 표시 ---- */
var ADM_HIT_SEL = 'a[href], [data-adm-modal], [data-adm-toast], [data-adm-set], [data-adm-go], ' +
                  '[data-adm-fold], [data-adm-tab], [data-adm-move], [data-adm-all], .adm-select[data-opts], ' +
                  '.adm-radio, .adm-check, .adm-switch, .adm-page, .adm-group-head, .adm-lang-tab, .adm-seg > span';

function _admMarkHits(root) {
  root.querySelectorAll(ADM_HIT_SEL).forEach(function (el) {
    if (el.closest('.case-zone')) return;
    el.classList.add('adm-hit');
  });
}

function _admTargetCode(href) {
  var p = href.split('#');
  var file = p[0] || _currentFile();
  var id = p[1] || '';
  if (file === _currentFile()) {
    var s = document.getElementById(id);
    var c = s && s.getAttribute('data-screen-code');
    if (c) return c;
  }
  var code = '';
  _flatDocs().forEach(function (it) {
    (it.children || []).forEach(function (ch) { if (ch.href === file + '#' + id) code = ch.id; });
  });
  return code || file.replace('.html', '') + (id ? '#' + id : '');
}

function _admHitLabel(el) {
  var out = [];
  var href = el.getAttribute('href');
  if (href && href.charAt(0) !== 'j') out.push('→ ' + _admTargetCode(href));
  if (el.hasAttribute('data-adm-modal')) {
    var d = document.getElementById(el.getAttribute('data-adm-modal'));
    var pin = d && d.closest('.case-card') && d.closest('.case-card').querySelector('.pin');
    out.push('모달' + (pin ? ' ' + pin.textContent.trim() : ''));
  }
  if (el.hasAttribute('data-adm-set')) out.push('상태');
  if (el.hasAttribute('data-adm-toast')) out.push('토스트');
  if (el.hasAttribute('data-adm-go')) out.push('→ ' + _admTargetCode(el.getAttribute('data-adm-go')));
  if (el.hasAttribute('data-adm-fold')) out.push('펼침');
  if (el.hasAttribute('data-adm-tab')) out.push('탭');
  if (el.hasAttribute('data-adm-move')) out.push('순서');
  if (el.hasAttribute('data-adm-all')) out.push('전체 선택');
  if (el.matches('.adm-select[data-opts]')) out.push('옵션 ' + el.getAttribute('data-opts').split('|').length);
  return out.join(' · ');
}

var _admTblSeq = 0;
function _admDrawHitTags() {
  document.querySelectorAll('.adm-hit-tag').forEach(function (t) { t.remove(); });
  if (!document.body.classList.contains('adm-hits')) return;
  var seen = {};
  document.querySelectorAll('.adm-canvas').forEach(function (canvas) {
    if (!canvas.offsetHeight) return;                                  // 감춘 화면
    var cr = canvas.getBoundingClientRect();
    var s = (cr.width / canvas.offsetWidth) || 1;
    canvas.querySelectorAll('.adm-hit').forEach(function (el) {
      if (!el.offsetHeight || el.closest('.adm-left')) return;           // 접힌 · 감춘 것, 좌측 메뉴는 표시만
      var lab = _admHitLabel(el);
      if (!lab) return;
      // 표 안에서는 같은 칸 · 같은 동작을 한 번만 단다 — 행마다 달면 글자가 표를 덮는다
      var cell = el.closest('tbody td');
      if (cell) {
        var tbl = cell.closest('table');
        if (!tbl._admHitId) tbl._admHitId = ++_admTblSeq;
        var k = tbl._admHitId + ':' + cell.cellIndex + ':' + lab;
        if (seen[k]) return;
        seen[k] = true;
      }
      var r = el.getBoundingClientRect();
      var tag = document.createElement('span');
      tag.className = 'adm-hit-tag';
      tag.textContent = lab;
      tag.style.left = ((r.left - cr.left) / s) + 'px';
      tag.style.top = ((r.top - cr.top) / s - 17) + 'px';
      canvas.appendChild(tag);
    });
  });
}

function _admHitButton() {
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'vp-panel-btn vp-hit-btn';
  b.title = '와이어프레임에서 누를 수 있는 요소와 누르면 일어나는 일을 표시한다';
  b.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> 클릭 요소';
  var on = false;
  try { on = sessionStorage.getItem(ADM_HITS_KEY) === '1'; } catch (e) {}
  document.body.classList.toggle('adm-hits', on);
  b.classList.toggle('active', on);
  b.addEventListener('click', function () {
    var now = !document.body.classList.contains('adm-hits');
    document.body.classList.toggle('adm-hits', now);
    b.classList.toggle('active', now);
    try { sessionStorage.setItem(ADM_HITS_KEY, now ? '1' : ''); } catch (e) {}
    _admDrawHitTags();
  });
  return b;
}

/* showScreen() 이 부른다 — 화면을 갈아끼우면 열린 모달은 닫고 표시를 다시 단다 */
function _admOnScreen() {
  if (!document.querySelector('.adm-canvas')) return;
  _admCloseModals();
  _protoCloseMenus();
  setTimeout(_admDrawHitTags, 0);
}

/* 부팅 1 — 화면 전환 전에 그린다 (높이를 재기 전에 메뉴가 있어야 한다) */
function initAdminShell() {
  if (!document.querySelector('.adm-canvas')) return;
  document.querySelectorAll('.adm-left[data-adm-nav]').forEach(_admRenderLeft);
  document.querySelectorAll('.adm-crumb[data-adm-crumb]').forEach(_admRenderCrumb);
  document.querySelectorAll('[data-adm-state]').forEach(_admApplyState);
  document.querySelectorAll('[data-adm-tab].active').forEach(_admTab);
}

/* 부팅 2 — 클릭 */
function initAdminProto() {
  if (!document.querySelector('.adm-canvas')) return;
  document.querySelectorAll('.adm-canvas').forEach(_admMarkHits);

  var ADM_PICK = '.adm-radio, .adm-lang-tab, .adm-seg > span';
  var ADM_ACT = '[data-adm-modal], [data-adm-toast], [data-adm-set], [data-adm-go], [data-adm-close]';

  document.addEventListener('click', function (e) {
    if (_protoBusy()) return;
    var t = e.target;
    if (!t || !t.closest) return;
    var ov = t.closest('.adm-modal');
    var canvas = t.closest('.adm-canvas');
    if (!ov && (!canvas || t.closest('.case-zone'))) return;
    if (t.closest('.pin') || t.closest('.proto-menu')) return;

    /* 1) 셀렉트 — 다시 누르면 닫는다 */
    var sel = t.closest('.adm-select');
    var wasOpen = sel && sel.classList.contains('is-open');
    _protoCloseMenus();
    if (sel) {
      if (!wasOpen) _admOpenSelect(sel);
      return;
    }

    if (t.closest('.off')) return;                                    // 잠긴 버튼

    /* 2) 모달 바깥(어두운 곳)을 누르면 닫는다 */
    if (ov && t === ov) { ov.remove(); return; }

    /* 3) 입력 칸 — 포커스 표시만 */
    var inp = t.closest('.adm-input, .adm-control, .adm-textarea, .adm-editor-area');
    if (inp && !inp.closest(ADM_ACT)) {
      document.querySelectorAll('.is-focus').forEach(function (x) { x.classList.remove('is-focus'); });
      inp.classList.add('is-focus');
      return;
    }

    /* 4) 그룹 접기 */
    var gh = t.closest('.adm-group-head');
    if (gh) {
      var list = gh.nextElementSibling;
      if (list) {
        list.hidden = !list.hidden;
        gh.classList.toggle('collapsed', list.hidden);
        var gi = gh.querySelector('i');
        if (gi) gi.className = 'fa-solid fa-chevron-' + (list.hidden ? 'down' : 'up');
      }
      _admDrawHitTags();
      return;
    }

    /* 5) 고르기 · 체크 · 토글 — 상태 변경 · 토스트가 달려 있으면 이어서 */
    var pick = t.closest(ADM_PICK);
    if (pick) {
      _protoSiblings(pick).forEach(function (s) { s.classList.remove('on'); });
      pick.classList.add('on');
      if (pick.matches(ADM_ACT)) _admRun(pick);
      _admDrawHitTags();
      return;
    }
    var chk = t.closest('.adm-check');
    if (chk) {
      chk.classList.toggle('on');
      if (chk.hasAttribute('data-adm-all')) {
        var box = chk.closest('table') || chk.closest('.adm-main');
        if (box) box.querySelectorAll('.adm-check').forEach(function (c) {
          c.classList.toggle('on', chk.classList.contains('on'));
        });
      }
      if (chk.matches(ADM_ACT)) _admRun(chk);
      return;
    }
    var sw = t.closest('.adm-switch');
    if (sw) {
      sw.classList.toggle('on');
      if (sw.matches(ADM_ACT)) _admRun(sw);
      _admDrawHitTags();
      return;
    }

    /* 6) 페이지 · 순서 · 탭 · 펼치기 */
    var pg = t.closest('.adm-page');
    if (pg) { _admPaging(pg); return; }
    var mv = t.closest('[data-adm-move]');
    if (mv) { _admMove(mv); _admDrawHitTags(); return; }
    var tab = t.closest('[data-adm-tab]');
    if (tab) { _admTab(tab); _admDrawHitTags(); return; }
    var fold = t.closest('[data-adm-fold]');
    if (fold) { _admFold(fold); _admDrawHitTags(); return; }

    /* 7) 처리 — 모달 · 상태 · 토스트 · 이동 */
    var act = t.closest(ADM_ACT);
    if (act) {
      if (act.tagName === 'A') e.preventDefault();
      _admRun(act);
      setTimeout(_admDrawHitTags, 0);
      return;
    }

    /* 8) 모달 안 링크 — 이동하면서 모달은 닫는다 */
    if (ov && t.closest('a[href]')) ov.remove();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') _admCloseModals();
  });

  /* 다른 문서로 넘어오면서 남긴 토스트 */
  try {
    var saved = sessionStorage.getItem(ADM_TOAST_KEY);
    if (saved) {
      sessionStorage.removeItem(ADM_TOAST_KEY);
      var v = JSON.parse(saved);
      var cur = document.querySelector('[data-screen]:not(.is-hidden) .adm-canvas');
      if (cur) _admToast(cur, v[0], v[1], true);
    }
  } catch (e) {}

  setTimeout(_admDrawHitTags, 0);
  window.addEventListener('load', _admDrawHitTags);
}

/* ========================= 디스크립션 편집 ============================== *
 * 기획서를 브라우저에서 바로 고친다. 고친 값은 이 브라우저(localStorage)에
 * 남고, `내보내기`로 원본 HTML에 반영할 목록을 뽑는다.
 *
 * 저장 단위는 블록이다 — li 하나가 아니라 그 li 를 담은 ul 전체를 저장한다.
 * 줄을 추가·삭제해도 뒤 항목의 주소가 밀리지 않기 때문이다.
 * ---------------------------------------------------------------------- */

var EDIT_SEL = [
  '.spec-card .spec-card-title',
  '.spec-card .spec-list li',
  '.case-card .case-title',
  '.case-card .case-when',
  '.case-card .case-lead',
  '.case-zone-desc',
  '.hub-subvisual h2',
  '.hub-subvisual p',
  '.mo-subvisual h4',
  '.mo-subvisual p'
].join(', ');

var EDIT_STORE = 'ggv_spec_edit:' + _currentFile();

/* 편집 잠금 비밀번호.
   §4-2 문서 암호화 비밀번호와 **다른 것**이다 — 그쪽은 저장소에 적지 않지만,
   이것은 실수로 문서를 고치는 것을 막는 UI 가드라서 평문으로 둔다.
   바꿀 때는 이 한 줄만 고친다. */
var EDIT_PASS = '1234';
var EDIT_UNLOCK = 'ggv_spec_edit_ok';

var _editOn = false;
var _editMap = {};
var _editTimer = null;
var _editState = '';      // '' | 'saved' | 'fail'
var _editStampTxt = '';

function _editLoad() {
  try { _editMap = JSON.parse(localStorage.getItem(EDIT_STORE) || '{}') || {}; }
  catch (e) { _editMap = {}; }
}

function _editStamp() {
  var d = new Date();
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
}

function _editPersist() {
  try {
    if (Object.keys(_editMap).length) localStorage.setItem(EDIT_STORE, JSON.stringify(_editMap));
    else localStorage.removeItem(EDIT_STORE);
    _editState = 'saved';
    _editStampTxt = _editStamp();
    return true;
  } catch (e) {
    /* 시크릿 창 · 저장소 차단 · 용량 초과 — 조용히 넘기지 않고 하단 바에 알린다 */
    _editState = 'fail';
    return false;
  }
}

/* 대기 중인 저장을 지금 끝낸다 — 탭을 닫거나 숨길 때 부른다 */
function _editFlush() {
  if (_editTimer) { clearTimeout(_editTimer); _editTimer = null; }
  if (Object.keys(_editMap).length) { _editPersist(); _editSyncBar(); }
}

function _indexIn(el) {
  var p = el.parentNode;
  return p ? Array.prototype.indexOf.call(p.children, el) : 0;
}

/* 이 요소의 변경을 어느 블록으로 저장할지 정한다 → [키, 저장할 요소]
   소스에 심어 둔 `data-edit` 이 있으면 그걸 주소로 쓴다 — 그래야 원본 HTML 을
   그 자리에서 정확히 고칠 수 있다(저장소 커밋). 없으면 예전 방식으로 떨어진다. */
function _editBlock(el) {
  var owner = el.closest('[data-edit]');
  if (owner) return [owner.getAttribute('data-edit'), owner];

  var scr = el.closest('[data-screen]');
  var grp = el.closest('.spec-group');
  var sid = scr ? scr.id : (grp ? grp.getAttribute('data-screen-for') : 'doc');

  var ul = el.closest('.spec-list');
  if (ul) {
    var card = ul.closest('.spec-card');
    return ['list:' + (card && card.id ? card.id : sid), ul];
  }
  if (el.classList.contains('spec-card-title')) {
    var c2 = el.closest('.spec-card');
    return ['title:' + (c2 && c2.id ? c2.id : sid), el];
  }
  var cc = el.closest('.case-card');
  if (cc) {
    var pinEl = cc.querySelector('.pin[data-pin]');
    var pid = pinEl ? pinEl.getAttribute('data-pin') : sid + ':' + _indexIn(cc);
    var kind = el.classList.contains('case-title') ? 'ctitle'
             : el.classList.contains('case-when') ? 'cwhen' : 'clead';
    return [kind + ':' + pid, el];
  }
  if (el.classList.contains('case-zone-desc')) return ['zonedesc:' + sid, el];
  if (el.closest('.hub-subvisual') || el.closest('.mo-subvisual'))
    return ['head:' + sid + ':' + el.tagName.toLowerCase(), el];
  return ['misc:' + sid + ':' + _indexIn(el), el];
}

/* 저장된 값을 DOM 에 되돌린다 — 편집 모드와 무관하게 항상 적용한다 */
function _editRestore() {
  var done = [], stale = 0;
  document.querySelectorAll(EDIT_SEL).forEach(function (el) {
    var b = _editBlock(el), key = b[0], host = b[1];
    if (!(key in _editMap)) return;
    if (done.indexOf(host) !== -1) return;
    _editMap[key] = _editClean(_editMap[key]);   // 이전 버전이 남긴 오염을 여기서 지운다
    /* 원본이 이미 같은 값이면 이 항목은 할 일이 없다 — 버린다.
       커밋이 끝난 뒤에도 `수정 N곳` 이 영영 남던 원인이다.
       내가 Claude Code 로 같은 문장을 고쳐 둔 경우도 여기서 정리된다. */
    if (_editMap[key] === _editClean(host.innerHTML)) { delete _editMap[key]; stale++; return; }
    host.innerHTML = _editMap[key];
    host.classList.add('spec-edited');
    done.push(host);
  });
  if (stale) _editPersist();
  return done.length;
}

/* 저장값에서 편집용 속성을 걷어낸다.
   contenteditable 이 그대로 저장되면 원본 HTML 에 박혀, 비밀번호 없이도
   누구나 그 줄을 고칠 수 있게 된다 — 실제로 그 사고가 있었다(4afaa60). */
function _editClean(html) {
  var box = document.createElement('div');
  box.innerHTML = String(html);
  var kill = ['contenteditable', 'data-spec-edit', 'spellcheck'];
  box.querySelectorAll('*').forEach(function (el) {
    kill.forEach(function (a) { el.removeAttribute(a); });
    if (el.classList) {
      el.classList.remove('spec-edited');
      if (!el.className) el.removeAttribute('class');
    }
  });
  var out = box.innerHTML;
  /* 줄을 지운 자리에 남는 빈 줄을 접는다 */
  while (/\n[ \t]*\n/.test(out)) out = out.replace(/\n[ \t]*\n/g, '\n');
  return out;
}

function _editSaveFrom(el) {
  if (!el) return;
  var b = _editBlock(el), key = b[0], host = b[1];
  _editMap[key] = _editClean(host.innerHTML);
  host.classList.add('spec-edited');
  clearTimeout(_editTimer);
  _editTimer = setTimeout(function () { _editPersist(); _editSyncBar(); }, 300);
  _ghSchedule();       // 저장소 커밋은 한참 뒤(대기 시간) 한 번만 묶어서 보낸다
}

function _editApplyAttrs(on) {
  document.querySelectorAll(EDIT_SEL).forEach(function (el) {
    if (on) {
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('data-spec-edit', '1');
      el.setAttribute('spellcheck', 'false');
    } else {
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-spec-edit');
      el.removeAttribute('spellcheck');
    }
  });
}

/* ---- 편집 잠금 ---- */
function _editUnlocked() {
  try { return sessionStorage.getItem(EDIT_UNLOCK) === '1'; } catch (e) { return false; }
}

function _editAskPass(onOk) {
  var prev = document.querySelector('.spec-pass-modal');
  if (prev) prev.remove();
  var ov = document.createElement('div');
  ov.className = 'spec-pass-modal';
  ov.innerHTML =
    '<div class="spm-box">' +
      '<div class="spm-head"><i class="fa-solid fa-lock"></i> 디스크립션 편집</div>' +
      '<p class="spm-desc">편집 비밀번호를 입력해 주세요. 잠금 해제는 <b>이 탭</b>에서만 유지되고, 탭을 닫으면 다시 묻습니다.</p>' +
      '<input type="password" class="spm-input" value="' + EDIT_PASS + '" autocomplete="off" spellcheck="false">' +
      '<div class="spm-err"></div>' +
      '<div class="spm-act">' +
        '<button type="button" class="seb-btn" data-act="cancel">취소</button>' +
        '<button type="button" class="seb-btn spm-ok" data-act="ok">편집 시작</button>' +
      '</div>' +
    '</div>';
  var input = ov.querySelector('.spm-input');
  var err = ov.querySelector('.spm-err');

  function submit() {
    if (input.value === EDIT_PASS) {
      try { sessionStorage.setItem(EDIT_UNLOCK, '1'); } catch (e) { /* 세션 저장이 막혀도 이번 동작은 진행한다 */ }
      ov.remove();
      onOk();
      return;
    }
    err.textContent = '비밀번호가 맞지 않습니다';
    ov.querySelector('.spm-box').classList.add('is-bad');
    setTimeout(function () { ov.querySelector('.spm-box').classList.remove('is-bad'); }, 320);
    input.select();
  }

  ov.addEventListener('click', function (e) {
    if (e.target === ov || e.target.closest('[data-act="cancel"]')) { ov.remove(); return; }
    if (e.target.closest('[data-act="ok"]')) submit();
  });
  ov.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
    if (e.key === 'Escape') ov.remove();
  });
  document.body.appendChild(ov);
  input.focus();
  input.select();
}

function _editBtnHtml() {
  if (_editOn) return '<i class="fa-solid fa-check"></i> 편집 끝내기';
  return _editUnlocked()
    ? '<i class="fa-solid fa-pen"></i> 디스크립션 편집'
    : '<i class="fa-solid fa-lock"></i> 디스크립션 편집';
}

function setEditMode(on) {
  /* 잠금이 풀리지 않았으면 비밀번호를 먼저 묻는다 */
  if (on && !_editUnlocked()) {
    _editAskPass(function () { setEditMode(true); });
    return;
  }
  _editOn = !!on;
  document.body.classList.toggle('spec-editing', _editOn);
  _editApplyAttrs(_editOn);
  var btn = document.querySelector('.vp-edit-btn');
  if (btn) {
    btn.classList.toggle('on', _editOn);
    btn.innerHTML = _editBtnHtml();
  }
  if (!_editOn) _editFlush();     // 편집을 끝내면 대기 중인 저장을 먼저 끝낸다
  _editSyncBar();
}

/* ---- 편집 중 하단 바 ---- */
function _editBar() {
  var bar = document.querySelector('.spec-edit-bar');
  if (bar) return bar;
  bar = document.createElement('div');
  bar.className = 'spec-edit-bar';
  bar.innerHTML =
    '<span class="seb-count">수정 없음</span>' +
    '<span class="seb-state"></span>' +
    '<button type="button" class="seb-btn" data-act="gh"><i class="fa-brands fa-github"></i> commit</button>' +
    '<button type="button" class="seb-btn" data-act="conf" title="저장소 연결"><i class="fa-solid fa-gear"></i></button>' +
    '<button type="button" class="seb-btn" data-act="export"><i class="fa-solid fa-file-export"></i> 내보내기</button>' +
    '<button type="button" class="seb-btn seb-btn--warn" data-act="reset"><i class="fa-solid fa-rotate-left"></i> 전체 되돌리기</button>';
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('.seb-btn');
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'export') _editExport();
    else if (act === 'gh') _specPublish(true);
    else if (act === 'conf') _ghSettings();
    else _editReset();
  });
  document.body.appendChild(bar);
  return bar;
}

function _editSyncBar() {
  var n = Object.keys(_editMap).length;
  var bar = (_editOn || n || _ghState) ? _editBar() : document.querySelector('.spec-edit-bar');
  if (!bar) return;
  /* 수정이 0건이어도 커밋 결과가 남아 있으면 띄워 둔다 — 그래야 `커밋됨` 을 본다 */
  bar.classList.toggle('is-on', _editOn || n > 0 || !!_ghState);
  var c = bar.querySelector('.seb-count');
  if (c) c.textContent = n ? ('수정 ' + n + '곳') : '수정 없음';

  /* 어디에 쓰는지 버튼에 적는다 — 디스크와 저장소는 결과가 다르다 */
  var pb = bar.querySelector('[data-act="gh"]');
  if (pb) {
    pb.innerHTML = _localCan
      ? '<i class="fa-solid fa-floppy-disk"></i> 디스크 저장'
      : '<i class="fa-brands fa-github"></i> commit';
    pb.title = _localCan
      ? '고친 내용을 디스크의 원본 HTML 에 씁니다 — 다른 브라우저에서도 보입니다'
      : '고친 내용을 GitHub 저장소에 커밋합니다';
  }

  var st = bar.querySelector('.seb-state');
  if (st && _ghState) {
    st.className = 'seb-state' + (_ghState === 'fail' ? ' is-fail' : _ghState === 'done' ? ' is-ok' : '');
    st.textContent = _ghMsg;
  } else if (st) {
    if (_editState === 'fail') {
      st.className = 'seb-state is-fail';
      st.textContent = '저장 실패 — 이 브라우저가 저장을 막고 있습니다. 내보내기로 먼저 복사하세요';
    } else if (_editState === 'saved') {
      st.className = 'seb-state';
      st.textContent = '저장됨 ' + _editStampTxt;
    } else {
      st.className = 'seb-state';
      st.textContent = '';
    }
  }
}

function _editReset() {
  if (!Object.keys(_editMap).length) { window.alert('되돌릴 수정이 없습니다.'); return; }
  if (!_editUnlocked()) { _editAskPass(_editReset); return; }
  if (!window.confirm('이 문서에서 수정한 내용을 전부 버리고 원본으로 되돌립니다. 계속하시겠어요?')) return;
  _editMap = {};
  _editPersist();
  location.reload();
}

function _editExport() {
  var keys = Object.keys(_editMap);
  if (!keys.length) { window.alert('수정한 곳이 없습니다.'); return; }
  var lines = ['# ' + _currentFile() + ' 디스크립션 수정 ' + keys.length + '곳', ''];
  keys.sort().forEach(function (k) {
    lines.push('## ' + k);
    lines.push(_editMap[k].replace(/\s+/g, ' ').trim());
    lines.push('');
  });
  var txt = lines.join('\n');

  var ov = document.createElement('div');
  ov.className = 'spec-edit-modal';
  ov.innerHTML =
    '<div class="sem-box">' +
      '<div class="sem-head"><b>수정 내보내기</b>' +
        '<span>아래를 복사해 Claude Code에 붙이면 원본 HTML에 반영됩니다. 수정값은 이 브라우저에만 저장되어 있습니다.</span></div>' +
      '<textarea class="sem-text" spellcheck="false"></textarea>' +
      '<div class="sem-act">' +
        '<button type="button" class="seb-btn" data-act="save"><i class="fa-solid fa-download"></i> 파일로 저장</button>' +
        '<button type="button" class="seb-btn" data-act="copy"><i class="fa-regular fa-copy"></i> 복사</button>' +
        '<button type="button" class="seb-btn" data-act="close">닫기</button>' +
      '</div>' +
    '</div>';
  ov.querySelector('.sem-text').value = txt;
  ov.addEventListener('click', function (e) {
    if (e.target === ov || e.target.closest('[data-act="close"]')) { ov.remove(); return; }
    if (e.target.closest('[data-act="save"]')) {
      /* 파일로 남겨 두면 브라우저 저장소가 비워져도 살아 있고, 저장소에 커밋할 수도 있다 */
      var blob = new Blob([txt], { type: 'text/markdown;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = _currentFile().replace('.html', '') + '-edits.md';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      return;
    }
    if (e.target.closest('[data-act="copy"]')) {
      var ta = ov.querySelector('.sem-text');
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      if (!ok && navigator.clipboard) navigator.clipboard.writeText(txt);
      var btn = ov.querySelector('[data-act="copy"]');
      btn.innerHTML = '<i class="fa-solid fa-check"></i> 복사됨';
      setTimeout(function () { btn.innerHTML = '<i class="fa-regular fa-copy"></i> 복사'; }, 1400);
    }
  });
  document.body.appendChild(ov);
}

/* ===================== 저장소에 바로 커밋 (GitHub Contents API) =========== *
 * 브라우저에서 고친 디스크립션을 원본 HTML 에 반영해 커밋한다.
 * GitHub Pages 는 정적 호스팅이라 쓰기 엔드포인트가 없다 — 유일한 방법은
 * 저장소 파일을 직접 고쳐 커밋하고 Pages 가 다시 배포되게 하는 것이다.
 *
 * 원본을 고치는 방식은 **소스 수술**이다. DOM 을 직렬화해 덮어쓰면 속성 순서 ·
 * 엔티티 · 공백이 전부 바뀌어 사람이 유지하는 파일이 망가진다. 그래서
 * `data-edit="<주소>"` 를 소스에 심어 두고, 그 한 블록의 안쪽만 갈아치운다.
 *
 * 토큰은 **localStorage 에만** 둔다. 저장소에 절대 커밋되지 않는다.
 * ------------------------------------------------------------------------ */

var GH_KEYS = {
  owner: 'ggv_gh_owner', repo: 'ggv_gh_repo',
  branch: 'ggv_gh_branch', token: 'ggv_gh_token', auto: 'ggv_gh_auto'
};
var GH_DEFAULT = { owner: 'wnguds1111', repo: 'GGV', branch: 'main' };
var GH_IDLE = 8000;          // 마지막 타이핑 후 이만큼 조용하면 커밋한다
var GH_DONE_HOLD = 6000;     // 커밋 결과 문구를 이만큼 보여 준 뒤 바를 닫는다

var _ghTimer = null;
var _ghBusy = false;
var _ghLastApplied = 0;
var _ghLastUsed = null;      // 직전 커밋에 들어간 { 주소: 값 }
var _ghFadeTimer = null;
var _ghRevBusy = false;      // 개정 이력 커밋이 도는 중 — 그동안은 바를 닫지 않는다
var _ghState = '';           // '' | 'wait' | 'busy' | 'done' | 'fail'
var _ghMsg = '';

function _ghGet(k) {
  try { return localStorage.getItem(GH_KEYS[k]) || ''; } catch (e) { return ''; }
}
function _ghSet(k, v) {
  try { if (v) localStorage.setItem(GH_KEYS[k], v); else localStorage.removeItem(GH_KEYS[k]); }
  catch (e) { /* 저장이 막히면 이번 세션만 쓰지 못한다 */ }
}
function _ghConf() {
  return {
    owner: _ghGet('owner') || GH_DEFAULT.owner,
    repo: _ghGet('repo') || GH_DEFAULT.repo,
    branch: _ghGet('branch') || GH_DEFAULT.branch,
    token: _ghGet('token'),
    auto: _ghGet('auto') !== '0'
  };
}
function _ghReady() { return !!_ghConf().token; }

/* ---- UTF-8 ↔ base64 (atob/btoa 는 바이트만 다룬다) ---- */
function _b64enc(str) {
  var bytes = new TextEncoder().encode(str), bin = '';
  for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function _b64dec(b64) {
  var bin = atob(String(b64).replace(/\s/g, '')), bytes = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

/* ---- 소스 수술 ---- */
function _ghMatchClose(src, from, tag) {
  var o = new RegExp('<' + tag + '[\\s>]', 'ig');
  var c = new RegExp('</' + tag + '\\s*>', 'ig');
  var depth = 1, i = from;
  while (depth > 0) {
    o.lastIndex = i; c.lastIndex = i;
    var mo = o.exec(src), mc = c.exec(src);
    if (!mc) return -1;
    if (mo && mo.index < mc.index) { depth++; i = mo.index + 1; }
    else { depth--; i = mc.index + 1; if (depth === 0) return mc.index; }
  }
  return -1;
}

function _ghRewrite(src) {
  var failed = [], applied = 0, used = {};
  Object.keys(_editMap).forEach(function (k) {
    var needle = 'data-edit="' + k + '"';
    var at = src.indexOf(needle);
    if (at === -1 || src.indexOf(needle, at + 1) !== -1) { failed.push(k); return; }
    var openAt = src.lastIndexOf('<', at);
    var tm = /^<([a-z0-9]+)/i.exec(src.slice(openAt, openAt + 12));
    if (!tm) { failed.push(k); return; }
    var gt = src.indexOf('>', at);
    var end = _ghMatchClose(src, gt + 1, tm[1]);
    if (end === -1) { failed.push(k); return; }
    src = src.slice(0, gt + 1) + _editMap[k] + src.slice(end);
    used[k] = _editMap[k];   // 무엇을 어떤 값으로 올렸는지 — 커밋 뒤 목록에서 뺄 때 쓴다
    applied++;
  });
  return { text: src, applied: applied, failed: failed, used: used };
}

/* 커밋 전 자기검사 — 하나라도 어긋나면 올리지 않는다 */
function _ghVerify(before, after, res) {
  function count(s, re) { return (s.match(re) || []).length; }
  if (res.failed.length) return '주소를 못 찾은 항목 ' + res.failed.length + '개: ' + res.failed.slice(0, 3).join(', ');
  if (!res.applied) return '반영할 항목이 없습니다';
  if (!after || after.length < before.length * 0.5) return '결과 파일이 비정상적으로 짧습니다';
  if (count(before, /<div\b/g) !== count(after, /<div\b/g) ||
      count(before, /<\/div>/g) !== count(after, /<\/div>/g)) return 'div 태그 수가 달라졌습니다';
  var a = (before.match(/data-edit="[^"]+"/g) || []).sort().join('|');
  var b = (after.match(/data-edit="[^"]+"/g) || []).sort().join('|');
  if (a !== b) return '편집 주소가 유실됐습니다';
  return '';
}

/* ---- 로컬 디스크 저장 (serve.py) -------------------------------------- *
 * 브라우저 편집의 커밋은 GitHub 에만 쓴다. 그런데 `localhost` 로 보는 동안
 * 화면에 뜨는 것은 **디스크의 파일**이라, 커밋해도 다른 브라우저에서는 원본이
 * 그대로 보였다. 고친 브라우저에서만 보인 것은 파일이 바뀌어서가 아니라
 * 그 브라우저의 localStorage 가 덮어썼기 때문이다.
 *
 * `serve.py` 가 떠 있으면 같은 소스 수술 결과를 디스크에 바로 쓴다 —
 * 새로고침 한 번으로 어느 브라우저에서나 보인다.
 *
 * **디스크와 GitHub 에 동시에 쓰지 않는다.** 둘 다 쓰면 로컬 작업 트리와 원격이
 * 갈라져 `git pull` 이 충돌한다. 디스크에 쓸 수 있으면 디스크에만 쓰고,
 * 저장소 커밋은 평소대로 git 으로 한다. 서버가 없으면(배포본) GitHub 에 커밋한다.
 * ---------------------------------------------------------------------- */

var LOCAL_SAVE = '__save';
var _localCan = false;

/* 이 서버가 저장을 받는지 한 번 물어 둔다 — 배포본에서는 404 · 403 이라 꺼진다 */
function _localProbe() {
  if (!/^https?:$/.test(location.protocol)) return;
  fetch(LOCAL_SAVE, { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) { _localCan = !!(j && j.save); _editSyncBar(); })
    .catch(function () { _localCan = false; });
}

function _localPut(file, text) {
  return fetch(LOCAL_SAVE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file: file, text: text })
  }).then(function (r) {
    return r.json().catch(function () { return {}; }).then(function (j) {
      if (!r.ok || !j.ok) throw new Error(j.error || ('디스크 저장 실패 (' + r.status + ')'));
      return j;
    });
  });
}

/* 디스크의 원본을 받아 소스 수술을 하고 되쓴다. 검사는 GitHub 경로와 같은 것을 쓴다 */
function _localSave() {
  var file = _currentFile();
  var used = null, applied = 0;
  _ghBusy = true; _ghState = 'busy'; _ghMsg = '디스크에 쓰는 중'; _editSyncBar();

  return fetch(file, { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error(file + ' 을 읽지 못했습니다 (' + r.status + ')');
      return r.text();
    })
    .then(function (before) {
      var res = _ghRewrite(before);
      var bad = _ghVerify(before, res.text, res);
      if (bad) throw new Error('자기검사 실패 — ' + bad);
      used = res.used; applied = res.applied;
      if (res.text === before) return null;          // 디스크가 이미 같은 값이다
      return _localPut(file, res.text);
    })
    .then(function (done) {
      _ghState = 'done';
      _ghMsg = (done ? '디스크에 저장됨 · ' : '이미 반영돼 있습니다 · ') + _editStamp();
      _editDropCommitted(used);
      if (done) return _localBumpRevision(file, applied);
    })
    .catch(function (e) { _ghState = 'fail'; _ghMsg = String(e.message || e); })
    .then(function () { _ghBusy = false; _editSyncBar(); _ghFadeBar(); });
}

/* 개정 이력도 디스크에 남긴다 — GitHub 경로와 동작을 맞춘다 */
function _localBumpRevision(file, count) {
  _ghRevBusy = true;
  return fetch(REV_FILE, { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error(REV_FILE + ' 읽기 실패 (' + r.status + ')');
      return r.text();
    })
    .then(function (before) {
      var res = _revApply(before, file, count);
      if (res.err) throw new Error(res.err);
      if (res.text === before) return null;
      return _localPut(REV_FILE, res.text).then(function () { return res.note; });
    })
    .then(function (note) { if (note) _ghMsg += ' · 개정 이력 ' + note; })
    .catch(function (e) {
      /* 개정 이력은 덧붙이는 기록이다 — 실패해도 본 저장을 되돌리지 않는다 */
      _ghMsg += ' · 개정 이력 실패: ' + String(e.message || e);
    })
    .then(function () { _ghRevBusy = false; _editSyncBar(); _ghFadeBar(); });
}

/* 어디에 반영할지는 여기서 고른다 — 버튼과 자동 반영이 모두 이걸 부른다 */
function _specPublish(manual) {
  if (_ghBusy) return;
  if (!Object.keys(_editMap).length) {
    if (manual) window.alert('반영할 수정이 없습니다.');
    return;
  }
  if (_localCan) { _localSave(); return; }   // localhost — 디스크에 쓴다
  _ghCommit(manual);                         // 배포본 — 저장소에 커밋한다
}

/* 커밋에 들어간 항목을 목록에서 뺀다 — 원본이 그 값을 갖게 됐으니 더 할 일이 없다.
   비우지 않으면 `수정 N곳` 배지가 영영 남고, 그 뒤 소스에서 같은 블록을 고쳐도
   이 브라우저에서는 옛 값이 덮어써 "고쳤는데 안 바뀐다" 가 된다. */
function _editDropCommitted(used) {
  var n = 0;
  Object.keys(used || {}).forEach(function (k) {
    if (_editMap[k] !== used[k]) return;   // 왕복 중에 또 고쳤다 — 다음 커밋으로 넘긴다
    delete _editMap[k];
    n++;
  });
  if (!n) return;
  _editPersist();
  document.querySelectorAll('.spec-edited').forEach(function (el) {
    if (!(_editBlock(el)[0] in _editMap)) el.classList.remove('spec-edited');
  });
}

/* 결과 문구를 잠깐 보여 준 뒤 바를 닫는다 — 비우자마자 감추면 `커밋됨` 을 아무도 못 본다.
   실패했거나 아직 안 올린 수정이 남아 있으면 닫지 않는다. */
function _ghFadeBar() {
  if (_ghFadeTimer) { clearTimeout(_ghFadeTimer); _ghFadeTimer = null; }
  if (_editOn || Object.keys(_editMap).length || _ghRevBusy) return;
  if (_ghState !== 'done') return;
  _ghFadeTimer = setTimeout(function () {
    _ghFadeTimer = null;
    if (_editOn || Object.keys(_editMap).length) return;
    _ghState = ''; _ghMsg = '';
    _editSyncBar();
  }, GH_DONE_HOLD);
}

/* ---- 커밋 ---- */
function _ghApi(path, opt) {
  var c = _ghConf();
  opt = opt || {};
  opt.headers = Object.assign({
    'Authorization': 'Bearer ' + c.token,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }, opt.headers || {});
  return fetch('https://api.github.com/repos/' + c.owner + '/' + c.repo + path, opt);
}

function _ghCommit(manual) {
  if (_ghBusy) return;
  if (!Object.keys(_editMap).length) {
    if (manual) window.alert('커밋할 수정이 없습니다.');
    return;
  }
  if (!_ghReady()) {
    if (manual) _ghSettings();
    return;
  }
  var c = _ghConf();
  var file = _currentFile();
  _ghBusy = true; _ghState = 'busy'; _ghMsg = '커밋 중'; _editSyncBar();

  var q = '/contents/' + encodeURIComponent(file) + '?ref=' + encodeURIComponent(c.branch);
  _ghApi(q)
    .then(function (r) {
      if (!r.ok) throw new Error(
        r.status === 401 ? '토큰이 거부됐습니다 (401) — 만료됐거나 잘못 붙여넣었습니다'
        : r.status === 403 ? '접근 거부 (403) — 토큰 권한을 확인하세요'
        /* GitHub 은 권한 없는 저장소에도 404 를 준다 — 세 가지를 함께 알려 준다 */
        : r.status === 404 ? '404 — ① ' + file + ' 이 ' + c.branch + ' 브랜치에 아직 커밋되지 않았거나 '
            + '② ' + c.owner + '/' + c.repo + ' 이름이 틀렸거나 ③ 토큰에 이 저장소 권한이 없습니다'
        : 'GitHub 응답 ' + r.status);
      return r.json();
    })
    .then(function (info) {
      var before = _b64dec(info.content);
      var res = _ghRewrite(before);
      var bad = _ghVerify(before, res.text, res);
      _ghLastApplied = res.applied;
      _ghLastUsed = res.used;
      if (bad) throw new Error('자기검사 실패 — ' + bad);
      /* 원본이 이미 같은 값이다 — 올릴 것은 없지만 목록에는 남아 있으므로 여기서 비운다 */
      if (res.text === before) {
        _ghState = 'done';
        _ghMsg = '이미 반영돼 있습니다 · ' + _editStamp();
        _editDropCommitted(res.used);
        return null;
      }
      return _ghApi('/contents/' + encodeURIComponent(file), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'docs(' + file.replace('.html', '') + '): 디스크립션 ' + res.applied + '곳 수정',
          content: _b64enc(res.text),
          sha: info.sha,
          branch: c.branch
        })
      }).then(function (r) {
        if (r.status === 409 || r.status === 422) throw new Error('다른 커밋이 먼저 들어왔습니다 — 다시 시도해 주세요');
        if (!r.ok) throw new Error('커밋 실패 (' + r.status + ')');
        return r.json();
      });
    })
    .then(function (out) {
      if (out) {
        _ghState = 'done';
        _ghMsg = '커밋됨 ' + String(out.commit.sha).slice(0, 7) + ' · ' + _editStamp();
        _editDropCommitted(_ghLastUsed);
        _ghBumpRevision(file, _ghLastApplied);
      }
    })
    .catch(function (e) { _ghState = 'fail'; _ghMsg = String(e.message || e); })
    .then(function () { _ghBusy = false; _editSyncBar(); _ghFadeBar(); });
}

function _ghSchedule() {
  if (!_ghConf().auto) return;
  if (!_localCan && !_ghReady()) return;   // 디스크도 저장소도 못 쓴다
  if (_ghTimer) clearTimeout(_ghTimer);
  _ghState = 'wait'; _ghMsg = _localCan ? '저장 대기' : '커밋 대기';
  _ghTimer = setTimeout(function () { _ghTimer = null; _specPublish(false); }, GH_IDLE);
}

/* ---- 개정 이력 자동 반영 ----------------------------------------------- *
 * 디스크립션을 커밋하면 index.html 의 개정 이력에도 한 줄 남긴다.
 * 손으로 쓰는 것을 잊으면 "언제 무엇이 바뀌었는지"가 문서에서 사라진다.
 *
 * 하루에 한 행만 쓴다 — 같은 날짜 행이 있으면 그 행에 항목을 누적하고,
 * 같은 파일 항목이 이미 있으면 건수만 갈아치운다. 편집마다 행을 늘리면
 * 개정 이력이 수백 줄이 되어 아무도 읽지 않는다.
 * ---------------------------------------------------------------------- */

var REV_FILE = 'index.html';
var REV_AUTHOR = '기획팀';

function _revToday() {
  var d = new Date();
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate());
}

function _revBumpVersion(v) {
  var m = /^v(\d+)\.(\d+)\.(\d+)$/.exec(String(v || '').trim());
  if (!m) return 'v1.0.1';
  return 'v' + m[1] + '.' + m[2] + '.' + (parseInt(m[3], 10) + 1);
}

/* index.html 원문에 개정 항목을 끼워 넣는다 → { text, note } 또는 null */
function _revApply(src, file, count) {
  var open = src.indexOf('<tbody id="rev-log">');
  if (open === -1) return { err: 'index.html 에 <tbody id="rev-log"> 가 없습니다' };
  var close = src.indexOf('</tbody>', open);
  if (close === -1) return { err: '개정 이력 tbody 가 닫히지 않았습니다' };

  var body = src.slice(open, close);
  var today = _revToday();
  var doc = file.replace(/\.html$/, '');
  var item = '<li data-rev="' + doc + '"><span class="bullet">&bull;</span> '
           + doc + ' 디스크립션 ' + count + '곳 수정</li>';

  var out, note;
  if (body.indexOf('<td>' + today + '</td>') !== -1) {
    /* 오늘 행이 있다 — 그 행 안에서 갱신하거나 덧붙인다 */
    var rowStart = body.lastIndexOf('<tr', body.indexOf('<td>' + today + '</td>'));
    var rowEnd = body.indexOf('</tr>', rowStart);
    var row = body.slice(rowStart, rowEnd);
    var mine = new RegExp('[ \\t]*<li data-rev="' + doc + '">[\\s\\S]*?</li>\\s*');
    if (mine.test(row)) {
      row = row.replace(mine, '\n                                        ' + item + '\n                                        ');
      note = doc + ' 항목 갱신';
    } else {
      var ulEnd = row.lastIndexOf('</ul>');
      if (ulEnd === -1) return { err: '오늘 행에 tb-bullet-list 가 없습니다' };
      row = row.slice(0, ulEnd) + '                                        ' + item
          + '\n                                        ' + row.slice(ulEnd);
      note = doc + ' 항목 추가';
    }
    out = src.slice(0, open) + body.slice(0, rowStart) + row + body.slice(rowEnd) + src.slice(close);
  } else {
    /* 오늘 행이 없다 — 맨 위에 새 행. 버전은 patch +1 */
    var vm = /v\d+\.\d+\.\d+/.exec(body);
    var ver = _revBumpVersion(vm ? vm[0] : 'v1.0.0');
    var tr = '\n                            <tr>'
      + '\n                                <td><span class="badge-draft" style="background: #FFF1F2; color: #E11D48; border-color: #FDA4AF; font-weight: 800;">' + ver + '</span></td>'
      + '\n                                <td>' + today + '</td>'
      + '\n                                <td>' + REV_AUTHOR + '</td>'
      + '\n                                <td>'
      + '\n                                        <ul class="tb-bullet-list">'
      + '\n                                        ' + item
      + '\n                                        </ul>'
      + '\n                                    </td>'
      + '\n                            </tr>';
    var headEnd = src.indexOf('>', open) + 1;
    out = src.slice(0, headEnd) + tr + src.slice(headEnd);
    note = ver + ' 새 행';
  }

  /* 자기검사 — 행 수가 늘기만 하고 구조는 그대로여야 한다 */
  function cnt(s, re) { return (s.match(re) || []).length; }
  if (cnt(out, /<tr\b/g) < cnt(src, /<tr\b/g)) return { err: '개정 이력 행이 줄었습니다' };
  if (cnt(out, /<\/tbody>/g) !== cnt(src, /<\/tbody>/g)) return { err: 'tbody 구조가 깨졌습니다' };
  if (cnt(out, /<div\b/g) !== cnt(src, /<div\b/g)) return { err: 'div 태그 수가 달라졌습니다' };
  return { text: out, note: note };
}

function _ghBumpRevision(file, count) {
  if (!_ghReady()) return;
  _ghRevBusy = true;
  var c = _ghConf();
  var q = '/contents/' + encodeURIComponent(REV_FILE) + '?ref=' + encodeURIComponent(c.branch);
  _ghApi(q)
    .then(function (r) { if (!r.ok) throw new Error('index.html 읽기 실패 (' + r.status + ')'); return r.json(); })
    .then(function (info) {
      var before = _b64dec(info.content);
      var res = _revApply(before, file, count);
      if (res.err) throw new Error(res.err);
      if (res.text === before) return null;
      return _ghApi('/contents/' + encodeURIComponent(REV_FILE), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'docs(index): 개정 이력 갱신 — ' + res.note,
          content: _b64enc(res.text), sha: info.sha, branch: c.branch
        })
      }).then(function (r) {
        if (!r.ok) throw new Error('개정 이력 커밋 실패 (' + r.status + ')');
        return res.note;
      });
    })
    .then(function (note) {
      if (note) { _ghMsg += ' · 개정 이력 ' + note; }
    })
    .catch(function (e) {
      /* 개정 이력은 덧붙이는 기록이다 — 실패해도 본 커밋을 되돌리지 않는다 */
      _ghMsg += ' · 개정 이력 실패: ' + String(e.message || e);
    })
    .then(function () { _ghRevBusy = false; _editSyncBar(); _ghFadeBar(); });
}

/* ---- 설정 ---- */
function _ghSettings() {
  var c = _ghConf();
  var prev = document.querySelector('.spec-pass-modal');
  if (prev) prev.remove();
  var ov = document.createElement('div');
  ov.className = 'spec-pass-modal';
  ov.innerHTML =
    '<div class="spm-box spm-box--wide">' +
      '<div class="spm-head"><i class="fa-brands fa-github"></i> 저장소 연결</div>' +
      '<p class="spm-desc">수정을 원본 HTML 에 반영해 <b>바로 커밋</b>합니다. Pages 재배포까지 1~2분 걸립니다.</p>' +
      '<div class="spm-row">' +
        '<label>owner<input class="spm-input spm-sm" data-k="owner" value="' + c.owner + '"></label>' +
        '<label>repo<input class="spm-input spm-sm" data-k="repo" value="' + c.repo + '"></label>' +
        '<label>branch<input class="spm-input spm-sm" data-k="branch" value="' + c.branch + '"></label>' +
      '</div>' +
      '<label class="spm-full">토큰 (fine-grained · 이 저장소만 · Contents: Read and write)' +
        '<input type="password" class="spm-input" data-k="token" value="' + c.token + '" autocomplete="off" placeholder="github_pat_…"></label>' +
      '<label class="spm-check"><input type="checkbox" data-k="auto"' + (c.auto ? ' checked' : '') + '>' +
        ' 수정이 멈추면 ' + (GH_IDLE / 1000) + '초 뒤 자동 커밋</label>' +
      '<p class="spm-warn"><i class="fa-solid fa-triangle-exclamation"></i> 토큰은 이 브라우저에만 저장되고 저장소에 올라가지 않습니다. ' +
        '그래도 <b>이 저장소에 쓰기 권한</b>이므로 공용 PC 에서는 쓰지 마세요.</p>' +
      '<div class="spm-act">' +
        '<button type="button" class="seb-btn" data-act="clear">토큰 지우기</button>' +
        '<button type="button" class="seb-btn" data-act="cancel">취소</button>' +
        '<button type="button" class="seb-btn spm-ok" data-act="save">저장</button>' +
      '</div>' +
    '</div>';
  ov.addEventListener('click', function (e) {
    if (e.target === ov || e.target.closest('[data-act="cancel"]')) { ov.remove(); return; }
    if (e.target.closest('[data-act="clear"]')) {
      _ghSet('token', ''); ov.remove(); _ghState = ''; _ghMsg = ''; _editSyncBar(); return;
    }
    if (e.target.closest('[data-act="save"]')) {
      ov.querySelectorAll('[data-k]').forEach(function (i) {
        var k = i.getAttribute('data-k');
        _ghSet(k, k === 'auto' ? (i.checked ? '1' : '0') : i.value.trim());
      });
      ov.remove(); _editSyncBar();
    }
  });
  document.body.appendChild(ov);
}

function initSpecEdit() {
  if (!document.querySelector(EDIT_SEL)) return;
  _editLoad();
  _editRestore();
  _editSyncBar();
  _localProbe();

  /* 탭을 닫거나 숨길 때 대기 중인 저장(300ms 디바운스)을 먼저 끝낸다 */
  window.addEventListener('beforeunload', function () {
    _editFlush();
    /* 예약된 커밋이 남아 있으면 떠나기 전에 보낸다 */
    if (_ghTimer) { clearTimeout(_ghTimer); _ghTimer = null; _specPublish(false); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') _editFlush();
  });

  document.addEventListener('input', function (e) {
    if (!_editOn) return;
    var el = e.target.closest('[data-spec-edit]');
    if (el) _editSaveFrom(el);
  });

  document.addEventListener('keydown', function (e) {
    if (!_editOn) return;
    var el = e.target.closest('[data-spec-edit]');
    if (!el) return;
    if (e.key === 'Escape') { el.blur(); return; }
    if (e.key !== 'Enter') return;
    e.preventDefault();
    var li = el.closest('li');
    if (li && li.closest('.spec-list') && !e.shiftKey) {
      /* 규칙 한 줄 = li 하나. Enter 는 다음 줄을 만든다 */
      var nu = document.createElement('li');
      nu.textContent = '새 규칙';
      nu.setAttribute('contenteditable', 'true');
      nu.setAttribute('data-spec-edit', '1');
      nu.setAttribute('spellcheck', 'false');
      li.parentNode.insertBefore(nu, li.nextSibling);
      nu.focus();
      try { document.getSelection().selectAllChildren(nu); } catch (err) {}
      _editSaveFrom(nu);
    } else {
      try { document.execCommand('insertLineBreak'); } catch (err) {}
      _editSaveFrom(el);
    }
  });

  /* 빈 줄에서 Backspace → 그 줄을 지운다 */
  document.addEventListener('keyup', function (e) {
    if (!_editOn || e.key !== 'Backspace') return;
    var li = e.target.closest('.spec-list li');
    if (!li || li.textContent.trim() !== '') return;
    var ul = li.parentNode;
    if (ul.children.length <= 1) return;
    var near = li.previousElementSibling || li.nextElementSibling;
    li.remove();
    if (near) near.focus();
    _editSaveFrom(near || ul.children[0]);
  });
}

/* ================================ 부팅 ================================== */
function initSpecDoc() {
  renderSidebar();
  renderPageNav();
  initAdminShell();   // 화면 전환 · 높이 재기 전에 어드민 좌측 메뉴를 그린다
  initScreens();     // 사이드바보다 뒤 — 2뎁스 활성 표시를 화면 상태에 맞춘다
  bindDeclarativePins();
  bindSpecCardHeads();
  initViewport();
  initSpecEdit();
  initPrototype();
  initAdminProto();
  initTplDownload();
  initCodeCopy();

  if (document.querySelector('[data-state-view]')) setStateView('out');

  document.querySelectorAll('[data-state-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setStateView(btn.getAttribute('data-state-btn'));
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpecDoc);
} else {
  initSpecDoc();
}
