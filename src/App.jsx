import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

var C = {
  accent: "#00e8ff", accent2: "#8b5cf6", accent3: "#f43f5e", green: "#10b981", amber: "#f59e0b",
  bg: "#06070b", bgCard: "rgba(10,12,22,0.9)", text: "#e8eaed",
  textBody: "rgba(232,234,237,0.85)", textMid: "rgba(232,234,237,0.6)", textDim: "rgba(232,234,237,0.4)",
  border: "rgba(255,255,255,0.06)",
};
var F = { display: "'Syne', sans-serif", body: "'DM Sans', sans-serif", mono: "'IBM Plex Mono', monospace" };
var BG = "#06070b";

var SITES = [
  { id: "fex", name: "FeX Group", url: "fexgroup.com", liveUrl: "https://fexgroup.vercel.app", type: "Materials Sourcing Platform", year: "2025", color: "#f59e0b" },
  { id: "procure", name: "ProcureTrace", url: "procuretrace.io", liveUrl: "https://proceduretrace-site.vercel.app", type: "AI Compliance Platform", year: "2025", color: "#00e8ff" },
  { id: "awestruck", name: "Awestruck Agency", url: "awestruckagency.com", liveUrl: "https://awestruck-ai-visibility.vercel.app", type: "Government Marketing Agency", year: "2025", color: "#6366f1" },
  { id: "physician", name: "Meridian Pain & Spine", url: "meridianpainandspine.com", liveUrl: null, type: "Interventional Pain Medicine", year: "2025", color: "#22d3ee" },
  { id: "accountant", name: "Hargrave & Cole CPA", url: "hargravecole.com", liveUrl: null, type: "Tax & Advisory Services", year: "2025", color: "#6ee7b7" },
];
var PROJECTS = [
  { title: "ProcureTrace", tag: "Government Tech", desc: "Built a Chrome extension that automatically tracks and logs every AI conversation federal employees have \u2014 across ChatGPT, Claude, Gemini, and more. Paired with a real-time dashboard so agencies can prove compliance without any manual work.", metrics: ["Chrome Extension", "Live Dashboard", "5 AI Platforms"], color: C.accent, icon: "\u25C8" },
  { title: "AI-Built Websites", tag: "Web Design", desc: "Designed and developed complete, professional websites for real businesses in under a week each \u2014 including this one. Every site is responsive, SEO-optimized, and built to convert visitors into customers.", metrics: ["6+ Sites Shipped", "Under 1 Week Each", "SEO Built-In"], color: C.accent2, icon: "\u25C7" },
  { title: "Restaurant SEO", tag: "Marketing", desc: "Ran AI-powered SEO campaigns for major restaurant chains including Chick-fil-A, Dave & Buster's, and LongHorn Steakhouse. Created content that ranks in Google's AI Overviews and drives real foot traffic.", metrics: ["National Chains", "AI Overview Rankings", "Measurable Traffic"], color: C.accent3, icon: "\u25C6" },
  { title: "Gestational.ly", tag: "App Development", desc: "Took a personal idea and built it into a full working app \u2014 a companion tool for surrogates and intended parents to track their journey, access resources, and stay connected. Concept to launch, entirely AI-built.", metrics: ["Full React App", "Educational Content", "Live Product"], color: C.green, icon: "\u25C9" },
  { title: "AI SEO Product", tag: "SaaS Strategy", desc: "Designed a complete SaaS product for agencies \u2014 three pricing tiers, feature sets, onboarding flows, and go-to-market strategy. The kind of product planning that usually takes a team months, done in days.", metrics: ["3 Pricing Tiers", "Full GTM Plan", "Revenue Model"], color: C.amber, icon: "\u25A3" },
  { title: "Video Production", tag: "Creative", desc: "Created cinematic product videos that render themselves automatically using code. Write a script, feed in assets, and the system generates broadcast-quality video \u2014 no editor, no timeline, no waiting.", metrics: ["Auto-Generated", "Broadcast Quality", "Infinitely Scalable"], color: "#f87171", icon: "\u25B2" },
];

var CAPS = [
  { name: "AI Product Design", icon: "\u2726", desc: "From idea to shipped product using AI at every step" },
  { name: "Full-Stack Development", icon: "\u27D0", desc: "React, Next.js, Node, databases, deployment" },
  { name: "AI-Powered SEO", icon: "\u25CE", desc: "Content that ranks in Google and AI Overviews" },
  { name: "Prompt Engineering", icon: "\u2B21", desc: "Getting AI to do exactly what you need, every time" },
  { name: "Rapid Prototyping", icon: "\u25B3", desc: "Working prototypes in hours, not weeks" },
  { name: "Systems Architecture", icon: "\u25C8", desc: "Designing how all the pieces fit together" },
  { name: "3D & Motion Design", icon: "\u25C7", desc: "Interactive experiences, animations, WebGL" },
  { name: "AI Strategy", icon: "\u25A3", desc: "Helping businesses figure out where AI fits" },
];

var STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive into your goals, audience, and competitive landscape using AI-powered research and analysis.", color: C.accent },
  { num: "02", title: "Design", desc: "AI-accelerated design exploration \u2014 generating and refining concepts at 10x the speed of traditional workflows.", color: C.accent2 },
  { num: "03", title: "Build", desc: "Full-stack development with AI pair programming. Production-grade code, tested and optimized from day one.", color: C.accent3 },
  { num: "04", title: "Launch", desc: "Deploy, measure, iterate. AI-powered analytics and optimization ensure your product keeps getting better.", color: C.green },
];

var AUTOMATIONS = [
  { title: "Procurement Compliance Pipeline", desc: "Auto-captures every AI interaction across federal procurement teams, flags anomalies in real-time, generates audit-ready compliance reports for OMB M-25-21.", flow: ["AI Interaction","Capture Engine","Risk Scoring","Compliance Report","Audit Trail"], tags: ["Government","Compliance","Real-Time"], color: C.accent, status: "Live" },
  { title: "Multi-Channel SEO Engine", desc: "Monitors search rankings, generates AI Overview-optimized content, auto-publishes across blog, YouTube, and social — tracks ROI down to the foot traffic.", flow: ["Rank Monitor","Content Gen","Multi-Publish","Analytics","ROI Dashboard"], tags: ["Marketing","Content","Analytics"], color: C.accent2, status: "Active" },
  { title: "Vendor Intelligence System", desc: "Scrapes state and local bid boards, scores opportunities against capability matrices, auto-generates proposal outlines with win probability estimates.", flow: ["Bid Scraper","Opportunity Score","Proposal Draft","Win Probability","CRM Sync"], tags: ["Enterprise","Procurement","AI"], color: C.green, status: "Active" },
  { title: "Client Onboarding Orchestrator", desc: "End-to-end client intake: form submission triggers contract generation, schedules kickoff, provisions project workspace, sends branded welcome sequence.", flow: ["Form Submit","Contract Gen","Auto-Schedule","Workspace Setup","Welcome Flow"], tags: ["Operations","Workflow","Scale"], color: C.amber, status: "Live" },
];

var LOGOS = ["Chick-fil-A", "Dave & Buster's", "LongHorn Steakhouse", "U.S. Government", "GSA Schedule"];
var SECTS = [{ id: "hero", l: "Home" }, { id: "reel", l: "Reel" }, { id: "stats", l: "Stats" }, { id: "about", l: "About" }, { id: "lab", l: "Lab" }, { id: "work", l: "Work" }, { id: "automations", l: "Auto" }, { id: "process", l: "Process" }, { id: "stack", l: "Stack" }, { id: "contact", l: "Contact" }];

function goTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }
function useInView(th) {
  var threshold = th || 0.15; var ref = useRef(null);
  var s = useState(false), v = s[0], setV = s[1];
  useEffect(function() { var obs = new IntersectionObserver(function(entries) { if (entries[0].isIntersecting) setV(true); }, { threshold: threshold }); if (ref.current) obs.observe(ref.current); return function() { obs.disconnect(); }; }, [threshold]);
  return [ref, v];
}

