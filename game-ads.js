(function(){
  document.title = '✅ WORKS';
  console.log('✅ Game-ADS loaded');
  
  // علامة خضرا في الركن
  setTimeout(function(){
    var b = document.createElement('div');
    b.style.cssText = 'position:fixed;bottom:6px;right:6px;background:green;color:#fff;padding:8px 12px;border-radius:8px;font:bold 14px sans-serif;z-index:9999999;';
    b.textContent = 'ads ON';
    document.body.appendChild(b);
  }, 1000);
})();
