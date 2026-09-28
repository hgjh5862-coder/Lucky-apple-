(function(){
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  const AD_DURATION = 15000;
  const AD_MIN = 14500;
  const WITHDRAW_REQ = 30;
  const WHEEL_DAILY = 10;
  const AUTO_COOLDOWN = 20000;
  const STORAGE = { w: 'lucky_wd_v6', wh: 'lucky_wh_v6' };

  const $ = (id) => document.getElementById(id);
  const now = () => Date.now();
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };

  const badge = document.createElement('div');
  badge.style.cssText = 'position:fixed;bottom:6px;right:6px;background:green;color:#fff;padding:5px 9px;border-radius:8px;font:11px Cairo,sans-serif;z-index:99999999;pointer-events:none;';
  badge.textContent = 'ads ON';
  if (document.body) document.body.appendChild(badge);

  function topBar(sec, label){
    let ov = $('adsTop');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'adsTop';
      ov.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#0a1410;color:#fff;padding:14px;z-index:2147483647;text-align:center;font:700 14px Cairo,sans-serif;border-bottom:2px solid #ffd96d;transform:translateY(-100%);transition:transform .3s;pointer-events:none;';
      ov.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><span style="font-size:20px;">📺</span><span id="adsTxt">جاري عرض الإعلان...</span><span id="adsNum" style="display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;background:#ffd96d;color:#2a1900;border-radius:50%;font:900 18px Cairo,sans-serif;">15</span></div><div style="margin-top:6px;font-size:11px;color:#ffb3b3;">لا تغلق الإعلان حتى انتهاء العدّاد</div><div style="margin-top:8px;height:6px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden;"><div id="adsBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .2s;"></div></div>';
      document.body.appendChild(ov);
    }
    $('adsTxt').textContent = label;
    ov.style.transform = 'translateY(0)';
    let left = sec;
    $('adsNum').textContent = left;
    $('adsBar').style.width = '0%';
    if (ov._tk) clearInterval(ov._tk);
    ov._tk = setInterval(function(){
      left--;
      if (left < 0) left = 0;
      $('adsNum').textContent = left;
      $('adsBar').style.width = ((sec - left) / sec * 100) + '%';
      if (left <= 0) clearInterval(ov._tk);
    }, 1000);
  }

  function hideBar(){
    const ov = $('adsTop');
    if (ov) ov.style.transform = 'translateY(-100%)';
  }

  function toast(msg, color){
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:' + (color || '#0a1410') + ';color:#fff;padding:12px 20px;border-radius:12px;font:700 14px Cairo,sans-serif;z-index:99999999;border:2px solid #ffd96d;box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:80%;text-align:center;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  }

  function openAd(){
    if (window.WebToApk && window.WebToApk.openExternal) return window.WebToApk.openExternal(SMARTLINK);
    if (window.AppCreator24 && window.AppCreator24.openExternal) return window.AppCreator24.openExternal(SMARTLINK);
    if (window.Median && window.Median.openExternal) return window.Median.openExternal(SMARTLINK);
    const w = window.open(SMARTLINK, '_blank');
    if (!w) window.location.href = SMARTLINK;
  }

  function giveCoins(n){
    try {
      if (window.__game && window.__game.state){
        window.__game.state.balance = Math.floor(window.__game.state.balance || 0) + n;
        if (window.__game.update) window.__game.update();
        if (window.__game.saveAll) window.__game.saveAll();
      }
      if (window.__audio && window.__audio.coin) window.__audio.coin();
    } catch(e){}
  }

  let adSession = null;
  let adFailTimer = null;

  function startAdSession(label, onSuccess, onFail){
    if (adSession) return;
    adSession = { start: now(), onSuccess: onSuccess, onFail: onFail };
    openAd();
    topBar(15, label);
    if (adFailTimer) clearTimeout(adFailTimer);
    adFailTimer = setTimeout(function(){
      if (adSession){
        const s = adSession;
        adSession = null;
        hideBar();
        if (s.onFail) s.onFail(0);
      }
    }, 60000);
  }

  function tryFinishAdSession(){
    if (!adSession) return;
    const elapsed = now() - adSession.start;
    const s = adSession;
    adSession = null;
    if (adFailTimer){ clearTimeout(adFailTimer); adFailTimer = null; }
    if (elapsed >= AD_MIN){
      if (s.onSuccess) s.onSuccess();
    } else {
      if (s.onFail) s.onFail(Math.round(elapsed / 1000));
    }
  }

  document.addEventListener('visibilitychange', function(){
    if (!document.hidden && adSession){
      setTimeout(function(){ if (adSession) tryFinishAdSession(); }, 300);
    }
  });

  window.addEventListener('focus', function(){
    if (adSession && !document.hidden){
      setTimeout(function(){ if (adSession) tryFinishAdSession(); }, 300);
    }
  });

  function addRewardBtn(){
    if ($('myRewardBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'myRewardBtn';
    btn.textContent = '📺 شاهد إعلان واحصل على 20 🪙';
    btn.style.cssText = 'display:block;width:92%;margin:14px auto;padding:14px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;border:0;border-radius:16px;font:800 15px Cairo,sans-serif;box-shadow:0 6px 0 #8a5c10;cursor:pointer;position:relative;z-index:100;';
    btn.onclick = function(){
      if (btn.disabled || adSession) return;
      btn.disabled = true;
      const old = btn.textContent;
      btn.textContent = '⏳ جاري فتح الإعلان...';
      startAdSession(
        '🎁 إعلان مكافأة +20 🪙',
        function(){
          hideBar();
          giveCoins(20);
          btn.textContent = '✅ تم! +20 🪙';
          toast('✅ ممتاز! +20 عملة', '#065f46');
          setTimeout(function(){ btn.textContent = old; btn.disabled = false; }, 2500);
        },
        function(sec){
          hideBar();
          btn.textContent = '❌ قفلت بدري (' + sec + 'ث)';
          toast('❌ قفلت الإعلان بدري - مفيش مكافأة', '#7f1d1d');
          setTimeout(function(){ btn.textContent = old; btn.disabled = false; }, 3000);
        }
      );
    };
    const tower = $('tower');
    if (tower && tower.parentNode) tower.parentNode.insertBefore(btn, tower);
  }

  let lastAutoAd = 0;
  let autoBusy = false;

  function fireAutoAd(type){
    if (autoBusy || adSession) return;
    if (now() - lastAutoAd < AUTO_COOLDOWN) return;
    autoBusy = true;
    lastAutoAd = now();
    const label = type === 'win' ? '🏆 إعلان بعد الفوز (+10 🪙)' : '💥 إعلان بعد الخسارة (+10 🪙)';
    startAdSession(
      label,
      function(){
        hideBar();
        giveCoins(10);
        toast('✅ ممتاز! +10 عملات', '#065f46');
        autoBusy = false;
      },
      function(sec){
        hideBar();
        toast('❌ قفلت الإعلان بدري - مفيش مكافأة', '#7f1d1d');
        autoBusy = false;
      }
    );
  }

  function watchMessages(){
    const msg = $('message');
    if (!msg) return;
    const t = (msg.textContent || '').trim();
    if (t === watchMessages.last) return;
    watchMessages.last = t;
    if (t.indexOf('قنبلة') !== -1 || t.indexOf('خسرت') !== -1){
      setTimeout(function(){ fireAutoAd('loss'); }, 1500);
      return;
    }
    if (t.indexOf('جمعت') !== -1 || t.indexOf('القمة') !== -1 || t.indexOf('مبروك') !== -1){
      setTimeout(function(){ fireAutoAd('win'); }, 1500);
    }
  }

  function loadW(){
    try { const d = JSON.parse(localStorage.getItem(STORAGE.w) || '{}'); return { c: Number(d.c) || 0 }; }
    catch(e){ return { c: 0 }; }
  }
  function saveW(d){ try { localStorage.setItem(STORAGE.w, JSON.stringify(d)); } catch(e){} }

  function addWithdrawBox(){
    const panel = $('withdrawPanel');
    if (!panel || $('myWdBox')) return;
    const box = document.createElement('div');
    box.id = 'myWdBox';
    box.style.cssText = 'margin:14px 0;padding:14px;border-radius:14px;background:rgba(255,215,100,.08);border:1px solid rgba(255,215,100,.3);direction:rtl;';
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;color:#ffd96d;">📺 متطلبات السحب</span><span id="wdCount" style="font-weight:900;color:#fff;">0/' + WITHDRAW_REQ + '</span></div><div style="height:8px;background:rgba(255,255,255,.1);border-radius:5px;overflow:hidden;margin-bottom:10px;"><div id="wdBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .3s;"></div></div><div style="font-size:11px;color:rgba(255,255,255,.78);margin-bottom:10px;line-height:1.8;">⚠️ لسحب أرباحك، لازم تتفرج على <b style="color:#ffd96d;">' + WITHDRAW_REQ + ' إعلان كامل</b>.<br>مدة كل إعلان: <b>15 ثانية</b>.</div><button id="wdBtn" type="button" style="width:100%;padding:12px;border:0;border-radius:12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;font:800 14px Cairo,sans-serif;cursor:pointer;">📺 شاهد إعلان للسحب (0/' + WITHDRAW_REQ + ')</button>';
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (submit && submit.parentNode) submit.parentNode.insertBefore(box, submit);
    else panel.appendChild(box);
    $('wdBtn').onclick = function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (adSession) return;
      const d = loadW();
      if (d.c >= WITHDRAW_REQ) return;
      startAdSession(
        '📺 إعلان للسحب (' + d.c + '/' + WITHDRAW_REQ + ')',
        function(){
          hideBar();
          const cur = loadW();
          cur.c = Math.min(WITHDRAW_REQ, cur.c + 1);
          saveW(cur);
          updateWdUI();
          toast('✅ تم احتساب الإعلان (' + cur.c + '/' + WITHDRAW_REQ + ')', '#065f46');
        },
        function(sec){
          hideBar();
          toast('❌ قفلت الإعلان بدري - مش محتسب', '#7f1d1d');
        }
      );
    };
  }

  function updateWdUI(){
    const d = loadW();
    const c = $('wdCount'), bar = $('wdBar'), ab = $('wdBtn');
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (c) c.textContent = d.c + '/' + WITHDRAW_REQ;
    if (bar) bar.style.width = (d.c / WITHDRAW_REQ * 100) + '%';
    if (submit){
      if (d.c < WITHDRAW_REQ){
        submit.disabled = true;
        submit.style.opacity = '.5';
        submit.textContent = '🔒 شاهد ' + (WITHDRAW_REQ - d.c) + ' إعلان إضافي';
      } else {
        submit.disabled = false;
        submit.style.opacity = '1';
        submit.textContent = '📤 إرسال طلب السحب';
      }
    }
    if (ab){
      if (d.c >= WITHDRAW_REQ){
        ab.disabled = true;
        ab.textContent = '✅ أكملت جميع الإعلانات';
      } else {
        ab.disabled = false;
        ab.textContent = '📺 شاهد إعلان للسحب (' + d.c + '/' + WITHDRAW_REQ + ')';
      }
    }
  }

  function resetWdAfterSubmit(){
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (!submit || submit.__r) return;
    submit.__r = true;
    submit.addEventListener('click', function(){
      setTimeout(function(){ saveW({ c: 0 }); updateWdUI(); }, 800);
    });
  }

  function loadWh(){
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE.wh) || '{}');
      if (d.day !== today()) return { day: today(), s: 0 };
      return { day: d.day, s: Number(d.s) || 0 };
    } catch(e){ return { day: today(), s: 0 }; }
  }
  function saveWh(d){ try { localStorage.setItem(STORAGE.wh, JSON.stringify(d)); } catch(e){} }
  let whBusy = false;

  function hookWheel(){
    const old = $('fortuneSpinBtn');
    if (!old || old.__wh) return;
    old.__wh = true;
    const clone = old.cloneNode(true);
    old.parentNode.replaceChild(clone, old);
    clone.id = 'fortuneSpinBtn';
    const d = loadWh();
    const left = Math.max(0, WHEEL_DAILY - d.s);
    clone.textContent = left > 0 ? '📺 شاهد إعلان للحصول على لفة (' + left + ' متبقية)' : '🚫 خلصت لفات النهاردة - ارجع بكرة';
    clone.disabled = left <= 0;
    clone.addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (whBusy || adSession) return;
      if (loadWh().s >= WHEEL_DAILY) return;
      whBusy = true;
      clone.disabled = true;
      clone.textContent = '⏳ جاري فتح الإعلان...';
      startAdSession(
        '🎡 إعلان لفة العجلة',
        function(){
          hideBar();
          const cur = loadWh();
          cur.s = Math.min(WHEEL_DAILY, cur.s + 1);
          saveWh(cur);
          spinWheel();
          const nl = Math.max(0, WHEEL_DAILY - cur.s);
          clone.textContent = nl > 0 ? '📺 شاهد إعلان للحصول على لفة (' + nl + ' متبقية)' : '🚫 خلصت لفات النهاردة - ارجع بكرة';
          clone.disabled = nl <= 0;
          whBusy = false;
          const res = $('fortuneWheelResult');
          if (res) res.textContent = '🎯 متبقي ' + nl + ' لفة النهاردة';
        },
        function(sec){
          hideBar();
          clone.textContent = '❌ قفلت الإعلان بدري';
          whBusy = false;
          toast('❌ قفلت الإعلان بدري - مفيش لفة', '#7f1d1d');
          setTimeout(function(){
            const d2 = loadWh();
            const nl = Math.max(0, WHEEL_DAILY - d2.s);
            clone.textContent = nl > 0 ? '📺 شاهد إعلان للحصول على لفة (' + nl + ' متبقية)' : '🚫 خلصت لفات النهاردة - ارجع بكرة';
            clone.disabled = nl <= 0;
          }, 3000);
        }
      );
    });
  }

  function spinWheel(){
    const wheel = $('fortuneWheel');
    if (!wheel) return;
    const R = [25, 50, 100, 10, 250, 75, 150, 40];
    const idx = Math.floor(Math.random() * R.length);
    const rw = R[idx];
    const turns = 6 + Math.floor(Math.random() * 3);
    const tgt = 360 - idx * 45 - 22.5;
    wheel.style.transform = 'rotate(' + (turns * 360 + tgt) + 'deg)';
    setTimeout(function(){
      giveCoins(rw);
      const res = $('fortuneWheelResult');
      if (res) res.textContent = '🎉 مبروك! كسبت ' + rw + ' 🪙';
    }, 4700);
  }

  function removeOld(){
    const p = $('dailyAdsPanel');
    if (p) p.remove();
  }

  function refresh(){
    removeOld();
    addRewardBtn();
    addWithdrawBox();
    updateWdUI();
    hookWheel();
    resetWdAfterSubmit();
  }

  function boot(){
    refresh();
    setInterval(refresh, 1000);
    setInterval(watchMessages, 800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  document.addEventListener('visibilitychange', function(){ if (!document.hidden) refresh(); });
})();