function ParticleHero(props) {
  var scrollRef = props.scrollRef, mouseRef = props.mouseRef;
  var mountRef = useRef(null); var opRef = useRef(null);
  useEffect(function() {
    if (!mountRef.current) return;
    var w = window.innerWidth, h = window.innerHeight;
    var scene = new THREE.Scene(); var camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    var count = 3200; var geo = new THREE.BufferGeometry();
    var pos = new Float32Array(count * 3), cols = new Float32Array(count * 3), tgt = new Float32Array(count * 3), sizes = new Float32Array(count);
    var pal = [new THREE.Color("#00e8ff"), new THREE.Color("#8b5cf6"), new THREE.Color("#f43f5e"), new THREE.Color("#006680"), new THREE.Color("#5530a0"), new THREE.Color("#304050")];
    for (var i = 0; i < count; i++) {
      var i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 18; pos[i3+1] = (Math.random() - 0.5) * 18; pos[i3+2] = (Math.random() - 0.5) * 8;
      var phi = Math.acos(2 * Math.random() - 1), theta = Math.random() * Math.PI * 2, r = 2.8 + Math.random() * 0.8;
      tgt[i3] = r * Math.sin(phi) * Math.cos(theta);
      tgt[i3+1] = r * Math.sin(phi) * Math.sin(theta) + 0.8;
      tgt[i3+2] = r * Math.cos(phi);
      var c = pal[Math.floor(Math.random() * pal.length)];
      cols[i3] = c.r; cols[i3+1] = c.g; cols[i3+2] = c.b;
      sizes[i] = Math.random() * 2.5 + 1;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    var mat = new THREE.ShaderMaterial({
      vertexShader: "attribute float size; varying vec3 vColor; void main(){vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(180.0/-mv.z);gl_Position=projectionMatrix*mv;}",
      fragmentShader: "varying vec3 vColor;void main(){float d=length(gl_PointCoord-0.5);if(d>0.5)discard;float a=smoothstep(0.5,0.1,d);gl_FragColor=vec4(vColor,a*0.55);}",
      transparent: true, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    var pts = new THREE.Points(geo, mat); scene.add(pts);
    var pairs = [];
    for (var att = 0; att < 6000 && pairs.length < 250; att++) {
      var a = Math.floor(Math.random()*count), b = Math.floor(Math.random()*count); if (a===b) continue;
      var dx=tgt[a*3]-tgt[b*3],dy=tgt[a*3+1]-tgt[b*3+1],dz=tgt[a*3+2]-tgt[b*3+2];
      if (Math.sqrt(dx*dx+dy*dy+dz*dz)<0.8) pairs.push([a,b]);
    }
    var lineGeo = new THREE.BufferGeometry(); var lp = new Float32Array(pairs.length*6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    var lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: new THREE.Color(C.accent), transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending }));
    scene.add(lines);
    var running = true, frame = 0;
    function animate() {
      if (!running) return; frame++;
      var t = frame*0.016, ease = 1-Math.pow(1-Math.min(t/3.5,1),4);
      var p = geo.attributes.position.array, sf = (scrollRef.current||0)*0.001;
      var mx = ((mouseRef.current?.x||0.5)-0.5)*2, my = ((mouseRef.current?.y||0.5)-0.5)*2;
      for (var ii=0;ii<count;ii++) { var ii3=ii*3; p[ii3]+=(tgt[ii3]-p[ii3])*0.016*ease; p[ii3+1]+=(tgt[ii3+1]-p[ii3+1])*0.016*ease; p[ii3+2]+=(tgt[ii3+2]-p[ii3+2])*0.016*ease; p[ii3]+=Math.sin(t*0.3+ii*0.05)*0.001+mx*0.002; p[ii3+1]+=Math.cos(t*0.2+ii*0.08)*0.001-my*0.002; }
      geo.attributes.position.needsUpdate = true;
      for (var pi=0;pi<pairs.length;pi++) { var idx=pi*6,aa=pairs[pi][0],bb=pairs[pi][1]; lp[idx]=p[aa*3];lp[idx+1]=p[aa*3+1];lp[idx+2]=p[aa*3+2]; lp[idx+3]=p[bb*3];lp[idx+4]=p[bb*3+1];lp[idx+5]=p[bb*3+2]; }
      lineGeo.attributes.position.needsUpdate = true;
      pts.rotation.y=sf*0.35+t*0.035; pts.rotation.x=Math.sin(t*0.06)*0.06;
      lines.rotation.copy(pts.rotation); camera.position.z=5+sf*2;
      if (opRef.current) opRef.current.style.opacity = Math.max(0,1-(scrollRef.current||0)/900);
      renderer.render(scene,camera); requestAnimationFrame(animate);
    }
    animate();
    function onR() { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight); }
    window.addEventListener("resize",onR);
    return function() { running=false; window.removeEventListener("resize",onR); if(mountRef.current&&renderer.domElement.parentNode===mountRef.current) mountRef.current.removeChild(renderer.domElement); renderer.dispose(); geo.dispose(); mat.dispose(); lineGeo.dispose(); };
  }, []);
  return <div ref={function(el){mountRef.current=el;opRef.current=el;}} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none" }} />;
}

function CursorGlow(props) {
  var mouseRef=props.mouseRef; var ref=useRef(null);
  useEffect(function() { var go=true; function loop(){if(!go||!ref.current)return; var x=(mouseRef.current?.x||0.5)*100,y=(mouseRef.current?.y||0.5)*100; ref.current.style.background="radial-gradient(600px circle at "+x+"% "+y+"%, rgba(0,232,255,0.02), transparent 60%)"; requestAnimationFrame(loop);} loop(); return function(){go=false;}; }, []);
  return <div ref={ref} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1 }} />;
}

