document.addEventListener("DOMContentLoaded",function(){
  /* --- Slide carousel --- */
  document.querySelectorAll("[data-slider]").forEach(function(slider){
    var slides=slider.querySelectorAll("[data-slide]");
    var dots=slider.querySelectorAll("[data-dot]");
    var current=0,len=slides.length,interval,leaving=null;
    function goTo(i){
      if(i===current||!len)return;
      slides.forEach(function(s){
        if(parseInt(s.dataset.slide)===i){
          s.style.animation="slide-in-right 0.7s ease-in-out forwards";
          s.style.display="block";
        }else if(parseInt(s.dataset.slide)===current){
          s.style.animation="slide-out-left 0.7s ease-in-out forwards";
          s.style.zIndex="10";
          setTimeout(function(){s.style.display="none";s.style.zIndex="";},700);
        }else{
          s.style.display="none";
        }
      });
      current=i;
      updateDots();
    }
    function updateDots(){
      dots.forEach(function(d,i){d.className="rounded-full transition-all duration-300"+(i===current?" h-2 w-8 bg-accent sm:h-1.5":" h-2 w-2 bg-foreground/30 hover:bg-foreground/50 sm:h-1.5");});
    }
    function start(){interval=setInterval(function(){goTo((current+1)%len);},5000);}
    function stop(){clearInterval(interval);}
    dots.forEach(function(dot,i){dot.addEventListener("click",function(){stop();goTo(i);start();});});
    updateDots();
    start();
  });

  /* --- Theme button dropdown --- */
  document.querySelectorAll("[data-theme-toggle]").forEach(function(btn){
    var panel=btn.nextElementSibling;
    btn.addEventListener("click",function(e){e.stopPropagation();panel.classList.toggle("hidden");});
    document.addEventListener("click",function(e){if(!panel.contains(e.target)&&e.target!==btn)panel.classList.add("hidden");});
  });

  /* --- Theme swatch click --- */
  document.addEventListener("click",function(e){
    var swatch=e.target.closest("[data-theme-swatch]");
    if(swatch){
      var theme=swatch.dataset.themeSwatch;
      document.documentElement.setAttribute("data-theme",theme);
      try{localStorage.setItem("chat-theme",theme);}catch(ex){}
      window.dispatchEvent(new CustomEvent("chat-theme-change",{detail:{theme:theme}}));
    }
  });

  /* --- FAQ accordion --- */
  document.querySelectorAll("[data-faq-toggle]").forEach(function(btn){
    btn.addEventListener("click",function(){
      var panel=this.parentElement.querySelector("[data-faq-panel]");
      var isOpen=!panel.classList.contains("hidden");
      document.querySelectorAll("[data-faq-panel]").forEach(function(p){p.classList.add("hidden");});
      if(!isOpen)panel.classList.remove("hidden");
    });
  });

  /* --- Size selector --- */
  document.querySelectorAll("[data-size-btn]").forEach(function(btn){
    btn.addEventListener("click",function(){
      this.parentElement.querySelectorAll("[data-size-btn]").forEach(function(b){b.className="min-w-[2.75rem] rounded-[var(--radius)] border px-3 py-2 text-sm transition-colors border-border hover:border-accent/40";});
      this.className="min-w-[2.75rem] rounded-[var(--radius)] border px-3 py-2 text-sm transition-colors border-accent bg-accent-muted text-accent";
    });
  });

  /* --- Mobile bottom nav active state --- */
  var path=window.location.pathname;
  var params=new URLSearchParams(window.location.search);
  document.querySelectorAll("[data-nav-link]").forEach(function(a){
    var href=a.getAttribute("href");
    if(href===path)a.className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[var(--radius)] px-1 py-2 text-[10px] font-semibold transition-all bg-accent-muted text-accent";
  });
});
