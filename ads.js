(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  const REWARD = 20;
  const WAIT_SECONDS = 15;

  // 1) نظهر الأزرار المخفية بالـ CSS
  const style = document.createElement('style');
  style.textContent = `
    .daily-ads-panel,
    .ad-recover,
    .fortune-ad-btn,
    .ad-slot,
    body.in-game .ad-recover,
    body.in-game .ad-slot,
    body.in-game .daily-ads-panel {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      max-height: none !important;
      height: auto !important;
      overflow: visible !important;
    }
    .ad-recover.show { display: block !important; }
  `;
  document.head.appendChild(style);

  // 2) دالة فتح الرابط الذكي
  function openSmartlink(){
    const w = window.open(SMARTLINK, '_blank');
    if (!w) window.location.href = SMARTLINK;
  }

  // 3) دالة إعطاء المكافأة
  function giveReward(){
    try {
      if (window.__game && window.__game.state) {
        window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + REWARD;
        if (window.__game.update) window.__game.update();
        if (window.__game.saveAll) window.__game.saveAll();
      }
      if (window.__audio && window.__audio.coin) window.__audio.coin();
    } catch(e) {}
  }

  // 4) ربط الأزرار
  function hookButtons(){
    // زرار "شاهد إعلان" في قسم الإعلانات اليومية
    const adsBtn = document.getElementById('watchAdBtn');
    if (adsBtn && !adsBtn.__adsHooked) {
      adsBtn.__adsHooked = true;
      adsBtn.disabled = false;
      adsBtn.textContent = '🎁 اضغط هنا وانتظر 15 ثانية +20 🪙';
      adsBtn.onclick = null;
      adsBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        adsBtn.disabled = true;
        adsBtn.textContent = '⏳ جاري فتح الإعلان...';
        openSmartlink();
        setTimeout(function(){
          giveReward();
          adsBtn.textContent = '✅ تم! +20 🪙';
          setTimeout(function(){
            adsBtn.textContent = '🎁 اضغط هنا وانتظر 15 ثانية +20 🪙';
            adsBtn.disabled = false;
          }, 3000);
        }, WAIT_SECONDS * 1000);
      }, true);
    }

    // زرار "شاهد إعلان واحصل على عملات" (اللي بعد الخسارة)
    const adBtn = document.getElementById('adBtn');
    if (adBtn && !adBtn.__adsHooked) {
      adBtn.__adsHooked = true;
      adBtn.disabled = false;
      adBtn.textContent = '📺 شاهد إعلان +20 🪙';
      adBtn.onclick = null;
      adBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        adBtn.disabled = true;
        adBtn.textContent = '⏳ جاري فتح الإعلان...';
        openSmartlink();
        setTimeout(function(){
          giveReward();
          adBtn.textContent = '✅ تم! +20 🪙';
          setTimeout(function(){
            adBtn.textContent = '📺 شاهد إعلان +20 🪙';
            adBtn.disabled = false;
          }, 3000);
        }, WAIT_SECONDS * 1000);
      }, true);
    }

    // نظهر الأزرار
    const rec = document.getElementById('adRecover');
    if (rec) rec.classList.add('show');
    const panel = document.getElementById('dailyAdsPanel');
    if (panel) panel.style.display = 'block';
  }

  // 5) نشغّل الكود
  function boot(){
    hookButtons();
    setInterval(hookButtons, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  console.log('✅ Ads system ready with visible buttons.');
})();