function SpiralWave(props) {
  var scrollRef=props.scrollRef,mouseRef=props.mouseRef;
  var canvasRef=useRef(null);
  useEffect(function() {
    var canvas=canvasRef.current; if(!canvas)return;
    var ctx=canvas.getContext("2d"); var running=true; var frame=0;
    var particles=[];var count=220;
    var colors=[C.accent+"88",C.accent2+"66",C.accent3+"55",C.green+"55","#ffffff44"];
    for(var i=0;i<count;i++){
      particles.push({phase:Math.random()*Math.PI*2,speed:0.2+Math.random()*0.3,radius:100+Math.random()*200,size:Math.random()*2.5+0.8,color:colors[Math.floor(Math.random()*colors.length)],ySpeed:0.5+Math.random()*0.5});
    }
    function resize(){var dpr=Math.min(window.devicePixelRatio,2);canvas.width=window.innerWidth*dpr;canvas.height=window.innerHeight*dpr;canvas.style.width=window.innerWidth+"px";canvas.style.height=window.innerHeight+"px";ctx.setTransform(dpr,0,0,dpr,0,0);}
    resize();
    var rto; function onR(){clearTimeout(rto);rto=setTimeout(resize,300);}
    window.addEventListener("resize",onR);
    function animate(){
      if(!running)return; frame++;
      var t=frame*0.01;var w=window.innerWidth;var vh=window.innerHeight;var pageH=Math.max(document.documentElement.scrollHeight,vh*5);
      var scroll=scrollRef.current||0;
      ctx.clearRect(0,0,w,vh);
      var mx=((mouseRef.current?.x||0.5)-0.5)*50;
      var my=((mouseRef.current?.y||0.5)-0.5)*30;
      for(var i=0;i<count;i++){
        var p=particles[i];
        var yPage=(i/count)*pageH;
        var yScreen=yPage-scroll;
        if(yScreen<-80||yScreen>vh+80)continue;
        var wave=Math.sin(t*p.speed+p.phase+yPage*0.0006);
        var wave2=Math.cos(t*p.speed*0.7+p.phase*1.3+yPage*0.001);
        var spiralX=w*0.5+wave*p.radius*0.6+wave2*p.radius*0.4+mx*0.15;
        var spiralY=yScreen+Math.cos(t*p.ySpeed+p.phase)*12+my*0.08;
        var edgeFade=1-Math.pow(Math.abs(spiralX-w*0.5)/(w*0.45),2);
        var yFade=Math.min(spiralY/120,1)*Math.min((vh-spiralY)/120,1);
        var alpha=Math.max(0,edgeFade*yFade);
        if(alpha<0.02)continue;
        ctx.globalAlpha=alpha*0.7;
        ctx.beginPath();ctx.arc(spiralX,spiralY,p.size,0,Math.PI*2);
        ctx.fillStyle=p.color;ctx.fill();
        if(alpha>0.12&&i%2===0){
          var ni=(i+5)%count;
          var nyPage=(ni/count)*pageH;var nyScreen=nyPage-scroll;
          if(nyScreen>-80&&nyScreen<vh+80){
            var nw=Math.sin(t*particles[ni].speed+particles[ni].phase+nyPage*0.0006);
            var nw2=Math.cos(t*particles[ni].speed*0.7+particles[ni].phase*1.3+nyPage*0.001);
            var nx=w*0.5+nw*particles[ni].radius*0.6+nw2*particles[ni].radius*0.4+mx*0.15;
            var ny2=nyScreen+Math.cos(t*particles[ni].ySpeed+particles[ni].phase)*12+my*0.08;
            var d=Math.sqrt((nx-spiralX)*(nx-spiralX)+(ny2-spiralY)*(ny2-spiralY));
            if(d<220){ctx.globalAlpha=alpha*0.12*(1-d/220);ctx.beginPath();ctx.moveTo(spiralX,spiralY);ctx.lineTo(nx,ny2);ctx.strokeStyle=C.accent;ctx.lineWidth=0.5;ctx.stroke();}
          }
        }
      }
      ctx.globalAlpha=1;
      requestAnimationFrame(animate);
    }
    animate();
    return function(){running=false;window.removeEventListener("resize",onR);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",pointerEvents:"none",zIndex:3}} />;
}

function Nav(props) {
  var active=props.active; var s=useState(false),show=s[0],setShow=s[1];
  useEffect(function(){var t=setTimeout(function(){setShow(true);},2000);return function(){clearTimeout(t);};}, []);
  return (<nav style={{ position:"fixed",top:"50%",right:"20px",transform:"translateY(-50%)",zIndex:100,display:"flex",flexDirection:"column",gap:"10px",opacity:show?1:0,transition:"opacity 0.5s" }}>
    {SECTS.map(function(sec){return <button key={sec.id} onClick={function(){goTo(sec.id);}} title={sec.l} style={{ width:active===sec.id?"20px":"6px",height:"6px",borderRadius:"3px",background:active===sec.id?C.accent:"rgba(255,255,255,0.15)",border:"none",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.23,1,0.32,1)",padding:0,boxShadow:active===sec.id?"0 0 10px rgba(0,232,255,0.25)":"none" }} />;})}
  </nav>);
}

function MagBtn(props) {
  var ac=props.accent||C.accent; var ref=useRef(null);
  var os=useState({x:0,y:0}),o=os[0],setO=os[1]; var hs=useState(false),h=hs[0],setH=hs[1];
  return (<button ref={ref}
    onMouseMove={function(e){if(!ref.current)return;var r=ref.current.getBoundingClientRect();setO({x:(e.clientX-r.left-r.width/2)*0.2,y:(e.clientY-r.top-r.height/2)*0.2});}}
    onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);setO({x:0,y:0});}}
    onClick={props.onClick}
    style={Object.assign({transform:"translate("+o.x+"px,"+o.y+"px)",transition:h?"transform 0.1s":"transform 0.4s cubic-bezier(0.23,1,0.32,1)",background:h?ac+"15":"transparent",border:"1px solid "+(h?ac:ac+"55"),color:ac,padding:"16px 40px",fontSize:"13px",letterSpacing:"2.5px",textTransform:"uppercase",cursor:"pointer",fontFamily:F.mono,borderRadius:0,outline:"none",fontWeight:500},props.style||{})}
  >{props.children}</button>);
}

function Heading(props) {
  var al=props.align||"center"; var rv=useInView(0.12),ref=rv[0],v=rv[1];
  return (<div ref={ref} style={{ textAlign:al,marginBottom:"52px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"all 0.6s cubic-bezier(0.23,1,0.32,1)" }}>
    <div style={{ fontSize:"11px",letterSpacing:"5px",textTransform:"uppercase",color:C.accent,fontFamily:F.mono,marginBottom:"14px",fontWeight:500 }}>{props.tag}</div>
    <h2 style={{ fontSize:"clamp(30px,4.5vw,52px)",fontWeight:700,color:"#fff",fontFamily:F.display,letterSpacing:"-0.5px",margin:"0 0 16px" }}>{props.title}</h2>
    {props.subtitle&&<p style={{ fontSize:"17px",color:C.textBody,fontFamily:F.body,maxWidth:al==="center"?"600px":"none",margin:al==="center"?"0 auto":0,lineHeight:1.75 }}>{props.subtitle}</p>}
  </div>);
}

function ToolPill(props) {
  var hs=useState(false),h=hs[0],setH=hs[1];
  return <span onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}} style={{ fontSize:"12px",letterSpacing:"1.5px",color:h?C.accent:C.textMid,fontFamily:F.mono,border:"1px solid "+(h?C.accent+"33":C.border),padding:"7px 16px",borderRadius:"100px",transition:"all 0.3s",cursor:"default",display:"inline-block" }}>{props.name}</span>;
}

function SiteMockup(props) {
  var site=props.site,index=props.index; var rv=useInView(0.08),ref=rv[0],v=rv[1];
  var hs=useState(false),h=hs[0],setH=hs[1];
  var ls=useState(true),loading=ls[0],setLoading=ls[1];
  var es=useState(false),err=es[0],setErr=es[1];


  function renderFakeSite() {
    if (site.id==="physician") return (<div style={{height:"100%",background:"#fafaf8",overflow:"hidden",position:"relative"}}>
      {/* Organic blob accent */}
      <div style={{position:"absolute",top:"-60px",right:"-40px",width:"280px",height:"280px",borderRadius:"60% 40% 50% 50%",background:"radial-gradient(circle, #99f6e422, #06b6d411, transparent)",filter:"blur(40px)"}} />
      <div style={{position:"absolute",bottom:"-30px",left:"-30px",width:"200px",height:"200px",borderRadius:"40% 60% 50% 50%",background:"radial-gradient(circle, #a5f3fc22, transparent)",filter:"blur(30px)"}} />
      {/* Nav */}
      <div style={{padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:"#0891b2"}} /><span style={{fontSize:14,fontWeight:700,color:"#0f172a",fontFamily:F.display,letterSpacing:"-0.3px"}}>Meridian</span></div>
        <div style={{display:"flex",gap:20}}>{["Services","Team","Patients"].map(function(n){return <span key={n} style={{fontSize:10,color:"#94a3b8",fontFamily:F.body}}>{n}</span>;})}<div style={{padding:"5px 14px",background:"#0891b2",borderRadius:6,fontSize:10,fontWeight:600,color:"#fff",fontFamily:F.body}}>Book</div></div>
      </div>
      {/* Hero area with large photo placeholder */}
      <div style={{margin:"0 24px",borderRadius:16,overflow:"hidden",position:"relative",height:"180px",background:"linear-gradient(135deg, #ccfbf1 0%, #a5f3fc 30%, #bae6fd 60%, #e0e7ff 100%)"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, transparent 40%, rgba(250,250,248,0.9) 100%)"}} />
        <div style={{position:"absolute",bottom:16,left:20,right:20}}>
          <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#0891b2",fontFamily:F.mono,fontWeight:600,marginBottom:6}}>Interventional Pain Medicine</div>
          <h3 style={{fontSize:24,fontWeight:800,color:"#0f172a",fontFamily:F.display,lineHeight:1.1}}>Life without<br/>limitations.</h3>
        </div>
      </div>
      {/* Service cards with distinctive layout */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"16px 24px 0"}}>
        {[{n:"Spine Care",c:"#f0fdfa",bc:"#0d9488"},{n:"Nerve Blocks",c:"#ecfeff",bc:"#0891b2"},{n:"Regenerative",c:"#fdf4ff",bc:"#a855f7"}].map(function(s,i){return <div key={i} style={{background:s.c,borderRadius:10,padding:"14px 10px",textAlign:"center",position:"relative",overflow:"hidden"}}><div style={{width:24,height:3,borderRadius:2,background:s.bc,margin:"0 auto 8px"}} /><div style={{fontSize:10,fontWeight:700,color:"#334155",fontFamily:F.display}}>{s.n}</div><div style={{fontSize:8,color:"#94a3b8",fontFamily:F.body,marginTop:3}}>Learn more</div></div>;})}
      </div>
      {/* Trust bar */}
      <div style={{display:"flex",justifyContent:"center",gap:20,padding:"16px 24px 0"}}>
        {[{v:"4.9",l:"Rating"},{v:"2k+",l:"Patients"},{v:"15yr",l:"Experience"}].map(function(s,i){return <div key={i} style={{textAlign:"center"}}><div style={{fontSize:18,fontWeight:800,color:"#0f172a",fontFamily:F.display}}>{s.v}</div><div style={{fontSize:7,letterSpacing:1.5,textTransform:"uppercase",color:"#94a3b8",fontFamily:F.mono}}>{s.l}</div></div>;})}
      </div>
    </div>);

    if (site.id==="accountant") return (<div style={{height:"100%",background:"#08080a",overflow:"hidden",position:"relative"}}>
      {/* Geometric grid accent */}
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:"linear-gradient(rgba(110,231,183,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.03) 1px, transparent 1px)",backgroundSize:"40px 40px"}} />
      <div style={{position:"absolute",top:"50px",right:"30px",width:"200px",height:"200px",border:"1px solid rgba(110,231,183,0.06)",borderRadius:"50%"}} />
      <div style={{position:"absolute",top:"80px",right:"60px",width:"140px",height:"140px",border:"1px solid rgba(110,231,183,0.04)",borderRadius:"50%"}} />
      {/* Nav */}
      <div style={{padding:"18px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1,borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
        <span style={{fontSize:11,fontWeight:600,color:"#fff",fontFamily:F.mono,letterSpacing:"4px"}}>HARGRAVE<span style={{color:"#6ee7b7"}}>&</span>COLE</span>
        <div style={{display:"flex",gap:20}}>{["Advisory","Tax","Insights"].map(function(n){return <span key={n} style={{fontSize:9,color:"rgba(255,255,255,0.25)",fontFamily:F.mono,letterSpacing:"1.5px",textTransform:"uppercase"}}>{n}</span>;})}</div>
      </div>
      {/* Hero */}
      <div style={{padding:"40px 28px 0",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:6}}>
          <span style={{fontSize:60,fontWeight:200,color:"#fff",fontFamily:F.display,lineHeight:0.9,letterSpacing:"-2px"}}>$2.4</span>
          <span style={{fontSize:14,fontWeight:500,color:"#6ee7b7",fontFamily:F.mono,letterSpacing:"1px"}}>MILLION</span>
        </div>
        <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:F.mono,letterSpacing:"3px",textTransform:"uppercase",marginBottom:24}}>Client Tax Savings / 2024</div>
        <div style={{width:50,height:1,background:"#6ee7b7",marginBottom:20}} />
        <h3 style={{fontSize:22,fontWeight:300,color:"rgba(255,255,255,0.9)",fontFamily:F.display,lineHeight:1.4,maxWidth:280,letterSpacing:"0.5px"}}>Strategic financial advisory for companies that think in decades.</h3>
      </div>
      {/* Metric row */}
      <div style={{display:"flex",gap:0,margin:"28px 28px 0",position:"relative",zIndex:1}}>
        {[{v:"800+",l:"Active Clients"},{v:"22",l:"Years"},{v:"98%",l:"Retention"}].map(function(s,i){return <div key={i} style={{flex:1,padding:"16px 0",borderTop:"1px solid rgba(255,255,255,0.06)",borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none"}}><div style={{fontSize:20,fontWeight:700,color:"#fff",fontFamily:F.mono,textAlign:"center"}}>{s.v}</div><div style={{fontSize:7,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.15)",fontFamily:F.mono,textAlign:"center",marginTop:4}}>{s.l}</div></div>;})}
      </div>
      {/* Services strip */}
      <div style={{display:"flex",gap:0,margin:"0 28px",position:"relative",zIndex:1}}>
        {["Tax Strategy","M&A Advisory","Audit Defense","Entity Design"].map(function(s,i){return <div key={i} style={{flex:1,padding:"12px 8px",borderTop:"1px solid rgba(255,255,255,0.04)",fontSize:8,color:"rgba(255,255,255,0.3)",fontFamily:F.mono,letterSpacing:"0.5px",textAlign:"center"}}>{s}</div>;})}
      </div>
    </div>);

    return <div style={{padding:40,textAlign:"center",color:"rgba(255,255,255,0.3)"}}>{site.name}</div>;
  }




  var hasLive = !!site.liveUrl;

  return (
    <div ref={ref} style={{ minWidth:"340px",maxWidth:"540px",flexShrink:0,opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.6s cubic-bezier(0.23,1,0.32,1) "+(index*0.08)+"s" }}>
      <div onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}} style={{ borderRadius:"12px",overflow:"hidden",border:"1px solid "+(h?site.color+"44":C.border),transition:"all 0.4s ease",transform:h?"translateY(-6px) scale(1.01)":"translateY(0) scale(1)",boxShadow:h?"0 24px 80px "+site.color+"20":"none" }}>
        <div style={{ background:"rgba(18,20,28,0.98)",padding:"10px 14px",display:"flex",alignItems:"center",gap:"6px",borderBottom:"1px solid "+C.border }}>
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ff5f57"}} />
          <div style={{width:8,height:8,borderRadius:"50%",background:"#ffbd2e"}} />
          <div style={{width:8,height:8,borderRadius:"50%",background:"#28c840"}} />
          <div style={{ flex:1,marginLeft:"8px",background:"rgba(255,255,255,0.05)",borderRadius:"4px",padding:"5px 12px",fontSize:"11px",color:C.textDim,fontFamily:F.mono }}>
            <span style={{color:"rgba(255,255,255,0.2)"}}>https://</span>{site.url}
          </div>
          {hasLive && <a href={site.liveUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:9,color:site.color,fontFamily:F.mono,textDecoration:"none",letterSpacing:"1px",padding:"3px 8px",border:"1px solid "+site.color+"33",borderRadius:4}}>LIVE \u2192</a>}
        </div>
        <div style={{ position:"relative",height:"420px",background:hasLive?"#fff":"linear-gradient(180deg, "+site.color+"08 0%, "+BG+" 100%)",overflow:"hidden" }}>
          {hasLive && loading && !err && <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,zIndex:2,background:BG}}>
            <div style={{width:24,height:24,border:"2px solid "+site.color+"33",borderTop:"2px solid "+site.color,borderRadius:"50%",animation:"spin 0.8s linear infinite"}} />
            <span style={{fontSize:10,color:C.textDim,fontFamily:F.mono,letterSpacing:"1px"}}>Loading live site...</span>
          </div>}
          {hasLive && !err && <iframe
            src={site.liveUrl}
            title={site.name}
            onLoad={function(){setLoading(false);}}
            onError={function(){setErr(true);setLoading(false);}}
            style={{width:"200%",height:"200%",transform:"scale(0.5)",transformOrigin:"top left",border:"none",background:"#fff",opacity:loading?0:1,transition:"opacity 0.4s ease",pointerEvents:h?"auto":"none"}}
          />}
          {hasLive && err && <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,background:BG}}><span style={{fontSize:11,color:C.textDim,fontFamily:F.mono}}>Preview unavailable</span><a href={site.liveUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:site.color,fontFamily:F.mono,textDecoration:"none"}}>Visit live \u2192</a></div>}
          {!hasLive && <div style={{position:"relative",height:"100%",overflow:"hidden"}}><div style={{position:"absolute",top:"-20%",right:"-15%",width:"250px",height:"250px",borderRadius:"50%",background:"radial-gradient(circle, "+site.color+"12, transparent 70%)",filter:"blur(50px)"}} />{renderFakeSite()}</div>}
        </div>
      </div>
      <div style={{ padding:"16px 4px 0",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <div>
          <div style={{ fontSize:"15px",fontWeight:600,color:C.text,fontFamily:F.display }}>{site.name}</div>
          <div style={{ fontSize:"13px",color:C.textMid,fontFamily:F.body,marginTop:"2px" }}>{site.type}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {hasLive && <span style={{fontSize:8,color:C.green,fontFamily:F.mono,letterSpacing:"1px",display:"flex",alignItems:"center",gap:4}}><span style={{width:5,height:5,borderRadius:"50%",background:C.green,display:"inline-block"}}></span>LIVE</span>}
          <span style={{ fontSize:"12px",color:C.textMid,fontFamily:F.mono }}>{site.year}</span>
        </div>
      </div>
    </div>
  );
}

function HoloCard(props) {
  var project=props.project,index=props.index; var rv=useInView(0.1),ref=rv[0],v=rv[1];
  var ts=useState({x:0,y:0}),tilt=ts[0],setTilt=ts[1]; var hs=useState(false),h=hs[0],setH=hs[1];
  var gs=useState({x:50,y:50}),glow=gs[0],setGlow=gs[1];
  return (
    <div ref={ref} onMouseMove={function(e){if(!ref.current)return;var r=ref.current.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-0.5,y=(e.clientY-r.top)/r.height-0.5;setTilt({x:y*-8,y:x*8});setGlow({x:(x+0.5)*100,y:(y+0.5)*100});}}
      onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);setTilt({x:0,y:0});}}
      style={{ perspective:"1000px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(40px)",transition:"all 0.6s cubic-bezier(0.23,1,0.32,1) "+(index*0.08)+"s" }}>
      <div style={{ transform:"rotateX("+tilt.x+"deg) rotateY("+tilt.y+"deg) scale("+(h?1.01:1)+")",transition:h?"transform 0.1s":"transform 0.4s cubic-bezier(0.23,1,0.32,1)",background:C.bgCard,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid "+(h?project.color+"44":C.border),borderRadius:"12px",padding:"32px",position:"relative",overflow:"hidden",cursor:"default",minHeight:"240px",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
        {h&&<div style={{position:"absolute",inset:0,background:"radial-gradient(300px circle at "+glow.x+"% "+glow.y+"%, "+project.color+"12, transparent 50%)",pointerEvents:"none"}} />}
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
            <span style={{fontSize:"20px",color:project.color,filter:"drop-shadow(0 0 6px "+project.color+"55)"}}>{project.icon}</span>
            <span style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:project.color,fontFamily:F.mono,background:project.color+"0f",padding:"3px 10px",borderRadius:"100px"}}>{project.tag}</span>
          </div>
          <h3 style={{fontSize:"22px",fontWeight:600,color:"#fff",margin:"10px 0 8px",fontFamily:F.display}}>{project.title}</h3>
          <p style={{fontSize:"15px",lineHeight:1.7,color:C.textBody,fontFamily:F.body}}>{project.desc}</p>
        </div>
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"18px",position:"relative",zIndex:1}}>
          {project.metrics.map(function(m,i){return <span key={i} style={{fontSize:"11px",letterSpacing:"1px",color:C.textMid,border:"1px solid "+C.border,padding:"5px 12px",borderRadius:"100px",fontFamily:F.mono}}>{m}</span>;})}
        </div>
      </div>
    </div>
  );
}

