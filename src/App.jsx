import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

// ============================================================
// DONNY.AI V2 — THE DEFINITIVE AI PERSONAL SITE
// ============================================================

const C = {
  accent: "#00e8ff",
  accent2: "#8b5cf6",
  accent3: "#f43f5e",
  green: "#10b981",
  amber: "#f59e0b",
  bg: "#06070b",
  bgCard: "rgba(10,12,22,0.8)",
  text: "#e8eaed",
  textMid: "rgba(232,234,237,0.7)",
  textDim: "rgba(232,234,237,0.4)",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.12)",
};

const FONT = {
  display: "'Syne', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

// ============================================================
// PORTFOLIO SITES — Embedded mini-site designs
// ============================================================
const PORTFOLIO_SITES = [
  {
    name: "Awestruck Agency",
    type: "Government SaaS & Marketing",
    year: "2025",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #0f0a2e, #1a1145, #2d1b69)",
    heroText: "Where Government Meets Innovation",
    subText: "Full-service marketing for federal, state & local agencies",
    features: ["NAICS Certified", "508 Compliant", "GSA Schedule"],
    style: "premium-dark",
  },
  {
    name: "FeX Group",
    type: "Materials Sourcing Platform",
    year: "2025",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #1a1400, #2d2200, #3d2e00)",
    heroText: "Source Smarter. Build Faster.",
    subText: "AI-powered materials procurement for construction & manufacturing",
    features: ["AI Matching", "Real-time Pricing", "Global Network"],
    style: "industrial-gold",
  },
  {
    name: "Gestational.ly",
    type: "Surrogacy Companion App",
    year: "2025",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #1a0a14, #2d1224, #3d1a33)",
    heroText: "Every Journey Deserves a Guide",
    subText: "The companion app for surrogates and intended parents",
    features: ["Journey Tracking", "Resources Library", "Community"],
    style: "warm-empathetic",
  },
  {
    name: "Baking with Care",
    type: "Artisan Micro Bakery",
    year: "2025",
    color: "#d97706",
    gradient: "linear-gradient(135deg, #1a1008, #2d1c0e, #3d2812)",
    heroText: "Handcrafted with Heart",
    subText: "Small-batch artisan baked goods · Greenville, SC",
    features: ["Order Online", "Local Delivery", "Custom Orders"],
    style: "warm-artisan",
  },
  {
    name: "ProcureTrace",
    type: "AI Compliance Dashboard",
    year: "2025",
    color: "#00e8ff",
    gradient: "linear-gradient(135deg, #040e12, #0a1a20, #0d252e)",
    heroText: "AI Compliance. Automated.",
    subText: "OMB M-25-21 interaction logging across every AI platform",
    features: ["Chrome Extension", "Auto-Logging", "Export Ready"],
    style: "tech-minimal",
  },
];

const PROJECTS = [
  {
    title: "ProcureTrace",
    tag: "AI Compliance",
    desc: "Chrome extension + dashboard auto-logging AI interactions across ChatGPT, Claude, Gemini for federal OMB M-25-21 compliance.",
    metrics: ["5 Platforms", "Auto-Logged", "Gov-Ready"],
    color: C.accent, icon: "◈",
  },
  {
    title: "AI Web Studio",
    tag: "Design & Dev",
    desc: "Premium websites built at impossible speed. AI-assisted design, development, and content. Agency quality in days.",
    metrics: ["6+ Shipped", "< 1 Week", "Award-Quality"],
    color: C.accent2, icon: "◇",
  },
  {
    title: "SEO Engine",
    tag: "AI Marketing",
    desc: "AI-driven SEO generating optimized content, targeting AI Overviews, building visibility for enterprise restaurant brands.",
    metrics: ["Enterprise", "AI Overviews", "Full Funnel"],
    color: C.accent3, icon: "◆",
  },
  {
    title: "Gestational.ly",
    tag: "Product Dev",
    desc: "Surrogacy companion app — concept to production. Complex React architecture and educational content, fully AI-built.",
    metrics: ["Full-Stack", "AI-Built", "Live"],
    color: C.green, icon: "◉",
  },
  {
    title: "AI Visibility Suite",
    tag: "SaaS Design",
    desc: "Tiered AI SEO product for agencies. Architecture, pricing, and GTM strategy designed entirely with AI research.",
    metrics: ["3-Tier SaaS", "Agency", "Revenue"],
    color: C.amber, icon: "▣",
  },
  {
    title: "Programmatic Video",
    tag: "AI Creative",
    desc: "Cinematic product videos generated programmatically with Remotion. AI scripts, auto-rendering, at scale.",
    metrics: ["Auto-Render", "Cinematic", "Scalable"],
    color: "#f87171", icon: "▲",
  },
];

const CAPABILITIES = [
  { name: "AI Product Design", level: 97, icon: "✦" },
  { name: "Full-Stack Development", level: 94, icon: "⟐" },
  { name: "AI-Powered SEO", level: 96, icon: "◎" },
  { name: "Prompt Engineering", level: 99, icon: "⬡" },
  { name: "Rapid Prototyping", level: 95, icon: "△" },
  { name: "Systems Architecture", level: 92, icon: "◈" },
  { name: "3D & Motion Design", level: 88, icon: "◇" },
  { name: "AI Strategy", level: 93, icon: "▣" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive into your goals, audience, and competitive landscape using AI-powered research and analysis.", color: C.accent },
  { num: "02", title: "Design", desc: "AI-accelerated design exploration — generating and refining concepts at 10x the speed of traditional workflows.", color: C.accent2 },
  { num: "03", title: "Build", desc: "Full-stack development with AI pair programming. Production-grade code, tested and optimized from day one.", color: C.accent3 },
  { num: "04", title: "Launch", desc: "Deploy, measure, iterate. AI-powered analytics and optimization ensure your product keeps getting better.", color: C.green },
];

const CLIENT_LOGOS = ["Chick-fil-A", "Dave & Buster's", "LongHorn Steakhouse", "U.S. Government", "GSA Schedule"];

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "reel", label: "Reel" },
  { id: "stats", label: "Stats" },
  { id: "about", label: "About" },
  { id: "lab", label: "Lab" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

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

    const count = 2000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const tgt = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [new THREE.Color(C.accent), new THREE.Color(C.accent2), new THREE.Color(C.accent3), new THREE.Color("#ffffff")];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 18;
      pos[i3+1] = (Math.random() - 0.5) * 18;
      pos[i3+2] = (Math.random() - 0.5) * 8;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.8 + Math.random() * 0.5;
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
      vertexShader: `attribute float size; varying vec3 vColor; void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(160.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;float a=smoothstep(0.5,0.05,d);gl_FragColor=vec4(vColor,a*0.7);}`,
      transparent: true, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Stable connections
    const pairs = [];
    for (let att = 0; att < 4000 && pairs.length < 200; att++) {
      const a = Math.floor(Math.random() * count), b = Math.floor(Math.random() * count);
      if (a === b) continue;
      const dx = tgt[a*3]-tgt[b*3], dy = tgt[a*3+1]-tgt[b*3+1], dz = tgt[a*3+2]-tgt[b*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 0.6) pairs.push([a,b]);
    }
    const lineGeo = new THREE.BufferGeometry();
    const lp = new Float32Array(pairs.length * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: new THREE.Color(C.accent), transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending }));
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
function FloatingNav({ active }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <nav style={{ position: "fixed", top: "50%", right: "20px", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px", opacity: show ? 1 : 0, transition: "opacity 0.5s" }}>
      {SECTIONS.map(s => (
        <button key={s.id} onClick={() => scrollTo(s.id)} title={s.label} style={{
          width: active === s.id ? "20px" : "6px", height: "6px", borderRadius: "3px",
          background: active === s.id ? C.accent : "rgba(255,255,255,0.15)",
          border: "none", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)", padding: 0,
          boxShadow: active === s.id ? `0 0 10px ${C.accent}44` : "none",
        }} />
      ))}
    </nav>
  );
}

