function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  initParallax();
  initWaveCanvas();
  initTyped();
  initFadeIn();
  initCardTilt();
  loadPosts();
  wireTerminal();
});

function prefersReduced(){return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;}

function initParallax(){
  document.addEventListener("scroll", () => {
    const y = Math.min(20, window.scrollY / 20);
    const sk = document.getElementById("skyline");
    if (sk) sk.style.transform = `translateY(${10 - y}px)`;
  });
}

function initWaveCanvas(){
  if (prefersReduced()) return;
  const c = document.getElementById('wave'); if (!c) return;
  const ctx = c.getContext('2d'); let w,h,t=0; const DPR = Math.min(2, window.devicePixelRatio || 1);
  function resize(){ w = c.width = Math.floor(window.innerWidth*DPR); h = c.height = Math.floor(window.innerHeight*DPR); c.style.width = window.innerWidth+'px'; c.style.height = window.innerHeight+'px'; }
  window.addEventListener('resize', resize); resize();
  function draw(){
    t += 0.015;
    ctx.clearRect(0,0,w,h);
    const layers=[ [0.8,'#7c9cff'], [0.6,'#9a7cff'], [0.4,'#41d6c3'] ];
    layers.forEach((amp, i) => {
      const a=amp[0], col=amp[1];
      ctx.beginPath();
      for(let x=0;x<w;x+=8){
        const y = h*0.65 + Math.sin((x*0.004)+t*(i+1))*20*a*DPR + Math.cos((x*0.002)-t*(i+1))*10*a*DPR;
        if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath();
      ctx.fillStyle = hexToRgba(col,0.10 + i*0.05); ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  function hexToRgba(hex, a){const v=parseInt(hex.replace('#',''),16); const r=(v>>16)&255,g=(v>>8)&255,b=v&255; return `rgba(${r},${g},${b},${a})`; }
  draw();
}

function initTyped(){
  const el = document.querySelector('.typed'); if (!el) return;
  const text = el.dataset.text || el.textContent || ""; if (!text) return;
  if (prefersReduced()){ el.textContent = text; return; }
  el.textContent = ""; let i=0;
  const iv = setInterval(()=>{ el.textContent += text[i++]; if(i>=text.length) clearInterval(iv); }, 16);
}

function initFadeIn(){
  const els = [...document.querySelectorAll('.fade')];
  if (!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in-view')); return; }
  const io = new IntersectionObserver(entries => {
    for (const e of entries){ if (e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target);} }
  }, { rootMargin:'0px 0px -10% 0px' });
  els.forEach(e=>io.observe(e));
}

function initCardTilt(){
  if (prefersReduced()) return;
  const cards = document.querySelectorAll('.tilt');
  cards.forEach(card=>{
    let rAF=null;
    function onMove(e){
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * 6; // rotateX
      const ry = (0.5 - x) * 6; // rotateY
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(()=> card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`);
    }
    function reset(){ card.style.transform = 'rotateX(0) rotateY(0)'; }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchstart', reset, {passive:true});
  });
}

async function loadPosts(){
  const wrap = document.getElementById("posts"); if (!wrap) return;
  wrap.innerHTML = "";
  try{
    const res = await fetch("/api/posts");
    const posts = await res.json();
    if (!Array.isArray(posts) || !posts.length){
      wrap.innerHTML = `<div class="muted">No posts yet. Use <a href="/admin.html">/admin.html</a> to publish.</div>`;
      return;
    }
    for (const p of posts){
      const el = document.createElement("article");
      el.className = "card tilt fade"; el.setAttribute("role","listitem");
      el.innerHTML = `
        <div class="glow"></div>
        <div class="card-body">
          <h3>${escapeHtml(p.title)}</h3>
          <p class="muted">${p.date}${p.tags?.length ? " • " + p.tags.join(" · ") : ""}</p>
          ${p.summary ? `<p>${escapeHtml(p.summary)}</p>` : ""}
          <ul class="tags">${(p.tags||[]).map(t=>`<li>${escapeHtml(t)}</li>`).join("")}</ul>
          <div style="margin-top:10px;display:flex;gap:10px">
            <a class="btn" href="/p/${p.slug}" aria-label="Read ${escapeHtml(p.title)}">Read</a>
            ${p.cover ? `<a class="btn ghost" href="${p.cover}" target="_blank" rel="noopener">Cover</a>` : ""}
          </div>
        </div>`;
      if (p.cover){ el.style.backgroundImage = `linear-gradient(rgba(12,14,22,0.55), rgba(12,14,22,0.55)), url('${p.cover}')`; el.style.backgroundSize="cover"; el.style.backgroundPosition="center"; }
      wrap.appendChild(el);
    }
    initCardTilt();
    initFadeIn();
  }catch(_){ wrap.innerHTML = `<div class="muted">Failed to load posts.</div>`; }
}

function wireTerminal(){
  const form = document.getElementById("term-form");
  const out = document.getElementById("term-output");
  const input = document.getElementById("term-cmd");
  if (!form || !out || !input) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cmd = input.value.trim(); if (!cmd) return;
    print(`> ${cmd}\n`);
    input.value = "";
    await type(`agent: thinking...`);
    await sleep(300);
    print(`\nagent: responded with a structured plan.\n`);
  });
  function print(s){ out.textContent += s; out.scrollTop = out.scrollHeight; }
  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  async function type(s){ for (const ch of s){ print(ch); await sleep(10); } }
}
