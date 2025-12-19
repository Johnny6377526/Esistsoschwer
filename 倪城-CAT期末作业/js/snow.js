// Lightweight Canvas Snowfall
// - Respects prefers-reduced-motion
// - Low particle count on small screens
// - Pointer-events: none so it won't block UI
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'snow-canvas';
  canvas.setAttribute('aria-hidden','true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
  function resize(){
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  let flakes = [];
  function createFlakes(){
    flakes = [];
    const count = Math.max(16, Math.floor((w*h)/90000)); // density tuned
    const maxSize = (w < 600) ? 6 : 10;
    for(let i=0;i<count;i++){
      flakes.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 1 + Math.random()*maxSize,
        d: 0.5 + Math.random()*1.5,
        vx: (Math.random()-0.5)*0.6,
        vy: 0.5 + Math.random()*1.2,
        a: 0.6 + Math.random()*0.4
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    for(let f of flakes){
      ctx.globalAlpha = f.a;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      ctx.fill();
      f.x += f.vx * f.d;
      f.y += f.vy * f.d;
      // wrap
      if(f.y > h + 20) { f.y = -10; f.x = Math.random()*w; }
      if(f.x > w + 20) { f.x = -10; }
      if(f.x < -20) { f.x = w + 10; }
    }
    requestAnimationFrame(step);
  }

  // throttle resize
  let rtid;
  function onResize(){
    clearTimeout(rtid);
    rtid = setTimeout(()=>{ resize(); createFlakes(); }, 120);
  }

  // init only on DOM ready
  function init(){
    resize();
    createFlakes();
    requestAnimationFrame(step);
    window.addEventListener('resize', onResize, {passive:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // expose simple toggle for debugging
  window.__snowToggle = function(on){
    if(!on){ canvas.style.display = 'none'; }
    else { canvas.style.display = ''; }
  };
})();