function ParticleTextToy() {
  var canvasRef = useRef(null), textRef = useRef("DONNY"), particlesRef = useRef([]), mRef = useRef({ x: -100, y: -100 });
  var vs = useState(false), vis = vs[0], setVis = vs[1];
  var is = useState("DONNY"), inputText = is[0], setInputText = is[1];
  useEffect(function() { var obs = new IntersectionObserver(function(e) { if (e[0].isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return function() { obs.disconnect(); }; }, []);
  function buildP(text, canvas) {
    var tc = document.createElement("canvas"), w = canvas.offsetWidth, h = canvas.offsetHeight;
    tc.width = w; tc.height = h;
    var tx = tc.getContext("2d");
    tx.fillStyle = "#fff"; tx.font = "bold " + Math.min(w / (text.length * 0.7), 80) + "px Syne, sans-serif";
    tx.textAlign = "center"; tx.textBaseline = "middle"; tx.fillText(text, w / 2, h / 2);
    var data = tx.getImageData(0, 0, w, h).data, arr = [], gap = 3, colors = [C.accent, C.accent2, C.accent3, "#fff"];
    for (var y = 0; y < h; y += gap) for (var x = 0; x < w; x += gap) {
      if (data[(y * w + x) * 4 + 3] > 128) arr.push({ tx: x, ty: y, x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 1.5 + 0.5 });
    }
    return arr;
  }
  useEffect(function() {
    var canvas = canvasRef.current; if (!canvas || !vis) return;
    var ctx = canvas.getContext("2d"), running = true;
    function resize() { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.setTransform(2, 0, 0, 2, 0, 0); particlesRef.current = buildP(textRef.current, canvas); }
    resize();
    function onM(e) { var r = canvas.getBoundingClientRect(); mRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; }
    function onL() { mRef.current = { x: -100, y: -100 }; }
    canvas.addEventListener("mousemove", onM); canvas.addEventListener("mouseleave", onL);
    function animate() {
      if (!running) return;
      var w = canvas.offsetWidth, h = canvas.offsetHeight; ctx.clearRect(0, 0, w, h);
      var mx = mRef.current.x, my = mRef.current.y;
      particlesRef.current.forEach(function(p) {
        var dx = mx - p.x, dy = my - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 60) { var force = (60 - dist) / 60; p.vx -= (dx / dist) * force * 3; p.vy -= (dy / dist) * force * 3; }
        p.vx += (p.tx - p.x) * 0.05; p.vy += (p.ty - p.y) * 0.05; p.vx *= 0.88; p.vy *= 0.88; p.x += p.vx; p.y += p.vy;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", resize);
    return function() { running = false; canvas.removeEventListener("mousemove", onM); canvas.removeEventListener("mouseleave", onL); window.removeEventListener("resize", resize); };
  }, [vis]);
  function handleChange(val) { setInputText(val); textRef.current = val || "DONNY"; if (canvasRef.current && vis) particlesRef.current = buildP(textRef.current, canvasRef.current); }
  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "300px", borderRadius: "12px", border: "1px solid " + C.border, cursor: "default", background: C.bg, opacity: vis ? 1 : 0, transition: "opacity 0.6s" }} />
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)" }}>
        <input value={inputText} onChange={function(e) { handleChange(e.target.value.toUpperCase()); }} maxLength={12} placeholder="TYPE HERE" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid " + C.border, borderRadius: "6px", padding: "8px 16px", color: C.text, fontFamily: F.mono, fontSize: "12px", letterSpacing: "2px", textAlign: "center", width: "180px", outline: "none" }} />
      </div>
    </div>
  );
}

function NeuralNetToy() {
  var canvasRef = useRef(null), mRef = useRef({ x: 0.5, y: 0.5 });
  var vs = useState(false), vis = vs[0], setVis = vs[1];
  useEffect(function() { var obs = new IntersectionObserver(function(e) { if (e[0].isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return function() { obs.disconnect(); }; }, []);
  useEffect(function() {
    var canvas = canvasRef.current; if (!canvas || !vis) return;
    var ctx = canvas.getContext("2d"), frame = 0, running = true, nodes = [], layers = [4, 6, 8, 6, 4];
    function resize() { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.setTransform(2, 0, 0, 2, 0, 0); nodes.length = 0; var w = canvas.offsetWidth, h = canvas.offsetHeight, ls = w / (layers.length + 1); layers.forEach(function(c, li) { var ns = h / (c + 1); for (var ni = 0; ni < c; ni++) nodes.push({ x: ls*(li+1), y: ns*(ni+1), layer: li, bx: ls*(li+1), by: ns*(ni+1), a: 0 }); }); }
    resize();
    function onM(e) { var r = canvas.getBoundingClientRect(); mRef.current = { x: (e.clientX-r.left)/r.width, y: (e.clientY-r.top)/r.height }; }
    canvas.addEventListener("mousemove", onM);
    function animate() {
      if (!running) return; frame++;
      var t = frame * 0.016, w = canvas.offsetWidth, h = canvas.offsetHeight; ctx.clearRect(0, 0, w, h);
      var mx = mRef.current.x * w, my = mRef.current.y * h;
      nodes.forEach(function(n) { var d = Math.sqrt(Math.pow(n.bx-mx,2)+Math.pow(n.by-my,2)); n.a += (Math.max(0,1-d/160)-n.a)*0.06; n.x = n.bx+Math.sin(t*0.6+n.by*0.01)*2; n.y = n.by+Math.cos(t*0.4+n.bx*0.01)*2; });
      for (var i = 0; i < nodes.length; i++) for (var j = i+1; j < nodes.length; j++) {
        if (nodes[j].layer === nodes[i].layer + 1) {
          var s = (nodes[i].a+nodes[j].a)/2;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = s > 0.12 ? "rgba(0,232,255,"+Math.min(s*0.3,0.25)+")" : "rgba(255,255,255,0.015)";
          ctx.lineWidth = s > 0.2 ? 1 : 0.4; ctx.stroke();
          if (s > 0.3) { var pp = (Math.sin(t*2+i*0.5)+1)/2; ctx.beginPath(); ctx.arc(nodes[i].x+(nodes[j].x-nodes[i].x)*pp,nodes[i].y+(nodes[j].y-nodes[i].y)*pp,1.5,0,Math.PI*2); ctx.fillStyle = "rgba(0,232,255,"+(s*0.6)+")"; ctx.fill(); }
        }
      }
      nodes.forEach(function(n) { ctx.beginPath(); ctx.arc(n.x, n.y, 2.5+n.a*3, 0, Math.PI*2); ctx.fillStyle = n.a > 0.2 ? "rgba(0,232,255,"+(0.3+n.a*0.5)+")" : "rgba(255,255,255,0.1)"; ctx.fill(); if (n.a > 0.2) { ctx.beginPath(); ctx.arc(n.x, n.y, 6+n.a*7, 0, Math.PI*2); ctx.fillStyle = "rgba(0,232,255,"+(n.a*0.06)+")"; ctx.fill(); } });
      requestAnimationFrame(animate);
    }
    animate(); window.addEventListener("resize", resize);
    return function() { running = false; canvas.removeEventListener("mousemove", onM); window.removeEventListener("resize", resize); };
  }, [vis]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "300px", borderRadius: "12px", border: "1px solid " + C.border, cursor: "crosshair", opacity: vis?1:0, transition: "opacity 0.6s" }} />;
}

function GravityToy() {
  var canvasRef = useRef(null), mRef = useRef({ x: 0.5, y: 0.5, down: false });
  var vs = useState(false), vis = vs[0], setVis = vs[1];
  useEffect(function() { var obs = new IntersectionObserver(function(e) { if (e[0].isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return function() { obs.disconnect(); }; }, []);
  useEffect(function() {
    var canvas = canvasRef.current; if (!canvas || !vis) return;
    var ctx = canvas.getContext("2d"), running = true;
    function resize() { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.setTransform(2,0,0,2,0,0); }
    resize();
    var gw = function() { return canvas.offsetWidth; }, gh = function() { return canvas.offsetHeight; };
    var particles = [];
    for (var pi = 0; pi < 100; pi++) particles.push({ x: Math.random()*gw(), y: Math.random()*gh(), vx: (Math.random()-0.5)*1.2, vy: (Math.random()-0.5)*1.2, s: Math.random()*2+1, c: [C.accent,C.accent2,C.accent3,C.green][Math.floor(Math.random()*4)] });
    function onM(e) { var r = canvas.getBoundingClientRect(); mRef.current.x = (e.clientX-r.left)/r.width; mRef.current.y = (e.clientY-r.top)/r.height; }
    function onD() { mRef.current.down = true; } function onU() { mRef.current.down = false; }
    canvas.addEventListener("mousemove", onM); canvas.addEventListener("mousedown", onD); canvas.addEventListener("mouseup", onU); canvas.addEventListener("mouseleave", onU);
    function animate() {
      if (!running) return;
      var cw = gw(), ch = gh();
      ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "rgba(0,0,0,0.1)"; ctx.fillRect(0,0,cw,ch); ctx.globalCompositeOperation = "lighter";
      var mx = mRef.current.x*cw, my = mRef.current.y*ch, att = mRef.current.down;
      particles.forEach(function(p) {
        var dx = mx-p.x, dy = my-p.y, d = Math.sqrt(dx*dx+dy*dy)||1;
        var f = att ? 120/(d*d) : -30/(d*d), mf = att ? 1.2 : 0.3;
        p.vx += Math.max(-mf,Math.min(mf,(dx/d)*f)); p.vy += Math.max(-mf,Math.min(mf,(dy/d)*f));
        p.vx *= 0.987; p.vy *= 0.987; p.x += p.vx; p.y += p.vy;
        if (p.x<0){p.x=0;p.vx*=-0.5;} if (p.x>cw){p.x=cw;p.vx*=-0.5;} if (p.y<0){p.y=0;p.vy*=-0.5;} if (p.y>ch){p.y=ch;p.vy*=-0.5;}
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fillStyle = p.c + (att?"aa":"66"); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over"; requestAnimationFrame(animate);
    }
    animate(); window.addEventListener("resize", resize);
    return function() { running = false; canvas.removeEventListener("mousemove", onM); canvas.removeEventListener("mousedown", onD); canvas.removeEventListener("mouseup", onU); canvas.removeEventListener("mouseleave", onU); window.removeEventListener("resize", resize); };
  }, [vis]);
  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "300px", borderRadius: "12px", border: "1px solid " + C.border, cursor: "pointer", background: C.bg, opacity: vis?1:0, transition: "opacity 0.6s" }} />
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", color: C.textDim, fontFamily: F.mono, letterSpacing: "2px", pointerEvents: "none", textTransform: "uppercase" }}>Click & hold to attract</div>
    </div>
  );
}

function WaveformToy() {
  var canvasRef = useRef(null), mRef = useRef({ x: 0.5 });
  var vs = useState(false), vis = vs[0], setVis = vs[1];
  useEffect(function() { var obs = new IntersectionObserver(function(e) { if (e[0].isIntersecting) setVis(true); }, { threshold: 0.1 }); if (canvasRef.current) obs.observe(canvasRef.current); return function() { obs.disconnect(); }; }, []);
  useEffect(function() {
    var canvas = canvasRef.current; if (!canvas || !vis) return;
    var ctx = canvas.getContext("2d"), frame = 0, running = true;
    function resize() { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.setTransform(2,0,0,2,0,0); }
    resize();
    function onM(e) { var r = canvas.getBoundingClientRect(); mRef.current.x = (e.clientX-r.left)/r.width; }
    canvas.addEventListener("mousemove", onM);
    function animate() {
      if (!running) return; frame++;
      var t = frame*0.018, w = canvas.offsetWidth, h = canvas.offsetHeight; ctx.clearRect(0,0,w,h);
      var mx = mRef.current.x, colors = [C.accent,C.accent2,C.accent3,C.green,C.amber];
      for (var wave = 0; wave < 5; wave++) {
        ctx.beginPath();
        var freq = 1.5+wave*0.4+mx*2, amp = (10+wave*6)*(0.4+mx*0.6), phase = t+wave*0.6, yB = h/2+(wave-2)*16;
        for (var x = 0; x <= w; x += 2) { var xN = x/w, y = yB+Math.sin(xN*Math.PI*freq+phase)*amp*Math.sin(xN*Math.PI); if (x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }
        ctx.strokeStyle = colors[wave]+"44"; ctx.lineWidth = 2; ctx.stroke();
        ctx.strokeStyle = colors[wave]+"0d"; ctx.lineWidth = 5; ctx.stroke();
      }
      requestAnimationFrame(animate);
    }
    animate(); window.addEventListener("resize", resize);
    return function() { running = false; canvas.removeEventListener("mousemove", onM); window.removeEventListener("resize", resize); };
  }, [vis]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "220px", borderRadius: "12px", border: "1px solid " + C.border, cursor: "ew-resize", opacity: vis?1:0, transition: "opacity 0.6s" }} />;
}

function ProcessStep(props) {
  var step = props.step, index = props.index;
  var rv = useInView(0.15), ref = rv[0], v = rv[1];
  var hs = useState(false), h = hs[0], setH = hs[1];
  return (
    <div ref={ref} onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}} style={{ opacity: v?1:0, transform: v?"translateX(0)":"translateX(-30px)", transition: "all 0.6s cubic-bezier(0.23,1,0.32,1) "+(index*0.12)+"s", display: "flex", gap: "28px", alignItems: "flex-start", padding: "30px 0", borderBottom: "1px solid "+C.border, cursor: "default" }}>
      <div style={{ fontSize: "44px", fontWeight: 800, fontFamily: F.display, color: h ? step.color : "rgba(255,255,255,0.08)", transition: "color 0.4s ease", lineHeight: 1, minWidth: "75px" }}>{step.num}</div>
      <div>
        <h3 style={{ fontSize: "22px", fontWeight: 600, color: h ? "#fff" : C.textBody, fontFamily: F.display, marginBottom: "8px", transition: "color 0.3s" }}>{step.title}</h3>
        <p style={{ fontSize: "15px", color: C.textBody, fontFamily: F.body, lineHeight: 1.75 }}>{step.desc}</p>
      </div>
    </div>
  );
}

function CapCard(props) {
  var cap=props.cap,index=props.index; var rv=useInView(0.1),ref=rv[0],v=rv[1];
  var hs=useState(false),h=hs[0],setH=hs[1];
  var color=[C.accent,C.accent2,C.accent3,C.green,C.amber,"#f87171","#a78bfa","#34d399"][index%8];
  return (
    <div ref={ref} onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}} style={{ opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"all 0.5s cubic-bezier(0.23,1,0.32,1) "+(index*0.06)+"s",background:h?"rgba(255,255,255,0.03)":"transparent",border:"1px solid "+(h?color+"33":C.border),borderRadius:"12px",padding:"24px 20px",cursor:"default",position:"relative",overflow:"hidden" }}>
      {h&&<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg, transparent, "+color+", transparent)"}} />}
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
        <span style={{fontSize:"22px",color:h?color:C.textDim,transition:"color 0.3s"}}>{cap.icon}</span>
        <div style={{fontSize:"15px",fontWeight:600,color:h?"#fff":C.textBody,fontFamily:F.display,transition:"color 0.3s"}}>{cap.name}</div>
      </div>
      <p style={{fontSize:"13px",color:C.textMid,fontFamily:F.body,lineHeight:1.6}}>{cap.desc}</p>
    </div>
  );
}

function LogoTicker() {
  var rv = useInView(0.2), ref = rv[0], v = rv[1];
  var all = LOGOS.concat(LOGOS).concat(LOGOS);
  return (
    <div ref={ref} style={{ overflow: "hidden", opacity: v?1:0, transition: "opacity 0.6s", padding: "22px 0" }}>
      <div style={{ display: "flex", animation: "tickerScroll 20s linear infinite", gap: "60px", whiteSpace: "nowrap" }}>
        {all.map(function(logo, i) { return <span key={i} style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: F.mono, flexShrink: 0, fontWeight: 500 }}>{logo}</span>; })}
      </div>
    </div>
  );
}

