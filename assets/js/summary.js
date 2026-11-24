(function () {
  var SUMMARY_STORAGE_KEY = 'medcalc-summary';

  var COPY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var COPIED_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function getSummaryData() {
    try {
      return JSON.parse(localStorage.getItem(SUMMARY_STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function renderSummary() {
    var container = document.getElementById('summaryContent');
    if (!container) return;

    var data = getSummaryData();
    var keys = Object.keys(data);

    if (keys.length === 0) {
      container.innerHTML = '<div class="summary-empty">Пока ничего не заполнено. Откройте калькулятор и введите данные — результаты появятся здесь автоматически.</div>';
      return;
    }

    // Сортировка по времени добавления
    keys.sort(function (a, b) {
      return (data[a].timestamp || 0) - (data[b].timestamp || 0);
    });

    var html = '<div class="summary-list">';
    keys.forEach(function (key) {
      var item = data[key];
      var cls = item.cls || '';
      html += '<div class="summary-item ' + cls + '">' +
        '<span class="summary-label">' + item.title + '</span>' +
        '<span class="summary-value">' + item.value + (item.unit ? ' ' + item.unit : '') + '</span>' +
        '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
  }

  function copyAllSummary() {
    var data = getSummaryData();
    var keys = Object.keys(data);

    if (keys.length === 0) {
      alert('Сводка пуста');
      return;
    }

    keys.sort(function (a, b) {
      return (data[a].timestamp || 0) - (data[b].timestamp || 0);
    });

    var lines = keys.map(function (key) {
      var item = data[key];
      return item.title + ': ' + item.value + (item.unit ? ' ' + item.unit : '');
    });

    var text = lines.join('\n');

    var btn = document.getElementById('copyAllBtn');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopied(btn);
      }).catch(function () {
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function showCopied(btn) {
    if (!btn) return;
    var originalText = btn.textContent;
    btn.textContent = 'Скопировано!';
    setTimeout(function () {
      btn.textContent = originalText;
    }, 1500);
  }

  function newPatient() {
    if (confirm('Очистить все данные текущего пациента?')) {
      localStorage.removeItem(SUMMARY_STORAGE_KEY);
      renderSummary();

      // Уведомляем все открытые калькуляторы
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: SUMMARY_STORAGE_KEY,
          newValue: null
        }));
      } catch (e) {}
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSummary();

    var copyBtn = document.getElementById('copyAllBtn');
    var newPatientBtn = document.getElementById('newPatientBtn');

    if (copyBtn) copyBtn.addEventListener('click', copyAllSummary);
    if (newPatientBtn) newPatientBtn.addEventListener('click', newPatient);

    // Слушаем изменения из других вкладок
    window.addEventListener('storage', function (e) {
      if (e.key === SUMMARY_STORAGE_KEY) {
        renderSummary();
      }
    });
  });

})();
