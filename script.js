(function(){
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glow=document.querySelector('.glow'),win=document.getElementById('win'),nav=document.getElementById('nav');
  var mx=innerWidth/2,my=innerHeight/3,gx=mx,gy=my,rx=0,ry=0,tx=0,ty=0;
  addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;tx=(my/innerHeight-.5)*-12;ty=(mx/innerWidth-.5)*16});
  function tick(){
    gx+=(mx-gx)*.08;gy+=(my-gy)*.08;rx+=(tx-rx)*.07;ry+=(ty-ry)*.07;
    glow.style.transform='translate('+gx+'px,'+gy+'px)';
    win.style.transform='rotateX('+(rx+4)+'deg) rotateY('+(ry-10)+'deg) rotateZ(-3deg)';
    requestAnimationFrame(tick);
  }
  if(!rm)tick();

  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});

  var links=[].slice.call(document.querySelectorAll('.links a')),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}),ticking=false;
  function onScroll(){nav.classList.toggle('solid',scrollY>40);var cur=-1;secs.forEach(function(x,i){if(x.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach(function(a,i){a.classList.toggle('on',i===cur)});ticking=false}
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();

  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,n=+el.dataset.n,t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});
  if(!rm)document.querySelectorAll('[data-n]').forEach(function(el){el.textContent='0';co.observe(el)});

  var roles=['TikTok @dimensionisinsane','YouTube @DimensionFPS','Discord @dimensiongfx'],ri=0,ci=0,del=false,role=document.getElementById('role');if(!rm)role.textContent='';
  if(!rm)setTimeout(function step(){
    if(del){ci--;if(ci<=0){del=false;ri=(ri+1)%roles.length}}
    else{ci++;if(ci>=roles[ri].length){del=true;role.textContent=roles[ri];return void setTimeout(step,2400)}}
    role.textContent=roles[ri].slice(0,ci);setTimeout(step,del?28:55+Math.random()*70)},1300);

  var stage=document.querySelector('.stage'),prog=document.getElementById('prog'),pf=false;
  addEventListener('scroll',function(){if(pf)return;pf=true;requestAnimationFrame(function(){
    var m=document.documentElement.scrollHeight-innerHeight||1;prog.style.transform='scaleX('+Math.min(1,scrollY/m)+')';
    if(!rm&&stage)stage.style.transform='translateY('+(-scrollY*.1)+'px)';pf=false})},{passive:true});
  document.querySelectorAll('.hub').forEach(function(h){h.addEventListener('pointermove',function(e){var r=h.getBoundingClientRect();h.style.setProperty('--mx',(e.clientX-r.left)+'px');h.style.setProperty('--my',(e.clientY-r.top)+'px')})});
  if(!rm)document.querySelectorAll('.btn.main').forEach(function(b){
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.3-3)+'px)'});
    b.addEventListener('pointerleave',function(){b.style.transform=''})});
  var cv=document.getElementById('fx');
  if(cv&&!rm){var cx=cv.getContext('2d'),W,H,P=[];
    var size=function(){W=cv.width=innerWidth;H=cv.height=innerHeight};size();addEventListener('resize',size);
    for(var i=0;i<46;i++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.6,v:Math.random()*.4+.15,s:Math.random()*6.28});
    (function d(){cx.clearRect(0,0,W,H);P.forEach(function(p){p.y-=p.v;p.s+=.01;p.x+=Math.sin(p.s)*.3;var dx=p.x-mx,dy=p.y-my,d2=dx*dx+dy*dy;if(d2<14400&&d2>1){var q=Math.sqrt(d2),f=(1-q/120)*2.2;p.x+=dx/q*f;p.y+=dy/q*f}if(p.y<-5){p.y=H+5;p.x=Math.random()*W}cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.283);cx.fillStyle='rgba(255,70,100,'+(.15+p.r*.12)+')';cx.fill()});requestAnimationFrame(d)})()}

  var btn=document.getElementById('copy'),chip=btn.querySelector('em');
  btn.addEventListener('click',function(){try{navigator.clipboard.writeText('@dimensiongfx')}catch(e){}chip.textContent='COPIED';setTimeout(function(){chip.textContent='COPY TAG'},1600)});

  /* 3D card tilt, click ripple, copy confetti */
  if(!rm){
    document.querySelectorAll('.hub').forEach(function(h){
      h.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')h.classList.add('tilting')});
      h.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=h.getBoundingClientRect();
        h.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');h.style.setProperty('--rx',((e.clientY-r.top)/r.height-.5)*-10+'deg')});
      h.addEventListener('pointerleave',function(){h.classList.remove('tilting');h.style.setProperty('--rx','0deg');h.style.setProperty('--ry','0deg')});
    });
    document.querySelectorAll('.btn,.hub').forEach(function(el){
      el.addEventListener('pointerdown',function(e){var r=el.getBoundingClientRect(),s=document.createElement('span');
        s.className='rip';s.style.left=(e.clientX-r.left)+'px';s.style.top=(e.clientY-r.top)+'px';el.appendChild(s);
        s.addEventListener('animationend',function(){s.remove()})});
    });
    document.getElementById('copy').addEventListener('click',function(e){
      var cols=['#ff2a4d','#ff7a93','#7c8cff','#ffffff','#febc2e'];
      for(var i=0;i<22;i++){var c=document.createElement('i'),a=Math.random()*6.283,d=60+Math.random()*90;
        c.className='confetti';c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';c.style.background=cols[i%cols.length];
        document.body.appendChild(c);
        c.animate([{transform:'translate(-50%,-50%) rotate(0deg)',opacity:1},
          {transform:'translate(calc(-50% + '+Math.cos(a)*d+'px),calc(-50% + '+(Math.sin(a)*d+40)+'px)) rotate('+(Math.random()*540-270)+'deg)',opacity:0}],
          {duration:700+Math.random()*500,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=(function(n){return function(){n.remove()}})(c);}
    });
  }
})();