function Counter(props) {
  var end = props.end, sfx = props.suffix || "", pfx = props.prefix || "", vis = props.vis;
  var vs = useState(0), val = vs[0], setVal = vs[1];
  useEffect(function() { if (!vis) return; var s = 0, step = end/(1600/16); var t = setInterval(function() { s += step; if (s >= end) { setVal(end); clearInterval(t); } else setVal(Math.floor(s)); }, 16); return function() { clearInterval(t); }; }, [vis, end]);
  return <span>{pfx}{val}{sfx}</span>;
}

function Stats() {
  var rv = useInView(0.2), ref = rv[0], v = rv[1];
  var stats = [
    { value: 15, suffix: "+", label: "AI Products Built", color: C.accent },
    { value: 98, suffix: "%", label: "AI-Assisted Workflow", color: C.accent2 },
    { value: 6, suffix: "", label: "Industries Served", color: C.accent3 },
    { value: 1, suffix: "%", label: "Top AI Users (US)", prefix: "Top ", color: C.green },
  ];
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", maxWidth: "900px", margin: "0 auto" }}>
      {stats.map(function(s, i) { return (
        <div key={i} style={{ textAlign: "center", padding: "36px 16px", background: C.bgCard, borderRadius: "12px", border: "1px solid "+C.border, borderTop: "1px solid "+s.color+"33", opacity: v?1:0, transform: v?"translateY(0)":"translateY(16px)", transition: "all 0.5s cubic-bezier(0.23,1,0.32,1) "+(i*0.08)+"s" }}>
          <div style={{ fontSize: "44px", fontWeight: 800, color: "#fff", fontFamily: F.display, lineHeight: 1 }}><Counter end={s.value} suffix={s.suffix} prefix={s.prefix||""} vis={v} /></div>
          <div style={{ fontSize: "12px", color: C.textMid, letterSpacing: "2px", textTransform: "uppercase", marginTop: "12px", fontFamily: F.mono, fontWeight: 500 }}>{s.label}</div>
        </div>
      ); })}
    </div>
  );
}

