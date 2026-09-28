(function(){
  'use strict';

  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  const AD_DURATION = 15000;
  const REWARD_COINS = 20;
  const LOSS_COOLDOWN = 20000;
  const WITHDRAW_REQ = 30;
  const WHEEL_DAILY = 10;
  const STORAGE = { withdraw: 'lucky_withdraw_v2', wheel: 'lucky_wheel_v2' };

  const $ = (id) => document.getElementById(id);
  const now = () => Date.now();
  const todayKey = () => {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  };

  // ============ Overlay ============
  let ovTicker = null;
  function ensureOverlay(){
    let ov = $('adsTopOverlay');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.id = 'adsTopOverlay';
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,#0a1410,#1a3220);color:#fff;padding:14px 16px;z-index:2147483647;text-align:center;font:700 14px Cairo,sans-serif;border-bottom:2px solid #ffd96d;box-shadow:0 8px 30px rgba(0,0,0,.7);transform:translateY(-100%);transition:transform .3s ease;pointer-events:none;';
    ov.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><span style="font-size:20px;">📺</span><span id="adsOvText">جاري عرض الإعلان...</span><span id="adsOvTimer" style="display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;background:#ffd96d;color:#2a1900;border-radius:50%;font:900 18px Cairo,sans-serif;">15</span></div><div style="margin-top:6px;font-size:11px;color:#ffb3b3;">⚠️ لا تغلق الإعلان حتى انتهاء العدّاد</div><div style="margin-top:8px;height:6px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden;"><div id="adsOvBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .2s;"></div></div>';
    document.body.appendChild(ov);
    return ov;
  }
  function showOverlay(sec, label){
    const ov = ensureOverlay();
    $('adsOvText').textContent = label || 'جاري عرض الإعلان...';
    ov.style.transform = 'translateY(0)';
    let left = sec;
    $('adsOvTimer').textContent = left;
    $('adsOvBar').style.width = '0%';
    if (ovTicker) clearInterval(ovTicker);
    ovTicker = setInterval(function(){
      left--;
      if (left < 0) left = 0;
      $('adsOvTimer').textContent = left;
      $('adsOvBar').style.width = ((sec - left) / sec * 100) + '%';
      if (left <= 0) clearInterval(ovTicker);
    }, 1000);
  }
  function hideOverlay(){
    const ov = $('adsTopOverlay');
    if (ov) ov.style.transform = 'translateY(-100%)';
    if (ovTicker) { clearInterval(ovTicker); ovTicker = null; }
  }

  // ============ Open Ad (iframe overlay) ============
  function openAd(){
    if (window.WebToApk && window.WebToApk.openExternal) { window.WebToApk.openExternal(SMARTLINK); return; }
if (window.AppCreator24 && window.AppCreator24.openExternal) { window.AppCreator24.openExternal(SMARTLINK); return; }
    const existing = $('adsFrameOverlay');
    if (existing) existing.remove();
    const ov = document.createElement('div');
    ov.id = 'adsFrameOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147483600;background:#000;display:flex;flex-direction:column;';
    const bar = document.createElement('div');
    bar.style.cssText = 'background:#1a1a1a;color:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;font:700 13px Cairo,sans-serif;border-bottom:2px solid #ffd96d;';
    bar.innerHTML = '<span>📺 الإعلان</span><button id="adsFrameClose" style="background:#ffd96d;color:#2a1900;border:0;border-radius:8px;padding:6px 14px;font:800 12px Cairo,sans-serif;cursor:pointer;">إغلاق ✕</button>';
    const iframe = document.createElement('iframe');
    iframe.src = SMARTLINK;
    iframe.style.cssText = 'flex:1;width:100%;border:0;background:#000;';
    iframe.setAttribute('allow','autoplay; encrypted-media');
    ov.appendChild(bar);
    ov.appendChild(iframe);
    document.body.appendChild(ov);
    $('adsFrameClose').onclick = function(){ ov.remove(); };
    setTimeout(function(){ if (ov.parentNode) ov.remove(); }, 20000);
  }

  // ============ Hide old ad panel ============
  const hs = document.createElement('style');
  hs.textContent = '#dailyAdsPanel, .daily-ads-panel { display:none !important; } .ad-recover { display:block !important; } .ad-recover:not(.show) { display:none !important; }';
  document.head.appendChild(hs);

  function removeOldPanel(){ const p = $('dailyAdsPanel'); if (p) p.remove(); }

  // ============ Loss Ad ============
  let lastLossAd = 0, lossBusy = false;
  function fireLossAd(){
    if (lossBusy) return;
    if (now() - lastLossAd < LOSS_COOLDOWN) return;
    lossBusy = true; lastLossAd = now();
    showOverlay(15, '🎯 إعلان بعد الخسارة');
    openAd();
    setTimeout(function(){ hideOverlay(); lossBusy = false; }, AD_DURATION);
  }
  function watchAdRecover(){
    const rec = $('adRecover');
    if (!rec || rec.__lossWatched) return;
    rec.__lossWatched = true;
    const obs = new MutationObserver(function(){ if (rec.classList.contains('show')) fireLossAd(); });
    obs.observe(rec, { attributes: true, attributeFilter: ['class','style'] });
    if (rec.classList.contains('show')) fireLossAd();
  }

  // ============ Reward Button ============
  let rewardBusy = false;
  function createRewardButton(){
    if ($('myRewardBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'myRewardBtn';
    btn.type = 'button';
    btn.textContent = '📺 شاهد إعلان واحصل على 20 🪙';
    btn.style.cssText = 'display:block;width:92%;margin:14px auto;padding:14px 12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;border:0;border-radius:16px;font:800 15px Cairo,sans-serif;cursor:pointer;box-shadow:0 6px 0 #8a5c10,0 10px 22px rgba(0,0,0,.4);position:relative;z-index:100;';
    btn.addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (btn.disabled || rewardBusy) return;
      rewardBusy = true; btn.disabled = true;
      const orig = btn.textContent;
      btn.textContent = '⏳ جاري فتح الإعلان...';
      showOverlay(15, '🎁 إعلان مكافأة +20 🪙');
      openAd();
      setTimeout(function(){
        hideOverlay();
        try {
          if (window.__game && window.__game.state) {
            window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + REWARD_COINS;
            if (window.__game.update) window.__game.update();
            if (window.__game.saveAll) window.__game.saveAll();
          }
          if (window.__audio && window.__audio.coin) window.__audio.coin();
        } catch(err){}
        btn.textContent = '✅ تم! +20 🪙';
        setTimeout(function(){ btn.textContent = orig; btn.disabled = false; rewardBusy = false; }, 2500);
      }, AD_DURATION);
    });
    const tower = $('tower');
    if (tower && tower.parentNode) tower.parentNode.insertBefore(btn, tower);
  }

  // ============ Withdraw (30 ads) ============
  function loadW(){ try { const d = JSON.parse(localStorage.getItem(STORAGE.withdraw) || '{}'); return { completed:Number(d.completed)||0, pendingStart:Number(d.pendingStart)||0, counted:!!d.counted }; } catch(e){ return { completed:0, pendingStart:0, counted:false }; } }
  function saveW(d){ try { localStorage.setItem(STORAGE.withdraw, JSON.stringify(d)); } catch(e){} }
  function tickW(){ const d = loadW(); if (d.pendingStart && !d.counted && now() - d.pendingStart >= AD_DURATION){ d.completed = Math.min(WITHDRAW_REQ, d.completed + 1); d.counted = true; d.pendingStart = 0; saveW(d); } return d; }

  function injectWithdrawBox(){
    const panel = $('withdrawPanel');
    if (!panel || $('adReqBox')) return;
    const box = document.createElement('div');
    box.id = 'adReqBox';
    box.style.cssText = 'margin:14px 0;padding:14px;border-radius:14px;background:rgba(255,215,100,.08);border:1px solid rgba(255,215,100,.3);direction:rtl;';
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;color:#ffd96d;">📺 متطلبات السحب</span><span id="adReqCounter" style="font-weight:900;color:#fff;">0 / ' + WITHDRAW_REQ + '</span></div><div style="height:8px;background:rgba(255,255,255,.1);border-radius:5px;overflow:hidden;margin-bottom:10px;"><div id="adReqBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .3s;"></div></div><div style="font-size:11px;color:rgba(255,255,255,.78);margin-bottom:10px;line-height:1.8;">⚠️ لسحب أرباحك، لازم تتفرج على <b style="color:#ffd96d;">' + WITHDRAW_REQ + ' إعلان كامل</b>.<br>مدة كل إعلان: <b>15 ثانية</b>. لو قفلت الإعلان قبل الوقت، <b>لن يُحسب</b>.</div><button id="adReqBtn" type="button" style="width:100%;padding:12px;border:0;border-radius:12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;font:800 14px Cairo,sans-serif;cursor:pointer;">📺 شاهد إعلان للسحب (0/' + WITHDRAW_REQ + ')</button>';
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (submit && submit.parentNode) submit.parentNode.insertBefore(box, submit);
    else panel.appendChild(box);
    $('adReqBtn').addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      const d = loadW();
      if (d.completed >= WITHDRAW_REQ) return;
      if (d.pendingStart && !d.counted) return;
      d.pendingStart = now(); d.counted = false; saveW(d);
      showOverlay(15, '📺 إعلان للسحب (' + d.completed + '/' + WITHDRAW_REQ + ')');
      openAd();
      updateWUI();
    });
  }

  function updateWUI(){
    const d = tickW();
    const c = $('adReqCounter'), bar = $('adReqBar'), ab = $('adReqBtn');
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (c) c.textContent = d.completed + ' / ' + WITHDRAW_REQ;
    if (bar) bar.style.width = (d.completed / WITHDRAW_REQ * 100) + '%';
    if (submit){
      if (d.completed < WITHDRAW_REQ){ submit.disabled = true; submit.style.opacity = '.5'; submit.textContent = '🔒 شاهد ' + (WITHDRAW_REQ - d.completed) + ' إعلان إضافي'; }
      else { submit.disabled = false; submit.style.opacity = '1'; submit.textContent = '📤 إرسال طلب السحب'; }
    }
    if (ab){
      if (d.completed >= WITHDRAW_REQ){ ab.disabled = true; ab.textContent = '✅ أكملت جميع الإعلانات'; }
      else if (d.pendingStart && !d.counted){ ab.disabled = true; const l = Math.max(0, Math.ceil((AD_DURATION - (now() - d.pendingStart)) / 1000)); ab.textContent = '⏳ ' + l + ' ثانية...'; }
      else { ab.disabled = false; ab.textContent = '📺 شاهد إعلان للسحب (' + d.completed + '/' + WITHDRAW_REQ + ')'; }
    }
  }

  function resetWithdrawAfterSubmit(){
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (!submit || submit.__adsReset) return;
    submit.__adsReset = true;
    submit.addEventListener('click', function(){
      setTimeout(function(){ saveW({ completed:0, pendingStart:0, counted:false }); updateWUI(); }, 800);
    });
  }

  // ============ Wheel (10 spins) ============
  function loadWheel(){ try { const d = JSON.parse(localStorage.getItem(STORAGE.wheel) || '{}'); if (d.day !== todayKey()) return { day: todayKey(), spins: 0 }; return { day: d.day, spins: Number(d.spins)||0 }; } catch(e){ return { day: todayKey(), spins: 0 }; } }
  function saveWheel(d){ try { localStorage.setItem(STORAGE.wheel, JSON.stringify(d)); } catch(e){} }
  let wheelBusy = false;

  function hookWheel(){
    const old = $('fortuneSpinBtn');
    if (!old || old.__wheelHooked) return;
    old.__wheelHooked = true;
    const clone = old.cloneNode(true);
    old.parentNode.replaceChild(clone, old);
    clone.id = 'fortuneSpinBtn';
    const d = loadWheel();
    const left = Math.max(0, WHEEL_DAILY - d.spins);
    clone.textContent = left > 0 ? '📺 شاهد إعلان للحصول على لفة (' + left + ' متبقية)' : '🚫 خلصت لفات النهاردة - ارجع بكرة';
    clone.disabled = left <= 0;
    clone.addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (wheelBusy) return;
      if (loadWheel().spins >= WHEEL_DAILY) return;
      wheelBusy = true; clone.disabled = true;
      clone.textContent = '⏳ جاري فتح الإعلان...';
      showOverlay(15, '🎡 إعلان لفة العجلة');
      openAd();
      setTimeout(function(){
        hideOverlay();
        const cur = loadWheel();
        cur.spins = Math.min(WHEEL_DAILY, cur.spins + 1);
        saveWheel(cur);
        spinWheel();
        const nl = Math.max(0, WHEEL_DAILY - cur.spins);
        clone.textContent = nl > 0 ? '📺 شاهد إعلان للحصول على لفة (' + nl + ' متبقية)' : '🚫 خلصت لفات النهاردة - ارجع بكرة';
        clone.disabled = nl <= 0;
        wheelBusy = false;
        const res = $('fortuneWheelResult');
        if (res) res.textContent = '🎯 متبقي ' + nl + ' لفة النهاردة';
      }, AD_DURATION);
    });
  }

  function spinWheel(){
    const wheel = $('fortuneWheel');
    if (!wheel) return;
    const REWARDS = [25,50,100,10,250,75,150,40];
    const index = Math.floor(Math.random() * REWARDS.length);
    const reward = REWARDS[index];
    const turns = 6 + Math.floor(Math.random() * 3);
    const target = 360 - index * 45 - 22.5;
    wheel.style.transform = 'rotate(' + (turns * 360 + target) + 'deg)';
    setTimeout(function(){
      try {
        if (window.__game && window.__game.state){
          window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + reward;
          if (window.__game.update) window.__game.update();
          if (window.__game.saveAll) window.__game.saveAll();
        }
        if (window.__audio && window.__audio.coin) window.__audio.coin();
      } catch(err){}
      const res = $('fortuneWheelResult');
      if (res) res.textContent = '🎉 مبروك! كسبت ' + reward + ' 🪙';
    }, 4700);
  }

  // ============ Refresh + Boot ============
  function refresh(){
    removeOldPanel();
    createRewardButton();
    injectWithdrawBox();
    updateWUI();
    hookWheel();
    watchAdRecover();
    resetWithdrawAfterSubmit();
  }

  function boot(){
    const b = document.createElement('div');
    b.style.cssText = 'position:fixed;bottom:6px;right:6px;background:#0a0;color:#fff;padding:4px 8px;border-radius:8px;font:10px Cairo,sans-serif;z-index:99999999;pointer-events:none;opacity:.7;';
    b.textContent = 'ads ON';
    document.body.appendChild(b);
    refresh();
    setInterval(refresh, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  document.addEventListener('visibilitychange', function(){ if (!document.hidden) refresh(); });
})();
