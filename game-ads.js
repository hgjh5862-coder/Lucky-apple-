(function(){
  document.title = '✅ LOADED';
  'use strict';

  // ============================================
  //  ⚙️ الإعدادات الأساسية
  // ============================================
  var isAdmin = window.location.search.indexOf('admin') !== -1;
  var SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  var AD_DURATION = 15000;
  var AD_MIN = 14000;
  var COINS_PER_AD = 3;
  var DAILY_LIMIT = 100;
  var WITHDRAW_REQ = 100;
  var WHEEL_DAILY = 20;
  var AUTO_COOLDOWN = 30000;

  // ============================================
  //  🛠️ Helpers
  // ============================================
  var $ = function(id){ return document.getElementById(id); };
  var now = function(){ return Date.now(); };
  var today = function(){
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  };

  // ============================================
  //  💰 Social Bar (Adsterra)
  // ============================================
  (function(){
    var s = document.createElement('script');
    s.src = 'https://pl31571426.profitableratecpmnetwork.com/4e/de/47/4ede4761fefd3f3c449a027dc8d2f73ccd.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  })();

  // ============================================
  //  🎨 CSS موحّد (كل الأنماط)
  // ============================================
  var style = document.createElement('style');
  style.textContent = [
    // === تأثيرات خفيفة وسلسة ===
    '@keyframes btnRipple{0%{transform:scale(0);opacity:.8}100%{transform:scale(3);opacity:0}}',
    '@keyframes screenFlash{0%{opacity:.55}100%{opacity:0}}',
    '@keyframes coinFly{0%{transform:translate(0,0) scale(1) rotate(0);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.3) rotate(540deg);opacity:0}}',
    '@keyframes sparkleOut{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(0) rotate(180deg);opacity:0}}',
    '@keyframes shkSoft{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}',
    '@keyframes glowSoft{0%,100%{box-shadow:0 0 8px rgba(255,215,106,.4)}50%{box-shadow:0 0 20px rgba(255,215,106,.75)}}',
    '@keyframes comboRise{0%{transform:translate(-50%,-50%) scale(.5);opacity:0}25%{transform:translate(-50%,-50%) scale(1.15);opacity:1}50%{transform:translate(-50%,-50%) scale(1)}100%{transform:translate(-50%,-100%) scale(.9);opacity:0}}',
    '@keyframes firework{0%{transform:translate(-50%,-50%) scale(.3);opacity:1}100%{transform:translate(-50%,-50%) scale(2);opacity:0}}',
    '@keyframes floatUp{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(-80px);opacity:0}}',
    '@keyframes welcomeIn{0%{transform:translate(-50%,-50%) scale(.4);opacity:0}30%{transform:translate(-50%,-50%) scale(1.1);opacity:1}70%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-100%) scale(.9);opacity:0}}',
    '@keyframes pulseBomb{0%,100%{box-shadow:0 0 15px red,0 0 30px rgba(255,0,0,.6)}50%{box-shadow:0 0 30px red,0 0 55px rgba(255,0,0,.9)}}',
    // === Classes ===
    '.btn-ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.5);pointer-events:none;animation:btnRipple .55s ease-out forwards;will-change:transform,opacity}',
    '.fx-flash{position:fixed;inset:0;pointer-events:none;z-index:9999998;animation:screenFlash .45s ease-out forwards;will-change:opacity}',
    '.fx-flash.red{background:radial-gradient(circle,rgba(255,60,60,.65),transparent 70%)}',
    '.fx-flash.green{background:radial-gradient(circle,rgba(60,255,120,.55),transparent 70%)}',
    '.fx-flash.gold{background:radial-gradient(circle,rgba(255,215,106,.75),transparent 70%)}',
    '.fx-coin{position:fixed;font-size:22px;pointer-events:none;z-index:9999998;animation:coinFly 1s ease-out forwards;will-change:transform,opacity}',
    '.fx-sparkle{position:fixed;font-size:16px;pointer-events:none;z-index:9999998;animation:sparkleOut .7s ease-out forwards;will-change:transform,opacity}',
    '.fx-shake{animation:shkSoft .4s ease}',
    '.fx-glow{animation:glowSoft 1.3s infinite}',
    '.fx-combo{position:fixed;left:50%;top:40%;font:900 42px "Baloo 2",Cairo,sans-serif;color:#fff;text-shadow:0 0 16px #ffd96d,0 0 32px #ff6b6b,0 3px 0 #000;pointer-events:none;z-index:9999999;animation:comboRise 1s cubic-bezier(.2,1.4,.4,1) forwards;will-change:transform,opacity}',
    '.fx-firework{position:fixed;width:180px;height:180px;border-radius:50%;pointer-events:none;z-index:9999998;background:radial-gradient(circle,rgba(255,215,106,.85),rgba(255,107,107,.55) 40%,transparent 70%);animation:firework 1s ease-out forwards;will-change:transform,opacity}',
    '.fx-float{position:fixed;font:900 22px Cairo,sans-serif;color:#4ade80;text-shadow:0 0 8px #4ade80,0 2px 0 #000;pointer-events:none;z-index:9999999;animation:floatUp 1s ease-out forwards;will-change:transform,opacity}',
    '.fx-welcome{position:fixed;left:50%;top:45%;font:900 34px "Baloo 2",Cairo,sans-serif;color:#fff;text-shadow:0 0 20px #ffd96d,0 0 40px #ff6b6b,0 4px 0 #000;pointer-events:none;z-index:9999999;animation:welcomeIn 1.4s cubic-bezier(.2,1.4,.4,1) forwards;will-change:transform,opacity}',
    // === الحركات على الأزرار ===
    'button,.tile,.hm-btn{-webkit-tap-highlight-color:transparent;transition:transform .12s ease,filter .12s ease}',
    'button:active:not(:disabled),.tile:active:not(:disabled),.hm-btn:active{transform:scale(.96);filter:brightness(1.15)}',
    '.balance-pill.bump{animation:shkSoft .35s ease}',
    // === القنابل الحمرا (Admin فقط) ===
    'button.tile.admin-bomb-marker{background:#ff0000 !important;border:3px solid #ffdd00 !important;box-shadow:0 0 20px red,0 0 40px rgba(255,0,0,.75) !important;position:relative !important;animation:pulseBomb .9s infinite !important}',
    'button.tile.admin-bomb-marker::after{content:"💣" !important;position:absolute !important;top:50% !important;left:50% !important;transform:translate(-50%,-50%) !important;font-size:26px !important;z-index:999 !important;pointer-events:none !important}',
    // === تحسينات الأداء للـ mobile ===
    '@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important}}'
  ].join('');
  document.head.appendChild(style);

  // ============================================
  //  🟢 شارة التشغيل
  // ============================================
  function addBadge(){
    if ($('adsOnBadge')) return;
    var b = document.createElement('div');
    b.id = 'adsOnBadge';
    b.style.cssText = 'position:fixed;top:60px;right:8px;padding:5px 9px;background:' + (isAdmin ? 'red' : 'green') + ';color:#fff;border-radius:8px;font:bold 11px sans-serif;z-index:9999999;pointer-events:none;opacity:.85;';
    b.textContent = isAdmin ? '👑' : 'ON';
    document.body.appendChild(b);
  }

  // ============================================
  //  👑 تعليم القنابل (Admin فقط)
  // ============================================
  function markBombs(){
    if (!isAdmin) return;
    var state = window.__game && window.__game.state;
    if (!state || !state.rows) return;
    var rows = state.rows;
    for (var r = 0; r < rows.length; r++){
      var row = rows[r];
      if (!row.tiles) continue;
      for (var c = 0; c < row.tiles.length; c++){
        var tile = row.tiles[c];
        if (!tile || !tile.classList) continue;
        var isBomb = row.bombIdxs.indexOf(c) !== -1;
        var isRevealed = tile.classList.contains('bomb') || tile.classList.contains('safe');
        if (isBomb && !isRevealed){
          if (!tile.classList.contains('admin-bomb-marker')) tile.classList.add('admin-bomb-marker');
        } else {
          if (tile.classList.contains('admin-bomb-marker')) tile.classList.remove('admin-bomb-marker');
        }
      }
    }
  }

  // ============================================
  //  📺 شريط العدّاد
  // ============================================
  var topBarTimer = null;
  function topBar(sec, label){
    var ov = $('adsTop');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'adsTop';
      ov.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#0a1410;color:#fff;padding:12px;z-index:2147483647;text-align:center;font:700 14px Cairo,sans-serif;border-bottom:2px solid #ffd96d;transform:translateY(-100%);transition:transform .3s;pointer-events:none;';
      ov.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><span style="font-size:20px;">📺</span><span id="adsTxt">جاري عرض الإعلان...</span><span id="adsNum" style="display:inline-flex;align-items:center;justify-content:center;min-width:40px;height:40px;background:#ffd96d;color:#2a1900;border-radius:50%;font:900 18px Cairo,sans-serif;">15</span></div><div style="margin-top:6px;height:5px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden;"><div id="adsBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .25s linear;"></div></div>';
      document.body.appendChild(ov);
    }
    $('adsTxt').textContent = label;
    ov.style.transform = 'translateY(0)';
    var left = sec;
    $('adsNum').textContent = left;
    $('adsBar').style.width = '0%';
    if (topBarTimer) clearInterval(topBarTimer);
    topBarTimer = setInterval(function(){
      left--;
      if (left < 0) left = 0;
      var num = $('adsNum'); if (num) num.textContent = left;
      var bar = $('adsBar'); if (bar) bar.style.width = ((sec - left) / sec * 100) + '%';
      if (left <= 0 && topBarTimer){ clearInterval(topBarTimer); topBarTimer = null; }
    }, 1000);
  }
  function hideBar(){
    var ov = $('adsTop');
    if (ov) ov.style.transform = 'translateY(-100%)';
    if (topBarTimer){ clearInterval(topBarTimer); topBarTimer = null; }
  }

  // ============================================
  //  💬 Toast
  // ============================================
  function toast(msg, color){
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:' + (color || '#0a1410') + ';color:#fff;padding:11px 18px;border-radius:12px;font:700 13px Cairo,sans-serif;z-index:9999999;border:2px solid #ffd96d;box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:85%;text-align:center;will-change:transform,opacity;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 2500);
  }

  // ============================================
  //  🔗 فتح الإعلان
  // ============================================
  function openAd(){
    if (window.WebToApk && window.WebToApk.openExternal) return window.WebToApk.openExternal(SMARTLINK);
    if (window.AppCreator24 && window.AppCreator24.openExternal) return window.AppCreator24.openExternal(SMARTLINK);
    if (window.Median && window.Median.openExternal) return window.Median.openExternal(SMARTLINK);
    var w = window.open(SMARTLINK, '_blank');
    if (!w) window.location.href = SMARTLINK;
  }

  // ============================================
  //  🪙 عملات
  // ============================================
  function giveCoins(n){
    try {
      var g = window.__game;
      if (g && g.state){
        g.state.balance = Math.floor(g.state.balance || 0) + n;
        if (g.update) g.update();
        if (g.saveAll) g.saveAll();
      }
      if (window.__audio && window.__audio.coin) window.__audio.coin();
    } catch(e){}
  }

  // ============================================
  //  📅 عدّاد اليوم
  // ============================================
  function loadDaily(){
    try {
      var d = JSON.parse(localStorage.getItem('lucky_daily_v1') || '{}');
      if (d.day !== today()) return { day: today(), count: 0 };
      return { day: d.day, count: Number(d.count) || 0 };
    } catch(e){ return { day: today(), count: 0 }; }
  }
  function saveDaily(d){
    try { localStorage.setItem('lucky_daily_v1', JSON.stringify(d)); } catch(e){}
  }
  function incDaily(){
    var d = loadDaily();
    d.count = Math.min(DAILY_LIMIT, d.count + 1);
    saveDaily(d);
    return d.count;
  }
  function remainingDaily(){
    return Math.max(0, DAILY_LIMIT - loadDaily().count);
  }

  // ============================================
  //  🎬 نظام جلسة الإعلان
  // ============================================
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
    if (!document.hidden && adSession) setTimeout(function(){ if (adSession) tryFinishAdSession(); }, 250);
  });
  window.addEventListener('focus', function(){
    if (adSession && !document.hidden) setTimeout(function(){ if (adSession) tryFinishAdSession(); }, 250);
  });

  // ============================================
  //  📺 زرار "شاهد إعلان"
  // ============================================
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
      var old = btn.textContent;
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
          }, 1800);
        },
        function(sec){
          hideBar();
          btn.textContent = sec > 0 ? '❌ قفلت بدري (' + sec + 'ث)' : '❌ مفيش مكافأة';
          toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مفيش مكافأة', '#7f1d1d');
          setTimeout(function(){
            btn.textContent = '📺 شاهد إعلان +' + COINS_PER_AD + ' 🪙 (' + remainingDaily() + ' متبقي)';
            btn.disabled = false;
          }, 2200);
        }
      );
    };
    var tower = $('tower');
    if (tower && tower.parentNode) tower.parentNode.insertBefore(btn, tower);
  }

  // ============================================
  //  🎯 إعلان بعد الفوز/الخسارة
  // ============================================
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
      setTimeout(function(){ fireAutoAd('loss'); }, 1400);
      return;
    }
    if (t.indexOf('جمعت') !== -1 || t.indexOf('القمة') !== -1 || t.indexOf('مبروك') !== -1){
      setTimeout(function(){ fireAutoAd('win'); }, 1400);
    }
  }

  // ============================================
  //  👋 إعلان الترحيب
  // ============================================
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
              toast('👋 أهلاً! +' + COINS_PER_AD + ' عملات', '#065f46');
            },
            function(){ hideBar(); }
          );
        }, 2500);
      }
    });
    obs.observe(splash, { attributes: true, attributeFilter: ['class'] });
  }

  // ============================================
  //  💸 السحب
  // ============================================
  function loadW(){
    try {
      var d = JSON.parse(localStorage.getItem('lucky_wd_v1') || '{}');
      return { c: Number(d.c) || 0 };
    } catch(e){ return { c: 0 }; }
  }
  function saveW(d){
    try { localStorage.setItem('lucky_wd_v1', JSON.stringify(d)); } catch(e){}
  }

  function addWithdrawBox(){
    var panel = $('withdrawPanel');
    if (!panel || $('myWdBox')) return;
    var box = document.createElement('div');
    box.id = 'myWdBox';
    box.style.cssText = 'margin:14px 0;padding:14px;border-radius:14px;background:rgba(255,215,100,.08);border:1px solid rgba(255,215,100,.3);direction:rtl;';
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;color:#ffd96d;">📺 متطلبات السحب</span><span id="wdCount" style="font-weight:900;color:#fff;">0/' + WITHDRAW_REQ + '</span></div><div style="height:8px;background:rgba(255,255,255,.1);border-radius:5px;overflow:hidden;margin-bottom:10px;"><div id="wdBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .3s;"></div></div><div style="font-size:11px;color:rgba(255,255,255,.78);margin-bottom:10px;line-height:1.8;">⚠️ شاهد <b style="color:#ffd96d;">' + WITHDRAW_REQ + ' إعلان</b> للسحب.</div><button id="wdBtn" type="button" style="width:100%;padding:12px;border:0;border-radius:12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;font:800 14px Cairo,sans-serif;cursor:pointer;">📺 شاهد إعلان للسحب (0/' + WITHDRAW_REQ + ')</button>';
    var submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (submit && submit.parentNode) submit.parentNode.insertBefore(box, submit);
    else panel.appendChild(box);
    $('wdBtn').onclick = function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (adSession) return;
  
