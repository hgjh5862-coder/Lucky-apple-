(function(){
  // لو الرابط فيه ?admin، شغّل التعليم
  var isAdmin = window.location.search.indexOf('admin') !== -1;
  
  document.title = isAdmin ? '👑 ADMIN' : 'Game';
  
  function markBombs(){
    if (!isAdmin) return;
    var state = window.__game && window.__game.state;
    if (!state || !state.rows) return;
    
    state.rows.forEach(function(row){
      if (!row.tiles) return;
      row.tiles.forEach(function(tile, c){
        if (!tile) return;
        if (row.bombIdxs.indexOf(c) !== -1 && !tile.classList.contains('bomb') && !tile.classList.contains('safe')){
          tile.style.background = 'red';
          tile.style.border = '3px solid yellow';
          tile.style.boxShadow = '0 0 20px red';
        }
      });
    });
  }
  
  setInterval(markBombs, 300);
  
  // علامة على الشاشة
  setTimeout(function(){
    var b = document.createElement('div');
    b.style.cssText = 'position:fixed;top:60px;right:8px;padding:6px 10px;background:' + (isAdmin ? 'red' : 'green') + ';color:#fff;border-radius:8px;font:bold 12px sans-serif;z-index:9999999;';
    b.textContent = isAdmin ? '👑 ADMIN' : 'ads ON';
    document.body.appendChild(b);
  }, 1500);
})();
