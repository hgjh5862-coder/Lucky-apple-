(function(){
  // ============ Adsterra Popunder ============
(function(){
  var s = document.createElement('script');
  s.src = 'https://pl31571425.profitableratecpmnetwork.com/cf/60/9a/cf609af977144fcfc0500d9b09e96649.js';
  s.async = true;
  document.head.appendChild(s);
})();

// ============ Adsterra Social Bar ============
(function(){
  var s = document.createElement('script');
  s.src = 'https://pl31571426.profitableratecpmnetwork.com/4e/de/47/4ede4761fefd3f3c449a027dc8d2f73ccd.js';
  s.async = true;
  document.head.appendChild(s);
})();
  const SMARTLINK = 'https://www.profitableratecpmnetwork.com/ui0j3pra?key=d399235ded04378cd859207920326c81';
  const AD_DURATION = 15000;
  const AD_MIN = 14000;
  const COINS_PER_AD = 5;
  const DAILY_LIMIT = 50;
  const WITHDRAW_REQ = 50;
  const WHEEL_DAILY = 10;
  const AUTO_COOLDOWN = 25000;
  const STORAGE = { daily: 'lucky_daily_v1', withdraw: 'lucky_wd_v1', wheel: 'lucky_wh_v1' };

  const $ = (id) => document.getElementById(id);
  const now = () => Date.now();
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };

  // ============ علامة التشغيل ============
  const badge = document.createElement('div');
  badge.style.cssText = 'position:fixed;bottom:6px;right:6px;background:green;color:#fff;padding:5px 9px;border-radius:8px;font:11px Cairo,sans-serif;z-index:99999999;pointer-events:none;';
  badge.textContent = 'ads ON';
  if (document.body) document.body.appendChild(badge);

  // ============ شريط العدّاد ============
  function topBar(sec, label){
    let ov = $('adsTop');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'adsTop';
      ov.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#0a1410;color:#fff;padding:14px;z-index:2147483647;text-align:center;font:700 14px Cairo,sans-serif;border-bottom:2px solid #ffd96d;transform:translateY(-100%);transition:transform .3s;pointer-events:none;';
      ov.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;"><span style="font-size:20px;">📺</span><span id="adsTxt">جاري عرض الإعلان...</span><span id="adsNum" style="display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;background:#ffd96d;color:#2a1900;border-radius:50%;font:900 18px Cairo,sans-serif;">15</span></div><div style="margin-top:6px;font-size:11px;color:#ffb3b3;">⚠️ لا تغلق الإعلان حتى انتهاء العدّاد</div><div style="margin-top:8px;height:6px;background:rgba(255,255,255,.15);border-radius:4px;overflow:hidden;"><div id="adsBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .2s;"></div></div>';
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

  // ============ Toast ============
  function toast(msg, color){
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:' + (color || '#0a1410') + ';color:#fff;padding:12px 20px;border-radius:12px;font:700 14px Cairo,sans-serif;z-index:99999999;border:2px solid #ffd96d;box-shadow:0 8px 24px rgba(0,0,0,.4);max-width:85%;text-align:center;';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  }

  // ============ فتح الإعلان ============
  function openAd(){
    if (window.WebToApk && window.WebToApk.openExternal) return window.WebToApk.openExternal(SMARTLINK);
    if (window.AppCreator24 && window.AppCreator24.openExternal) return window.AppCreator24.openExternal(SMARTLINK);
    if (window.Median && window.Median.openExternal) return window.Median.openExternal(SMARTLINK);
    const w = window.open(SMARTLINK, '_blank');
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

  // ============ عدّاد اليوم (50 إعلان) ============
  function loadDaily(){
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE.daily) || '{}');
      if (d.day !== today()) return { day: today(), count: 0 };
      return { day: d.day, count: Number(d.count) || 0 };
    } catch(e){ return { day: today(), count: 0 }; }
  }
  function saveDaily(d){ try { localStorage.setItem(STORAGE.daily, JSON.stringify(d)); } catch(e){} }
  function incDaily(){
    const d = loadDaily();
    d.count = Math.min(DAILY_LIMIT, d.count + 1);
    saveDaily(d);
    return d.count;
  }
  function remainingDaily(){
    return Math.max(0, DAILY_LIMIT - loadDaily().count);
  }

  // ============ نظام الجلسة ============
  let adSession = null;
  let adFailTimer = null;

  function startAdSession(label, onSuccess, onFail){
    if (adSession) return;

    // نتأكد من الحد اليومي
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

  // ============ 1) زر "شاهد إعلان" الرئيسي ============
  function addRewardBtn(){
    if ($('myRewardBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'myRewardBtn';
    btn.style.cssText = 'display:block;width:92%;margin:14px auto;padding:14px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;border:0;border-radius:16px;font:800 15px Cairo,sans-serif;box-shadow:0 6px 0 #8a5c10;cursor:pointer;position:relative;z-index:100;';
    btn.textContent = '📺 شاهد إعلان +5 🪙 (' + remainingDaily() + ' متبقي)';

    btn.onclick = function(){
      if (btn.disabled || adSession) return;
      if (remainingDaily() <= 0){
        toast('🚫 خلصت إعلانات النهاردة', '#7f1d1d');
        return;
      }
      btn.disabled = true;
      const old = btn.textContent;
      btn.textContent = '⏳ جاري فتح الإعلان...';

      startAdSession(
        '🎁 إعلان مكافأة +5 🪙',
        function(){
          hideBar();
          giveCoins(COINS_PER_AD);
          btn.textContent = '✅ +5 🪙';
          toast('✅ ممتاز! +5 عملات', '#065f46');
          setTimeout(function(){
            btn.textContent = '📺 شاهد إعلان +5 🪙 (' + remainingDaily() + ' متبقي)';
            btn.disabled = false;
          }, 2000);
        },
        function(sec){
          hideBar();
          btn.textContent = sec > 0 ? '❌ قفلت بدري (' + sec + 'ث)' : '❌ مفيش مكافأة';
          toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مفيش مكافأة', '#7f1d1d');
          setTimeout(function(){
            btn.textContent = '📺 شاهد إعلان +5 🪙 (' + remainingDaily() + ' متبقي)';
            btn.disabled = false;
          }, 2500);
        }
      );
    };

    const tower = $('tower');
    if (tower && tower.parentNode) tower.parentNode.insertBefore(btn, tower);
  }

  // ============ 2) إعلان تلقائي بعد الفوز/الخسارة ============
  let lastAutoAd = 0;
  let autoBusy = false;

  function fireAutoAd(type){
    if (autoBusy || adSession) return;
    if (now() - lastAutoAd < AUTO_COOLDOWN) return;
    if (remainingDaily() <= 0) return;
    autoBusy = true;
    lastAutoAd = now();
    const label = type === 'win'
      ? '🏆 إعلان بعد الفوز (+5 🪙)'
      : '💥 إعلان بعد الخسارة (+5 🪙)';
    startAdSession(
      label,
      function(){
        hideBar();
        giveCoins(COINS_PER_AD);
        toast('✅ ممتاز! +5 عملات', '#065f46');
        autoBusy = false;
      },
      function(sec){
        hideBar();
        toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مفيش مكافأة', '#7f1d1d');
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

  // ============ 3) إعلان تلقائي عند فتح اللعبة ============
  function firstOpenAd(){
    if (sessionStorage.getItem('firstAdShown')) return;
    const splash = $('splash');
    if (!splash) return;
    const obs = new MutationObserver(function(){
      if (splash.classList.contains('hidden')){
        obs.disconnect();
        sessionStorage.setItem('firstAdShown', '1');
        setTimeout(function(){
          if (remainingDaily() <= 0) return;
          startAdSession(
            '👋 إعلان الترحيب (+5 🪙)',
            function(){
              hideBar();
              giveCoins(COINS_PER_AD);
              toast('👋 أهلاً! +5 عملات ترحيبية', '#065f46');
            },
            function(){
              hideBar();
            }
          );
        }, 2500);
      }
    });
    obs.observe(splash, { attributes: true, attributeFilter: ['class'] });
  }

  // ============ 4) السحب (50 إعلان) ============
  function loadW(){
    try { const d = JSON.parse(localStorage.getItem(STORAGE.withdraw) || '{}'); return { c: Number(d.c) || 0 }; }
    catch(e){ return { c: 0 }; }
  }
  function saveW(d){ try { localStorage.setItem(STORAGE.withdraw, JSON.stringify(d)); } catch(e){} }

  function addWithdrawBox(){
    const panel = $('withdrawPanel');
    if (!panel || $('myWdBox')) return;
    const box = document.createElement('div');
    box.id = 'myWdBox';
    box.style.cssText = 'margin:14px 0;padding:14px;border-radius:14px;background:rgba(255,215,100,.08);border:1px solid rgba(255,215,100,.3);direction:rtl;';
    box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-weight:800;color:#ffd96d;">📺 متطلبات السحب</span><span id="wdCount" style="font-weight:900;color:#fff;">0/' + WITHDRAW_REQ + '</span></div><div style="height:8px;background:rgba(255,255,255,.1);border-radius:5px;overflow:hidden;margin-bottom:10px;"><div id="wdBar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd96d,#e7a928);transition:width .3s;"></div></div><div style="font-size:11px;color:rgba(255,255,255,.78);margin-bottom:10px;line-height:1.8;">⚠️ لسحب أرباحك، لازم تتفرج على <b style="color:#ffd96d;">' + WITHDRAW_REQ + ' إعلان كامل</b>.<br>مدة كل إعلان: <b>15 ثانية</b>. لو قفلت قبل الوقت، <b>لن يُحسب</b>.</div><button id="wdBtn" type="button" style="width:100%;padding:12px;border:0;border-radius:12px;background:linear-gradient(135deg,#ffd96d,#d99022);color:#2a1900;font:800 14px Cairo,sans-serif;cursor:pointer;">📺 شاهد إعلان للسحب (0/' + WITHDRAW_REQ + ')</button>';
    const submit = $('withdrawBtn') || document.querySelector('.withdraw-submit-new');
    if (submit && submit.parentNode) submit.parentNode.insertBefore(box, submit);
    else panel.appendChild(box);

    $('wdBtn').onclick = function(e){
      e.preventDefault(); e.stopImmediatePropagation();
      if (adSession) return;
      const d = loadW();
      if (d.c >= WITHDRAW_REQ) return;
      if (remainingDaily() <= 0){
        toast('🚫 خلصت إعلانات النهاردة', '#7f1d1d');
        return;
      }

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
          toast(sec > 0 ? '❌ قفلت الإعلان بدري (' + sec + 'ث)' : '❌ مش محتسب', '#7f1d1d');
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

  // ============ 5) عجلة الحظ (10 لفات) ============
  function loadWh(){
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE.wheel) || '{}');
      if (d.day !== today()) return { day: today(), s: 0 };
      return { day: d.day, s: Number(d.s) || 0 };
    } catch(e){ return { day: today(), s: 0 }; }
  }
  function saveWh(d){ try { localStorage.setItem(STORAGE.wheel, JSON.stringify(d)); } catch(e){} }
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
      if (remainingDaily() <= 0){
        toast('🚫 خلصت إعلانات النهاردة', '#7f1d1d');
        return;
      }
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
          clone.textContent = sec > 0 ? '❌ قفلت بدري (' + sec + 'ث)' : '❌ مش محتسب';
          whBusy = false;
          toast(sec > 0 ? '❌ قفلت الإعلان بدري' : '❌ مش محتسب', '#7f1d1d');
          setTimeout(function(){
            const d2 = loadWh();
            const nl = Math.max(0, WHEEL_DAILY - d2.s);
            clone.textContent = nl > 0 ? '📺 شاهد إعلان للحصول على لفة (' + nl + ' متبقية)' : '🚫 خلصت لفات النهاردة - ارجع بكرة';
            clone.disabled = nl <= 0;
          }, 2500);
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

  // ============ تنظيف ============
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
    firstOpenAd();
    setInterval(refresh, 1000);
    setInterval(watchMessages, 800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  document.addEventListener('visibilitychange', function(){ if (!document.hidden) refresh(); });
  
// ============ Supabase ============
const SB_URL = 'https://ujzhaiikjsqejwhjtbvu.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqemhhaWlranNxZWp3aGp0YnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MjIxMTksImV4cCI6MjEwNjA5ODExOX0.ZH9qpoP1S53JQxYAWOLrf-U4dyTfQH4zjvc2CufSg5s';
const SB_H = { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' };

let sbUserId = localStorage.getItem('lucky_uid');

async function sbApi(path, opt){
  opt = opt || {};
  opt.headers = SB_H;
  try {
    const r = await fetch(SB_URL + '/rest/v1/' + path, opt);
    return await r.json();
  } catch(e){ return null; }
}

async function sbCreateUser(){
  const id = 'AF-' + Math.random().toString(36).substring(2,10).toUpperCase();
  const code = 'APPLE-' + Math.floor(100000 + Math.random()*900000);
  await sbApi('users', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      code: code,
      balance: 1000,
      best: 1,
      daily_date: new Date().toDateString(),
      created_at: Date.now()
    })
  });
  localStorage.setItem('lucky_uid', id);
  return id;
}

async function sbGetMe(){
  if (!sbUserId) return null;
  const r = await sbApi('users?id=eq.' + sbUserId + '&select=*');
  return r && r[0] ? r[0] : null;
}

async function sbSyncBalance(){
  if (!sbUserId) return;
  if (!window.__game || !window.__game.state) return;
  const cur = Math.floor(window.__game.state.balance || 0);
  if (sbSyncBalance.last === cur) return;
  sbSyncBalance.last = cur;
  await sbApi('users?id=eq.' + sbUserId, {
    method: 'PATCH',
    body: JSON.stringify({ balance: cur })
  });
}

async function sbBoot(){
  if (!sbUserId) sbUserId = await sbCreateUser();
  let me = await sbGetMe();
  if (!me){
    sbUserId = await sbCreateUser();
    me = await sbGetMe();
  }
  const wait = setInterval(function(){
    if (window.__game && window.__game.state){
      clearInterval(wait);
      window.__game.state.balance = me.balance;
      if (window.__game.update) window.__game.update();
      sbSyncBalance.last = me.balance;
      setInterval(sbSyncBalance, 3000);
    }
  }, 500);
}

setTimeout(sbBoot, 2000);
})();
