/* ================================================
   LetsRandomize.com — Shared UI & Interaction
   Copy-to-clipboard, toast, history, generate, share
   ================================================ */

const App = (function() {
  'use strict';

  function initLetsRandomizeAnalytics() {
    var measurementId = 'G-M7ZMBBB3WB';
    if (!measurementId || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }

  initLetsRandomizeAnalytics();

  // --- Measurement for product validation ---
  var analyticsState = {
    returningBrowser: false,
    storageAvailable: false
  };

  function initAnalyticsState() {
    try {
      var firstSeenKey = 'lr_first_seen_at';
      analyticsState.returningBrowser = !!localStorage.getItem(firstSeenKey);
      if (!analyticsState.returningBrowser) {
        localStorage.setItem(firstSeenKey, new Date().toISOString());
      }
      analyticsState.storageAvailable = true;
    } catch (e) {
      analyticsState.returningBrowser = false;
      analyticsState.storageAvailable = false;
    }
  }

  function getToolName() {
    var parts = window.location.pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
    var rawName = parts[0] === 'tools' && parts[1] ? parts[1] : (parts.join('_') || 'home');
    return rawName.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '').toLowerCase();
  }

  function trackEvent(eventName, params) {
    if (!eventName || typeof window.gtag !== 'function') return;
    var payload = params || {};
    payload.page_path = window.location.pathname;
    payload.experiment_phase = payload.experiment_phase || 'baseline';
    payload.is_returning_browser = analyticsState.returningBrowser ? 'yes' : 'no';
    window.gtag('event', eventName, payload);
  }

  function getBucket(value, buckets) {
    var n = parseInt(value, 10);
    if (!isFinite(n) || n < 0) return 'unknown';
    for (var i = 0; i < buckets.length; i++) {
      if (n <= buckets[i].max) return buckets[i].label;
    }
    return buckets.length ? buckets[buckets.length - 1].label : 'unknown';
  }

  function getListSizeBucket(count) {
    return getBucket(count, [
      { max: 10, label: '1-10' },
      { max: 30, label: '11-30' },
      { max: 100, label: '31-100' },
      { max: Infinity, label: '100+' }
    ]);
  }

  function getUseCountBucket(count) {
    return getBucket(count, [
      { max: 1, label: '1' },
      { max: 3, label: '2-3' },
      { max: 10, label: '4-10' },
      { max: Infinity, label: '10+' }
    ]);
  }

  function getSessionToolUseCount(toolName) {
    try {
      var key = 'lr_session_tool_uses_' + toolName;
      return parseInt(sessionStorage.getItem(key) || '0', 10) || 0;
    } catch (e) {
      return 0;
    }
  }

  function incrementSessionToolUseCount(toolName) {
    var nextCount = getSessionToolUseCount(toolName) + 1;
    try {
      sessionStorage.setItem('lr_session_tool_uses_' + toolName, String(nextCount));
    } catch (e) {}
    return nextCount;
  }

  function trackToolUse(toolName, params) {
    toolName = toolName || getToolName();
    params = params || {};
    var useCount = incrementSessionToolUseCount(toolName);
    var payload = Object.assign({}, params, {
      tool_name: toolName,
      use_count_bucket: getUseCountBucket(useCount)
    });
    trackEvent('tool_used', payload);
    if (useCount > 1) {
      trackEvent('repeat_tool_use', payload);
    }
    return useCount;
  }

  initAnalyticsState();

  // --- Toast Notification ---
  function showToast(message, type) {
    type = type || 'success';
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  // --- Copy to Clipboard ---
  function copyToClipboard(text, btn) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        onCopySuccess(btn);
      }).catch(function() {
        fallbackCopy(text, btn);
      });
    } else {
      fallbackCopy(text, btn);
    }
  }

  function fallbackCopy(text, btn) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      onCopySuccess(btn);
    } catch (e) {
      showToast('Failed to copy', 'error');
    }
    document.body.removeChild(ta);
  }

  function onCopySuccess(btn) {
    showToast('Copied to clipboard!');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.textContent = orig;
        btn.classList.remove('copied');
      }, 1500);
    }
  }

  // --- Generate Button Animation ---
  function animateGenerate(btn) {
    btn.classList.add('generating');
    setTimeout(function() { btn.classList.remove('generating'); }, 600);
  }

  // --- Flash Result ---
  function flashResult(el) {
    if (!el) return;
    el.classList.remove('flash');
    void el.offsetWidth; // force reflow
    el.classList.add('flash');
  }

  // --- History Panel ---
  function getHistoryKey() {
    return 'lr_history_' + window.location.pathname.replace(/\//g, '_');
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(getHistoryKey())) || [];
    } catch (e) {
      return [];
    }
  }

  function addToHistory(value) {
    const history = getHistory();
    history.unshift({
      value: String(value).substring(0, 200),
      time: new Date().toISOString()
    });
    if (history.length > 10) history.length = 10;
    try {
      localStorage.setItem(getHistoryKey(), JSON.stringify(history));
    } catch (e) {}
    renderHistory();
  }

  function clearHistory() {
    try {
      localStorage.removeItem(getHistoryKey());
    } catch (e) {}
    renderHistory();
  }

  function renderHistory() {
    const panel = document.getElementById('history-panel');
    if (!panel) return;
    const history = getHistory();
    const list = panel.querySelector('.history-list');
    if (!list) return;

    if (history.length === 0) {
      list.innerHTML = '<div class="history-empty">No history yet. Generate something!</div>';
      return;
    }

    list.innerHTML = history.map(function(item) {
      const d = new Date(item.time);
      const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return '<div class="history-item"><span>' + escapeHtml(item.value) + '</span><time>' + timeStr + '</time></div>';
    }).join('');
  }

  // --- Share ---
  function shareResult(text, title) {
    title = title || document.title;
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: window.location.href
      }).catch(function() {});
    } else {
      copyToClipboard(window.location.href);
      showToast('Link copied for sharing!');
    }
  }

  // --- FAQ Accordion ---
  function initFAQ() {
    var questions = document.querySelectorAll('.faq-question');
    questions.forEach(function(q) {
      q.addEventListener('click', function() {
        var answer = this.nextElementSibling;
        var isOpen = this.classList.contains('active');
        // Close all
        questions.forEach(function(oq) {
          oq.classList.remove('active');
          oq.nextElementSibling.style.maxHeight = null;
        });
        // Toggle current
        if (!isOpen) {
          this.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // --- Mobile Menu ---
  function initMobileMenu() {
    var btn = document.querySelector('.mobile-menu-btn');
    var nav = document.querySelector('.site-nav');
    if (btn && nav) {
      btn.addEventListener('click', function() {
        nav.classList.toggle('active');
      });
    }
  }

  // --- Tool Search/Filter (for tools hub & homepage) ---
  function initToolSearch() {
    var input = document.getElementById('tool-search');
    if (!input) return;
    input.addEventListener('input', function() {
      var query = this.value.toLowerCase().trim();
      var cards = document.querySelectorAll('.tool-card');
      cards.forEach(function(card) {
        var text = (card.textContent || '').toLowerCase();
        card.style.display = text.indexOf(query) !== -1 ? '' : 'none';
      });
    });
  }

  // --- Category Filter ---
  function initCategoryFilter() {
    var tags = document.querySelectorAll('.category-tag');
    tags.forEach(function(tag) {
      tag.addEventListener('click', function() {
        var cat = this.getAttribute('data-category');
        tags.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        var cards = document.querySelectorAll('.tool-card');
        cards.forEach(function(card) {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Escape HTML ---
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // --- Confetti ---
  function confetti() {
    var colors = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];
    for (var i = 0; i < 50; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.top = '-10px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      piece.style.animationDuration = (1 + Math.random()) + 's';
      document.body.appendChild(piece);
      setTimeout(function(el) { if (el.parentNode) el.parentNode.removeChild(el); }, 3000, piece);
    }
  }

  // --- Init ---
  function init() {
    initMobileMenu();
    initFAQ();
    initToolSearch();
    initCategoryFilter();
    renderHistory();

    // Wire up copy buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('copy-btn')) {
        var target = e.target.getAttribute('data-copy-target');
        var el = document.getElementById(target);
        if (el) {
          copyToClipboard(el.textContent.trim(), e.target);
          trackEvent('copy_result_clicked', {
            tool_name: getToolName(),
            copy_target: target || 'unknown'
          });
        }
      }
    });

    // Wire up clear history buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('clear-btn')) {
        clearHistory();
      }
    });
  }

  // Run init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    showToast: showToast,
    copyToClipboard: copyToClipboard,
    animateGenerate: animateGenerate,
    flashResult: flashResult,
    addToHistory: addToHistory,
    clearHistory: clearHistory,
    renderHistory: renderHistory,
    shareResult: shareResult,
    confetti: confetti,
    escapeHtml: escapeHtml,
    trackEvent: trackEvent,
    trackToolUse: trackToolUse,
    getListSizeBucket: getListSizeBucket,
    getUseCountBucket: getUseCountBucket,
    init: init
  };

})();

if (typeof window !== 'undefined') {
  window.App = App;
}
