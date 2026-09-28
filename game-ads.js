(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';

  // علامة نتأكد بيها
  const badge = document.createElement('div');
  badge.style.cssText = 'position:fixed;bottom:6px;right:6px;background:green;color:#fff;padding:5px 9px;border-radius:8px;font:11px Cairo,sans-serif;z-index:99999999;';
  badge.textContent = 'ads ON';
  if (document.body) document.body.appendChild(badge);
else document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(badge); });

  // دالة فتح الإعلان
  function openAd(){
    window.open(SMARTLINK, '_blank');
  }

  // دالة المكافأة
  function giveCoins(n){
    try {
      if (window.__game && window.__game.state){
        window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + n;
        if (window.__game.update) window.__game.update();
        if (window.__game.saveAll) window.__game.saveAll();
      }
    } catch(e){}
  }

  // زرار +20 عملة
  function addButton(){
    if (document.getElementById('myRewardBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'myRewardBtn';
    btn.textContent = '📺 شاهد إعلان واحصل على 20 🪙';
    btn.style.cssText = 'display:block;width:92%;margin:14px auto;padding:14px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;border:0;border-radius:16px;font:800 15px Cairo,sans-serif;box-shadow:0 6px 0 #8a5c10;';
    btn.onclick = function(){
      btn.disabled = true;
      const old = btn.textContent;
      btn.textContent = '⏳ جاري فتح الإعلان...';
      openAd();
      setTimeout(function(){
        giveCoins(20);
        btn.textContent = '✅ تم! +20 🪙';
        setTimeout(function(){ btn.textContent = old; btn.disabled = false; }, 2500);
      }, 15000);
    };
    const tower = document.getElementById('tower');
    if (tower && tower.parentNode) tower.parentNode.insertBefore(btn, tower);
  }

  // إعلان بعد الخسارة
  let lastLoss = 0;
  function checkLoss(){
    const msg = document.getElementById('message');
    if (!msg) return;
    const t = (msg.textContent || '').trim();
    if (t === checkLoss.last) return;
    checkLoss.last = t;
    if (t.indexOf('قنبلة') !== -1 || t.indexOf('خسرت') !== -1){
      if (Date.now() - lastLoss < 20000) return;
      lastLoss = Date.now();
      openAd();
    }
  }

  // تشغيل
  function boot(){
    addButton();
    setInterval(addButton, 1500);
    setInterval(checkLoss, 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
