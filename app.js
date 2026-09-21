/* =====================================================================
   app.js — content.js のデータからページを組み立て、動きを付けます。
   通常はこのファイルを編集する必要はありません。
   ===================================================================== */
(function () {
  'use strict';
  var S = window.SITE;

  /* ---------- ヘルパー ---------- */
  // {en, ja} → <span lang="en">…</span><span lang="ja">…</span>、文字列はそのまま
  function bi(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    var out = '';
    if (v.en != null) out += '<span lang="en">' + v.en + '</span>';
    if (v.ja != null) out += '<span lang="ja">' + v.ja + '</span>';
    return out;
  }
  // 片方の言語しか無い {en:…} / {ja:…} なら lang 属性付きの段落に、そうでなければ span で切り替え
  function para(cls, v) {
    if (v == null) return '';
    if (typeof v === 'object' && (v.en == null) !== (v.ja == null)) {
      var l = v.en != null ? 'en' : 'ja';
      return '<p class="' + cls + '" lang="' + l + '">' + v[l] + '</p>';
    }
    return '<p class="' + cls + '">' + bi(v) + '</p>';
  }
  function badge(b) { return '<span class="badge ' + b.kind + '">' + bi(b.text) + '</span>'; }
  function attr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }

  /* プロフィールのアイコン（Simple Icons, CC0。viewBox は 0 0 24 24） */
  var ICONS = {
    orcid: 'M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z',
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    scholar: 'M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z'
  };

  /* ---------- 項目（日付 | 内容） ---------- */
  function entry(e) {
    var h = '<li class="entry"' + (e.id ? ' id="' + e.id + '"' : '') + '>';
    h += '<div class="when">' + bi(e.when) + '</div>';
    h += '<div class="what">';
    h += '<p class="title">' + bi(e.title) + (e.badges || []).map(function (b) { return ' ' + badge(b); }).join('') + '</p>';
    if (e.meta) h += para('meta', e.meta);
    (e.metaLines || []).forEach(function (m) { h += para('meta', m); });
    (e.notes || []).forEach(function (n) { h += para('meta', n); });
    if (e.callout) {
      h += '<aside class="callout interview">';
      h += '<p class="callout-label">' + bi(e.callout.label) + '</p>';
      h += '<p lang="en">' + e.callout.text.en + '</p>';
      h += '<p lang="ja">' + e.callout.text.ja + '</p>';
      h += '</aside>';
    }
    h += '</div></li>';
    return h;
  }
  function entries(items) { return '<ul class="entries">' + items.map(entry).join('') + '</ul>'; }

  /* ---------- 論文 ---------- */
  function pub(p) {
    var h = '<li class="pub">';
    h += '<p class="authors">' + p.authors + '</p>';
    h += '<p class="ptitle">' + p.title + '</p>';
    h += '<p class="venue">' + p.venue + (p.badge ? ' ' + badge(p.badge) : '') + '</p>';
    h += '</li>';
    return h;
  }

  /* ---------- セクション ---------- */
  function section(sec) {
    var h = '<section id="' + sec.id + '">';
    h += '<h2>' + bi(sec.title) + '</h2>';
    if (sec.type === 'publications') {
      h += '<ol class="pubs">' + sec.items.map(pub).join('') + '</ol>';
    } else if (sec.type === 'groups') {
      sec.groups.forEach(function (g) {
        h += '<h3>' + bi(g.title) + '</h3>' + entries(g.items);
      });
    } else {
      h += entries(sec.items);
    }
    h += '</section>';
    return h;
  }

  /* ---------- 目次・テーマ／言語ボタン（サイドバーとスマホ用バーで共用） ---------- */
  function navList() {
    var h = '<ul>';
    S.sections.forEach(function (sec) {
      h += '<li><a href="#' + sec.id + '">' + bi(sec.nav || sec.title) + '</a></li>';
    });
    return h + '</ul>';
  }
  function langswitch() {
    return '<div class="langswitch" role="group" aria-label="Language">' +
           '<button type="button" data-lang="en" class="on">EN</button>' +
           '<button type="button" data-lang="ja">日本語</button></div>';
  }
  function themeswitch() {
    return '<button type="button" class="themeswitch">' +
           '<svg class="ico-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
           '<svg class="ico-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
           '</button>';
  }

  /* ---------- サイドバー ---------- */
  function sidebar() {
    var P = S.profile, L = P.labels;
    var h = '';
    h += '<div class="who">';
    h += '<img class="avatar" src="' + attr(P.photo) + '" alt="' + attr(S.aria.en.photo) + '" width="112" height="112">';
    h += '<h1>' + bi(P.name) + '</h1>';
    h += '<p class="name-sub">' + bi(P.nameSub) + '</p>';
    h += '<p class="role">' + bi(P.role) + '</p>';
    h += '<p class="affil">' + bi(P.affiliation) + '</p>';
    h += '<div class="intro">';
    h += '<p class="bio">' + bi(P.bio) + '</p>';
    h += '<p class="field">' + bi(P.interests) + '</p>';
    h += '</div>';
    h += '</div>';

    var addr = P.email.user + ' at ' + P.email.domain;   // @ は使わない
    h += '<div class="linkgroups">';
    h += '<div><p class="side-label">' + bi(L.contact) + '</p><ul class="pills">';
    h += '<li><button type="button" class="pill" id="mail" title="' + attr(addr) + '" data-addr="' + attr(addr) + '">' +
         '<svg class="ico-mail" viewBox="0 0 24 24"><path d="M2 5h20v14H2z M4 7v.5l8 5 8-5V7H4z M4 9.8V17h16V9.8l-8 5z"/></svg>' +
         '<svg class="ico-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 17.3 4.2 12l1.5-1.5 3.8 3.8 8.8-8.8 1.5 1.5z"/></svg>' +
         '<span class="mail-label">' + bi(L.email) + '</span></button></li>';
    h += '<li><a class="pill primary" href="' + attr(P.cv) + '" target="_blank" rel="noopener">' + bi(L.cv) + '</a></li>';
    h += '</ul></div>';
    h += '<div><p class="side-label">' + bi(L.profiles) + '</p><ul class="pills icons">';
    P.profiles.forEach(function (a) {
      var ico = ICONS[a.icon];   // アイコンがあるものはアイコン＋名前（スマホでは名前だけ）、無いものは従来どおり文字
      h += '<li><a class="pill" href="' + attr(a.url) + '" target="_blank" rel="noopener"';
      if (typeof ico === 'string') {
        h += ' title="' + attr(a.title || a.label) + '" aria-label="' + attr(a.label) + '">' +
             '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ico + '"/></svg>' +
             '<span class="lbl">' + a.label + '</span>';
      } else {
        h += (a.title ? ' title="' + attr(a.title) + '"' : '') + '>' + a.label;
      }
      h += '</a></li>';
    });
    h += '</ul></div>';
    h += '<div class="topctl">' + themeswitch() + langswitch() + '</div>';
    h += '</div>';

    h += '<nav class="nav" aria-label="Sections"><p class="side-label">' + bi(L.sections) + '</p>' + navList() + '</nav>';
    h += '<p class="foot">' + bi(P.updated) + '</p>';
    return h;
  }

  /* ---------- 描画 ---------- */
  document.querySelector('.sidebar').innerHTML = sidebar();
  // スマホ表示用: 画面上部に固定される目次バー（デスクトップでは非表示）
  document.querySelector('.sidebar').insertAdjacentHTML('afterend',
    '<div class="mobilebar"><nav class="nav" aria-label="Sections">' + navList() + '</nav>' + themeswitch() + langswitch() + '</div>');
  document.querySelector('.main .inner').innerHTML =
    S.sections.map(section).join('') + '<footer class="site-foot">' + bi(S.footer) +
    '<span class="foot-updated">' + bi(S.profile.updated) + '</span></footer>';   // 最終更新（スマホ表示のみ）

  /* ---------- サイドバーの高さ合わせ（PC表示のみ） ----------
     中身が画面より高いときは中でスクロールさせず、中身の高さのままページと一緒に上へ動き、
     下端が画面下端に来たところで止まる。収まるときは従来どおり 100vh で固定。 */
  var sidebarEl = document.querySelector('.sidebar');
  function fitSidebar() {
    if (window.innerWidth <= 900) { sidebarEl.classList.remove('tall'); return; }
    sidebarEl.classList.remove('tall');                 // 一度戻すと scrollHeight が中身の高さになる
    sidebarEl.style.overflowY = 'hidden';               // 測る間だけスクロールバーを出さない（幅が変わると折り返しも変わる）
    var over = sidebarEl.scrollHeight - window.innerHeight;
    sidebarEl.style.overflowY = '';
    if (over > 0) { sidebarEl.style.setProperty('--sb-over', String(over)); sidebarEl.classList.add('tall'); }
    else sidebarEl.style.removeProperty('--sb-over');
  }
  fitSidebar();
  window.addEventListener('load', fitSidebar);
  window.addEventListener('resize', fitSidebar);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSidebar);   // 書体が届くと高さが変わる

  // 写真が無いときはイニシャルを表示
  var img = document.querySelector('img.avatar');
  img.addEventListener('error', function () {
    var d = document.createElement('div');
    d.className = 'avatar avatar-fallback';
    d.textContent = S.profile.initials;
    d.setAttribute('role', 'img');
    d.setAttribute('aria-label', img.alt);
    img.replaceWith(d);
  });

  /* ---------- メールボタン: 押すとアドレスをコピー ---------- */
  var mail = document.getElementById('mail');
  var mailTimer = null;
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {          // 古いブラウザ・file:// 用
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); ok ? resolve() : reject();
    });
  }
  mail.addEventListener('click', function () {
    var label = mail.querySelector('.mail-label');
    function reset() { label.innerHTML = bi(S.profile.labels.email); mail.classList.remove('is-copied', 'is-fallback'); }
    copyText(mail.dataset.addr).then(function () {
      label.innerHTML = bi(S.profile.labels.copied);
      mail.classList.add('is-copied');                        // 文字を隠すスマホ表示では封筒をチェックに変える
      clearTimeout(mailTimer);
      mailTimer = setTimeout(reset, 1600);
    }, function () {                                          // コピーできない環境ではアドレスを表示
      label.textContent = mail.dataset.addr;
      mail.classList.add('is-fallback');                      // スマホ表示でもこの間だけ文字を出す
      clearTimeout(mailTimer);
      mailTimer = setTimeout(reset, 4000);
    });
  });

  /* ---------- 目次のスクロール追従 ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = S.sections.map(function (sec) { return document.getElementById(sec.id); }).filter(Boolean);
  function setActive() {
    var pos = window.scrollY + 140, current = sections[0];
    for (var i = 0; i < sections.length; i++) { if (sections[i].offsetTop <= pos) current = sections[i]; }
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) current = sections[sections.length - 1];
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current.id); });
    if (window.matchMedia('(max-width: 900px)').matches) {
      Array.prototype.forEach.call(document.querySelectorAll('.mobilebar .nav a.active'), function (act) {
        var strip = act.closest('ul');
        if (strip) strip.scrollTo({ left: act.offsetLeft - (strip.clientWidth - act.offsetWidth) / 2, behavior: 'smooth' });
      });
    }
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);

  /* ---------- ライト / ダーク切り替え ----------
     何も選んでいなければ端末設定に従う（data-theme なし）。ボタンで選ぶと data-theme に記録し、
     端末設定と同じモードに戻したときは記録を消して自動追従に戻す。 */
  var themeButtons = Array.prototype.slice.call(document.querySelectorAll('.themeswitch'));
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function systemTheme() { return darkQuery && darkQuery.matches ? 'dark' : 'light'; }
  function currentTheme() {
    var o = document.documentElement.getAttribute('data-theme');
    return (o === 'dark' || o === 'light') ? o : systemTheme();
  }
  var favicon = document.querySelector('link[rel="icon"]');
  function faviconFor(color) {   // タブのアイコン。地の色はサイドバーと同じ色にする
    return 'data:image/svg+xml,' + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
      "<rect width='64' height='64' rx='12' fill='" + color + "'/>" +
      "<text x='32' y='48' text-anchor='middle' textLength='58' lengthAdjust='spacingAndGlyphs' " +
      "font-family='Arial,Helvetica,sans-serif' font-size='46' font-weight='700' fill='white'>TRF</text></svg>");
  }
  function updateThemeUI() {
    var eff = currentTheme();
    var A = S.aria[document.documentElement.getAttribute('data-lang') === 'ja' ? 'ja' : 'en'];
    var label = eff === 'dark' ? A.toLight : A.toDark;
    themeButtons.forEach(function (b) { b.setAttribute('data-effective', eff); b.setAttribute('aria-label', label); b.title = label; });
    var panel = getComputedStyle(document.documentElement).getPropertyValue('--panel').trim();
    if (favicon && panel) favicon.href = faviconFor(panel);
    Array.prototype.forEach.call(document.querySelectorAll('meta[name="theme-color"]'), function (m) {
      if (!m.dataset.orig) m.dataset.orig = m.content;
      m.content = document.documentElement.hasAttribute('data-theme') && panel ? panel : m.dataset.orig;
    });
  }
  function setTheme(override) {
    if (override === 'dark' || override === 'light') document.documentElement.setAttribute('data-theme', override);
    else document.documentElement.removeAttribute('data-theme');
    try { if (override) localStorage.setItem('site-theme', override); else localStorage.removeItem('site-theme'); } catch (e) {}
    updateThemeUI();
  }
  themeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next === systemTheme() ? null : next);
    });
  });
  if (darkQuery) {
    var onSystemChange = function () { updateThemeUI(); };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemChange);
    else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);
  }

  /* ---------- 言語切り替え（EN / JA） ---------- */
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.langswitch button'));
  function setLang(l) {
    if (l !== 'ja') l = 'en';
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l);
    document.title = S.title[l];
    buttons.forEach(function (b) { var on = b.dataset.lang === l; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    var A = S.aria[l];
    Array.prototype.forEach.call(document.querySelectorAll('.langswitch'), function (sw) { sw.setAttribute('aria-label', A.lang); });
    Array.prototype.forEach.call(document.querySelectorAll('.nav'), function (nv) { nv.setAttribute('aria-label', A.sections); });
    var tt = document.getElementById('totop'); if (tt) { tt.setAttribute('aria-label', A.top); tt.title = A.top; }
    var av = document.querySelector('.avatar'); if (av) { if (av.tagName === 'IMG') av.alt = A.photo; else av.setAttribute('aria-label', A.photo); }
    try { localStorage.setItem('site-lang', l); } catch (e) {}
    updateThemeUI();
    try { var u = new URL(location.href); if (u.searchParams.get('lang') && u.searchParams.get('lang') !== l) { u.searchParams.set('lang', l); history.replaceState(null, '', u); } } catch (e) {}
    setActive();
    setTimeout(fitSidebar, 0);           // 言語でサイドバーの高さが変わる（文言の差し替えが済んでから測る）
  }
  var fromQuery = new URLSearchParams(location.search).get('lang');
  var stored = null; try { stored = localStorage.getItem('site-lang'); } catch (e) {}
  var initial = (fromQuery === 'ja' || fromQuery === 'en') ? fromQuery
              : (stored === 'ja' || stored === 'en') ? stored
              : ((navigator.language || '').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en');
  setLang(initial);
  buttons.forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* ---------- 右下の「↑」ボタン ---------- */
  var top = document.getElementById('totop');
  function toggleTop() { top.classList.toggle('show', window.scrollY > 400); }
  window.addEventListener('scroll', toggleTop, { passive: true });
  toggleTop();
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
