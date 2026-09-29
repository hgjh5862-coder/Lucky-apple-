(function(){
  'use strict';

  // ============================================
  //  🔐 كلمة المرور (غيّرها لاحقاً)
  // ============================================
  var PASSWORD = 'علي2026';
  var ADMIN_KEY = 'lucky_admin_mode';

  // ============================================
  //  🔐 شاشة كلمة المرور (للأدمن بس)
  // ============================================
  function askPassword(){
    return new Promise(function(resolve){
      var blocker = document.createElement('div');
      blocker.style.cssText = 'position:fixed;inset:0;background:linear-gradient(135deg,#0a1410,#1a3220);z-index:999999999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Cairo,sans-serif;direction:rtl;padding:20px;';
      blocker.innerHTML =
        '<div style="font-size:60px;margin-bottom:20px;">🔐</div>' +
        '<div style="color:#ffd96d;font-size:22px;font-weight:900;margin-bottom:8px;">وضع المطور</div>' +
        '<div style="color:#aaa;font-size:13px;margin-bottom:24px;">اكتب كلمة المرور</div>' +
        '<input id="passInput" type="password" placeholder="كلمة المرور" style="width:min(300px,90%);padding:14px;border-radius:12px;border:2px solid #ffd96d;background:rgba(0,0,0,.4);color:#fff;font:800 16px Cairo,sans-serif;text-align:center;outline:none;margin-bottom:14px;" />' +
        '<button id="passBtn" style="width:min(300px,90%);padding:14px;border:0;border-radius:12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;font:900 16px Cairo,sans-serif;cursor:pointer;">دخول</button>' +
        '<div id="passError" style="color:#ff5d6c;font-size:13px;margin-top:14px;font-weight:700;height:20px;"></div>' +
        '<button id="passSkip" style="margin-top:20px;background:transparent;color:#888;border:0;font:600 12px Cairo,sans-serif;cursor:pointer;">متابعة كزائر عادي</button>';

      document.body.appendChild(blocker);

      function tryLogin(){
        var val = (document.getElementById('passInput').value || '').trim();
        if (val === PASSWORD){
          try { localStorage.setItem(ADMIN_KEY, '1'); } catch(e){}
          blocker.remove();
          resolve(true);
        } else {
          document.getElementById('passError').textContent = '❌ كلمة المرور غلط';
          document.getElementById('passInput').value = '';
        }
      }
      function skipLogin(){
        try { localStorage.removeItem(ADMIN_KEY); } catch(e){}
        blocker.remove();
        resolve(false);
      }

      document.getElementById('passBtn').onclick = tryLogin;
      document.getElementById('passSkip').onclick = skipLogin;
      document.getElementById('passInput').addEventListener('keydown', function(e){
        if (e.key === 'Enter') tryLogin();
      });
      setTimeout(function(){ document.getElementById('passInput').focus(); }, 300);
    });
  }

  function isAdminMode(){
    try { return localStorage.getItem(ADMIN_KEY) === '1'; } catch(e){ return false; }
  }

  // ============================================
  //  💰 Adsterra Social Bar
  // ============================================
  (function(){
    var s = document.createElement('script');
    s.src = 'https://pl31571426.profitableratecpmnetwork.com/4e/de/47/4ede4761fefd3f3c449a027dc8d2f73ccd.js';
    s.async = true;
    document.head.appendChild(s);
  })();

  // ============================================
  //  ⚙️ الإعدادات
  // ============================================
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
  
  // ============================================
  //  🟢 علامة التشغيل
  // ============================================
  function addBadge(){
    if ($('adsOnBadge')) return;
    var b = document.createElement('div');
    b.id = 'adsOnBadge';
    b.style.cssText = 'position:fixed;bottom:6px;right:6px;background:green;color:#fff;padding:5px 9px;border-radius:8px;font:11px Cairo,sans-serif;z-index:9999999;pointer-events:none;';
    b.textContent = 'ads ON';
    document.body.appendChild(b);
  }

  // ============================================
  //  📺 شريط العدّاد
  // ============================================
  function topBar(sec, label){
    var ov = $('adsTop');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'adsTop';
      ov.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#0a1410;color:#fff;padding:14px;z-index:2147483647;text-align:center;font:700 14px Cairo,sans-serif;border-bottom:2px solid #ffd96d;transform:translateY(-100%);transition:transform .3s;pointer-events:none;';
      ov.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><span style="font-size:20px;">📺</span><span id="adsTxt">جاري عرض الإعلان...</span><span id="adsNum" style="display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;background:#ffd96d;color:#2a1900;border-radius:50%;font:900 18px Cairo,sans-serif;">15</span></div><div style="margin-top:6px;font-size:11px;color:#ffb3b3;">⚠️ لا تغلق الإعلان حتى انتهاء العدّاد</div><div style="margin-top:8px;height:6px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden;"><div id="adsBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .2s;"></div></div>';
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

  // ============================================
  //  💬 Toast
  // ============================================
  function toast(msg, color){
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:' + (color || '#0a1410') + ';color:#fff;padding:12px 20px;border-radius:12px;font:700 14px Cairo,sans-serif;z-index:9999999;border:2px solid #ffd96d;box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:85%;text-align:center;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
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
  //  🪙 إعطاء عملات
  // ============================================
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
  //  🎬 نظام الجلسة
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
    if (!document.hidden && adSession){
      setTimeout(function(){ if (adSession) tryFinishAdSession(); }, 300);
    }
  });
  window.addEventListener('focus', function(){
    if (adSession && !document.hidden){
      setTimeout(function(){ if (adSession) tryFinishAdSession(); }, 300);
    }
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
          toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مفيش مكافأة', '#7f1d1d');
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

  // ============================================
  //  🎯 إعلان تلقائي بعد الفوز/الخسارة
  // ============================================
  var lastAutoAd = 0;
  var autoBusy = false;
  function fireAutoAd(type){
    if (autoBusy || adSession) return;
    if (now() - lastAutoAd < AUTO_COOLDOWN) return;
    if (remainingDaily() <= 0) return;
    autoBusy = true;
    lastAutoAd = now();
    var label = type === 'win'
      ? '🏆 إعلان بعد الفوز (+' + COINS_PER_AD + ' 🪙)'
      : '💥 إعلان بعد الخسارة (+' + COINS_PER_AD + ' 🪙)';
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
        toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مفيش مكافأة', '#7f1d1d');
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
            '👋 إعلان الترحيب (+' + COINS_PER_AD + ' 🪙)',
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

  // ============================================
  //  💸 السحب
  // ============================================
  function loadW(){
    try { var d = JSON.parse(localStorage.getItem('lucky_wd_v1') || '{}'); return { c: Number(d.c) || 0 }; }
    catch(e){ return { c: 0 }; }
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
          toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مش محتسب', '#7f1d1d');
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

  // ============================================
  //  🎡 عجلة الحظ
  // ============================================
  function loadWh(){
    try {
      var d = JSON.parse(localStorage.getItem('lucky_wh_v1') || '{}');
      if (d.day !== today()) return { day: today(), s: 0 };
      return { day: d.day, s: Number(d.s) || 0 };
    } catch(e){ return { day: today(), s: 0 }; }
  }
  function saveWh(d){
    try { localStorage.setItem('lucky_wh_v1', JSON.stringify(d)); } catch(e){}
  }
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

  // ============================================
  //  🧹 تنظيف وتشغيل
  // ============================================
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
  }

  function boot(){
    addBadge();
    refresh();
    firstOpenAd();
    setInterval(refresh, 1000);
    setInterval(watchMessages, 800);
  }

  // ============================================
  //  👑 Admin Mode — تعليم القنابل بالأحمر
  // ============================================
  (function(){
    var style = document.createElement('style');
    style.textContent =
      '@keyframes pulseRedBomb {' +
      '  0%,100% { box-shadow: 0 0 12px red, 0 0 25px rgba(255,0,0,.6) !important; }' +
      '  50% { box-shadow: 0 0 30px red, 0 0 55px rgba(255,0,0,.9) !important; }' +
      '}' +
      'button.tile.admin-bomb {' +
      '  background: radial-gradient(circle at 32% 26%, #ff8888 0%, #ff2020 40%, #8b0000 100%) !important;' +
      '  border: 3px solid #ff0000 !important;' +
      '  box-shadow: 0 0 15px red, 0 0 30px rgba(255,0,0,.7), inset 0 0 15px rgba(255,255,255,.3) !important;' +
      '  animation: pulseRedBomb 0.7s infinite !important;' +
      '  position: relative !important;' +
      '}' +
      'button.tile.admin-bomb::after {' +
      '  content: "💣" !important;' +
      '  position: absolute !important;' +
      '  font-size: 26px !important;' +
      '  left: 50% !important;' +
      '  top: 50% !important;' +
      '  transform: translate(-50%,-50%) !important;' +
      '  z-index: 10 !important;' +
      '  pointer-events: none !important;' +
      '  filter: drop-shadow(0 0 6px rgba(0,0,0,.8)) !important;' +
      '}';
    document.head.appendChild(style);

    function markBombs(){
      if (!isAdminMode()) return;
      var state = window.__game && window.__game.state;
      if (!state || !state.rows) return;
      state.rows.forEach(function(rowState){
        if (!rowState.tiles) return;
        rowState.tiles.forEach(function(tile, c){
          if (!tile || !tile.classList) return;
          var isBomb = rowState.bombIdxs.indexOf(c) !== -1;
          var isRevealed = tile.classList.contains('bomb') || tile.classList.contains('safe');
          if (isBomb && !isRevealed) {
            if (!tile.classList.contains('admin-bomb')) tile.classList.add('admin-bomb');
          } else {
            if (tile
