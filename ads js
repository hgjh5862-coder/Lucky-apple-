(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  const REWARD = 20;
  const WAIT_SECONDS = 15;

  function isRewardable(){
    // لا تعطي مكافأة لخانات الإعلانات نفسها
    return true;
  }

  function openSmartlink(){
    const w = window.open(SMARTLINK, '_blank');
    if (!w) {
      // لو المتصفح منع النافذة الجديدة، افتح في نفس الصفحة
      window.location.href = SMARTLINK;
    }
  }

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

  function hookAdButton(){
    // نستبدل سلوك زر "شاهد إعلان" القديم
    const oldBtn = document.getElementById('adBtn');
    if (oldBtn) {
      const newBtn = oldBtn.cloneNode(true);
      oldBtn.parentNode.replaceChild(newBtn, oldBtn);
      newBtn.id = 'adBtn';
      newBtn.disabled = false;
      newBtn.textContent = '📺 شاهد إعلان +20 🪙';
      newBtn.addEventListener('click', function(){
        newBtn.disabled = true;
        newBtn.textContent = '⏳ جاري فتح الإعلان...';
        openSmartlink();
        setTimeout(function(){
          giveReward();
          newBtn.textContent = '✅ تم! شكراً لمشاهدتك +20 🪙';
          setTimeout(function(){
            newBtn.textContent = '📺 شاهد إعلان +20 🪙';
            newBtn.disabled = false;
          }, 3000);
        }, WAIT_SECONDS * 1000);
      });
    }

    // برضه نصلح زر الإعلان اللي في "daily-ads-panel"
    const otherBtn = document.getElementById('watchAdBtn');
    if (otherBtn) {
      const nb = otherBtn.cloneNode(true);
      otherBtn.parentNode.replaceChild(nb, otherBtn);
      nb.id = 'watchAdBtn';
      nb.disabled = false;
      nb.textContent = '🎁 شاهد إعلان +20 🪙';
      nb.addEventListener('click', function(){
        nb.disabled = true;
        nb.textContent = '⏳ جاري فتح الإعلان...';
        openSmartlink();
        setTimeout(function(){
          giveReward();
          nb.textContent = '✅ تم! +20 🪙';
          setTimeout(function(){
            nb.textContent = '🎁 شاهد إعلان +20 🪙';
            nb.disabled = false;
          }, 3000);
        }, WAIT_SECONDS * 1000);
      });
    }
  }

  // نشغّل الكود لما الصفحة تخلص تحميل
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookAdButton);
  } else {
    hookAdButton();
  }

  // في حالة إن الأزرار ظهرت متأخر، نراقب الصفحة
  const watcher = setInterval(function(){
    const a = document.getElementById('adBtn');
    const b = document.getElementById('watchAdBtn');
    if ((a && !a.__adsHooked) || (b && !b.__adsHooked)) {
      if (a) a.__adsHooked = true;
      if (b) b.__adsHooked = true;
      hookAdButton();
    }
  }, 2000);

  setTimeout(function(){ clearInterval(watcher); }, 60000);

  console.log('✅ Ads system ready.');
})();
