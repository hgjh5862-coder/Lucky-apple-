(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';

  console.log('🎯 ads.js loaded');

  // ============= 1) نشيل خانة الإعلانات القديمة =============
  const hideStyle = document.createElement('style');
  hideStyle.textContent = `
    #dailyAdsPanel,
    .daily-ads-panel {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
    }
    .ad-recover,
    #adRecover {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    .ad-recover:not(.show) {
      display: none !important;
    }
  `;
  document.head.appendChild(hideStyle);

  // ============= 2) إعلان بيني تلقائي لما اللاعب يخسر =============
  let lastLossTime = 0;
  let interstitialCount = 0;
  const COOLDOWN = 30000; // 30 ثانية بين كل إعلانين
  const MAX_INTERSTITIALS = 5; // 5 إعلانات كحد أقصى في الجلسة

  function showInterstitialAd(){
    const now = Date.now();
    if (now - lastLossTime < COOLDOWN) return;
    if (interstitialCount >= MAX_INTERSTITIALS) return;

    lastLossTime = now;
    interstitialCount++;

    const w = window.open(SMARTLINK, '_blank');
    if (!w) {
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:99999;border:0;background:#000;';
      iframe.src = SMARTLINK;
      document.body.appendChild(iframe);
      setTimeout(() => iframe.remove(), 15000);
    }
  }

  function watchLoss(){
    const msg = document.getElementById('message');
    if (!msg) return;
    const text = (msg.textContent || '').trim();
    if (text === watchLoss.last) return;
    watchLoss.last = text;

    if (/قنبلة|خسرت/.test(text)) {
      setTimeout(showInterstitialAd, 1500);
    }
  }

  // ============= 3) زرار الإعلان بعد الخسارة =============
  function hookAdBtn(){
    const old = document.getElementById('adBtn');
    if (!old) return;
    if (old.getAttribute('data-hooked') === '1') return;

    const clone = old.cloneNode(true);
    clone.setAttribute('data-hooked', '1');
    clone.disabled = false;
    clone.textContent = '📺 شاهد إعلان +20 🪙';
    old.parentNode.replaceChild(clone, old);

    clone.addEventListener('click', function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      if (clone.disabled) return;
      clone.disabled = true;
      const oldText = clone.textContent;
      clone.textContent = '⏳ جاري فتح الإعلان...';

      const w = window.open(SMARTLINK, '_blank');
      if (!w) window.location.href = SMARTLINK;

      setTimeout(function(){
        try {
          if (window.__game && window.__game.state) {
            window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + 20;
            if (window.__game.update) window.__game.update();
            if (window.__game.saveAll) window.__game.saveAll();
          }
          if (window.__audio && window.__audio.coin) window.__audio.coin();
        } catch(err){}
        clone.textContent = '✅ تم! +20 🪙';
        setTimeout(function(){
          clone.textContent = oldText;
          clone.disabled = false;
        }, 2500);
      }, 15000);
    });
  }

  // ============= 4) التشغيل =============
  function boot(){
    const oldPanel = document.getElementById('dailyAdsPanel');
    if (oldPanel) oldPanel.remove();

    hookAdBtn();
    setInterval(hookAdBtn, 1000);
    setInterval(watchLoss, 800);

    setInterval(function(){
      const p = document.getElementById('dailyAdsPanel');
      if (p) p.remove();
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
