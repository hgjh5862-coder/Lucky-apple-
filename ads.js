(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';

  // نظهر الأزرار المخفية
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
    }
    .ad-recover.show { display: block !important; }
  `;
  document.head.appendChild(style);

  // نمسك أي ضغطة على زرار الإعلان قبل أي كود تاني
  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('#watchAdBtn, #adBtn');
    if (!btn) return;

    // نوقف أي كود قديم
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    if (btn.disabled) return;
    btn.disabled = true;
    const oldText = btn.textContent;
    btn.textContent = '⏳ جاري فتح الإعلان...';

    // نفتح الإعلان
    const w = window.open(SMARTLINK, '_blank');
    if (!w) window.location.href = SMARTLINK;

    // ندي المكافأة بعد 15 ثانية
    setTimeout(function(){
      try {
        if (window.__game && window.__game.state) {
          window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + 20;
          if (window.__game.update) window.__game.update();
          if (window.__game.saveAll) window.__game.saveAll();
        }
        if (window.__audio && window.__audio.coin) window.__audio.coin();
      } catch(err){}
      btn.textContent = '✅ تم! +20 🪙';
      setTimeout(function(){
        btn.textContent = oldText;
        btn.disabled = false;
      }, 2500);
    }, 15000);
  }, true);

  console.log('✅ Ads system ready.');
})();
