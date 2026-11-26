(function () {
  var SUMMARY_KEY = 'medcalc-summary';
  var THEME_KEY = 'medcalc-theme';

  // ====== Работа со сводкой ======
  function saveToSummary(id, title, value, unit, cls) {
    if (!value || value === '') return;

    var data = {};
    try { data = JSON.parse(localStorage.getItem(SUMMARY_KEY)) || {}; } catch (e) { data = {}; }

    data[id] = {
      title: title,
      value: value + (unit ? ' ' + unit : ''),
      unit: '',
      cls: cls || '',
      timestamp: Date.now()
    };

    try { localStorage.setItem(SUMMARY_KEY, JSON.stringify(data)); } catch (e) {}

    try {
      window.dispatchEvent(new StorageEvent('storage', {
        key: SUMMARY_KEY,
        newValue: JSON.stringify(data)
      }));
    } catch (e) {}
  }

  function clearFromSummary(id) {
    try {
      var data = JSON.parse(localStorage.getItem(SUMMARY_KEY)) || {};
      if (data[id]) {
        delete data[id];
        localStorage.setItem(SUMMARY_KEY, JSON.stringify(data));
        window.dispatchEvent(new StorageEvent('storage', {
          key: SUMMARY_KEY,
          newValue: JSON.stringify(data)
        }));
      }
    } catch (e) {}
  }

  // ====== НАДЁЖНЫЙ ПЕРЕХВАТ MedCore.render ======
  function hookMedCore() {
    if (!window.MedCore) return false;
    if (window.MedCore.__hooked) return true;
    if (typeof MedCore.render !== 'function') return false;

    var _origRender = MedCore.render;
    var _origShowEmpty = MedCore.showEmpty;

    MedCore.render = function (el, value, unit, tagText, tagCls, refText, extraHtml) {
      _origRender.call(this, el, value, unit, tagText, tagCls, refText, extraHtml);

      var panel = el.closest('.panel');
      if (!panel) return;

      var panelId = panel.id.replace('panel-', '');
      var h2 = panel.querySelector('h2');
      var title = h2 ? h2.textContent.trim() : panelId;

      if (value !== undefined && value !== null && value !== '' && value !== '—') {
        var fullValue = String(value) + (unit ? ' ' + unit : '');
        saveToSummary(panelId, title, fullValue, '', tagCls);
      }
    };

    MedCore.showEmpty = function (el, msg) {
      _origShowEmpty.call(this, el, msg);
      var panel = el.closest('.panel');
      if (!panel) return;
      clearFromSummary(panel.id.replace('panel-', ''));
    };

    window.MedCore.__hooked = true;
    return true;
  }

  if (!hookMedCore()) {
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      if (hookMedCore() || attempts > 50) clearInterval(interval);
    }, 100);
  }

  // ====== Слушаем очистку от главной страницы («Новый пациент») ======
  window.addEventListener('storage', function (e) {
    if (e.key === SUMMARY_KEY && e.newValue === null) {
      document.querySelectorAll('input[type="number"], input[type="text"]').forEach(function (inp) {
        inp.value = '';
        inp.classList.remove('invalid');
      });
      document.querySelectorAll('select:not(.unit-select)').forEach(function (sel) { sel.selectedIndex = 0; });
      document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(function (cb) { cb.checked = false; });
      document.querySelectorAll('.result').forEach(function (el) {
        el.className = 'result';
        el.innerHTML = '<span class="empty-msg">Заполните поля для расчёта</span>';
      });
      document.querySelectorAll('.mini-scale').forEach(function (el) { el.style.display = 'none'; });
    }
  });

  // ====== ТЁМНАЯ ТЕМА ======
  function initTheme() {
    var savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);

    var headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;

    var switcher = document.createElement('div');
    switcher.className = 'theme-switch';
    switcher.innerHTML =
      '<button type="button" class="theme-btn" data-theme="light" title="Светлая тема">☀️</button>' +
      '<button type="button" class="theme-btn" data-theme="dark" title="Тёмная тема">🌙</button>';

    switcher.querySelectorAll('.theme-btn').forEach(function (btn) {
      if (btn.dataset.theme === savedTheme) btn.classList.add('active');
      btn.addEventListener('click', function () {
        var newTheme = btn.dataset.theme;
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
        switcher.querySelectorAll('.theme-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });

    var homeLink = headerControls.querySelector('.file-btn');
    if (homeLink) headerControls.insertBefore(switcher, homeLink);
    else headerControls.appendChild(switcher);
  }

  function applyTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-gray');
    if (theme === 'dark') document.body.classList.add('theme-dark');
    else if (theme === 'gray') document.body.classList.add('theme-gray');
  }

  // ====== ПЛАВАЮЩАЯ ПАНЕЛЬ СВОДКИ ======
  function initFloatingSummary() {
    var path = window.location.pathname;
    if (path.endsWith('/index.html') || path === '/' || path.endsWith('/tools/ocr.html')) return;

    if (!document.getElementById('floating-summary-styles')) {
      var style = document.createElement('style');
      style.id = 'floating-summary-styles';
      style.textContent = `
        .floating-summary-fab {
          position: fixed; right: 20px; bottom: 20px;
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; z-index: 999;
          transition: transform .18s, box-shadow .18s;
        }
        .floating-summary-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
        }
        .floating-summary-fab .badge {
          position: absolute; top: -4px; right: -4px;
          background: var(--danger); color: #fff;
          border-radius: 10px; padding: 2px 7px;
          font-size: .75rem; font-weight: 700;
          min-width: 20px; text-align: center;
        }
        .floating-summary-panel {
          position: fixed; right: 20px; bottom: 90px;
          width: 340px; max-height: 70vh;
          background: var(--card); border: 1.5px solid var(--border);
          border-radius: 14px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          z-index: 999; display: none; flex-direction: column; overflow: hidden;
        }
        .floating-summary-panel.open { display: flex; }
        .floating-summary-header {
          padding: 14px 16px; border-bottom: 1.5px solid var(--border);
          display: flex; justify-content: space-between; align-items: center; gap: 10px;
        }
        .floating-summary-title { font-size: 1rem; font-weight: 700; color: var(--text); margin: 0; }
        .floating-summary-close {
          background: none; border: none; color: var(--muted);
          cursor: pointer; font-size: 1.3rem; padding: 0 4px; line-height: 1;
        }
        .floating-summary-close:hover { color: var(--danger); }
        .floating-summary-body { padding: 12px 16px; overflow-y: auto; flex: 1; }
        .floating-summary-empty {
          text-align: center; color: var(--muted); font-style: italic;
          padding: 20px 8px; font-size: .9rem;
        }
        .floating-summary-list { display: flex; flex-direction: column; gap: 6px; }
        .floating-summary-item {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 6px 0; border-bottom: 1px solid var(--border); font-size: .88rem;
        }
        .floating-summary-item:last-child { border-bottom: none; }
        .floating-summary-label {
          color: var(--muted); flex: 1; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap; padding-right: 8px;
        }
        .floating-summary-value {
          font-weight: 700; color: var(--text); text-align: right; white-space: nowrap;
        }
        .floating-summary-footer {
          padding: 10px 16px; border-top: 1.5px solid var(--border); display: flex; gap: 8px;
        }
        .floating-summary-footer a {
          flex: 1; text-align: center; padding: 8px 10px;
          background: var(--accent); color: #fff; text-decoration: none;
          border-radius: 8px; font-size: .85rem; font-weight: 600;
          transition: background .18s;
        }
        .floating-summary-footer a:hover { background: #1d4ed8; }
        @media (max-width: 480px) {
          .floating-summary-panel { width: calc(100vw - 40px); right: 20px; left: 20px; }
        }
      `;
      document.head.appendChild(style);
    }

    var fab = document.createElement('button');
    fab.className = 'floating-summary-fab';
    fab.title = 'Сводка по пациенту';
    fab.innerHTML = '📋<span class="badge" id="floatingSummaryBadge" style="display:none">0</span>';
    document.body.appendChild(fab);

    var panel = document.createElement('div');
    panel.className = 'floating-summary-panel';
    panel.id = 'floatingSummaryPanel';
    panel.innerHTML = `
      <div class="floating-summary-header">
        <h3 class="floating-summary-title">Сводка</h3>
        <button class="floating-summary-close" id="floatingSummaryClose" title="Закрыть">×</button>
      </div>
      <div class="floating-summary-body" id="floatingSummaryBody">
        <div class="floating-summary-empty">Пока ничего не заполнено</div>
      </div>
      <div class="floating-summary-footer">
        <a href="../../index.html" target="_blank" rel="noopener">Открыть полную сводку →</a>
      </div>
    `;
    document.body.appendChild(panel);

    var body = document.getElementById('floatingSummaryBody');
    var badge = document.getElementById('floatingSummaryBadge');
    var closeBtn = document.getElementById('floatingSummaryClose');

    function render() {
      var data = {};
      try { data = JSON.parse(localStorage.getItem(SUMMARY_KEY)) || {}; } catch (e) {}

      var keys = Object.keys(data);
      if (keys.length === 0) {
        body.innerHTML = '<div class="floating-summary-empty">Пока ничего не заполнено</div>';
        badge.style.display = 'none';
        return;
      }

      keys.sort(function (a, b) { return (data[a].timestamp || 0) - (data[b].timestamp || 0); });

      var html = '<div class="floating-summary-list">';
      keys.forEach(function (key) {
        var item = data[key];
        html += '<div class="floating-summary-item">' +
          '<span class="floating-summary-label">' + item.title + '</span>' +
          '<span class="floating-summary-value">' + item.value + '</span>' +
          '</div>';
      });
      html += '</div>';
      body.innerHTML = html;

      badge.textContent = keys.length;
      badge.style.display = 'inline-block';
    }

    fab.addEventListener('click', function () {
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) render();
    });

    closeBtn.addEventListener('click', function () { panel.classList.remove('open'); });

    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && !fab.contains(e.target) && panel.classList.contains('open')) {
        panel.classList.remove('open');
      }
    });

    window.addEventListener('storage', function (e) {
      if (e.key === SUMMARY_KEY && panel.classList.contains('open')) render();
    });

    var _origSave = saveToSummary;
    saveToSummary = function () {
      _origSave.apply(this, arguments);
      if (panel.classList.contains('open')) render();
    };

    render();
  }

  function initAll() {
    initTheme();
    initFloatingSummary();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();

})();
