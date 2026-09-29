(function(){
  var isAdmin = window.location.search.indexOf('admin') !== -1;
  
  document.title = isAdmin ? '👑 ADMIN' : 'Game';
  
  // CSS خاص بالقنابل — بـ !important
  var style = document.createElement('style');
  style.textContent = 
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
  document.head.appendChild(style);
  
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
  
  setInterval(markBombs, 200);
  
  // علامة علوية
  setTimeout(function(){
    var b = document.createElement('div');
    b.style.cssText = 'position:fixed;top:60px;right:8px;padding:6px 10px;background:' + (isAdmin ? 'red' : 'green') + ';color:#fff;border-radius:8px;font:bold 12px sans-serif;z-index:9999999;';
    b.textContent = isAdmin ? '👑 ADMIN' : 'ads ON';
    document.body.appendChild(b);
  }, 1500);
})();
