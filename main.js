(function(){
  var root=document.documentElement;
  // Theme toggle (pull-string)
  var pull=document.getElementById("themeToggle");
  if(pull){
    pull.setAttribute("aria-pressed",root.dataset.theme==="dark");
    pull.addEventListener("click",function(){
      var next=root.dataset.theme==="dark"?"light":"dark";
      root.dataset.theme=next;
      try{localStorage.setItem("theme",next)}catch(e){}
      pull.setAttribute("aria-pressed",next==="dark");
      pull.classList.add("pulled");setTimeout(function(){pull.classList.remove("pulled")},220);
    });
  }
  // Nav border on scroll
  var nav=document.getElementById("nav");
  var onScroll=function(){nav&&nav.classList.toggle("scrolled",window.scrollY>8)};
  onScroll();window.addEventListener("scroll",onScroll,{passive:true});
  // Mobile menu
  var tog=document.getElementById("navToggle");
  if(tog){tog.addEventListener("click",function(){document.body.classList.toggle("menu-open")});}
  document.querySelectorAll(".nav-links a").forEach(function(a){a.addEventListener("click",function(){document.body.classList.remove("menu-open")})});
  // Year
  var y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();
  // Cursor hint on project rows
  var hint=document.getElementById("projHint");
  if(hint&&matchMedia("(hover:hover)").matches){
    document.querySelectorAll(".proj").forEach(function(p){
      p.addEventListener("mouseenter",function(){hint.classList.add("on")});
      p.addEventListener("mouseleave",function(){hint.classList.remove("on")});
      p.addEventListener("mousemove",function(e){hint.style.left=e.clientX+"px";hint.style.top=e.clientY+"px"});
    });
  }
  // Reveal on scroll
  var els=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add("in")})}
  // Copy email
  document.querySelectorAll("[data-copy]").forEach(function(b){
    b.addEventListener("click",function(){
      var t=b.getAttribute("data-copy");
      (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy"},1600)}).catch(function(){});
    });
  });
})();

/* Count-up for [data-count] (used by long-form case studies) */
(function(){
  var els=document.querySelectorAll("[data-count]");
  if(!els.length)return;
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function run(el){
    var end=parseFloat(el.getAttribute("data-count")),pre=el.getAttribute("data-prefix")||"",dur=900,t0=null;
    if(reduce){el.textContent=pre+end;return}
    function step(t){t0=t0||t;var k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3);el.textContent=pre+Math.round(end*e);if(k<1)requestAnimationFrame(step)}
    requestAnimationFrame(step);
  }
  if(!("IntersectionObserver" in window)){els.forEach(run);return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.5});
  els.forEach(function(el){io.observe(el)});
})();
