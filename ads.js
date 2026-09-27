(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';

  // نطبع رسالة نتأكد إن الملف اتحمّل
  console.log('🎯 ads.js loaded');

  function hookAllButtons(){
    ['watchAdBtn', 'adBtn'].forEach(function(id){
      const old = document.getElementById(id);
      if (!old) return;
      if (old.getAttribute('data-hooked') === '1') return;

      // نستبدل الزرار بنسخة جديدة (ده بيمسح كل الأحداث القديمة)
      const clone = old.cloneNode(true);
      clone.setAttribute('data-hooked', '1');
      clone.disabled = false;
      old.parentNode.replaceChild(clone, old);

      // نغيّر النص
      if (id === 'watchAdBtn') {
        clone.textContent = '🎁 شاهد إعلان +20 🪙';
      } else {
        clone.textContent = '📺 شاهد إعلان +20 🪙';
      }

      // نحط الـ handler الجديد
      clone.addEventListener('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        if (clone.disabled) return;
        clone.disabled = true;
        const oldText = clone.textContent;
        clone.textContent = '⏳ جاري فتح الإعلان...';

        // نفتح الرابط الذكي
        const w = window.open(SMARTLINK, '_blank');
        if (!w) {
          window.location.href = SMARTLINK;
        }

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
    });

    // نظهر الأزرار المخفية
    ['adRecover', 'dailyAdsPanel'].forEach(function(id){
      const el = document.getElementById(id);
      if (el) el.style.cssText = 'display:block!important;visibility:visible!important;opacity:1!important;';
    });
  }

  // نشغّل فوراً، وبعد كل ثانية نتأكد
  hookAllButtons();
  setInterval(hookAllButtons, 1000);

  // لو الصفحة لسه بتحمّل
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookAllButtons);
  }
})();
