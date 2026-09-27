// ============ ADS SYSTEM ============
(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';

  function makeBadge(t){
    const b = document.createElement('div');
    b.style.cssText = 'position:fixed;bottom:6px;right:6px;background:red;color:#fff;padding:3px 7px;border-radius:8px;font:10px Cairo,sans-serif;z-index:9999999;';
    b.textContent = t;
    document.body.appendChild(b);
  }

  function removePanel(){
    const p = document.getElementById('dailyAdsPanel');
    if (p) p.remove();
  }

  let last = 0;
  function fireAd(){
    if (Date.now() - last < 30000) return;
    last = Date.now();
    const w = window.open(SMARTLINK, '_blank');
    if (!w) window.location.href = SMARTLINK;
  }

  function start(){
    makeBadge('ads ON ✅');
    removePanel();
    setInterval(removePanel, 500);

    setInterval(function(){
      const msg = document.getElementById('message');
      if (!msg) return;
      const t = (msg.textContent || '').trim();
      if (/قنبلة|خسرت/.test(t) && t !== start.lastMsg) {
        start.lastMsg = t;
        setTimeout(fireAd, 1500);
      }
    }, 500);

    const rec = document.getElementById('adRecover');
    if (rec) rec.classList.add('show');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
// ============ END ADS SYSTEM ============