function AutomationCard(props) {
  var a=props.automation,index=props.index; var rv=useInView(0.1),ref=rv[0],v=rv[1];
  var hs=useState(false),h=hs[0],setH=hs[1];
  var ps=useState(-1),activeStep=ps[0],setActiveStep=ps[1];

  useEffect(function(){
    if(!h)return;
    var step=0;
    var interval=setInterval(function(){
      step=(step+1)%a.flow.length;
      setActiveStep(step);
    },600);
    setActiveStep(0);
    return function(){clearInterval(interval);setActiveStep(-1);};
  },[h]);

  return (
    <div ref={ref} onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}}
      style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.6s cubic-bezier(0.23,1,0.32,1) "+(index*0.1)+"s",background:h?"rgba(255,255,255,0.02)":C.bgCard,border:"1px solid "+(h?a.color+"33":C.border),borderRadius:"14px",padding:"28px",cursor:"default",position:"relative",overflow:"hidden"}}>
      {h&&<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg, transparent, "+a.color+", transparent)",opacity:0.6}} />}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px"}}>
        <div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>{a.tags.map(function(t){return <span key={t} style={{fontSize:9,letterSpacing:"1px",color:a.color,fontFamily:F.mono,background:a.color+"0d",padding:"3px 8px",borderRadius:4}}>{t}</span>;})}</div>
          <h3 style={{fontSize:"18px",fontWeight:700,color:"#fff",fontFamily:F.display,lineHeight:1.3}}>{a.title}</h3>
        </div>
        <span style={{fontSize:9,fontFamily:F.mono,color:a.status==="Live"?C.green:C.textDim,letterSpacing:"1px",padding:"3px 8px",border:"1px solid "+(a.status==="Live"?C.green+"33":C.border),borderRadius:4,flexShrink:0}}>{a.status}</span>
      </div>
      <p style={{fontSize:"13px",color:C.textBody,fontFamily:F.body,lineHeight:1.7,marginBottom:"20px"}}>{a.desc}</p>
      <div style={{display:"flex",alignItems:"center",gap:0,padding:"12px 0",borderTop:"1px solid "+C.border}}>
        {a.flow.map(function(step,si){return (<div key={si} style={{display:"flex",alignItems:"center",flex:si<a.flow.length-1?1:"none"}}>
          <div style={{padding:"6px 10px",borderRadius:6,fontSize:9,fontFamily:F.mono,letterSpacing:"0.5px",fontWeight:activeStep===si?600:400,color:activeStep===si?"#fff":C.textDim,background:activeStep===si?a.color+"22":"transparent",border:"1px solid "+(activeStep===si?a.color+"44":"rgba(255,255,255,0.04)"),transition:"all 0.3s",whiteSpace:"nowrap",transform:activeStep===si?"scale(1.05)":"scale(1)"}}>{step}</div>
          {si<a.flow.length-1&&<div style={{flex:1,height:1,background:activeStep>si?a.color+"44":"rgba(255,255,255,0.04)",transition:"background 0.3s",margin:"0 4px",position:"relative"}}>{activeStep===si&&<div style={{position:"absolute",right:0,top:-2,width:5,height:5,borderRadius:"50%",background:a.color,animation:"pulse 0.6s ease-in-out infinite"}} />}</div>}
        </div>);})}
      </div>
    </div>
  );
}

