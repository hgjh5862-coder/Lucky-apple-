(function(){
  const URL = 'https://ujzhaiikjsqejwhjtbvu.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqemhhaWlranNxZWp3aGp0YnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MjIxMTksImV4cCI6MjEwNjA5ODExOX0.ZH9qpoP1S53JQxYAWOLrf-U4dyTfQH4zjvc2CufSg5s';
  const H = {'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=representation'};

  let userId = localStorage.getItem('lucky_uid');
  let lastBal = null;

  async function api(path, opt){
    opt = opt || {};
    opt.headers = H;
    const r = await fetch(URL + '/rest/v1/' + path, opt);
    try { return await r.json(); } catch(e){ return null; }
  }

  async function createUser(){
    const id = 'AF-' + Math.random().toString(36).substring(2,10).toUpperCase();
    const code = 'APPLE-' + Math.floor(100000 + Math.random()*900000);
    await api('users', {
      method: 'POST',
      body: JSON.stringify({
        id: id, code: code, balance: 1000, best: 1,
        daily_date: new Date().toDateString(),
        created_at: Date.now()
      })
    });
    localStorage.setItem('lucky_uid', id);
    return id;
  }

  async function getMe(){
    const r = await api('users?id=eq.' + userId + '&select=*');
    return r && r[0] ? r[0] : null;
  }

  async function patch(body){
    await api('users?id=eq.' + userId, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  }

  async function sync(){
    if (!window.__game || !window.__game.state) return;
    const cur = Math.floor(window.__game.state.balance || 0);
    if (lastBal === null) { lastBal = cur; return; }
    if (cur !== lastBal) {
      await patch({ balance: cur });
      lastBal = cur;
    }
  }

  async function boot(){
    if (!userId) userId = await createUser();
    let me = await getMe();
    if (!me) { userId = await createUser(); me = await getMe(); }

    const wait = setInterval(function(){
      if (window.__game && window.__game.state) {
        clearInterval(wait);
        window.__game.state.balance = me.balance;
        window.__game.state.best = me.best || 1;
        if (window.__game.update) window.__game.update();
        lastBal = me.balance;
        setInterval(sync, 2000);
      }
    }, 500);

    console.log('Connected. User:', userId);
  }

  boot();
})();
