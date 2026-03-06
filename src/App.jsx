import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ============================================================
// DONNY.AI V2 — THE DEFINITIVE AI PERSONAL SITE
// ============================================================

var C = {
  accent: "#00e8ff",
  accent2: "#8b5cf6",
  accent3: "#f43f5e",
  green: "#10b981",
  amber: "#f59e0b",
  bg: "#06070b",
  bgCard: "#0a0c16",
  text: "#e8eaed",
  textBody: "rgba(232,234,237,0.85)", textMid: "rgba(232,234,237,0.7)",
  textDim: "rgba(232,234,237,0.55)",
  border: "rgba(255,255,255,0.08)",
};

var BG = "#06070b";
var F = {
  display: "'Syne', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

// ============================================================
// PORTFOLIO SITES — Embedded mini-site designs
// ============================================================
var SITES = [
  { id: "fex", name: "FeX Group", url: null, liveUrl: "https://fexgroup.vercel.app", type: "Materials Sourcing Platform", year: "2025", color: "#f59e0b" },
  { id: "procure", name: "ProcureTrace", url: null, liveUrl: "https://proceduretrace-site.vercel.app", type: "AI Compliance Platform", year: "2025", color: "#00e8ff" },
  { id: "awestruck", name: "Awestruck Agency", url: null, liveUrl: "https://awestruck-ai-visibility.vercel.app", type: "Government Marketing Agency", year: "2025", color: "#6366f1" },
  { id: "physician", name: "Meridian Pain & Spine", url: null, liveUrl: null, type: "Interventional Pain Medicine", year: "2025", color: "#22d3ee" },
  { id: "accountant", name: "Hargrave & Cole CPA", url: null, liveUrl: null, type: "Tax & Advisory Services", year: "2025", color: "#6ee7b7" },
];

var PROJECTS = [
  { title: "ProcureTrace", tag: "Government Tech", desc: "Built a Chrome extension that automatically tracks and logs every AI conversation federal employees have — across ChatGPT, Claude, Gemini, and more. Paired with a real-time dashboard so agencies can prove compliance without any manual work.", metrics: ["Chrome Extension", "Live Dashboard", "5 AI Platforms"], color: C.accent, icon: "◈" },
  { title: "AI-Built Websites", tag: "Web Design", desc: "Designed and developed complete, professional websites for real businesses in under a week each — including this one. Every site is responsive, SEO-optimized, and built to convert visitors into customers.", metrics: ["5+ Sites Shipped", "Under 1 Week Each", "SEO Built-In"], color: C.accent2, icon: "◇" },
  { title: "Fruit Fly Defense", tag: "E-Commerce + SEO", desc: "Built the entire digital presence for a natural pest control brand — e-commerce site, AI-optimized blog pipeline, Google Ads strategy, and YouTube channel. Serving commercial clients like Chick-fil-A and Dave & Buster's.", metrics: ["Full E-Commerce", "Commercial Clients", "AI Blog Pipeline"], color: C.accent3, icon: "◆" },
  { title: "Business Automations", tag: "Systems", desc: "Designed and deployed automation workflows that replace hours of manual work — client intake, invoicing, review collection, social media scheduling. Set-and-forget systems that run 24/7.", metrics: ["Zero Manual Work", "24/7 Running", "Hours Saved Weekly"], color: C.green, icon: "◉" },
  { title: "AI SEO Product", tag: "SaaS Strategy", desc: "Designed a complete SaaS product for agencies — three pricing tiers, feature sets, onboarding flows, and go-to-market strategy. The kind of product planning that usually takes a team months, done in days.", metrics: ["3 Pricing Tiers", "Full GTM Plan", "Revenue Model"], color: C.amber, icon: "▣" },
  { title: "Video Production", tag: "Creative", desc: "Created cinematic product videos that render themselves automatically using code. Write a script, feed in assets, and the system generates broadcast-quality video — no editor, no timeline, no waiting.", metrics: ["Auto-Generated", "Broadcast Quality", "Infinitely Scalable"], color: "#f87171", icon: "▲" },
];


var STEPS = [
  { num: "01", title: "Discover", desc: "AI-powered research into your market, competitors, and audience. I map the landscape before writing a single line.", color: C.accent, example: { label: "Competitive Analysis", lines: ["Scanned 47 competitor sites in 3 minutes", "Identified 12 keyword gaps worth 34K monthly searches", "Mapped pricing tiers across market", "Generated SWOT matrix with citations"] } },
  { num: "02", title: "Design", desc: "Rapid concept generation — I explore more directions in a day than most agencies do in a month. Every option is production-ready, not a napkin sketch.", color: C.accent2, example: { label: "Design Sprint Output", lines: ["3 complete homepage concepts in 4 hours", "Mobile + desktop responsive from first draft", "Motion prototypes with real interactions", "Brand system: colors, type, spacing tokens"] } },
  { num: "03", title: "Build", desc: "Full-stack development with AI pair programming. Tested, optimized, deployed — not handed off to someone else to finish.", color: C.accent3, example: { label: "Delivery Package", lines: ["React/Next.js codebase, production-deployed", "SEO meta, schema markup, sitemap generated", "Lighthouse: 95+ performance, 100 accessibility", "CI/CD pipeline, staging + production environments"] } },
  { num: "04", title: "Launch & Scale", desc: "Deployment is day one, not the finish line. AI-driven analytics, content pipelines, and optimization systems that compound.", color: C.green, example: { label: "Growth Engine", lines: ["Auto-generated blog pipeline (2x/week)", "Rank tracking across 200+ keywords", "Conversion event monitoring + alerts", "Monthly AI-generated performance reports"] } },
];

var AUTOMATIONS = [
  { title: "New Client Intake", icon: "✉", desc: "Someone fills out your contact form — and everything happens automatically. Contract sent, kickoff scheduled, welcome email goes out, project folder created.", before: "You: check email, copy info to CRM, write contract, email it, schedule call, create folder. 45 min.", after: "Automation: form submitted → contract + calendar + workspace + welcome email. 0 min.", steps: ["Form Submitted","Contract Sent","Call Booked","Folder Created","Welcome Email"], color: C.accent, time: "Saves ~45 min/client" },
  { title: "Social Media Content", icon: "📅", desc: "One blog post automatically becomes a week of social content. AI writes the posts, formats them per platform, and schedules them — you just approve.", before: "You: read blog, write 5 social posts, resize images, copy into scheduler. 2 hours/week.", after: "Automation: blog published → 5 platform-specific posts drafted + scheduled. 5 min review.", steps: ["Blog Published","AI Writes Posts","Images Sized","Scheduled","Analytics"], color: C.accent2, time: "Saves ~8 hrs/month" },
  { title: "Invoice & Follow-Up", icon: "💰", desc: "Project hits a milestone, invoice goes out automatically. 7 days unpaid, a polite nudge. 14 days, another. You never chase money again.", before: "You: remember to invoice, open QuickBooks, send it, set a reminder, follow up manually. Repeat.", after: "Automation: milestone → invoice sent → auto follow-up at 7d, 14d. $0 forgotten.", steps: ["Milestone Hit","Invoice Sent","7-Day Nudge","14-Day Reminder","Payment Logged"], color: C.green, time: "Saves ~3 hrs/month" },
  { title: "Review & Reputation", icon: "⭐", desc: "After every completed project, happy clients automatically get a review request. Good reviews get shared to your site. Bad ones get flagged for you.", before: "You: remember to ask, write a personal email, hope they follow through, manually update site.", after: "Automation: project closed → review request → auto-publish good ones → flag issues.", steps: ["Project Done","Review Asked","Rating Checked","Published/Flagged","Site Updated"], color: C.amber, time: "2x more reviews" },
];

var SECTS = [{ id: "hero", l: "Home" }, { id: "reel", l: "Reel" }, { id: "stats", l: "Stats" }, { id: "lab", l: "Lab" }, { id: "work", l: "Work" }, { id: "automations", l: "Auto" }, { id: "about", l: "About" }, { id: "process", l: "Process" }, { id: "stack", l: "Tools" }, { id: "contact", l: "Contact" }];

function goTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

// ============================================================
// INTERSECTION OBSERVER HOOK
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ============================================================
// THREE.JS PARTICLE HERO
// ============================================================
function ParticleHero({ scrollRef, mouseRef }) {
  const mountRef = useRef(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const w = window.innerWidth, h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const count = 3200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const tgt = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [new THREE.Color("#00e8ff"), new THREE.Color("#8b5cf6"), new THREE.Color("#f43f5e"), new THREE.Color("#006680"), new THREE.Color("#5530a0"), new THREE.Color("#304050")];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 18;
      pos[i3+1] = (Math.random() - 0.5) * 18;
      pos[i3+2] = (Math.random() - 0.5) * 8;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.6 + Math.random() * 0.8;
      tgt[i3] = r * Math.sin(phi) * Math.cos(theta);
      tgt[i3+1] = r * Math.sin(phi) * Math.sin(theta);
      tgt[i3+2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i3] = c.r; cols[i3+1] = c.g; cols[i3+2] = c.b;
      sizes[i] = Math.random() * 2.5 + 1;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: `attribute float size; varying vec3 vColor; void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(180.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;float a=smoothstep(0.5,0.05,d);gl_FragColor=vec4(vColor,a*0.55);}`,
      transparent: true, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Stable connections
    const pairs = [];
    for (let att = 0; att < 4000 && pairs.length < 250; att++) {
      const a = Math.floor(Math.random() * count), b = Math.floor(Math.random() * count);
      if (a === b) continue;
      const dx = tgt[a*3]-tgt[b*3], dy = tgt[a*3+1]-tgt[b*3+1], dz = tgt[a*3+2]-tgt[b*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 0.6) pairs.push([a,b]);
    }
    const lineGeo = new THREE.BufferGeometry();
    const lp = new Float32Array(pairs.length * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: new THREE.Color(C.accent), transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending }));
    scene.add(lines);

    let running = true, frame = 0;
    const animate = () => {
      if (!running) return;
      frame++;
      const t = frame * 0.016;
      const ease = 1 - Math.pow(1 - Math.min(t / 3.5, 1), 4);
      const p = geo.attributes.position.array;
      const sf = (scrollRef.current || 0) * 0.001;
      const mx = ((mouseRef.current?.x || 0.5) - 0.5) * 2;
      const my = ((mouseRef.current?.y || 0.5) - 0.5) * 2;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        p[i3] += (tgt[i3] - p[i3]) * 0.016 * ease;
        p[i3+1] += (tgt[i3+1] - p[i3+1]) * 0.016 * ease;
        p[i3+2] += (tgt[i3+2] - p[i3+2]) * 0.016 * ease;
        p[i3] += Math.sin(t * 0.3 + i * 0.05) * 0.0006 + mx * 0.001;
        p[i3+1] += Math.cos(t * 0.2 + i * 0.08) * 0.0006 - my * 0.001;
      }
      geo.attributes.position.needsUpdate = true;
      for (let i = 0; i < pairs.length; i++) {
        const [a,b] = pairs[i]; const idx = i * 6;
        lp[idx]=p[a*3]; lp[idx+1]=p[a*3+1]; lp[idx+2]=p[a*3+2];
        lp[idx+3]=p[b*3]; lp[idx+4]=p[b*3+1]; lp[idx+5]=p[b*3+2];
      }
      lineGeo.attributes.position.needsUpdate = true;
      points.rotation.y = sf * 0.35 + t * 0.035;
      points.rotation.x = Math.sin(t * 0.06) * 0.06;
      lines.rotation.copy(points.rotation);
      camera.position.z = 5 + sf * 2;
      var fadeOp = Math.max(0, 1 - sf * 0.4);
      renderer.domElement.style.opacity = fadeOp;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    const onR = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener("resize", onR);
    return () => { running = false; window.removeEventListener("resize", onR); if (mountRef.current && renderer.domElement.parentNode === mountRef.current) mountRef.current.removeChild(renderer.domElement); renderer.dispose(); };
  }, []);
  return <div ref={mountRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

// ============================================================
// CURSOR GLOW
// ============================================================
function CursorGlow({ mouseRef }) {
  const ref = useRef(null);
  useEffect(() => {
    let r = true;
    const u = () => { if (!r||!ref.current) return; const x=(mouseRef.current?.x||0.5)*100, y=(mouseRef.current?.y||0.5)*100; ref.current.style.background=`radial-gradient(600px circle at ${x}% ${y}%, rgba(0,232,255,0.045), transparent 60%)`; requestAnimationFrame(u); };
    u(); return () => { r = false; };
  }, []);
  return <div ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />;
}

// ============================================================
// NAV
// ============================================================
function Nav({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <nav className="side-nav" style={{ position: "fixed", top: "50%", right: "20px", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px", opacity: show ? 1 : 0, transition: "opacity 0.5s" }}>
      {SECTS.map(s => (
        <button key={s.id} onClick={() => goTo(s.id)} title={s.l} style={{
          width: active === s.id ? "20px" : "6px", height: "6px", borderRadius: "3px",
          background: active === s.id ? C.accent : "rgba(255,255,255,0.15)",
          border: "none", cursor: "pointer", transition: "width 0.3s cubic-bezier(0.23,1,0.32,1), background 0.3s, box-shadow 0.3s", padding: 0,
          boxShadow: active === s.id ? `0 0 10px ${C.accent}44` : "none",
        }} />
      ))}
    </nav>
  );
}

// ============================================================
// SECTION HEADING — READABLE
// ============================================================
function Heading({ tag, title, subtitle, align = "center" }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div ref={ref} style={{ textAlign: align, marginBottom: "48px", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1)" }}>
      <div style={{ fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: C.accent, fontFamily: F.mono, marginBottom: "12px" }}>{tag}</div>
      <h2 style={{ fontSize: "clamp(28px,4.5vw,50px)", fontWeight: 700, color: "#fff", fontFamily: F.display, letterSpacing: "-0.5px", margin: "0 0 14px" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: "17px", color: C.textBody, fontFamily: F.body, maxWidth: align === "center" ? "580px" : "none", margin: align === "center" ? "0 auto" : 0, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

// ============================================================
// PORTFOLIO SITE MOCKUP CARD (with live iframes + fake sites)
// ============================================================
function SiteMockup({ site, index }) {
  const [ref, vis] = useInView(0.08);
  const [h, setH] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  function renderFakeSite() {
    if (site.id==="physician") return (<div style={{height:"100%",background:"#fafaf8",overflow:"hidden",position:"relative"}}>
      <div style={{position:"absolute",top:"-60px",right:"-40px",width:"280px",height:"280px",borderRadius:"60% 40% 50% 50%",background:"radial-gradient(circle, #99f6e422, #06b6d411, transparent)",filter:"blur(40px)"}} />
      <div style={{padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:"#0891b2"}} /><span style={{fontSize:14,fontWeight:700,color:"#0f172a",fontFamily:F.display,letterSpacing:"-0.3px"}}>Meridian</span></div>
        <div style={{display:"flex",gap:20}}>{["Services","Team","Patients"].map(n => <span key={n} style={{fontSize:10,color:"#94a3b8",fontFamily:F.body}}>{n}</span>)}<div style={{padding:"5px 14px",background:"#0891b2",borderRadius:6,fontSize:10,fontWeight:600,color:"#fff",fontFamily:F.body}}>Book</div></div>
      </div>
      <div style={{margin:"0 24px",borderRadius:16,overflow:"hidden",position:"relative",height:"180px",background:"linear-gradient(135deg, #ccfbf1 0%, #a5f3fc 30%, #bae6fd 60%, #e0e7ff 100%)"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, transparent 40%, rgba(250,250,248,0.9) 100%)"}} />
        <div style={{position:"absolute",bottom:16,left:20,right:20}}>
          <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#0891b2",fontFamily:F.mono,fontWeight:600,marginBottom:6}}>Interventional Pain Medicine</div>
          <h3 style={{fontSize:24,fontWeight:800,color:"#0f172a",fontFamily:F.display,lineHeight:1.1}}>Life without<br/>limitations.</h3>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"16px 24px 0"}}>
        {[{n:"Spine Care",c:"#f0fdfa",bc:"#0d9488"},{n:"Nerve Blocks",c:"#ecfeff",bc:"#0891b2"},{n:"Regenerative",c:"#fdf4ff",bc:"#a855f7"}].map((s,i) => <div key={i} style={{background:s.c,borderRadius:10,padding:"14px 10px",textAlign:"center"}}><div style={{width:24,height:3,borderRadius:2,background:s.bc,margin:"0 auto 8px"}} /><div style={{fontSize:10,fontWeight:700,color:"#334155",fontFamily:F.display}}>{s.n}</div></div>)}
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:20,padding:"16px 24px 0"}}>
        {[{v:"4.9",l:"Rating"},{v:"2k+",l:"Patients"},{v:"15yr",l:"Experience"}].map((s,i) => <div key={i} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:"#0f172a",fontFamily:F.display}}>{s.v}</div><div style={{fontSize:7,letterSpacing:1.5,textTransform:"uppercase",color:"#94a3b8",fontFamily:F.mono}}>{s.l}</div></div>)}
      </div>
    </div>);

    if (site.id==="accountant") return (<div style={{height:"100%",background:"#08080a",overflow:"hidden",position:"relative"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:"linear-gradient(rgba(110,231,183,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}} />
      <div style={{position:"absolute",top:"50px",right:"30px",width:"200px",height:"200px",border:"1px solid rgba(110,231,183,0.06)",borderRadius:"50%"}} />
      <div style={{padding:"18px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1,borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <span style={{fontSize:11,fontWeight:600,color:"#fff",fontFamily:F.mono,letterSpacing:"4px"}}>HARGRAVE<span style={{color:"#6ee7b7"}}>&amp;</span>COLE</span>
        <div style={{display:"flex",gap:20}}>{["Advisory","Tax","Insights"].map(n => <span key={n} style={{fontSize:9,color:"rgba(255,255,255,0.25)",fontFamily:F.mono,letterSpacing:"1.5px",textTransform:"uppercase"}}>{n}</span>)}</div>
      </div>
      <div style={{padding:"40px 28px 0",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:6}}>
          <span style={{fontSize:60,fontWeight:200,color:"#fff",fontFamily:F.display,lineHeight:0.9,letterSpacing:"-2px"}}>$2.4</span>
          <span style={{fontSize:14,fontWeight:500,color:"#6ee7b7",fontFamily:F.mono,letterSpacing:"1px"}}>MILLION</span>
        </div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:F.mono,letterSpacing:"3px",textTransform:"uppercase",marginBottom:24}}>Client Tax Savings / 2024</div>
        <div style={{width:50,height:1,background:"#6ee7b7",marginBottom:20}} />
        <h3 style={{fontSize:22,fontWeight:300,color:"rgba(255,255,255,0.9)",fontFamily:F.display,lineHeight:1.4,maxWidth:280}}>Strategic financial advisory for companies that think in decades.</h3>
      </div>
      <div style={{display:"flex",gap:0,margin:"28px 28px 0",position:"relative",zIndex:1}}>
        {[{v:"800+",l:"Active Clients"},{v:"22",l:"Years"},{v:"98%",l:"Retention"}].map((s,i) => <div key={i} style={{flex:1,padding:"16px 0",borderTop:"1px solid rgba(255,255,255,0.06)",borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none"}}><div style={{fontSize:20,fontWeight:700,color:"#fff",fontFamily:F.mono,textAlign:"center"}}>{s.v}</div><div style={{fontSize:7,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.15)",fontFamily:F.mono,textAlign:"center",marginTop:4}}>{s.l}</div></div>)}
      </div>
    </div>);

    return <div style={{padding:40,textAlign:"center",color:"rgba(255,255,255,0.5)"}}>{site.name}</div>;
  }

  const hasLive = !!site.liveUrl;
  return (
    <div ref={ref} style={{ minWidth:"340px",maxWidth:"540px",flexShrink:0,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(30px)",transition:`opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.08}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.08}s` }}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ borderRadius:"12px",overflow:"hidden",border:`1px solid ${h?site.color+"44":C.border}`,willChange:"transform",transition:"transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",transform:h?"translateY(-4px)":"translateY(0)",boxShadow:h?`0 24px 80px ${site.color}20`:"none" }}>
        <div style={{ background:"rgba(18,20,28,0.98)",padding:"10px 14px",display:"flex",alignItems:"center",gap:"6px",borderBottom:`1px solid ${C.border}` }}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ff5f57"}} />
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ffbd2e"}} />
          <div style={{width:8,height:8,borderRadius:"50%",background:"#28c840"}} />
          <div style={{ flex:1,marginLeft:"8px",background:"rgba(255,255,255,0.05)",borderRadius:"4px",padding:"5px 12px",fontSize:"12px",color:C.textMid,fontFamily:F.mono }}>
            {site.name}
          </div>
        </div>
        <div style={{ position:"relative",height:"420px",background:hasLive?"#fff":"transparent",overflow:"hidden" }}>
          {hasLive && loading && !err && <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,zIndex:2,background:BG}}>
            <div style={{width:24,height:24,border:`2px solid ${site.color}33`,borderTop:`2px solid ${site.color}`,borderRadius:"50%",animation:"spin 0.8s linear infinite"}} />
            <span style={{fontSize:12,color:C.textDim,fontFamily:F.mono,letterSpacing:"1px"}}>Loading live site...</span>
          </div>}
          {hasLive && !err && <iframe src={site.liveUrl} title={site.name} onLoad={() => setLoading(false)} onError={() => {setErr(true);setLoading(false);}} style={{width:"200%",height:"200%",transform:"scale(0.5)",transformOrigin:"top left",border:"none",background:"#fff",opacity:loading?0:1,transition:"opacity 0.4s ease",pointerEvents:h?"auto":"none"}} />}
          {hasLive && err && <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,background:BG}}><span style={{fontSize:12,color:C.textDim,fontFamily:F.mono}}>Preview unavailable</span></div>}
          {!hasLive && <div style={{position:"relative",height:"100%",overflow:"hidden"}}>{renderFakeSite()}</div>}
        </div>
      </div>
      <div style={{ padding:"16px 4px 0",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div>
          <div style={{ fontSize:"15px",fontWeight:600,color:C.text,fontFamily:F.display }}>{site.name}</div>
          <div style={{ fontSize:"13px",color:C.textMid,fontFamily:F.body,marginTop:"2px" }}>{site.type}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          
          <span style={{ fontSize:"12px",color:C.textMid,fontFamily:F.mono }}>{site.year}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HOLO CARD
// ============================================================
function HoloCard({ project, index }) {
  const [ref, vis] = useInView(0.1);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [h, setH] = useState(false);
  const [glow, setGlow] = useState({ x:50, y:50 });
  return (
    <div ref={ref} onMouseMove={e => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5; setTilt({x:y*-10,y:x*10}); setGlow({x:(x+0.5)*100,y:(y+0.5)*100}); }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setTilt({x:0,y:0}); }}
      style={{ perspective: "1000px", opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(40px)", transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.08}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.08}s` }}
    >
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        willChange:"transform",transition: h?"transform 0.1s":"transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        background: C.bgCard, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${h?project.color+"44":C.border}`, borderRadius: "12px", transition: "border-color 0.3s",
        padding: "32px", position: "relative", overflow: "hidden", cursor: "default",
        minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {h && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, ${project.color}15, transparent 50%)`, pointerEvents: "none" }} />}
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", color: project.color, fontFamily: F.mono, background: project.color+"0f", padding: "4px 12px", borderRadius: "100px", display: "inline-block", marginBottom: "12px" }}>{project.tag}</span>
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#fff", margin: "0 0 10px", fontFamily: F.display, letterSpacing: "-0.3px" }}>{project.title}</h3>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: C.textBody, fontFamily: F.body }}>{project.desc}</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px", position: "relative", zIndex: 1 }}>
          {project.metrics.map((m,i) => <span key={i} style={{ fontSize: "12px", letterSpacing: "1px", color: C.textMid, border: `1px solid ${C.border}`, padding: "5px 12px", borderRadius: "100px", fontFamily: F.mono }}>{m}</span>)}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INTERACTIVE TOYS
// ============================================================

// PARTICLE TEXT — Type and particles form letters
function ParticleTextToy() {
  const canvasRef = useRef(null);
  const textRef = useRef("DONNY");
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const [vis, setVis] = useState(false);
  const [inputText, setInputText] = useState("DONNY");
  const inputRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, []);

  const buildParticles = (text, canvas) => {
    const tempCanvas = document.createElement("canvas");
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    tempCanvas.width = w; tempCanvas.height = h;
    const tCtx = tempCanvas.getContext("2d");
    tCtx.fillStyle = "#fff";
    tCtx.font = `bold ${Math.min(w / (text.length * 0.7), 80)}px Syne, sans-serif`;
    tCtx.textAlign = "center";
    tCtx.textBaseline = "middle";
    tCtx.fillText(text, w / 2, h / 2);

    const data = tCtx.getImageData(0, 0, w, h).data;
    const newParticles = [];
    const gap = 3;
    const colors = [C.accent, C.accent2, C.accent3, "#ffffff"];
    for (let y = 0; y < h; y += gap) {
      for (let x = 0; x < w; x += gap) {
        if (data[(y * w + x) * 4 + 3] > 128) {
          newParticles.push({
            tx: x, ty: y,
            x: Math.random() * w, y: Math.random() * h,
            vx: 0, vy: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 1.5 + 0.5,
          });
        }
      }
    }
    return newParticles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !vis) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    const resize = () => {
      const dpr = 2;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = buildParticles(textRef.current, canvas);
    };
    resize();

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", () => { mouseRef.current = { x: -100, y: -100 }; });
    const onTouch = (e) => { e.preventDefault(); const r = canvas.getBoundingClientRect(); const t = e.touches[0]; mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top }; };
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchend", () => { mouseRef.current = { x: -100, y: -100 }; });

    const animate = () => {
      if (!running) return;
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particlesRef.current.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 60) {
          const force = (60 - dist) / 60;
          p.vx -= (dx / dist) * force * 3;
          p.vy -= (dy / dist) * force * 3;
        }
        p.vx += (p.tx - p.x) * 0.05;
        p.vy += (p.ty - p.y) * 0.05;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => { running = false; canvas.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", resize); };
  }, [vis]);

  const handleTextChange = (val) => {
    setInputText(val);
    textRef.current = val || "DONNY";
    if (canvasRef.current && vis) {
      particlesRef.current = buildParticles(textRef.current, canvasRef.current);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "280px", borderRadius: "12px", border: `1px solid ${C.border}`, cursor: "default", background: C.bg, opacity: vis ? 1 : 0, transition: "opacity 0.6s" }} />
      <div style={{ position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          ref={inputRef}
          value={inputText}
          onChange={e => handleTextChange(e.target.value.toUpperCase())}
          maxLength={12}
          placeholder="TYPE HERE"
          style={{
            background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, borderRadius: "4px",
            padding: "6px 14px", color: C.text, fontFamily: F.mono, fontSize: "13px",
            letterSpacing: "2px", textAlign: "center", width: "160px", outline: "none",
          }}
        />
      </div>
    </div>
  );
}

// NEURAL NETWORK TOY
function NeuralNetToy() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [vis, setVis] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return () => obs.disconnect(); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !vis) return;
    const ctx = canvas.getContext("2d");
    let frame = 0, running = true;
    const nodes = [];
    const layers = [4, 6, 8, 6, 4];

    const resize = () => {
      const dpr = 2; canvas.width = canvas.offsetWidth * dpr; canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.length = 0;
      const w = canvas.offsetWidth, h = canvas.offsetHeight, ls = w / (layers.length + 1);
      layers.forEach((c, li) => { const ns = h / (c + 1); for (let ni = 0; ni < c; ni++) nodes.push({ x: ls*(li+1), y: ns*(ni+1), layer: li, bx: ls*(li+1), by: ns*(ni+1), a: 0 }); });
    };
    resize();
    const onNM = e => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: (e.clientX-r.left)/r.width, y: (e.clientY-r.top)/r.height }; };
    canvas.addEventListener("mousemove", onNM);
    canvas.addEventListener("touchmove", e => { e.preventDefault(); const r = canvas.getBoundingClientRect(); const t = e.touches[0]; mouseRef.current = { x: (t.clientX-r.left)/r.width, y: (t.clientY-r.top)/r.height }; }, { passive: false });

    const animate = () => {
      if (!running) return;
      frame++;
      const t = frame * 0.016, w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x * w, my = mouseRef.current.y * h;
      nodes.forEach(n => { const d = Math.sqrt((n.bx-mx)**2+(n.by-my)**2); n.a += (Math.max(0,1-d/160)-n.a)*0.06; n.x = n.bx + Math.sin(t*0.6+n.by*0.01)*2; n.y = n.by + Math.cos(t*0.4+n.bx*0.01)*2; });
      for (let i = 0; i < nodes.length; i++) for (let j = i+1; j < nodes.length; j++) {
        if (nodes[j].layer === nodes[i].layer + 1) {
          const s = (nodes[i].a + nodes[j].a) / 2;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = s > 0.12 ? `rgba(0,232,255,${Math.min(s*0.3,0.25)})` : "rgba(255,255,255,0.015)";
          ctx.lineWidth = s > 0.2 ? 1 : 0.4; ctx.stroke();
          if (s > 0.3) { const pp = (Math.sin(t*2+i*0.5)+1)/2; ctx.beginPath(); ctx.arc(nodes[i].x+(nodes[j].x-nodes[i].x)*pp, nodes[i].y+(nodes[j].y-nodes[i].y)*pp, 1.5, 0, Math.PI*2); ctx.fillStyle = `rgba(0,232,255,${s*0.6})`; ctx.fill(); }
        }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, 2.5+n.a*3, 0, Math.PI*2); ctx.fillStyle = n.a > 0.2 ? `rgba(0,232,255,${0.3+n.a*0.5})` : "rgba(255,255,255,0.1)"; ctx.fill(); if (n.a > 0.2) { ctx.beginPath(); ctx.arc(n.x, n.y, 6+n.a*7, 0, Math.PI*2); ctx.fillStyle = `rgba(0,232,255,${n.a*0.06})`; ctx.fill(); } });
      requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, [vis]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "280px", borderRadius: "12px", border: `1px solid ${C.border}`, cursor: "crosshair", opacity: vis?1:0, transition: "opacity 0.6s" }} />;
}

// GRAVITY PARTICLES
function GravityToy() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, down: false });
  const [vis, setVis] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return () => obs.disconnect(); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !vis) return;
    const ctx = canvas.getContext("2d"); let running = true;
    const resize = () => { const dpr = 2; canvas.width = canvas.offsetWidth * dpr; canvas.height = canvas.offsetHeight * dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize();
    const w = () => canvas.offsetWidth, h = () => canvas.offsetHeight;
    const particles = Array.from({ length: 100 }, () => ({ x: Math.random()*w(), y: Math.random()*h(), vx: (Math.random()-0.5)*1.2, vy: (Math.random()-0.5)*1.2, s: Math.random()*2+1, c: [C.accent,C.accent2,C.accent3,C.green][Math.floor(Math.random()*4)] }));
    const onM = e => { const r = canvas.getBoundingClientRect(); mouseRef.current.x = (e.clientX-r.left)/r.width; mouseRef.current.y = (e.clientY-r.top)/r.height; };
    canvas.addEventListener("mousemove", onM);
    canvas.addEventListener("mousedown", () => mouseRef.current.down = true);
    canvas.addEventListener("mouseup", () => mouseRef.current.down = false);
    canvas.addEventListener("mouseleave", () => mouseRef.current.down = false);
    canvas.addEventListener("touchstart", (e) => { e.preventDefault(); mouseRef.current.down = true; const r = canvas.getBoundingClientRect(); const t = e.touches[0]; mouseRef.current.x = (t.clientX-r.left)/r.width; mouseRef.current.y = (t.clientY-r.top)/r.height; }, { passive: false });
    canvas.addEventListener("touchmove", (e) => { e.preventDefault(); const r = canvas.getBoundingClientRect(); const t = e.touches[0]; mouseRef.current.x = (t.clientX-r.left)/r.width; mouseRef.current.y = (t.clientY-r.top)/r.height; }, { passive: false });
    canvas.addEventListener("touchend", () => { mouseRef.current.down = false; });

    const animate = () => {
      if (!running) return;
      const cw = w(), ch = h();
      ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0,0,cw,ch); ctx.globalCompositeOperation = "lighter";
      const mx = mouseRef.current.x*cw, my = mouseRef.current.y*ch, att = mouseRef.current.down;
      particles.forEach(p => {
        const dx = mx-p.x, dy = my-p.y, d = Math.sqrt(dx*dx+dy*dy)||1;
        const f = att ? 120/(d*d) : -30/(d*d), mf = att ? 1.2 : 0.3;
        p.vx += Math.max(-mf,Math.min(mf,(dx/d)*f)); p.vy += Math.max(-mf,Math.min(mf,(dy/d)*f));
        p.vx *= 0.987; p.vy *= 0.987; p.x += p.vx; p.y += p.vy;
        if (p.x<0){p.x=0;p.vx*=-0.5;} if (p.x>cw){p.x=cw;p.vx*=-0.5;} if (p.y<0){p.y=0;p.vy*=-0.5;} if (p.y>ch){p.y=ch;p.vy*=-0.5;}
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fillStyle = p.c + (att?"aa":"66"); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, [vis]);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "280px", borderRadius: "12px", border: `1px solid ${C.border}`, cursor: "pointer", background: C.bg, opacity: vis?1:0, transition: "opacity 0.6s" }} />
      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", fontSize: "12px", color: C.textMid, fontFamily: F.mono, letterSpacing: "1.5px", pointerEvents: "none", textTransform: "uppercase" }}>Touch & hold to attract</div>
    </div>
  );
}

// WAVEFORM
function WaveformToy() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5 });
  const [vis, setVis] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return () => obs.disconnect(); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !vis) return;
    const ctx = canvas.getContext("2d"); let frame = 0, running = true;
    const resize = () => { const dpr = 2; canvas.width = canvas.offsetWidth*dpr; canvas.height = canvas.offsetHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); };
    resize();
    canvas.addEventListener("mousemove", e => { const r = canvas.getBoundingClientRect(); mouseRef.current.x = (e.clientX-r.left)/r.width; });
    canvas.addEventListener("touchmove", (e) => { e.preventDefault(); const r = canvas.getBoundingClientRect(); mouseRef.current.x = (e.touches[0].clientX-r.left)/r.width; }, { passive: false });
    const animate = () => {
      if (!running) return;
      frame++; const t = frame*0.018, w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0,0,w,h);
      const mx = mouseRef.current.x, colors = [C.accent,C.accent2,C.accent3,C.green,C.amber];
      for (let wave = 0; wave < 5; wave++) {
        ctx.beginPath();
        const freq = 1.5+wave*0.4+mx*2, amp = (10+wave*6)*(0.4+mx*0.6), phase = t+wave*0.6, yB = h/2+(wave-2)*16;
        for (let x = 0; x <= w; x += 2) { const xN = x/w, y = yB+Math.sin(xN*Math.PI*freq+phase)*amp*Math.sin(xN*Math.PI); x===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }
        ctx.strokeStyle = colors[wave]+"40"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.strokeStyle = colors[wave]+"0a"; ctx.lineWidth = 4; ctx.stroke();
      }
      requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener("resize", resize);
    return () => { running = false; window.removeEventListener("resize", resize); };
  }, [vis]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "180px", borderRadius: "12px", border: `1px solid ${C.border}`, cursor: "ew-resize", opacity: vis?1:0, transition: "opacity 0.6s" }} />;
}

// ============================================================
// INTERACTIVE PROCESS STEP (click to expand examples)
// ============================================================
function ProcessStep({ step, index }) {
  const [ref, vis] = useInView(0.12);
  const [h, setH] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div ref={ref} style={{ opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(30px)", transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.12}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.12}s`, marginBottom: "16px" }}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onClick={() => setExpanded(!expanded)}
        style={{ display: "flex", gap: "24px", alignItems: "flex-start", padding: "24px", cursor: "pointer", background: expanded?"rgba(255,255,255,0.02)":"transparent", border: `1px solid ${expanded?step.color+"22":h?C.border:"transparent"}`, borderRadius: "12px", transition: "background 0.3s, border-color 0.3s" }}>
        <div style={{ fontSize: "40px", fontWeight: 800, fontFamily: F.display, color: h||expanded ? step.color : "rgba(255,255,255,0.35)", transition: "color 0.4s ease", lineHeight: 1, minWidth: "65px" }}>{step.num}</div>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: h||expanded ? "#fff" : C.textMid, fontFamily: F.display, marginBottom: "6px", transition: "color 0.3s" }}>{step.title}</h3>
            <div style={{fontSize:12,fontFamily:F.mono,color:step.color,letterSpacing:"1px",fontWeight:500,opacity:h||expanded?1:0,transition:"opacity 0.3s"}}>{expanded?"COLLAPSE":"SEE EXAMPLE"}</div>
          </div>
          <p style={{ fontSize: "15px", color: C.textBody, fontFamily: F.body, lineHeight: 1.7 }}>{step.desc}</p>
        </div>
      </div>
      {expanded && step.example && <div style={{margin:"0 0 0 89px",padding:"20px 24px",borderLeft:`2px solid ${step.color}33`,background:"rgba(255,255,255,0.01)",borderRadius:"0 8px 8px 0",animation:"fadeSlide 0.3s ease"}}>
        <div style={{fontSize:12,letterSpacing:"2px",textTransform:"uppercase",color:step.color,fontFamily:F.mono,marginBottom:14,fontWeight:600}}>{step.example.label}</div>
        {step.example.lines.map((line,li) => <div key={li} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10,opacity:0,animation:"fadeSlide 0.3s ease forwards",animationDelay:`${li*0.08}s`}}>
          <div style={{width:4,height:4,borderRadius:"50%",background:step.color,marginTop:7,flexShrink:0}} />
          <span style={{fontSize:15,color:C.textBody,fontFamily:F.body,lineHeight:1.65}}>{line}</span>
        </div>)}
      </div>}
    </div>
  );
}

// ============================================================
// STACK VISUALIZATION (DOM-based, no canvas)
// ============================================================
function StackOrbit() {
  var [ref, vis] = useInView(0.15);
  var [active, setActive] = useState(null);
  var tools = [
    { name: "Claude", ring: 1, color: "#d4a574", desc: "Primary AI collaborator for code, strategy, writing, and architecture" },
    { name: "React", ring: 1, color: "#61dafb", desc: "Component framework powering every frontend I ship" },
    { name: "Next.js", ring: 1, color: "#ffffff", desc: "Full-stack framework with SSR, API routes, and edge functions" },
    { name: "Three.js", ring: 1, color: "#049ef4", desc: "3D rendering engine for the particle effects on this page" },
    { name: "Vercel", ring: 1, color: "#ffffff", desc: "Deploy platform — every site goes live in under 60 seconds" },
    { name: "ChatGPT", ring: 2, color: "#74aa9c", desc: "Research, brainstorming, and second-opinion analysis" },
    { name: "Cursor", ring: 2, color: "#7c3aed", desc: "AI-native code editor for rapid full-stack development" },
    { name: "Midjourney", ring: 2, color: "#f0f0f0", desc: "AI image generation for concepts, mockups, and visual assets" },
    { name: "Node.js", ring: 2, color: "#68a063", desc: "Server runtime for APIs, automation scripts, and tooling" },
    { name: "Supabase", ring: 2, color: "#3ecf8e", desc: "Database, auth, and real-time subscriptions" },
    { name: "Remotion", ring: 2, color: "#0b84f3", desc: "Programmatic video — code writes the video" },
    { name: "Figma", ring: 3, color: "#a259ff", desc: "Design handoff and collaborative prototyping" },
    { name: "GA4", ring: 3, color: "#e37400", desc: "Analytics, conversion tracking, and performance measurement" },
    { name: "Tailwind", ring: 3, color: "#38bdf8", desc: "Utility CSS for consistent, rapid UI development" },
    { name: "SEO", ring: 3, color: "#22c55e", desc: "Technical SEO, schema markup, AI Overview optimization" },
    { name: "Chrome APIs", ring: 3, color: "#4285f4", desc: "Browser extensions, content scripts, and web platform APIs" },
    { name: "Stripe", ring: 3, color: "#635bff", desc: "Payments, subscriptions, and checkout flows" },
  ];
  var groups = [{ring:1,label:"Core",color:C.accent},{ring:2,label:"Extended",color:C.accent2},{ring:3,label:"Ecosystem",color:C.green}];
  var at = active ? tools.find(function(t){return t.name===active;}) : null;

  return (
    <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:"opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)"}}>

      {/* Tool grid — grouped by ring */}
      <div style={{display:"flex",flexDirection:"column",gap:32}}>
        {groups.map(function(g) {
          var ringTools = tools.filter(function(t){return t.ring===g.ring;});
          return (
            <div key={g.ring}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{height:1,flex:1,background:"linear-gradient(90deg,"+g.color+"33,transparent)"}} />
                <span style={{fontSize:12,letterSpacing:"3px",textTransform:"uppercase",color:g.color,fontFamily:F.mono,fontWeight:600}}>{g.label}</span>
                <div style={{height:1,flex:1,background:"linear-gradient(270deg,"+g.color+"33,transparent)"}} />
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>
                {ringTools.map(function(tool,ti) {
                  var isActive = active === tool.name;
                  var delay = ti * 0.06 + (g.ring - 1) * 0.2;
                  return (
                    <div key={tool.name}
                      onMouseEnter={function(){setActive(tool.name);}}
                      onMouseLeave={function(){setActive(null);}}
                      onClick={function(){setActive(active===tool.name?null:tool.name);}}
                      style={{
                        padding: g.ring===1 ? "14px 24px" : "10px 18px",
                        borderRadius: 10,
                        background: isActive ? tool.color+"15" : "#0a0c16",
                        border: "1px solid " + (isActive ? tool.color+"55" : "rgba(255,255,255,0.06)"),
                        cursor: "pointer",
                        transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1), background 0.25s, border-color 0.25s, box-shadow 0.25s",
                        transform: isActive ? "scale(1.05)" : vis ? "scale(1)" : "scale(0.9)",
                        opacity: vis ? 1 : 0,
                        transitionDelay: vis ? delay+"s" : "0s",
                        boxShadow: isActive ? "0 0 24px "+tool.color+"22" : "none",
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                      <div style={{
                        width: g.ring===1?10:7, height: g.ring===1?10:7, borderRadius:"50%",
                        background: tool.color, flexShrink:0,
                        boxShadow: isActive ? "0 0 12px "+tool.color+"66" : "none",
                        transition: "box-shadow 0.25s",
                      }} />
                      <span style={{
                        fontSize: g.ring===1 ? 16 : 14,
                        fontWeight: g.ring===1 ? 700 : 500,
                        fontFamily: F.display,
                        color: isActive ? tool.color : C.textMid,
                        transition: "color 0.25s",
                        whiteSpace: "nowrap",
                      }}>{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Description panel */}
      <div style={{marginTop:32,padding:"20px 24px",background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px solid "+C.border,minHeight:72,borderColor:at?at.color+"22":C.border}}>
        {at ? (
          <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
            <div style={{width:12,height:12,borderRadius:"50%",background:at.color,marginTop:4,flexShrink:0,boxShadow:"0 0 12px "+at.color+"44"}} />
            <div>
              <div style={{fontSize:17,fontWeight:700,color:at.color,fontFamily:F.display,marginBottom:4}}>{at.name}</div>
              <p style={{fontSize:15,color:C.textBody,fontFamily:F.body,lineHeight:1.65}}>{at.desc}</p>
            </div>
          </div>
        ) : (
          <p style={{fontSize:14,color:C.textMid,fontFamily:F.body,fontStyle:"italic",textAlign:"center"}}>Tap any tool to see how I use it</p>
        )}
      </div>
    </div>
  );
}


// ============================================================
// AUTOMATION CAROUSEL (one card at a time, swipeable)
// ============================================================
function AutomationCarousel() {
  var [ref, vis] = useInView(0.1);
  var [idx, setIdx] = useState(0);
  var [showAfter, setShowAfter] = useState(false);
  var [activeStep, setActiveStep] = useState(-1);
  var a = AUTOMATIONS[idx];

  useEffect(function() {
    setShowAfter(false);
    setActiveStep(-1);
    var step = 0;
    var interval = setInterval(function() { step = (step + 1) % a.steps.length; setActiveStep(step); }, 900);
    setActiveStep(0);
    return function() { clearInterval(interval); };
  }, [idx]);

  return (
    <div ref={ref} style={{maxWidth:760,margin:"0 auto",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(30px)",transition:"opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.6s cubic-bezier(0.23,1,0.32,1)"}}>

      {/* Tab navigation with actual names */}
      <div style={{display:"flex",gap:4,marginBottom:0,borderRadius:"14px 14px 0 0",overflow:"hidden",background:"rgba(255,255,255,0.02)",flexWrap:"wrap",border:`1px solid ${C.border}`,borderBottom:"none"}}>
        {AUTOMATIONS.map(function(auto,i) {
          var isActive = i === idx;
          return (
            <button key={i} onClick={function(){setIdx(i);}} style={{
              flex:1,padding:"16px 12px",background:isActive?C.bgCard:"transparent",
              border:"none",borderBottom:"2px solid "+(isActive?auto.color:"transparent"),
              cursor:"pointer",transition:"background 0.3s, border-color 0.3s",position:"relative",
            }}>
              <div style={{fontSize:13,fontWeight:600,color:isActive?"#fff":C.textDim,fontFamily:F.display,marginBottom:2}}>{auto.title}</div>
              <div style={{fontSize:12,color:isActive?auto.color:C.textDim,fontFamily:F.mono,letterSpacing:"0.5px"}}>{auto.time}</div>
            </button>
          );
        })}
      </div>

      {/* Main card */}
      <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:"0 0 14px 14px",overflow:"hidden"}}>

        {/* Flow visualization — THE HERO, at the top */}
        <div style={{padding:"24px clamp(16px,4vw,40px) 20px",background:`linear-gradient(180deg, ${a.color}08, transparent)`,borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:0}}>
            {a.steps.map(function(step,si) {
              var isActive = activeStep === si;
              var isPast = activeStep > si;
              return (
                <div key={si} style={{display:"flex",alignItems:"flex-start",flex:si<a.steps.length-1?1:"none"}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:60}}>
                    <div style={{
                      width:14,height:14,borderRadius:"50%",transform:isActive?"scale(1.4)":"scale(1)",
                      background:isActive?a.color:isPast?a.color+"88":"rgba(255,255,255,0.15)",
                      transition:"transform 0.4s cubic-bezier(0.23,1,0.32,1), background 0.4s, box-shadow 0.4s",
                      boxShadow:isActive?"0 0 24px "+a.color+"66":"none",
                      display:"flex",alignItems:"center",justifyContent:"center",
                    }}>
                      {isActive && <div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}} />}
                    </div>
                    <div style={{
                      fontSize:13,fontWeight:500,marginTop:10,textAlign:"center",
                      color:isActive?a.color:isPast?C.textBody:"rgba(255,255,255,0.45)",
                      fontFamily:F.body,transition:"color 0.3s",lineHeight:1.3,maxWidth:80,
                    }}>{step}</div>
                  </div>
                  {si<a.steps.length-1 && (
                    <div style={{flex:1,paddingTop:5,position:"relative"}}>
                      <div style={{height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,margin:"0 4px",overflow:"hidden"}}>
                        <div style={{height:"100%",background:isPast?a.color+"88":"transparent",transition:"width 0.5s, background 0.5s",borderRadius:1,width:isPast?"100%":"0%"}} />
                      </div>
                      {isActive && <div style={{position:"absolute",top:2,right:0,width:10,height:10,borderRadius:"50%",background:a.color,animation:"pulse 0.7s ease-in-out infinite",filter:"blur(2px)"}} />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{padding:"24px clamp(16px,4vw,40px) 28px"}}>
          <p style={{fontSize:17,color:C.textBody,fontFamily:F.body,lineHeight:1.75,marginBottom:28}}>{a.desc}</p>

          {/* Before / After */}
          <div style={{display:"flex",gap:12}}>
            <button onClick={function(){setShowAfter(false);}} style={{
              flex:1,padding:"18px",background:!showAfter?"rgba(255,255,255,0.04)":"transparent",
              border:"1px solid "+(!showAfter?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)"),
              borderRadius:12,cursor:"pointer",transition:"background 0.25s, border-color 0.25s",textAlign:"left",
            }}>
              <div style={{fontSize:12,fontFamily:F.mono,letterSpacing:"1.5px",color:!showAfter?C.accent3:"rgba(255,255,255,0.4)",marginBottom:8,fontWeight:600}}>WITHOUT</div>
              <p style={{fontSize:14,color:!showAfter?C.textBody:"rgba(255,255,255,0.4)",fontFamily:F.body,lineHeight:1.65,transition:"color 0.3s"}}>{a.before}</p>
            </button>
            <button onClick={function(){setShowAfter(true);}} style={{
              flex:1,padding:"18px",background:showAfter?a.color+"0a":"transparent",
              border:"1px solid "+(showAfter?a.color+"33":"rgba(255,255,255,0.04)"),
              borderRadius:12,cursor:"pointer",transition:"background 0.25s, border-color 0.25s",textAlign:"left",
            }}>
              <div style={{fontSize:12,fontFamily:F.mono,letterSpacing:"1.5px",color:showAfter?a.color:"rgba(255,255,255,0.4)",marginBottom:8,fontWeight:600}}>WITH AI</div>
              <p style={{fontSize:14,color:showAfter?C.textBody:"rgba(255,255,255,0.4)",fontFamily:F.body,lineHeight:1.65,transition:"color 0.3s"}}>{a.after}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// COUNTER
// ============================================================
function Counter({ end, suffix = "", prefix = "", vis }) {
  const [val, setVal] = useState(0);
  useEffect(() => { if (!vis) return; let s = 0; const step = end/(1600/16); const t = setInterval(() => { s += step; if (s >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(s)); }, 16); return () => clearInterval(t); }, [vis, end]);
  return <span>{prefix}{val}{suffix}</span>;
}

// ============================================================
// STATS
// ============================================================
function Stats() {
  const [ref, vis] = useInView(0.2);
  const stats = [
    { value: 15, suffix: "+", label: "Products Shipped", color: C.accent },
    { value: 5, suffix: "+", label: "Websites Launched", color: C.accent2 },
    { value: 6, suffix: "", label: "Industries", color: C.accent3 },
    { value: 1, suffix: "%", label: "Top AI Users (US)", prefix: "Top ", color: C.green },
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          textAlign: "center", padding: "32px 16px",
          background: C.bgCard, borderRadius: "12px", border: `1px solid ${C.border}`,
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
          transition: `opacity 0.5s cubic-bezier(0.23,1,0.32,1) ${i*0.08}s, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${i*0.08}s`,
        }}>
          <div style={{ fontSize: "42px", fontWeight: 800, color: "#fff", fontFamily: F.display, lineHeight: 1 }}>
            <Counter end={s.value} suffix={s.suffix} prefix={s.prefix || ""} vis={vis} />
          </div>
          <div style={{ fontSize: "13px", color: C.textMid, letterSpacing: "2px", textTransform: "uppercase", marginTop: "10px", fontFamily: F.mono }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// GLITCH TEXT
// ============================================================
function Glitch({ text, style }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", display: "inline-block", cursor: "default", ...style }}>
      {text}
      {h && <><span style={{ position: "absolute", top: 0, left: "2px", color: C.accent, clipPath: "inset(0 0 50% 0)", opacity: 0.5, animation: "glitchA 0.2s steps(3) infinite" }}>{text}</span><span style={{ position: "absolute", top: 0, left: "-2px", color: C.accent3, clipPath: "inset(50% 0 0 0)", opacity: 0.5, animation: "glitchB 0.2s steps(3) infinite" }}>{text}</span></>}
    </span>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function ToolPill({ name }) {
  const [h, setH] = useState(false);
  return <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ fontSize: "13px", letterSpacing: "1px", color: h?C.accent:C.textMid, fontFamily: F.mono, border: `1px solid ${h?C.accent+"33":C.border}`, padding: "7px 16px", borderRadius: "100px", transition: "color 0.3s, border-color 0.3s", cursor: "default", display: "inline-block" }}>{name}</span>;
}

export default function DonnyAI() {
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [heroOp, setHeroOp] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onS = () => {
      scrollRef.current = window.scrollY;
      setHeroOp(Math.max(0, 1 - window.scrollY / 500));
      const sects = SECTS.map(s => ({ id: s.id, el: document.getElementById(s.id) })).filter(s => s.el);
      for (let i = sects.length - 1; i >= 0; i--) { if (sects[i].el.getBoundingClientRect().top <= window.innerHeight * 0.4) { setActive(sects[i].id); break; } }
    };
    const onM = (e) => { mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }; };
    window.addEventListener("scroll", onS, { passive: true });
    window.addEventListener("mousemove", onM, { passive: true });
    setTimeout(() => setLoaded(true), 150);
    return () => { window.removeEventListener("scroll", onS); window.removeEventListener("mousemove", onM); };
  }, []);

  return (
    <div style={{ background: BG, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        ::selection{background:${C.accent}33;color:#fff}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${C.accent}22;border-radius:3px}
        .reel-wrap::-webkit-scrollbar{display:none}.reel-wrap{scrollbar-width:none;-ms-overflow-style:none}
        @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
        @keyframes breathe{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.7}50%{transform:translate(-50%,-50%) scale(1.15);opacity:1}}
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes glitchA{0%{transform:translate(2px,-1px)}50%{transform:translate(-1px,1px)}100%{transform:translate(1px,-2px)}}
        @keyframes glitchB{0%{transform:translate(-2px,1px)}50%{transform:translate(1px,-1px)}100%{transform:translate(-1px,2px)}}
        @media(max-width:900px){.rg2{grid-template-columns:1fr!important}}
        @media(max-width:600px){.reel-scroll{gap:16px!important}.reel-scroll>div{min-width:300px!important}}
        @media(max-width:768px){.side-nav{display:none!important}
          
          .auto-tabs{flex-wrap:wrap!important}
          .auto-tabs button{font-size:12px!important;padding:12px 8px!important}
        }
        input:focus{border-color:${C.accent}44!important}
      `}</style>

      <ParticleHero scrollRef={scrollRef} mouseRef={mouseRef} />
      <CursorGlow mouseRef={mouseRef} />
      <Nav active={active} />

      {/* HERO */}
      <section id="hero" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2, opacity: heroOp }}>
        <div style={{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",width:"700px",height:"700px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,232,255,0.10) 0%,rgba(139,92,246,0.05) 30%,transparent 50%)",filter:"blur(50px)",animation:"breathe 4s ease-in-out infinite",pointerEvents:"none"}} />
        <div style={{ textAlign: "center", opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(25px)", transition: "opacity 0.8s cubic-bezier(0.23,1,0.32,1) 0.3s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.3s", background: "radial-gradient(ellipse 500px 380px at center, rgba(6,7,11,0.8) 0%, rgba(6,7,11,0.45) 40%, transparent 58%)", padding: "50px 36px", borderRadius: "30px" }}>
          <div style={{display:"flex",justifyContent:"center",gap:"20px",marginBottom:"28px",flexWrap:"wrap",opacity:loaded?1:0,transition:"opacity 0.6s 0.6s"}}>{["15+ Products Shipped","Enterprise Work","Top 1% AI User — according to Claude"].map((t,i) => <span key={i} style={{fontSize:"14px",fontFamily:F.mono,color:i===2?C.accent:"#fff",letterSpacing:"1.5px",fontWeight:500,textShadow:"0 0 20px rgba(6,7,11,1), 0 0 40px rgba(6,7,11,0.8)"}}>{i>0?" · ":""}{t}</span>)}</div>
          <h1 style={{ fontSize: "clamp(56px,12vw,140px)", fontWeight: 800, fontFamily: F.display, letterSpacing: "-3px", lineHeight: 0.9, marginBottom: "24px", textShadow: "0 0 80px rgba(6,7,11,1), 0 0 160px rgba(6,7,11,0.9)" }}>
            <Glitch text="DONNY" /><span style={{ color: C.accent }}>.</span>
          </h1>
          <p style={{ fontSize: "20px", color: "#fff", fontFamily: F.body, maxWidth: "540px", lineHeight: 1.7, margin: "0 auto", opacity: loaded?1:0, transition: "opacity 0.6s 1.2s", textShadow: "0 0 40px rgba(6,7,11,1)", fontWeight: 500 }}>
            One person. AI-native workflow.<br/><span style={{ color: C.accent }}>Entire teams worth of output.</span>
          </p>
          <div style={{ marginTop: "44px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", opacity: loaded?1:0, transition: "opacity 0.6s 1.6s" }}>
            <button onClick={() => goTo("work")} style={{background:C.accent,color:"#000",fontFamily:F.mono,fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",padding:"16px 44px",border:"none",cursor:"pointer",fontWeight:600,borderRadius:"2px"}}>See the Work</button>
            <button onClick={() => goTo("contact")} style={{background:"rgba(255,255,255,0.08)",color:"#fff",fontFamily:F.mono,fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",padding:"16px 44px",border:"1px solid rgba(255,255,255,0.2)",cursor:"pointer",fontWeight:500,borderRadius:"2px"}}>Get in Touch</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", opacity: loaded?0.35:0, transition: "opacity 0.6s 2s", animation: "float 2.5s ease-in-out infinite" }}>
          <div style={{ width: "1px", height: "32px", background: `linear-gradient(to bottom, transparent, ${C.accent})` }} />
          <span style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: F.mono, color: C.accent }}>Scroll</span>
        </div>
      </section>

      {/* PORTFOLIO REEL */}
      <section id="reel" style={{ background: BG, padding: "100px 0 80px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "0 24px" }}>
          <Heading tag="Portfolio" title="Sites I've Built" subtitle="Every one of these was designed and developed using AI-accelerated workflows. Agency quality at startup speed." />
        </div>
        <div className="reel-wrap" style={{ overflowX: "auto", padding: "0 0 20px", WebkitOverflowScrolling: "touch" }}>
          <div className="reel-scroll" style={{ display: "inline-flex", gap: "24px", padding: "0 max(24px, calc((100vw - 1060px)/2 + 24px))" }}>
            {SITES.map((s, i) => <SiteMockup key={i} site={s} index={i} />)}
          </div>
        </div>
        <div style={{textAlign:"center",padding:"16px 0 0"}}><span style={{fontSize:13,letterSpacing:3,textTransform:"uppercase",fontFamily:F.mono,color:C.textMid}}>Scroll to explore →</span></div>
      </section>

      {/* STATS */}
      <section id="stats" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2 }}>
        <Heading tag="By the Numbers" title="The Impact" />
        <Stats /></section>

      {/* PLAYGROUND */}
      <section id="lab" style={{ position: "relative", zIndex: 2, padding: "80px 0", overflow: "hidden", background: BG }}>
        
        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div style={{fontSize:"12px",letterSpacing:"4px",textTransform:"uppercase",color:C.accent,fontFamily:F.mono,marginBottom:"14px",fontWeight:500}}>Interactive Lab</div>
            <h2 style={{fontSize:"clamp(36px,5vw,56px)",fontWeight:800,fontFamily:F.display,letterSpacing:"-1px",marginBottom:"14px"}}>Go Ahead, <span style={{color:C.accent}}>Play.</span></h2>
            <p style={{fontSize:"17px",color:C.textBody,fontFamily:F.body,maxWidth:"480px",margin:"0 auto",lineHeight:1.7}}>Every one of these is running live in your browser right now. Built with AI. Touch them.</p>
          </div>
          <div style={{position:"relative",marginBottom:"28px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"16px 0 14px"}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:C.accent,boxShadow:`0 0 14px ${C.accent}88`,animation:"pulse 2s ease-in-out infinite"}} />
              <span style={{fontSize:"16px",fontWeight:700,color:"#fff",fontFamily:F.display}}>Particle Text</span>
              <span style={{fontSize:"13px",color:C.textBody,fontFamily:F.body,marginLeft:"auto",fontStyle:"italic"}}>Type anything, then touch to scatter</span>
            </div>
            <ParticleTextToy />
          </div>
          <div className="rg2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "28px" }}>
            <div><div style={{display:"flex",alignItems:"center",gap:"10px",padding:"0 0 12px"}}><div style={{width:10,height:10,borderRadius:"50%",background:C.accent2,boxShadow:`0 0 14px ${C.accent2}88`,animation:"pulse 2s ease-in-out infinite 0.3s"}} /><span style={{fontSize:"16px",fontWeight:700,color:"#fff",fontFamily:F.display}}>Neural Net</span><span style={{fontSize:"13px",color:C.textBody,fontFamily:F.body,marginLeft:"auto",fontStyle:"italic"}}>Touch to fire neurons</span></div><NeuralNetToy /></div>
            <div><div style={{display:"flex",alignItems:"center",gap:"10px",padding:"0 0 12px"}}><div style={{width:10,height:10,borderRadius:"50%",background:C.accent3,boxShadow:`0 0 14px ${C.accent3}88`,animation:"pulse 2s ease-in-out infinite 0.6s"}} /><span style={{fontSize:"16px",fontWeight:700,color:"#fff",fontFamily:F.display}}>Gravity Well</span><span style={{fontSize:"13px",color:C.textBody,fontFamily:F.body,marginLeft:"auto",fontStyle:"italic"}}>Touch & hold to attract</span></div><GravityToy /></div>
          </div>
          <div><div style={{display:"flex",alignItems:"center",gap:"10px",padding:"0 0 12px"}}><div style={{width:10,height:10,borderRadius:"50%",background:C.green,boxShadow:`0 0 14px ${C.green}88`,animation:"pulse 2s ease-in-out infinite 0.9s"}} /><span style={{fontSize:"16px",fontWeight:700,color:"#fff",fontFamily:F.display}}>Waveform</span><span style={{fontSize:"13px",color:C.textBody,fontFamily:F.body,marginLeft:"auto",fontStyle:"italic"}}>Touch & drag to modulate</span></div><WaveformToy /></div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2 }}>
        <Heading tag="What I've Built" title="The Work" subtitle="Real products, real clients, real outcomes — Every one of these was built with AI doing the heavy lifting." />
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", maxWidth: "1060px", margin: "0 auto" }}>
          {PROJECTS.map((p, i) => <HoloCard key={i} project={p} index={i} />)}
        </div>
      </section>

      {/* AUTOMATIONS */}
      <section id="automations" style={{ background: BG, padding: "80px 24px", position: "relative", zIndex: 2 }}>
        <Heading tag="Automation" title="Set It and Forget It" subtitle="Real workflows I build for small businesses. Click a card to see the before and after." />
        <AutomationCarousel />
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
        <Heading tag="About" title="AI Is My Medium" />
        <div style={{ fontSize: "17px", color: C.textBody, fontFamily: F.body, lineHeight: 1.85 }}>
          <p style={{ marginBottom: "18px" }}>I don't just use AI tools — <span style={{ color: "#fff", fontWeight: 600 }}>I think in AI</span>. Every project I touch is designed, built, and optimized through artificial intelligence. From full-stack web applications to enterprise SEO strategies, from SaaS product architecture to programmatic video production.</p>
          <p style={{ marginBottom: "18px" }}>While most people are still figuring out how to write a prompt, I'm shipping production-ready products, <span style={{ color: C.accent, fontSize: "18px", fontWeight: 500 }}>designing award-quality websites</span>, and building systems that scale across industries — government, hospitality, healthcare, e-commerce, and more.</p>
          <p>The AI space moves fast. <span style={{ color: "#fff", fontWeight: 600 }}>I move faster.</span></p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
          {["Claude", "ChatGPT", "Cursor", "Midjourney", "Remotion", "Vercel AI", "Three.js", "Next.js"].map(t => <ToolPill key={t} name={t} />)}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ background: BG, padding: "80px 24px", position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto" }}>
        <Heading tag="How I Work" title="The Process" subtitle="Click any step to see a real example of what gets delivered." align="left" />
        {STEPS.map((s, i) => <ProcessStep key={i} step={s} index={i} />)}
      </section>

      {/* STACK */}
      <section id="stack" style={{ background: BG, padding: "80px 24px", position: "relative", zIndex: 2, maxWidth: "1060px", margin: "0 auto" }}>
        <Heading tag="The Tools" title="My Stack" subtitle="Everything I use to ship products, design sites, and automate businesses." />
        <StackOrbit />
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: BG, padding: "120px 24px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: C.accent, fontFamily: F.mono, marginBottom: "18px" }}>Ready?</div>
        <h2 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 700, fontFamily: F.display, letterSpacing: "-1px", marginBottom: "14px" }}>
          Let's Build <span style={{ color: C.accent }}>Something</span>
        </h2>
        <p style={{ fontSize: "17px", color: C.textBody, fontFamily: F.body, marginBottom: "40px" }}>The future doesn't wait. Neither should you.</p>
        <button onClick={() => {window.location.href="mailto:hello@donny.ai";}} style={{background:C.accent,color:"#000",fontFamily:F.mono,fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase",padding:"18px 50px",border:"none",cursor:"pointer",fontWeight:600,borderRadius:"2px"}}>Get In Touch</button>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", borderTop: `1px solid ${C.border}`, background: BG, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: "12px", color: C.textDim, fontFamily: F.mono }}>© 2026 DONNY</span>
        <div style={{ display: "flex", gap: "16px" }}>
          {[{n:"LinkedIn",u:"https://linkedin.com"},{n:"GitHub",u:"https://github.com"},{n:"Email",u:"mailto:hello@donny.ai"}].map(l => <a key={l.n} href={l.u} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><ToolPill name={l.n} /></a>)}
        </div>
      </footer>
    </div>
  );
}