function Glitch(props) {
  var hs = useState(false), h = hs[0], setH = hs[1];
  return (
    <span onMouseEnter={function(){setH(true);}} onMouseLeave={function(){setH(false);}} style={{ position: "relative", display: "inline-block", cursor: "default" }}>
      {props.text}
      {h && <><span style={{ position: "absolute", top: 0, left: "2px", color: C.accent, clipPath: "inset(0 0 50% 0)", opacity: 0.5, animation: "glitchA 0.2s steps(3) infinite" }}>{props.text}</span><span style={{ position: "absolute", top: 0, left: "-2px", color: C.accent3, clipPath: "inset(50% 0 0 0)", opacity: 0.5, animation: "glitchB 0.2s steps(3) infinite" }}>{props.text}</span></>}
    </span>
  );
}

export default function DonnyAI() {
  var scrollRef = useRef(0), mouseRef = useRef({ x: 0.5, y: 0.5 });
  var hs = useState(1), heroOp = hs[0], setHeroOp = hs[1];
  var ls = useState(false), loaded = ls[0], setLoaded = ls[1];
  var as2 = useState("hero"), active = as2[0], setActive = as2[1];

  useEffect(function() {
    function onScroll() {
      scrollRef.current = window.scrollY;
      setHeroOp(Math.max(0, 1 - window.scrollY / 500));
      var sects = SECTS.map(function(s) { return { id: s.id, el: document.getElementById(s.id) }; }).filter(function(s) { return s.el; });
      for (var i = sects.length - 1; i >= 0; i--) { if (sects[i].el.getBoundingClientRect().top <= window.innerHeight * 0.4) { setActive(sects[i].id); break; } }
    }
    function onMouse(e) { mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }; }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    setTimeout(function() { setLoaded(true); }, 150);
    return function() { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); };
  }, []);

  var BG = "#06070b";
  var CSS = "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:"+C.accent+"33;color:#fff}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:"+C.accent+"22;border-radius:3px}@keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}@keyframes breathe{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.7}50%{transform:translate(-50%,-50%) scale(1.15);opacity:1}}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes glitchA{0%{transform:translate(2px,-1px)}50%{transform:translate(-1px,1px)}100%{transform:translate(1px,-2px)}}@keyframes glitchB{0%{transform:translate(-2px,1px)}50%{transform:translate(1px,-1px)}100%{transform:translate(-1px,2px)}}@media(max-width:900px){.rg2{grid-template-columns:1fr!important}.rg4{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:600px){.rg4{grid-template-columns:1fr!important}.reel-scroll{gap:16px!important}.reel-scroll>div{min-width:300px!important}}input:focus{border-color:"+C.accent+"44!important}";

  return (
    <div style={{ background: BG, color: C.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{CSS}</style>
      <ParticleHero scrollRef={scrollRef} mouseRef={mouseRef} />
      <CursorGlow mouseRef={mouseRef} />
      <Nav active={active} />

      <section id="hero" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2, opacity: heroOp }}>
        <div style={{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%,-50%)",width:"900px",height:"900px",borderRadius:"50%",background:"radial-gradient(circle,rgba(0,232,255,0.14) 0%,rgba(139,92,246,0.07) 25%,rgba(244,63,94,0.03) 40%,transparent 55%)",filter:"blur(60px)",animation:"breathe 4s ease-in-out infinite",pointerEvents:"none"}} />
        <div style={{ textAlign: "center", opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(25px)", transition: "all 0.8s cubic-bezier(0.23,1,0.32,1) 0.3s", background: "radial-gradient(ellipse 500px 380px at center, rgba(6,7,11,0.8) 0%, rgba(6,7,11,0.45) 40%, transparent 58%)", padding: "50px 36px", borderRadius: "30px" }}>
          <div style={{display:"flex",justifyContent:"center",gap:"24px",marginBottom:"28px",opacity:loaded?1:0,transition:"opacity 0.6s 0.6s"}}>{["15+ Products Shipped","Enterprise Clients","Top 1% AI User"].map(function(t,i){return <span key={i} style={{fontSize:"11px",fontFamily:F.mono,color:i===2?C.accent:C.textMid,letterSpacing:"1.5px",fontWeight:400}}>{t}</span>;})}</div>
          
          <h1 style={{ fontSize: "clamp(56px,12vw,140px)", fontWeight: 800, fontFamily: F.display, letterSpacing: "-3px", lineHeight: 0.9, marginBottom: "20px", textShadow: "0 0 80px rgba(6,7,11,1), 0 0 160px rgba(6,7,11,0.9)" }}>
            <Glitch text="DONNY" /><span style={{ color: C.accent }}>.</span>
          </h1>
          <p style={{ fontSize: "19px", color: C.textBody, fontFamily: F.body, maxWidth: "500px", lineHeight: 1.7, margin: "0 auto", opacity: loaded?1:0, transition: "opacity 0.6s 1.2s", textShadow: "0 0 40px rgba(6,7,11,1)" }}>
            I build products, platforms, and experiences with artificial intelligence — at a level most teams can't match.
          </p>
          <div style={{ marginTop: "44px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", opacity: loaded?1:0, transition: "opacity 0.6s 1.6s" }}>
            <button onClick={function(){goTo("work");}} style={{background:C.accent,color:"#000",fontFamily:F.mono,fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",padding:"16px 44px",border:"none",cursor:"pointer",fontWeight:600,transition:"all 0.3s",borderRadius:"2px"}}>See the Work</button>
            <button onClick={function(){goTo("contact");}} style={{background:"rgba(255,255,255,0.08)",color:"#fff",fontFamily:F.mono,fontSize:"13px",letterSpacing:"2px",textTransform:"uppercase",padding:"16px 44px",border:"1px solid rgba(255,255,255,0.2)",cursor:"pointer",fontWeight:500,transition:"all 0.3s",borderRadius:"2px"}}>Get in Touch</button>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", opacity: loaded?0.35:0, transition: "opacity 0.6s 2s", animation: "float 2.5s ease-in-out infinite" }}>
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, transparent, "+C.accent+")" }} />
          <span style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: F.mono, color: C.accent }}>Scroll</span>
        </div>
      </section>

      


      <section id="reel" style={{ background: BG, padding: "100px 0 80px", position: "relative", zIndex: 2 }}>
        <div style={{ padding: "0 24px" }}>
          <Heading tag="Portfolio" title="Sites I've Built" subtitle="Every one of these was designed and developed using AI-accelerated workflows. Agency quality at startup speed." />
        </div>
        <div style={{ overflowX: "auto", padding: "0 0 20px", WebkitOverflowScrolling: "touch" }}>
          <div className="reel-scroll" style={{ display: "flex", gap: "24px", padding: "0 max(24px, calc((100vw - 1120px)/2))", width: "fit-content" }}>
            {SITES.map(function(s, i) { return <SiteMockup key={i} site={s} index={i} />; })}
          </div>
        </div>
        <div style={{textAlign:"center",padding:"16px 0 0"}}><span style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",fontFamily:F.mono,color:C.textDim}}>Scroll to explore →</span></div>
      </section>

      <section id="stats" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2 }}><Stats /></section>

      

      <section id="lab" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "1060px", margin: "0 auto" }}>
        <Heading tag="Interactive Lab" title="Playground" subtitle="These aren't just demos — they're proof that beautiful, interactive experiences can be built with AI." />
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: C.accent, fontFamily: F.mono, marginBottom: "10px", paddingLeft: "4px", fontWeight: 500 }}>Particle Text — Type anything · Hover to disrupt</div>
          <ParticleTextToy />
        </div>
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: C.accent2, fontFamily: F.mono, marginBottom: "10px", paddingLeft: "4px", fontWeight: 500 }}>Neural Network — Hover to activate</div>
            <NeuralNetToy />
          </div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: C.accent3, fontFamily: F.mono, marginBottom: "10px", paddingLeft: "4px", fontWeight: 500 }}>Gravity Field — Click & hold</div>
            <GravityToy />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: C.green, fontFamily: F.mono, marginBottom: "10px", paddingLeft: "4px", fontWeight: 500 }}>Waveform — Drag left/right to modulate</div>
          <WaveformToy />
        </div>
      </section>

      <section id="work" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2 }}>
        <Heading tag="What I've Built" title="The Work" subtitle="Real products, real clients, real outcomes — Every one of these was built with AI doing the heavy lifting." />
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", maxWidth: "1060px", margin: "0 auto" }}>
          {PROJECTS.map(function(p, i) { return <HoloCard key={i} project={p} index={i} />; })}
        </div>
      </section>

      <section id="automations" style={{ background: BG, padding: "80px 24px", position: "relative", zIndex: 2 }}>
        <Heading tag="Enterprise Automation" title="Systems That Run Themselves" subtitle="Production automation pipelines I've designed and deployed. Hover to see the data flow." />
        <div className="rg2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", maxWidth: "1060px", margin: "0 auto" }}>
          {AUTOMATIONS.map(function(a, i) { return <AutomationCard key={i} automation={a} index={i} />; })}
        </div>
      </section>

      <section id="about" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "720px", margin: "0 auto" }}>
        <Heading tag="About" title="AI Is My Medium" />
        <div style={{ fontSize: "17px", color: C.textBody, fontFamily: F.body, lineHeight: 1.85 }}>
          <p style={{ marginBottom: "18px" }}>I don't just use AI tools — <span style={{ color: "#fff", fontWeight: 600 }}>I think in AI</span>. Every project I touch is designed, built, and optimized through artificial intelligence. From full-stack web applications to enterprise SEO strategies, from SaaS product architecture to programmatic video production.</p>
          <p style={{ marginBottom: "18px" }}>While most people are still figuring out how to write a prompt, I'm shipping production-ready products, <span style={{ color: C.accent, fontSize: "18px", fontWeight: 500 }}>designing award-quality websites</span>, and building systems that scale across industries — government, hospitality, healthcare, e-commerce, and more.</p>
          <p>The AI space moves fast. <span style={{ color: "#fff", fontWeight: 600 }}>I move faster.</span></p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
          {["Claude", "ChatGPT", "Cursor", "Midjourney", "Remotion", "Vercel AI", "Three.js", "Next.js"].map(function(t) { return <ToolPill key={t} name={t} />; })}
        </div>
      </section>



      <section id="process" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto" }}>
        <Heading tag="How I Work" title="The Process" align="left" />
        {STEPS.map(function(s, i) { return <ProcessStep key={i} step={s} index={i} />; })}
      </section>

      <section id="stack" style={{ background: BG, padding: "60px 24px 80px", position: "relative", zIndex: 2, maxWidth: "1060px", margin: "0 auto" }}>
        <Heading tag="What I Bring" title="The Stack" />
        <div className="rg4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {CAPS.map(function(c, i) { return <CapCard key={i} cap={c} index={i} />; })}
        </div>
      </section>

      <section id="contact" style={{ background: BG, padding: "120px 24px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: C.accent, fontFamily: F.mono, marginBottom: "18px" }}>Ready?</div>
        <h2 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 700, fontFamily: F.display, letterSpacing: "-1px", marginBottom: "14px" }}>
          Let's Build <span style={{ color: C.accent }}>Something</span>
        </h2>
        <p style={{ fontSize: "17px", color: C.textBody, fontFamily: F.body, marginBottom: "40px" }}>The future doesn't wait. Neither should you.</p>
        <button onClick={function(){window.location.href="mailto:hello@donny.ai";}} style={{background:C.accent,color:"#000",fontFamily:F.mono,fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase",padding:"18px 50px",border:"none",cursor:"pointer",fontWeight:600,borderRadius:"2px"}}>Get In Touch</button>
      </section>

      <footer style={{ padding: "32px 24px", borderTop: "1px solid "+C.border, background: BG, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1060px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <span style={{ fontSize: "11px", color: C.textDim, fontFamily: F.mono }}>© 2026 DONNY</span>
        <div style={{ display: "flex", gap: "16px" }}>
          {[{n:"LinkedIn",u:"https://linkedin.com"},{n:"GitHub",u:"https://github.com"},{n:"Email",u:"mailto:hello@donny.ai"}].map(function(l) { return <a key={l.n} href={l.u} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><ToolPill name={l.n} /></a>; })}
        </div>
      </footer>
    </div>
  );
}
