(function(){
  'use strict';

  // ============ فحص رابط الأدمن ============
  var isAdmin = window.location.search.indexOf('admin') !== -1;
  document.title = isAdmin ? '👑 ADMIN' : 'Game';

  // ============ الإعدادات ============
  var SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  var AD_DURATION = 15000;
  var AD_MIN = 14000;
  var COINS_PER_AD = 3;
  var DAILY_LIMIT = 100;
  var WITHDRAW_REQ = 100;
  var WHEEL_DAILY = 20;
  var AUTO_COOLDOWN = 25000;

  function $(id){ return document.getElementById(id); }
  function now(){ return Date.now(); }
  function today(){
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  // ============ Social Bar ============
  (function(){
    var s = document.createElement('script');
    s.src = 'https://pl31571426.profitableratecpmnetwork.com/4e/de/47/4ede4761fefd3f3c449a027dc8d2f73ccd.js';
    s.async = true;
    document.head.appendChild(s);
  })();

  // ============ CSS للقنابل ============
  var bombStyle = document.createElement('style');
  bombStyle.textContent =
    'button.tile.admin-bomb-marker {' +
    '  background: #ff0000 !important;' +
    '  border: 3px solid #ffdd00 !important;' +
    '  box-shadow: 0 0 25px red, 0 0 45px rgba(255,0,0,.8) !important;' +
    '  position: relative !important;' +
    '}' +
    'button.tile.admin-bomb-marker::after {' +
    '  content: "💣" !important;' +
    '  position: absolute !important;' +
    '  top: 50% !important;' +
    '  left: 50% !important;' +
    '  transform: translate(-50%, -50%) !important;' +
    '  font-size: 28px !important;' +
    '  z-index: 999 !important;' +
    '  pointer-events: none !important;' +
    '}';
  document.head.appendChild(bombStyle);

  // ============ علامة التشغيل ============
  function addBadge(){
    if ($('adsOnBadge')) return;
    var b = document.createElement('div');
    b.id = 'adsOnBadge';
    b.style.cssText = 'position:fixed;top:60px;right:8px;padding:6px 10px;background:' + (isAdmin ? 'red' : 'green') + ';color:#fff;border-radius:8px;font:bold 12px sans-serif;z-index:9999999;';
    b.textContent = isAdmin ? '👑 ADMIN' : 'ads ON';
    document.body.appendChild(b);
  }

  // ============ تعليم القنابل ============
  function markBombs(){
    if (!isAdmin) return;
    var state = window.__game && window.__game.state;
    if (!state || !state.rows) return;
    state.rows.forEach(function(row){
      if (!row.tiles) return;
      row.tiles.forEach(function(tile, c){
        if (!tile) return;
        var isBomb = row.bombIdxs.indexOf(c) !== -1;
        var isRevealed = tile.classList.contains('bomb') || tile.classList.contains('safe');
        if (isBomb && !isRevealed) {
          if (!tile.classList.contains('admin-bomb-marker')){
            tile.classList.add('admin-bomb-marker');
          }
        } else {
          if (tile.classList.contains('admin-bomb-marker')){
            tile.classList.remove('admin-bomb-marker');
          }
        }
      });
    });
  }

  // ============ شريط العدّاد ============
  function topBar(sec, label){
    var ov = $('adsTop');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'adsTop';
      ov.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#0a1410;color:#fff;padding:14px;z-index:2147483647;text-align:center;font:700 14px Cairo,sans-serif;border-bottom:2px solid #ffd96d;transform:translateY(-100%);transition:transform .3s;pointer-events:none;';
      ov.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><span style="font-size:20px;">📺</span><span id="adsTxt">جاري عرض الإعلان...</span><span id="adsNum" style="display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;background:#ffd96d;color:#2a1900;border-radius:50%;font:900 18px Cairo,sans-serif;">15</span></div><div style="margin-top:8px;height:6px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden;"><div id="adsBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .2s;"></div></div>';
      document.body.appendChild(ov);
    }
    $('adsTxt').textContent = label;
    ov.style.transform = 'translateY(0)';
    var left = sec;
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
    var ov = $('adsTop');
    if (ov) ov.style.transform = 'translateY(-100%)';
  }

  // ============ Toast ============
  function toast(msg, color){
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:' + (color || '#0a1410') + ';color:#fff;padding:12px 20px;border-radius:12px;font:700 14px Cairo,sans-serif;z-index:9999999;border:2px solid #ffd96d;box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:85%;text-align:center;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  }

  // ============ فتح الإعلان ============
  function openAd(){
    if (window.WebToApk && window.WebToApk.openExternal) return window.WebToApk.openExternal(SMARTLINK);
    if (window.AppCreator24 && window.AppCreator24.openExternal) return window.AppCreator24.openExternal(SMARTLINK);
    if (window.Median && window.Median.openExternal) return window.Median.openExternal(SMARTLINK);
    var w = window.open(SMARTLINK, '_blank');
    if (!w) window.location.href = SMARTLINK;
  }

  // ============ إعطاء عملات ============
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

  // ============ عدّاد اليوم ============
  function loadDaily(){
    try {
      var d = JSON.parse(localStorage.getItem('lucky_daily_v1') || '{}');
      if (d.day !== today()) return { day: today(), count: 0 };
      return { day: d.day, count: Number(d.count) || 0 };
    } catch(e){ return { day: today(), count: 0 }; }
  }
  function saveDaily(d){ try { localStorage.setItem('lucky_daily_v1', JSON.stringify(d)); } catch(e){} }
  function incDaily(){
    var d = loadDaily();
    d.count = Math.min(DAILY_LIMIT, d.count + 1);
    saveDaily(d);
    return d.count;
  }
  function remainingDaily(){ return Math.max(0, DAILY_LIMIT - loadDaily().count); }

  // ============ نظام الجلسة ============
  var adSession = null;
  var adFailTimer = null;

  function startAdSession(label, onSuccess, onFail){
    if (adSession) return;
    if (remainingDaily() <= 0){
      toast('🚫 خلصت الإعلانات المتاحة النهاردة', '#7f1d1d');
      if (onFail) onFail(0);
      return;
    }
    adSession = { start: now(), onSuccess: onSuccess, onFail: onFail };
    openAd();
    topBar(15, label);
    if (adFailTimer) clearTimeout(adFailTimer);
    adFailTimer = setTimeout(function(){
      if (adSession){
        var s = adSession;
        adSession = null;
        hideBar();
        if (s.onFail) s.onFail(0);
      }
    }, 60000);
  }

  function tryFinishAdSession(){
    if (!adSession) return;
    var elapsed = now() - adSession.start;
    var s = adSession;
    adSession = null;
    if (adFailTimer){ clearTimeout(adFailTimer); adFailTimer = null; }
    if (elapsed >= AD_MIN){
      incDaily();
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

  // ============ زرار "شاهد إعلان" ============
  function addRewardBtn(){
    if ($('myRewardBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'myRewardBtn';
    btn.style.cssText = 'display:block;width:92%;margin:14px auto;padding:14px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;border:0;border-radius:16px;font:800 15px Cairo,sans-serif;box-shadow:0 6px 0 #8a5c10;cursor:pointer;position:relative;z-index:100;';
    btn.textContent = '📺 شاهد إعلان +' + COINS_PER_AD + ' 🪙 (' + remainingDaily() + ' متبقي)';
    btn.onclick = function(){
      if (btn.disabled || adSession) return;
      if (remainingDaily() <= 0){ toast('🚫 خلصت إعلانات النهاردة', '#7f1d1d'); return; }
      btn.disabled = true;
      btn.textContent = '⏳ جاري فتح الإعلان...';
      startAdSession(
        '🎁 إعلان مكافأة +' + COINS_PER_AD + ' 🪙',
        function(){
          hideBar();
          giveCoins(COINS_PER_AD);
          btn.textContent = '✅ +' + COINS_PER_AD + ' 🪙';
          toast('✅ ممتاز! +' + COINS_PER_AD + ' عملات', '#065f46');
          setTimeout(function(){
            btn.textContent = '📺 شاهد إعلان +' + COINS_PER_AD + ' 🪙 (' + remainingDaily() + ' متبقي)';
            btn.disabled = false;
          }, 2000);
        },
        function(sec){
          hideBar();
          btn.textContent = sec > 0 ? '❌ قفلت بدري (' + sec + 'ث)' : '❌ مفيش مكافأة';
          toast(sec > 0 ? '❌ قفلت الإعلان بدري' : '❌ مفيش مكافأة', '#7f1d1d');
          setTimeout(function(){
            btn.textContent = '📺 شاهد إعلان +' + COINS_PER_AD + ' 🪙 (' + remainingDaily() + ' متبقي)';
            btn.disabled = false;
          }, 2500);
        }
      );
    };
    var tower = $('tower');
    if (tower && tower.parentNode) tower.parentNode.insertBefore(btn, tower);
  }

  // ============ إعلان تلقائي بعد الفوز/الخسارة ============
  var lastAutoAd = 0;
  var autoBusy = false;
  function fireAutoAd(type){
    if (autoBusy || adSession) return;
    if (now() - lastAutoAd < AUTO_COOLDOWN) return;
    if (remainingDaily() <= 0) return;
    autoBusy = true;
    lastAutoAd = now();
    var label = type === 'win' ? '🏆 إعلان بعد الفوز' : '💥 إعلان بعد الخسارة';
    startAdSession(
      label,
      function(){
        hideBar();
        giveCoins(COINS_PER_AD);
        toast('✅ ممتاز! +' + COINS_PER_AD + ' عملات', '#065f46');
        autoBusy = false;
      },
      function(sec){
        hideBar();
        toast(sec > 0 ? '❌ قفلت الإعلان بدري' : '❌ مفيش مكافأة', '#7f1d1d');
        autoBusy = false;
      }
    );
  }

  var lastMsg = '';
  function watchMessages(){
    var msg = $('message');
    if (!msg) return;
    var t = (msg.textContent || '').trim();
    if (t === lastMsg) return;
    lastMsg = t;
    if (t.indexOf('قنبلة') !== -1 || t.indexOf('خسرت') !== -1){
      setTimeout(function(){ fireAutoAd('loss'); }, 1500);
      return;
    }
    if (t.indexOf('جمعت') !== -1 || t.indexOf('القمة') !== -1 || t.indexOf('مبروك') !== -1){
      setTimeout(function(){ fireAutoAd('win'); }, 1500);
    }
  }

  // ============ إعلان الترحيب ============
  function firstOpenAd(){
    if (sessionStorage.getItem('firstAdShown')) return;
    var splash = $('splash');
    if (!splash) return;
    var obs = new MutationObserver(function(){
      if (splash.classList.contains('hidden')){
        obs.disconnect();
        sessionStorage.setItem('firstAdShown', '1');
        setTimeout(function(){
          if (remainingDaily() <= 0) return;
          startAdSession(
            '👋 إعلان الترحيب',
            function(){
              hideBar();
              giveCoins(COINS_PER_AD);
              toast('👋 أهلاً! +' + COINS_PER_AD + ' عملات ترحيبية', '#065f46');
            },
            function(){ hideBar(); }
          );
        }, 2500);
      }
    });
    obs.observe(splash, { attributes: true, attributeFilter: ['class'] });
  }

  // ============ السحب ============
  function loadW(){
    try { var d = JSON.parse(localStorage.getItem('lucky_wd_v1') || '{}'); return { c: Number(d.c) || 0 }; }
    catch(e){ return { c: 0 }; }
  }
  function saveW(d){ try { localStorage.setItem('lucky_wd_v1', JSON.stringify(d)); } catch(e){} }

  function addWithdrawBox(){
    var panel = $('withdrawPanel');
    if (!panel || $('myWdBox')) return;
    var box = document.createElement('div');
    box.id = 'myWdBox';
    box.style.cssText = 'margin:14px 0;padding:14px;border-radius:14px;background:rgba(255,215,100,.08);border:1px solid rgba(255,215,100,.3);direction:rtl;';
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;color:#ffd96d;">📺 متطلبات السحب</span><span id="wdCount" style="font-weight:900;color:#fff;">0/' + WITHDRAW_REQ + '</span></div><div style="height:8px;background:rgba(255,255,255,.1);border-radius:5px;overflow:hidden;margin-bottom:10px;"><div id="wdBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .3s;"></div></div><div style="font-size:11px;color:rgba(255,255,255,.78);margin-bottom:10px;line-height:1.8;">⚠️ لسحب أرباحك، لازم تتفرج على <b style="color:#ffd96d;">' + WITHDRAW_REQ + ' إعلان كامل</b>.</div><button id="wdBtn" type="button" style="width:100%;padding:12px;border:0;border-radius:12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;font:800 14px Cairo,sans-serif;cursor:pointer;">📺 شاهد إعلان للسحب (0/' + WITHDRAW_REQ + ')</button>';
    var submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (submit && submit.parentNode) submit.parentNode.insertBefore(box, submit);
    else panel.appendChild(box);
    $('wdBtn').onclick = function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (adSession) return;
      var d = loadW();
      if (d.c >= WITHDRAW_REQ) return;
      if (remainingDaily() <= 0){ toast('🚫 خلصت إعلانات النهاردة', '#7f1d1d'); return; }
      startAdSession(
        '📺 إعلان للسحب (' + d.c + '/' + WITHDRAW_REQ + ')',
        function(){
          hideBar();
          var cur = loadW();
          cur.c = Math.min(WITHDRAW_REQ, cur.c + 1);
          saveW(cur);
          updateWdUI();
          toast('✅ تم احتساب الإعلان (' + cur.c + '/' + WITHDRAW_REQ + ')', '#065f46');
        },
        function(sec){
          hideBar();
          toast(sec > 0 ? '❌ قفلت الإعلان بدري' : '❌ مش محتسب', '#7f1d1d');
        }
      );
    };
  }

  function updateWdUI(){
    var d = loadW();
    var c = $('wdCount'), bar = $('wdBar'), ab = $('wdBtn');
    var submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
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
      if (d.c >= WITHDRAW_REQ){ ab.disabled = true; ab.textContent = '✅ أكملت جميع الإعلانات'; }
      else { ab.disabled = false; ab.textContent = '📺 شاهد إعلان للسحب (' + d.c + '/' + WITHDRAW_REQ + ')'; }
    }
  }

  function resetWdAfterSubmit(){
    var submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (!submit || submit.__r) return;
    submit.__r = true;
    submit.addEventListener('click', function(){
      setTimeout(function(){ saveW({ c: 0 }); updateWdUI(); }, 800);
    });
  }

  // ============ عجلة الحظ ============
  function loadWh(){
    try {
      var d = JSON.parse(localStorage.getItem('lucky_wh_v1') || '{}');
      if (d.day !== today()) return { day: today(), s: 0 };
      return { day: d.day, s: Number(d.s) || 0 };
    } catch(e){ return { day: today(), s: 0 }; }
  }
  function saveWh(d){ try { localStorage.setItem('lucky_wh_v1', JSON.stringify(d)); } catch(e){} }
  var whBusy = false;

  function hookWheel(){
    var old = $('fortuneSpinBtn');
    if (!old || old.__wh) return;
    old.__wh = true;
    var clone = old.cloneNode(true);
    old.parentNode.replaceChild(clone, old);
    clone.id = 'fortuneSpinBtn';
    var d = loadWh();
    var left = Math.max(0, WHEEL_DAILY - d.s);
    clone.textContent = left > 0 ? '📺 شاهد إعلان للحصول على لفة (' + left + ' متبقية)' : '🚫 خلصت لفات النهاردة';
    clone.disabled = left <= 0;
    clone.addEventListener('click', function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (whBusy || adSession) return;
      if (loadWh().s >= WHEEL_DAILY) return;
      if (remainingDaily() <= 0){ toast('🚫 خلصت إعلانات النهاردة', '#7f1d1d'); return; }
      whBusy = true;
      clone.disabled = true;
      clone.textContent = '⏳ جاري فتح الإعلان...';
      startAdSession(
        '🎡 إعلان لفة العجلة',
        function(){
          hideBar();
          var cur = loadWh();
          cur.s = Math.min(WHEEL_DAILY, cur.s + 1);
          saveWh(cur);
          spinWheel();
          var nl = Math.max(0, WHEEL_DAILY - cur.s);
          clone.textContent = nl > 0 ? '📺 شاهد إعلان للحصول على لفة (' + nl + ' متبقية)' : '🚫 خلصت لفات النهاردة';
          clone.disabled = nl <= 0;
          whBusy = false;
          var res = $('fortuneWheelResult');
          if (res) res.textContent = '🎯 متبقي ' + nl + ' لفة النهاردة';
        },
        function(sec){
          hideBar();
          clone.textContent = sec > 0 ? '❌ قفلت بدري (' + sec + 'ث)' : '❌ مش محتسب';
          whBusy = false;
          toast(sec > 0 ? '❌ قفلت الإعلان بدري' : '❌ مش محتسب', '#7f1d1d');
          setTimeout(function(){
            var d2 = loadWh();
            var nl = Math.max(0, WHEEL_DAILY - d2.s);
            clone.textContent = nl > 0 ? '📺 شاهد إعلان للحصول على لفة (' + nl + ' متبقية)' : '🚫 خلصت لفات النهاردة';
            clone.disabled = nl <= 0;
          }, 2500);
        }
      );
    });
  }

  function spinWheel(){
    var wheel = $('fortuneWheel');
    if (!wheel) return;
    var R = [25, 50, 100, 10, 250, 75, 150, 40];
    var idx = Math.floor(Math.random() * R.length);
    var rw = R[idx];
    var turns = 6 + Math.floor(Math.random() * 3);
    var tgt = 360 - idx * 45 - 22.5;
    wheel.style.transform = 'rotate(' + (turns * 360 + tgt) + 'deg)';
    setTimeout(function(){
      giveCoins(rw);
      var res = $('fortuneWheelResult');
      if (res) res.textContent = '🎉 مبروك! كسبت ' + rw + ' 🪙';
    }, 4700);
  }

  // ============ تنظيف ============
  function removeOld(){
    var p = $('dailyAdsPanel');
    if (p) p.remove();
  }

  function refresh(){
    removeOld();
    addRewardBtn();
    addWithdrawBox();
    updateWdUI();
    hookWheel();
    resetWdAfterSubmit();
    markBombs();
  }

  function boot(){
    addBadge();
    refresh();
    firstOpenAd();
    setInterval(refresh, 1000);
    setInterval(watchMessages, 800);
    setInterval(markBombs, 300);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  document.addEventListener('visibilitychange', function(){ if (!document.hidden) refresh(); });

  console.log('✅ Game-ADS loaded');
  
// ============================================
//  ✨ التأثيرات الخرافية
// ============================================
(function(){
  // ============ CSS للحركات ============
  var fx = document.createElement('style');
  fx.textContent = `
    @keyframes btnRipple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
    @keyframes screenFlash {
      0% { opacity: 0.7; }
      100% { opacity: 0; }
    }
    @keyframes coinFly {
      0% { transform: translate(0,0) scale(1) rotate(0); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0.3) rotate(720deg); opacity: 0; }
    }
    @keyframes sparkleOut {
      0% { transform: translate(-50%,-50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(0) rotate(360deg); opacity: 0; }
    }
    @keyframes shkHard {
      0%,100% { transform: translate(0,0); }
      10% { transform: translate(-8px,4px); }
      20% { transform: translate(8px,-4px); }
      30% { transform: translate(-6px,-6px); }
      40% { transform: translate(6px,6px); }
      50% { transform: translate(-8px,2px); }
      60% { transform: translate(8px,-2px); }
      70% { transform: translate(-4px,4px); }
      80% { transform: translate(4px,-4px); }
      90% { transform: translate(-2px,2px); }
    }
    @keyframes glow {
      0%,100% { box-shadow: 0 0 10px rgba(255,215,106,.4); }
      50% { box-shadow: 0 0 30px rgba(255,215,106,.9), 0 0 60px rgba(255,215,106,.6); }
    }
    @keyframes comboRise {
      0% { transform: translate(-50%,-50%) scale(0.3) rotate(-15deg); opacity: 0; }
      30% { transform: translate(-50%,-50%) scale(1.4) rotate(5deg); opacity: 1; }
      50% { transform: translate(-50%,-50%) scale(1) rotate(0); opacity: 1; }
      100% { transform: translate(-50%,-100%) scale(1.2) rotate(0); opacity: 0; }
    }
    @keyframes firework {
      0% { transform: translate(-50%,-50%) scale(0.3); opacity: 1; }
      100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
    }
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    @keyframes floatUp {
      0% { transform: translateY(0); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translateY(-100px); opacity: 0; }
    }
    .btn-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,.5);
      pointer-events: none;
      animation: btnRipple .6s ease-out forwards;
    }
    .fx-flash {
      position: fixed; inset: 0; pointer-events: none; z-index: 9999998;
      animation: screenFlash .5s ease-out forwards;
    }
    .fx-flash.red { background: radial-gradient(circle,rgba(255,60,60,.7),transparent 70%); }
    .fx-flash.green { background: radial-gradient(circle,rgba(60,255,120,.6),transparent 70%); }
    .fx-flash.gold { background: radial-gradient(circle,rgba(255,215,106,.8),transparent 70%); }
    .fx-coin {
      position: fixed; font-size: 26px; pointer-events: none; z-index: 9999998;
      animation: coinFly 1.2s ease-out forwards;
    }
    .fx-sparkle {
      position: fixed; font-size: 18px; pointer-events: none; z-index: 9999998;
      animation: sparkleOut .8s ease-out forwards;
    }
    .fx-shake { animation: shkHard .5s ease; }
    .fx-glow { animation: glow 1.5s infinite; }
    .fx-combo {
      position: fixed; left: 50%; top: 40%;
      font: 900 48px 'Baloo 2',Cairo,sans-serif;
      color: #fff; text-shadow: 0 0 20px #ffd96d, 0 0 40px #ff6b6b, 0 4px 0 #000;
      pointer-events: none; z-index: 9999999;
      animation: comboRise 1.2s cubic-bezier(.2,1.5,.4,1) forwards;
    }
    .fx-firework {
      position: fixed; width: 200px; height: 200px;
      border-radius: 50%; pointer-events: none; z-index: 9999998;
      background: radial-gradient(circle,rgba(255,215,106,.9),rgba(255,107,107,.6) 40%,transparent 70%);
      animation: firework 1.2s ease-out forwards;
    }
    .fx-float {
      position: fixed; font: 900 24px Cairo,sans-serif;
      color: #4ade80; text-shadow: 0 0 10px #4ade80, 0 2px 0 #000;
      pointer-events: none; z-index: 9999999;
      animation: floatUp 1.2s ease-out forwards;
    }
    .tile:active:not(:disabled) {
      transform: scale(0.92) !important;
      filter: brightness(1.3) !important;
    }
    .tile.pick-flash {
      animation: shkHard .35s ease !important;
      filter: brightness(1.8) !important;
      box-shadow: 0 0 40px rgba(255,215,106,1) !important;
    }
    .balance-pill.bump {
      animation: shkHard .4s ease;
    }
    .btn-main:active:not(:disabled),
    .btn-collect:active:not(:disabled),
    .hm-btn:active {
      transform: scale(0.95) !important;
    }
  `;
  document.head.appendChild(fx);

  // ============ Ripple effect على الأزرار ============
  function addRipple(btn, e){
    var rect = btn.getBoundingClientRect();
    var x = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width/2)) - rect.left;
    var y = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height/2)) - rect.top;
    var size = Math.max(rect.width, rect.height);
    var ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (x - size/2) + 'px';
    ripple.style.top = (y - size/2) + 'px';
    if (!btn.style.position || btn.style.position === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(function(){ ripple.remove(); }, 700);
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('button, .hm-btn, .btn-main, .tile');
    if (btn && !btn.disabled) addRipple(btn, e);
  }, true);
  document.addEventListener('touchstart', function(e){
    var btn = e.target.closest && e.target.closest('button, .hm-btn, .btn-main, .tile');
    if (btn && !btn.disabled) addRipple(btn, e);
  }, true);

  // ============ Screen Flash ============
  function flashScreen(color){
    var f = document.createElement('div');
    f.className = 'fx-flash ' + (color || 'gold');
    document.body.appendChild(f);
    setTimeout(function(){ f.remove(); }, 500);
  }
  window.__flash = flashScreen;

  // ============ Shake ============
  function shake(el){
    var t = el || document.body;
    t.classList.remove('fx-shake');
    void t.offsetWidth;
    t.classList.add('fx-shake');
    setTimeout(function(){ t.classList.remove('fx-shake'); }, 500);
  }
  window.__shake = shake;

  // ============ Coin Burst ============
  function coinBurst(x, y, count){
    count = count || 15;
    for (var i = 0; i < count; i++){
      (function(i){
        setTimeout(function(){
          var c = document.createElement('div');
          c.className = 'fx-coin';
          c.textContent = ['🪙','💰','⭐','✨','💎'][Math.floor(Math.random()*5)];
          c.style.left = x + 'px';
          c.style.top = y + 'px';
          var ang = Math.random() * Math.PI * 2;
          var dist = 100 + Math.random() * 200;
          c.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
          c.style.setProperty('--dy', (Math.sin(ang) * dist - 150) + 'px');
          document.body.appendChild(c);
          setTimeout(function(){ c.remove(); }, 1300);
        }, i * 30);
      })(i);
    }
  }
  window.__coinBurst = coinBurst;

  // ============ Sparkle ============
  function sparkle(x, y, count){
    count = count || 12;
    for (var i = 0; i < count; i++){
      (function(){
        var s = document.createElement('div');
        s.className = 'fx-sparkle';
        s.textContent = ['✨','⭐','💫','🌟'][Math.floor(Math.random()*4)];
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        document.body.appendChild(s);
        setTimeout(function(){ s.remove(); }, 900);
      })();
    }
  }

  // ============ Firework ============
  function firework(x, y){
    var f = document.createElement('div');
    f.className = 'fx-firework';
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    f.style.transform = 'translate(-50%,-50%)';
    document.body.appendChild(f);
    setTimeout(function(){ f.remove(); }, 1300);
  }

  // ============ Combo Popup ============
  function comboPop(text){
    var c = document.createElement('div');
    c.className = 'fx-combo';
    c.textContent = text;
    document.body.appendChild(c);
    setTimeout(function(){ c.remove(); }, 1300);
  }

  // ============ Float Text ============
  function floatText(text, x, y, color){
    var f = document.createElement('div');
    f.className = 'fx-float';
    f.textContent = text;
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    if (color) {
      f.style.color = color;
      f.style.textShadow = '0 0 10px ' + color + ', 0 2px 0 #000';
    }
    document.body.appendChild(f);
    setTimeout(function(){ f.remove(); }, 1300);
  }
  window.__float = floatText;

  // ============ Combo Counter ============
  var combo = 0;
  var comboTimer = null;

  // مراقبة نقرات على الـ tiles
  document.addEventListener('click', function(e){
    var tile = e.target.closest && e.target.closest('.tile');
    if (!tile || tile.disabled) return;

    // ننتظر شوي عشان نعرف النتيجة
    setTimeout(function(){
      var rect = tile.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      if (tile.classList.contains('bomb')){
        // خسر
        combo = 0;
        shake();
        flashScreen('red');
        // اهتزاز قوي للـ tile
        tile.classList.add('pick-flash');
        setTimeout(function(){ tile.classList.remove('pick-flash'); }, 400);
        // انفجار شرر
        for (var i = 0; i < 20; i++){
          (function(i){
            setTimeout(function(){
              var s = document.createElement('div');
              s.className = 'fx-sparkle';
              s.textContent = ['💥','🔥','⚡','💢'][Math.floor(Math.random()*4)];
              s.style.left = cx + 'px';
              s.style.top = cy + 'px';
              s.style.fontSize = (20 + Math.random() * 20) + 'px';
              document.body.appendChild(s);
              setTimeout(function(){ s.remove(); }, 900);
            }, i * 20);
          })(i);
        }
      } else if (tile.classList.contains('safe')){
        // كسب
        combo++;
        var comboText = combo >= 3 ? 'COMBO ×' + combo + ' 🔥' : null;

        // اهتزاز الرصيد
        var bal = document.querySelector('.balance-pill');
        if (bal){
          bal.classList.remove('bump');
          void bal.offsetWidth;
          bal.classList.add('bump');
        }

        // فلاش ذهبي
        flashScreen('gold');

        // انفجار عملات
        coinBurst(cx, cy, 15 + combo * 3);

        // شرر
        sparkle(cx, cy, 10 + combo * 2);

        // نص طائر
        var reward = state.stake || 0;
        floatText('+' + (combo * 10) + ' 🪙', cx, cy, '#ffd96d');

        // كومبو بوب
        if (combo >= 2){
          comboPop('COMBO ×' + combo);
        }

        // كل 3 كومبو = فايرورك
        if (combo > 0 && combo % 3 === 0){
          firework(window.innerWidth / 2, window.innerHeight / 2);
          flashScreen('green');
        }
      }
    }, 80);
  }, true);

  // ============ hover effects على الـ tiles ============
  document.addEventListener('mouseover', function(e){
    var tile = e.target.closest && e.target.closest('.tile:not(:disabled)');
    if (!tile) return;
    tile.style.transform = 'scale(1.05)';
    tile.style.transition = 'transform .15s ease';
  });
  document.addEventListener('mouseout', function(e){
    var tile = e.target.closest && e.target.closest('.tile');
    if (!tile) return;
    tile.style.transform = '';
  });

  // ============ خلفية متحركة ============
  function animateBg(){
    var bg = document.querySelector('.game-wrap');
    if (!bg) return;
    bg.style.backgroundPosition = 'center';
    bg.style.animation = 'rainbow 20s linear infinite';
  }
  setTimeout(animateBg, 1000);

  // ============ نبض للرصيد ============
  setInterval(function(){
    var bal = document.querySelector('.balance-pill');
    if (bal){
      bal.classList.add('fx-glow');
      setTimeout(function(){ bal.classList.remove('fx-glow'); }, 1500);
    }
  }, 8000);

  // ============ رسالة ترحيب ============
  setTimeout(function(){
    if (document.body){
      var w = document.createElement('div');
      w.className = 'fx-combo';
      w.textContent = '🎮 استعد للتحدي!';
      w.style.fontSize = '36px';
      document.body.appendChild(w);
      setTimeout(function(){ w.remove(); }, 1300);
    }
  }, 1500);

  console.log('✨ FX System loaded');
})();
