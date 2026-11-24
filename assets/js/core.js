(function () {

  var COPY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var COPIED_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function num(id) {
    var el = document.getElementById(id);
    if (!el) return NaN;
    var v = parseFloat(el.value);
    return isNaN(v) ? NaN : v;
  }

  function bind(ids, event, fn) {
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener(event, fn);
    });
  }

  function roundBound(v) {
    if (!isFinite(v)) return v;
    if (Math.abs(v) >= 100) return Math.round(v);
    if (Math.abs(v) >= 10) return Math.round(v * 10) / 10;
    return Math.round(v * 100) / 100;
  }

  function validateInput(input) {
    var val = input.value.trim();
    var errorEl = document.getElementById(input.id + '-error');

    if (!errorEl) return true;

    input.classList.remove('invalid');
    errorEl.classList.remove('visible');
    errorEl.textContent = '';

    if (val === '') return true;

    var parsed = parseFloat(val.replace(',', '.'));

    if (isNaN(parsed)) {
      input.classList.add('invalid');
      errorEl.textContent = 'Введите число';
      errorEl.classList.add('visible');
      return false;
    }

    var min = input.dataset.min ? parseFloat(input.dataset.min) : null;
    var max = input.dataset.max ? parseFloat(input.dataset.max) : null;

    if (min !== null && parsed < min) {
      input.classList.add('invalid');
      errorEl.textContent = 'Минимум: ' + roundBound(min);
      errorEl.classList.add('visible');
      return false;
    }

    if (max !== null && parsed > max) {
      input.classList.add('invalid');
      errorEl.textContent = 'Максимум: ' + roundBound(max);
      errorEl.classList.add('visible');
      return false;
    }

    return true;
  }

  function bindCalc(ids, calcFn) {
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;

      el.addEventListener('input', function () {
        validateInput(el);
        calcFn();
      });

      el.addEventListener('blur', function () {
        validateInput(el);
      });
    });
  }

  function getPanelTitleForResult(resultEl) {
    var panel = resultEl.closest('.panel');
    if (!panel) return '';

    var h2 = panel.querySelector('h2');
    if (!h2) return '';

    return h2.textContent.trim();
  }

  function extractCopyValue(resultEl) {
    var valueEl = resultEl.querySelector('.value');

    if (valueEl) {
      var valText = '';
      var v = valueEl.childNodes;

      for (var i = 0; i < v.length; i++) {
        if (v[i].nodeType === 3) {
          valText += v[i].textContent;
        } else if (v[i].classList && v[i].classList.contains('unit')) {
          valText += v[i].textContent;
        }
      }

      return valText.trim();
    }

    return '';
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();

    try {
      document.execCommand('copy');
      cb();
    } catch (e) {}

    document.body.removeChild(ta);
  }

  function copyToClipboard(text, btn) {
    var showCopied = function () {
      if (btn) {
        btn.classList.add('copied');
        btn.innerHTML = COPIED_ICON;

        setTimeout(function () {
          btn.classList.remove('copied');
          btn.innerHTML = COPY_ICON;
        }, 1500);
      }
    };

    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(showCopied)
        .catch(function () {
          fallbackCopy(text, showCopied);
        });
    } else {
      fallbackCopy(text, showCopied);
    }
  }

  function attachCopyButtons() {
    document.querySelectorAll('.result').forEach(function (resultEl) {
      if (resultEl.querySelector('.copy-btn')) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.title = 'Скопировать результат';
      btn.innerHTML = COPY_ICON;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();

        var raw = extractCopyValue(resultEl);
        if (!raw) return;

        var title = getPanelTitleForResult(resultEl);
        var text = title ? (title + ': ' + raw) : raw;

        copyToClipboard(text, btn);
      });

      resultEl.appendChild(btn);
    });
  }

  function updateCopyButtons() {
    document.querySelectorAll('.result').forEach(function (resultEl) {
      var btn = resultEl.querySelector('.copy-btn');
      if (!btn) return;

      var hasContent = !resultEl.querySelector('.empty-msg') && extractCopyValue(resultEl) !== '';
      btn.classList.toggle('visible', hasContent);
    });
  }

  function showEmpty(el, msg) {
    if (!el) return;

    el.innerHTML = '<span class="empty-msg">' + msg + '</span>';
    el.className = 'result';

    attachCopyButtons();
    updateCopyButtons();
  }

  function render(el, value, unit, tagText, tagCls, refText, extraHtml) {
    if (!el) return;

    var html = '<div class="value">' + value + '<span class="unit">' + (unit || '') + '</span>';

    if (tagText) {
      html += '<span class="tag ' + tagCls + '">' + tagText + '</span>';
    }

    html += '</div>';

    if (refText) {
      html += '<div class="ref">' + refText + '</div>';
    }

    if (extraHtml) {
      html += extraHtml;
    }

    el.innerHTML = html;
    el.className = 'result ' + (tagCls || '');

    attachCopyButtons();
    updateCopyButtons();
  }

  function renderMiniScale(containerEl, value, minVal, maxVal, segments, captionHtml) {
    if (!containerEl) return;

    containerEl.style.display = 'block';

    var markerPos = ((value - minVal) / (maxVal - minVal)) * 100;

    if (markerPos < 0) markerPos = 0;
    if (markerPos > 100) markerPos = 100;

    var zonesHtml = '';
    var prevUntil = minVal;

    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      var segUntil = seg.until;

      var widthPct = ((Math.min(segUntil, maxVal) - prevUntil) / (maxVal - minVal)) * 100;

      if (widthPct > 0) {
        zonesHtml += '<div class="mini-scale-zone ' + seg.class + '" style="width:' + widthPct + '%"></div>';
      }

      prevUntil = segUntil;
    }

    containerEl.innerHTML =
      '<div class="mini-scale-track">' +
        zonesHtml +
        '<div class="mini-scale-marker" style="left:' + markerPos + '%"></div>' +
      '</div>' +
      '<div class="mini-scale-caption">' + captionHtml + '</div>';
  }

  function init() {
    attachCopyButtons();
    updateCopyButtons();
  }

  window.MedCore = {
    num: num,
    bind: bind,
    bindCalc: bindCalc,
    validateInput: validateInput,
    render: render,
    showEmpty: showEmpty,
    renderMiniScale: renderMiniScale,
    attachCopyButtons: attachCopyButtons,
    updateCopyButtons: updateCopyButtons,
    copyToClipboard: copyToClipboard,
    init: init
  };

})();