// ============================================================
// MAGNETIC BUTTON
// ============================================================
function MagBtn({ children, style, onClick, accent = C.accent }) {
  const ref = useRef(null);
  const [o, setO] = useState({ x: 0, y: 0 });
  const [h, setH] = useState(false);
  return (
    <button ref={ref}
      onMouseMove={e => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); setO({ x: (e.clientX - r.left - r.width/2)*0.2, y: (e.clientY - r.top - r.height/2)*0.2 }); }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => { setH(false); setO({ x:0, y:0 }); }}
      onClick={onClick}
      style={{
        transform: `translate(${o.x}px,${o.y}px)`,
        transition: h ? "transform 0.1s" : "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        background: h ? accent + "10" : "transparent",
        border: `1px solid ${h ? accent : accent + "55"}`,
        color: accent, padding: "14px 36px", fontSize: "13px", letterSpacing: "2.5px",
        textTransform: "uppercase", cursor: "pointer", fontFamily: FONT.mono,
        borderRadius: 0, outline: "none", ...style,
      }}
    >{children}</button>
  );
}

// ============================================================
// SECTION HEADING — READABLE
// ============================================================
function Heading({ tag, title, subtitle, align = "center" }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div ref={ref} style={{ textAlign: align, marginBottom: "48px", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)" }}>
      <div style={{ fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: C.accent, fontFamily: FONT.mono, marginBottom: "12px" }}>{tag}</div>
      <h2 style={{ fontSize: "clamp(28px,4.5vw,50px)", fontWeight: 700, color: "#fff", fontFamily: FONT.display, letterSpacing: "-0.5px", margin: "0 0 14px" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: "16px", color: C.textMid, fontFamily: FONT.body, maxWidth: align === "center" ? "580px" : "none", margin: align === "center" ? "0 auto" : 0, lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

// ============================================================
// PORTFOLIO SITE MOCKUP CARD
// ============================================================
function SiteMockup({ site, index }) {
  const [ref, vis] = useInView(0.1);
  const [h, setH] = useState(false);
  return (
    <div ref={ref} style={{
      minWidth: "380px", maxWidth: "420px", flexShrink: 0,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.08}s`,
    }}>
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          borderRadius: "12px", overflow: "hidden",
          border: `1px solid ${h ? site.color + "44" : C.border}`,
          transition: "all 0.4s ease",
          transform: h ? "translateY(-4px)" : "translateY(0)",
          boxShadow: h ? `0 20px 60px ${site.color}15` : "none",
        }}
      >
        {/* Browser chrome */}
        <div style={{ background: "rgba(20,22,30,0.95)", padding: "10px 14px", display: "flex", alignItems: "center", gap: "6px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          <div style={{ flex: 1, marginLeft: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", padding: "4px 10px", fontSize: "10px", color: C.textDim, fontFamily: FONT.mono }}>{site.name.toLowerCase().replace(/\s+/g, "") + ".com"}</div>
        </div>
        {/* Site content */}
        <div style={{ background: site.gradient, padding: "48px 28px 40px", minHeight: "260px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          {/* Abstract decorative element */}
          <div style={{ position: "absolute", top: "-20%", right: "-15%", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle, ${site.color}20, transparent 70%)`, filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "150px", height: "150px", borderRadius: "50%", background: `radial-gradient(circle, ${site.color}15, transparent 70%)`, filter: "blur(30px)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Nav mockup */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px", opacity: 0.6 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", fontFamily: FONT.display }}>{site.name}</div>
              <div style={{ display: "flex", gap: "16px" }}>
                {["About", "Work", "Contact"].map(n => <span key={n} style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", fontFamily: FONT.body }}>{n}</span>)}
              </div>
            </div>

            <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#fff", fontFamily: FONT.display, lineHeight: 1.15, marginBottom: "10px", letterSpacing: "-0.3px" }}>{site.heroText}</h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: FONT.body, lineHeight: 1.6, marginBottom: "20px" }}>{site.subText}</p>

            {/* CTA mockup */}
            <div style={{ display: "inline-block", padding: "8px 20px", background: site.color, borderRadius: "4px", fontSize: "11px", fontWeight: 600, color: "#fff", fontFamily: FONT.body }}>Get Started</div>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px", position: "relative", zIndex: 1 }}>
            {site.features.map((f, i) => (
              <span key={i} style={{ fontSize: "9px", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 10px", borderRadius: "100px", fontFamily: FONT.mono }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Caption */}
      <div style={{ padding: "14px 4px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: C.text, fontFamily: FONT.display }}>{site.name}</div>
          <div style={{ fontSize: "12px", color: C.textDim, fontFamily: FONT.body, marginTop: "2px" }}>{site.type}</div>
        </div>
        <div style={{ fontSize: "11px", color: C.textDim, fontFamily: FONT.mono }}>{site.year}</div>
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
      style={{ perspective: "1000px", opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(40px)", transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${index*0.08}s` }}
    >
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${h?1.01:1})`,
        transition: h?"transform 0.1s":"transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        background: C.bgCard, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${h?project.color+"44":C.border}`, borderRadius: "12px",
        padding: "32px", position: "relative", overflow: "hidden", cursor: "default",
        minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        {h && <div style={{ position: "absolute", inset: 0, background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, ${project.color}15, transparent 50%)`, pointerEvents: "none" }} />}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span style={{ fontSize: "20px", color: project.color, filter: `drop-shadow(0 0 6px ${project.color}55)` }}>{project.icon}</span>
            <span style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: project.color, fontFamily: FONT.mono, background: project.color+"0f", padding: "3px 10px", borderRadius: "100px" }}>{project.tag}</span>
          </div>
          <h3 style={{ fontSize: "22px", fontWeight: 600, color: "#fff", margin: "10px 0 8px", fontFamily: FONT.display }}>{project.title}</h3>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: C.textMid, fontFamily: FONT.body }}>{project.desc}</p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px", position: "relative", zIndex: 1 }}>
          {project.metrics.map((m,i) => <span key={i} style={{ fontSize: "10px", letterSpacing: "1px", color: C.textDim, border: `1px solid ${C.border}`, padding: "4px 10px", borderRadius: "100px", fontFamily: FONT.mono }}>{m}</span>)}
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
    const colors = [C.accent, C.accent2, C.accent3, "#fff"];
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

    const animate = () => {
      if (!running) return;
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      particlesRef.current.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
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
            padding: "6px 14px", color: C.text, fontFamily: FONT.mono, fontSize: "11px",
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
    canvas.addEventListener("mousemove", e => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: (e.clientX-r.left)/r.width, y: (e.clientY-r.top)/r.height }; });

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
      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", fontSize: "9px", color: C.textDim, fontFamily: FONT.mono, letterSpacing: "2px", pointerEvents: "none", textTransform: "uppercase" }}>Click & hold to attract</div>
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
// PROCESS STEP
// ============================================================
function ProcessStep({ step, index }) {
  const [ref, vis] = useInView(0.2);
  const [h, setH] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.12}s`,
      display: "flex", gap: "24px", alignItems: "flex-start", padding: "28px 0",
      borderBottom: `1px solid ${C.border}`, cursor: "default",
    }}>
      <div style={{
        fontSize: "40px", fontWeight: 800, fontFamily: FONT.display,
        color: h ? step.color : "rgba(255,255,255,0.08)",
        transition: "color 0.4s ease", lineHeight: 1, minWidth: "70px",
      }}>{step.num}</div>
      <div>
        <h3 style={{ fontSize: "20px", fontWeight: 600, color: h ? "#fff" : C.textMid, fontFamily: FONT.display, marginBottom: "6px", transition: "color 0.3s" }}>{step.title}</h3>
        <p style={{ fontSize: "14px", color: C.textMid, fontFamily: FONT.body, lineHeight: 1.7 }}>{step.desc}</p>
      </div>
    </div>
  );
}

// ============================================================
// CAPABILITY CARD
// ============================================================
function CapCard({ cap, index }) {
  const [ref, vis] = useInView(0.1);
  const [h, setH] = useState(false);
  const color = [C.accent, C.accent2, C.accent3, C.green, C.amber, "#f87171", "#a78bfa", "#34d399"][index % 8];
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
      transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${index * 0.06}s`,
      background: h ? "rgba(255,255,255,0.03)" : "transparent",
      border: `1px solid ${h ? color + "33" : C.border}`,
      borderRadius: "12px", padding: "24px", cursor: "default",
      position: "relative", overflow: "hidden",
    }}>
      {h && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <span style={{ fontSize: "22px", color: h ? color : C.textDim, transition: "color 0.3s" }}>{cap.icon}</span>
        <span style={{ fontSize: "24px", fontWeight: 700, color: h ? color : "rgba(255,255,255,0.1)", fontFamily: FONT.display, transition: "color 0.3s" }}>{cap.level}</span>
      </div>
      <div style={{ fontSize: "14px", fontWeight: 600, color: h ? "#fff" : C.textMid, fontFamily: FONT.display, transition: "color 0.3s" }}>{cap.name}</div>
      <div style={{ marginTop: "10px", height: "2px", background: "rgba(255,255,255,0.04)", borderRadius: "1px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: vis ? `${cap.level}%` : "0%", background: `linear-gradient(90deg, ${color}, ${color}66)`, transition: `width 1s cubic-bezier(0.23,1,0.32,1) ${index*0.06+0.2}s`, borderRadius: "1px" }} />
      </div>
    </div>
  );
}

// ============================================================
// LOGO TICKER
// ============================================================
function LogoTicker() {
  const [ref, vis] = useInView(0.2);
  return (
    <div ref={ref} style={{ overflow: "hidden", opacity: vis ? 1 : 0, transition: "opacity 0.6s", padding: "20px 0" }}>
      <div style={{ display: "flex", animation: "tickerScroll 20s linear infinite", gap: "60px", whiteSpace: "nowrap" }}>
        {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
          <span key={i} style={{ fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.15)", fontFamily: FONT.mono, flexShrink: 0 }}>{logo}</span>
        ))}
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
    { value: 15, suffix: "+", label: "AI Products Built", color: C.accent },
    { value: 98, suffix: "%", label: "AI-Assisted Workflow", color: C.accent2 },
    { value: 6, suffix: "", label: "Industries Served", color: C.accent3 },
    { value: 1, suffix: "%", label: "Top AI Users (US)", prefix: "Top ", color: C.green },
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          textAlign: "center", padding: "32px 16px",
          background: C.bgCard, borderRadius: "12px", border: `1px solid ${C.border}`,
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
          transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${i*0.08}s`,
        }}>
          <div style={{ fontSize: "42px", fontWeight: 800, color: "#fff", fontFamily: FONT.display, lineHeight: 1 }}>
            <Counter end={s.value} suffix={s.suffix} prefix={s.prefix || ""} vis={vis} />
          </div>
          <div style={{ fontSize: "11px", color: C.textDim, letterSpacing: "2px", textTransform: "uppercase", marginTop: "10px", fontFamily: FONT.mono }}>{s.label}</div>
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
      const sects = SECTIONS.map(s => ({ id: s.id, el: document.getElementById(s.id) })).filter(s => s.el);
      for (let i = sects.length - 1; i >= 0; i--) { if (sects[i].el.getBoundingClientRect().top <= window.innerHeight * 0.4) { setActive(sects[i].id); break; } }
    };
    const onM = (e) => { mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }; };
    window.addEventListener("scroll", onS, { passive: true });
    window.addEventListener("mousemove", onM, { passive: true });
    setTimeout(() => setLoaded(true), 150);
    return () => { window.removeEventListener("scroll", onS); window.removeEventListener("mousemove", onM); };
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:${C.accent}33;color:#fff}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${C.accent}22;border-radius:3px}
        @keyframes scanDown{0%{top:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes glitchA{0%{transform:translate(2px,-1px)}50%{transform:translate(-1px,1px)}100%{transform:translate(1px,-2px)}}
        @keyframes glitchB{0%{transform:translate(-2px,1px)}50%{transform:translate(1px,-1px)}100%{transform:translate(-1px,2px)}}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}
        @media(max-width:768px){.rg2{grid-template-columns:1fr!important}.reel-scroll{gap:16px!important}.reel-scroll>div{min-width:300px!important}}
        input:focus{border-color:${C.accent}44!important}
      `}</style>

      <ParticleHero scrollRef={scrollRef} mouseRef={mouseRef} />
      <CursorGlow mouseRef={mouseRef} />
      <FloatingNav active={active} />

      {/* ===== HERO ===== */}
      <section id="hero" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2, opacity: heroOp }}>
        <div style={{ textAlign: "center", opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(25px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.3s" }}>
          <div style={{ fontSize: "10px", letterSpacing: "6px", textTransform: "uppercase", color: C.accent, fontFamily: FONT.mono, marginBottom: "18px", opacity: loaded?1:0, transition: "opacity 0.6s 0.8s" }}>AI Design · Development · Strategy</div>
          <h1 style={{ fontSize: "clamp(56px,12vw,140px)", fontWeight: 800, fontFamily: FONT.display, letterSpacing: "-3px", lineHeight: 0.9, marginBottom: "18px" }}>
            <Glitch text="DONNY" /><span style={{ color: C.accent }}>.</span>
          </h1>
          <p style={{ fontSize: "17px", color: C.textMid, fontFamily: FONT.body, maxWidth: "480px", lineHeight: 1.7, margin: "0 auto", opacity: loaded?1:0, transition: "opacity 0.6s 1.2s" }}>
            I build products, platforms, and experiences with artificial intelligence — at a level most teams can't match.
          </p>
          <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center", opacity: loaded?1:0, transition: "opacity 0.6s 1.6s" }}>
            <MagBtn onClick={() => scrollTo("work")}>See the Work</MagBtn>
            <MagBtn onClick={() => scrollTo("contact")} accent={C.accent2}>Get in Touch</MagBtn>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", opacity: loaded?0.3:0, transition: "opacity 0.6s 2s", animation: "float 2.5s ease-in-out infinite" }}>
          <div style={{ width: "1px", height: "32px", background: `linear-gradient(to bottom, transparent, ${C.accent})` }} />
          <span style={{ fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: FONT.mono, color: C.accent }}>Scroll</span>
        </div>
      </section>

      {/* ===== CLIENT LOGOS ===== */}
      <section style={{ position: "relative", zIndex: 2, padding: "0 24px", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <LogoTicker />
      </section>

      {/* ===== SITE REEL ===== */}
      <section id="reel" style={{ padding: "100px 0 80px", position: "relative", zIndex: 2 }}>
        <div style={{ padding: "0 24px" }}>
          <Heading tag="Portfolio" title="Sites I've Built" subtitle="Every one of these was designed and developed using AI-accelerated workflows. Agency quality at startup speed." />
        </div>
        <div style={{ overflowX: "auto", padding: "0 24px 20px", WebkitOverflowScrolling: "touch" }}>
          <div className="reel-scroll" style={{ display: "flex", gap: "24px", paddingRight: "24px" }}>
            {PORTFOLIO_SITES.map((s, i) => <SiteMockup key={i} site={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="stats" style={{ padding: "60px 24px 80px", position: "relative", zIndex: 2 }}>
        <Stats />
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
        <Heading tag="About" title="AI Is My Medium" />
        <div style={{ fontSize: "16px", color: C.textMid, fontFamily: FONT.body, lineHeight: 1.85 }}>
          <p style={{ marginBottom: "16px" }}>I don't just use AI tools — <span style={{ color: "#fff", fontWeight: 600 }}>I think in AI</span>. Every project I touch is designed, built, and optimized through artificial intelligence. From full-stack web applications to enterprise SEO strategies, from SaaS product architecture to programmatic video production.</p>
          <p style={{ marginBottom: "16px" }}>While most people are still figuring out how to write a prompt, I'm shipping production-ready products, <span style={{ color: C.accent }}>designing award-quality websites</span>, and building systems that scale across industries — government, hospitality, healthcare, e-commerce, and more.</p>
          <p>The AI space moves fast. <span style={{ color: "#fff", fontWeight: 600 }}>I move faster.</span></p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "32px" }}>
          {["Claude", "ChatGPT", "Cursor", "Midjourney", "Remotion", "Vercel AI", "Three.js", "Next.js"].map(t => (
            <ToolPill key={t} name={t} />
          ))}
        </div>
      </section>

      {/* ===== LAB ===== */}
      <section id="lab" style={{ padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "1060px", margin: "0 auto" }}>
        <Heading tag="Interactive Lab" title="Playground" subtitle="These aren't just demos — they're proof that beautiful, interactive experiences can be built with AI." />
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: C.accent, fontFamily: FONT.mono, marginBottom: "10px", paddingLeft: "4px" }}>Particle Text — Type anything · Hover to disrupt</div>
          <ParticleTextToy />
        </div>
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: C.accent2, fontFamily: FONT.mono, marginBottom: "10px", paddingLeft: "4px" }}>Neural Network — Hover to activate</div>
            <NeuralNetToy />
          </div>
          <div>
            <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: C.accent3, fontFamily: FONT.mono, marginBottom: "10px", paddingLeft: "4px" }}>Gravity Field — Click & hold</div>
            <GravityToy />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: C.green, fontFamily: FONT.mono, marginBottom: "10px", paddingLeft: "4px" }}>Waveform — Drag left/right to modulate</div>
          <WaveformToy />
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work" style={{ padding: "60px 24px 80px", position: "relative", zIndex: 2 }}>
        <Heading tag="Case Studies" title="The Work" subtitle="Real products, real clients, real outcomes — all built with AI at the core." />
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", maxWidth: "1060px", margin: "0 auto" }}>
          {PROJECTS.map((p, i) => <HoloCard key={i} project={p} index={i} />)}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" style={{ padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto" }}>
        <Heading tag="How I Work" title="The Process" align="left" />
        {PROCESS_STEPS.map((s, i) => <ProcessStep key={i} step={s} index={i} />)}
      </section>

      {/* ===== STACK ===== */}
      <section id="stack" style={{ padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "1060px", margin: "0 auto" }}>
        <Heading tag="Capabilities" title="The Stack" />
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {CAPABILITIES.map((c, i) => <CapCard key={i} cap={c} index={i} />)}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" style={{ padding: "120px 24px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: C.accent, fontFamily: FONT.mono, marginBottom: "18px" }}>Ready?</div>
        <h2 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 700, fontFamily: FONT.display, letterSpacing: "-1px", marginBottom: "14px" }}>
          Let's Build <span style={{ color: C.accent }}>Something</span>
        </h2>
        <p style={{ fontSize: "16px", color: C.textMid, fontFamily: FONT.body, marginBottom: "40px" }}>The future doesn't wait. Neither should you.</p>
        <MagBtn style={{ fontSize: "14px", padding: "18px 50px" }}>Get In Touch</MagBtn>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: "32px 24px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: "11px", color: C.textDim, fontFamily: FONT.mono }}>© 2026 DONNY</span>
        <div style={{ display: "flex", gap: "16px" }}>
          {["LinkedIn", "GitHub", "Email"].map(l => <ToolPill key={l} name={l} />)}
        </div>
      </footer>
    </div>
  );
}

function ToolPill({ name }) {
  const [h, setH] = useState(false);
  return <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ fontSize: "11px", letterSpacing: "1.5px", color: h?C.accent:C.textDim, fontFamily: FONT.mono, border: `1px solid ${h?C.accent+"33":C.border}`, padding: "6px 14px", borderRadius: "100px", transition: "all 0.3s", cursor: "default", display: "inline-block" }}>{name}</span>;
}
