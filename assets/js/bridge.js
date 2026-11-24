(function () {
  var SUMMARY_KEY = 'medcalc-summary';

  function saveToSummary(id, title, value, unit, cls) {
    if (!value || value === '') return;

    var data = {};
    try {
      data = JSON.parse(localStorage.getItem(SUMMARY_KEY)) || {};
    } catch (e) {
      data = {};
    }

    data[id] = {
      title: title,
      value: value,
      unit: unit || '',
      cls: cls || '',
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(SUMMARY_KEY, JSON.stringify(data));
    } catch (e) {}

    // Уведомляем другие вкладки
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

  // Перехватываем MedCore.render и MedCore.showEmpty
  if (window.MedCore) {
    var _origRender = MedCore.render;
    var _origShowEmpty = MedCore.showEmpty;

    MedCore.render = function (el, value, unit, tagText, tagCls, refText, extraHtml) {
      _origRender(el, value, unit, tagText, tagCls, refText, extraHtml);

      var panel = el.closest('.panel');
      if (!panel) return;

      var panelId = panel.id.replace('panel-', '');
      var h2 = panel.querySelector('h2');
      var title = h2 ? h2.textContent.trim() : panelId;

      // Извлекаем текстовое значение
      var valueEl = el.querySelector('.value');
      var textValue = '';
      if (valueEl) {
        var nodes = valueEl.childNodes;
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].nodeType === 3) {
            textValue += nodes[i].textContent;
          } else if (nodes[i].classList && nodes[i].classList.contains('unit')) {
            textValue += nodes[i].textContent;
          }
        }
        textValue = textValue.trim();
      }

      if (textValue) {
        saveToSummary(panelId, title, textValue, unit, tagCls);
      }
    };

    MedCore.showEmpty = function (el, msg) {
      _origShowEmpty(el, msg);

      var panel = el.closest('.panel');
      if (!panel) return;

      var panelId = panel.id.replace('panel-', '');
      clearFromSummary(panelId);
    };
  }

  // Слушаем очистку от главной страницы («Новый пациент»)
  window.addEventListener('storage', function (e) {
    if (e.key === SUMMARY_KEY && e.newValue === null) {
      // Главная страница очистила сводку — сбрасываем поля калькулятора
      document.querySelectorAll('input[type="number"], input[type="text"]').forEach(function (inp) {
        inp.value = '';
        inp.classList.remove('invalid');
      });
      document.querySelectorAll('select:not(.unit-select)').forEach(function (sel) {
        sel.selectedIndex = 0;
      });
      document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(function (cb) {
        cb.checked = false;
      });
      document.querySelectorAll('.result').forEach(function (el) {
        el.className = 'result';
        el.innerHTML = '<span class="empty-msg">Заполните поля для расчёта</span>';
      });
      document.querySelectorAll('.mini-scale').forEach(function (el) {
        el.style.display = 'none';
      });
    }
  });

})();
