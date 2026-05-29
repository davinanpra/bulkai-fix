import React, { useState, useEffect, useRef } from "react";

const C = {
  bg:"#080808",surface:"#111",surfaceEl:"#1a1a1a",
  border:"#222",accent:"#c8f559",accentDim:"#a8d43a",
  text:"#f0f0f0",textMuted:"#555",textSub:"#888",
  red:"#ff4444",orange:"#ff8c42",blue:"#4a90e2",purple:"#9b59b6",
};

const MOTIVASI = [
  "💪 Setiap set berat hari ini = otot baru besok.",
  "🔥 Disiplin mengalahkan motivasi. Tetap konsisten!",
  "🏆 Progress bukan tentang sempurna, tapi tidak berhenti.",
  "⚡ Tubuhmu berubah di gym, tapi dibentuk di dapur.",
  "🌱 Bulking bukan sprint, ini marathon. Sabar!",
  "😤 Orang lain istirahat, kamu progress.",
  "🎯 Fokus pada prosesnya, hasil akan mengikuti.",
];

const WORKOUT_TEMPLATES = {
  upper:[
    {id:"pushup",name:"Push-up",sets:3,reps:"10-15",dur:"20 menit",diff:"Mudah",emoji:"💪"},
    {id:"dumbbell_row",name:"Dumbbell Row",sets:3,reps:"10-12",dur:"20 menit",diff:"Sedang",emoji:"🏋️"},
    {id:"shoulder_press",name:"Shoulder Press",sets:3,reps:"10-12",dur:"15 menit",diff:"Sedang",emoji:"🔝"},
    {id:"bicep_curl",name:"Bicep Curl",sets:3,reps:"12-15",dur:"15 menit",diff:"Mudah",emoji:"💪"},
  ],
  lower:[
    {id:"squat",name:"Squat",sets:3,reps:"12-15",dur:"20 menit",diff:"Sedang",emoji:"🦵"},
    {id:"lunges",name:"Lunges",sets:3,reps:"10/kaki",dur:"15 menit",diff:"Mudah",emoji:"🚶"},
    {id:"calf_raise",name:"Calf Raise",sets:3,reps:"15-20",dur:"10 menit",diff:"Mudah",emoji:"🦶"},
    {id:"glute_bridge",name:"Glute Bridge",sets:3,reps:"15",dur:"10 menit",diff:"Mudah",emoji:"🍑"},
  ],
  fullbody:[
    {id:"burpee",name:"Burpee",sets:3,reps:"8-10",dur:"20 menit",diff:"Berat",emoji:"🔥"},
    {id:"mountain_climber",name:"Mountain Climber",sets:3,reps:"20",dur:"15 menit",diff:"Sedang",emoji:"⛰️"},
    {id:"plank",name:"Plank",sets:3,reps:"30-60 dtk",dur:"10 menit",diff:"Sedang",emoji:"🧱"},
    {id:"jump_squat",name:"Jump Squat",sets:3,reps:"10-12",dur:"15 menit",diff:"Berat",emoji:"⬆️"},
  ],
  rest:[
    {id:"stretching",name:"Stretching",sets:1,reps:"10 menit",dur:"10 menit",diff:"Mudah",emoji:"🧘"},
    {id:"foam_rolling",name:"Foam Rolling",sets:1,reps:"10 menit",dur:"10 menit",diff:"Mudah",emoji:"🟫"},
    {id:"jalan_santai",name:"Jalan Santai",sets:1,reps:"20-30 menit",dur:"30 menit",diff:"Mudah",emoji:"🚶"},
  ],
};
const CARDIO_TYPES = [
  {id:"run",name:"Lari",emoji:"🏃",met:9},
  {id:"jog",name:"Jogging",emoji:"🏃‍♂️",met:7},
  {id:"bike",name:"Bersepeda",emoji:"🚴",met:6},
  {id:"swim",name:"Renang",emoji:"🏊",met:8},
  {id:"walk",name:"Jalan Kaki",emoji:"🚶",met:4},
  {id:"hike",name:"Hiking",emoji:"⛰️",met:6},
];

const MEAL_TEMPLATES = [
  {time:"07:00",name:"Sarapan",foods:"Oatmeal + 3 Telur + Susu",cal:550,protein:35,carbs:60,fat:15},
  {time:"10:00",name:"Snack Pagi",foods:"Pisang + Roti Gandum",cal:280,protein:8,carbs:55,fat:4},
  {time:"13:00",name:"Makan Siang",foods:"Nasi + Ayam + Sayur",cal:680,protein:45,carbs:75,fat:18},
  {time:"16:00",name:"Pre-Workout",foods:"Susu + Oat Bar",cal:320,protein:15,carbs:45,fat:8},
  {time:"19:30",name:"Makan Malam",foods:"Nasi + Ikan + Tempe",cal:620,protein:42,carbs:65,fat:16},
  {time:"21:00",name:"Susu Malam",foods:"Susu Full Cream",cal:200,protein:10,carbs:15,fat:9},
];

const CHECKLIST_ITEMS = [
  {id:"water",icon:"💧",label:"Minum 8 gelas air",xp:10},
  {id:"workout",icon:"🏋️",label:"Selesaikan workout",xp:30},
  {id:"meal",icon:"🍽️",label:"Makan tepat waktu",xp:20},
  {id:"sleep",icon:"😴",label:"Tidur 7-8 jam",xp:20},
  {id:"protein",icon:"🥩",label:"Capai target protein",xp:25},
  {id:"stretch",icon:"🧘",label:"Stretching 10 menit",xp:15},
];

const BELANJA_ITEMS = [
  {name:"Telur 1 kg",price:"Rp 28.000",cal:"70 kcal/butir",protein:"6g/butir",emoji:"🥚"},
  {name:"Dada Ayam 500g",price:"Rp 35.000",cal:"165 kcal/100g",protein:"31g/100g",emoji:"🍗"},
  {name:"Oatmeal 500g",price:"Rp 25.000",cal:"389 kcal/100g",protein:"17g/100g",emoji:"🌾"},
  {name:"Susu Full Cream 1L",price:"Rp 18.000",cal:"130 kcal/200ml",protein:"6.4g/200ml",emoji:"🥛"},
  {name:"Tempe 1 papan",price:"Rp 5.000",cal:"193 kcal/100g",protein:"20g/100g",emoji:"🟫"},
  {name:"Tuna Kaleng",price:"Rp 12.000",cal:"150 kcal/kaleng",protein:"30g/kaleng",emoji:"🐟"},
  {name:"Kacang Almond",price:"Rp 45.000",cal:"170 kcal/30g",protein:"6g/30g",emoji:"🥜"},
  {name:"Pisang 1 sisir",price:"Rp 15.000",cal:"90 kcal/buah",protein:"1g/buah",emoji:"🍌"},
];

const EDUKASI = [
  {title:"Apa itu Clean Bulking?",emoji:"📖",isi:"Clean bulking adalah metode menambah massa otot dengan mengonsumsi kalori surplus secukupnya (200-300 kcal di atas kebutuhan) dari makanan bergizi. Tujuannya menambah otot dengan lemak minimal."},
  {title:"Berapa Protein yang Dibutuhkan?",emoji:"🥩",isi:"Untuk bulking optimal, konsumsi 1.6-2.2g protein per kg berat badan. Jika BB 60kg, butuh 96-132g protein per hari. Sumber terbaik: dada ayam, telur, ikan, tempe, susu."},
  {title:"Pentingnya Tidur untuk Otot",emoji:"😴",isi:"80% pertumbuhan otot terjadi saat tidur. Tidur 7-9 jam per malam memungkinkan tubuh memproduksi hormon pertumbuhan (HGH) secara optimal. Kurang tidur = otot tidak tumbuh maksimal."},
  {title:"Progressive Overload",emoji:"📈",isi:"Prinsip utama fitness: tingkatkan beban/reps setiap minggu. Jika push-up 3x10 terasa mudah, tambah jadi 3x12 minggu depan. Otot tumbuh karena dipaksa beradaptasi."},
  {title:"Kapan Waktu Makan Terbaik?",emoji:"⏰",isi:"Makan 1-2 jam sebelum workout untuk energi. Makan protein dalam 30 menit setelah workout untuk recovery. Jangan skip sarapan, ini meal paling penting untuk bulking."},
];

const QUIZ_LIST = [
  {q:"Berapa protein yang dibutuhkan untuk bulking per kg berat badan?",opts:["0.5-1g","1.6-2.2g","3-4g","5g+"],ans:1},
  {q:"Berapa jam tidur ideal untuk pertumbuhan otot?",opts:["4-5 jam","6-7 jam","7-9 jam","10+ jam"],ans:2},
  {q:"Apa itu progressive overload?",opts:["Makan lebih banyak","Meningkatkan beban/reps setiap minggu","Tidur lebih lama","Minum lebih banyak air"],ans:1},
  {q:"Kapan waktu terbaik makan protein setelah workout?",opts:["Dalam 30 menit","2 jam kemudian","Sebelum tidur","Tidak masalah"],ans:0},
];

// ============================================================
// HELPERS
// ============================================================
async function askClaude(messages, system) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages}),
    });
    const d = await res.json();
    return d.content?.map(b=>b.text||"").join("")||"Error.";
  } catch { return "Maaf, gagal terhubung ke AI. Cek koneksi internet kamu! 🙏"; }
}

function ls(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (v === null || v === undefined) return fallback;
    const parsed = JSON.parse(v);
    return parsed ?? fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}
function lsSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("Storage penuh atau error:", e);
  }
}

function calcBMI(bb,tb) { if(!bb||!tb) return 0; return (bb/((tb/100)**2)).toFixed(1); }
function calcBMR(bb,tb,age,gender) {
  if(!bb||!tb||!age) return 0;
  return gender==="pria"?Math.round(88.36+(13.4*bb)+(4.8*tb)-(5.7*age)):Math.round(447.6+(9.2*bb)+(3.1*tb)-(4.3*age));
}
function bmiStatus(bmi) {
  if(bmi<18.5) return {label:"Kurus",color:C.blue};
  if(bmi<25) return {label:"Normal",color:C.accent};
  if(bmi<30) return {label:"Gemuk",color:C.orange};
  return {label:"Obesitas",color:C.red};
}
function reqNotif(cb) {
  if(!("Notification" in window)){alert("Browser tidak support notifikasi");return;}
  Notification.requestPermission().then(p=>{if(p==="granted"){cb&&cb();}else alert("Izin notifikasi ditolak. Aktifkan di pengaturan browser.");});
}
function sendNotif(title,body) { if(Notification.permission==="granted") new Notification(title,{body}); }
function fmtTime(s) { return `${String(Math.floor(s/3600)).padStart(2,"0")}:${String(Math.floor((s%3600)/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }

// ============================================================
// MINI COMPONENTS
// ============================================================
function Card({children,style={},onClick}){return <div onClick={onClick} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:20,cursor:onClick?"pointer":"default",...style}}>{children}</div>;}
function Badge({children,color=C.accent}){return <span style={{padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:color+"22",color,border:`1px solid ${color}44`}}>{children}</span>;}
function PBar({value,max=100,color=C.accent,height=6}){const p=Math.min((value/max)*100,100);return <div style={{background:C.surfaceEl,borderRadius:99,height,overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:color,borderRadius:99,transition:"width 0.6s",boxShadow:`0 0 8px ${color}88`}}/></div>;}
function StatCard({icon,label,value,sub,color=C.accent}){return <Card style={{flex:1,minWidth:130}}><div style={{fontSize:22,marginBottom:6}}>{icon}</div><div style={{fontSize:20,fontWeight:800,color,fontFamily:"monospace"}}>{value}</div><div style={{fontSize:12,color:C.textMuted,marginTop:2}}>{label}</div>{sub&&<div style={{fontSize:11,color:C.textSub,marginTop:4}}>{sub}</div>}</Card>;}
function Input({label,value,onChange,type="text",placeholder=""}){return <div style={{marginBottom:12}}><div style={{fontSize:12,color:C.textSub,marginBottom:6,fontWeight:600}}>{label}</div><input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 14px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box"}}/></div>;}

function MiniLineChart({data,keyX,keyY,color=C.accent}){
  if(!data?.length||data.length<2) return <div style={{color:C.textMuted,fontSize:12,textAlign:"center",padding:20}}>Data belum cukup untuk grafik</div>;
  const vals=data.map(d=>d[keyY]);
  const mn=Math.min(...vals),mx=Math.max(...vals),range=mx-mn||1;
  const w=300,h=80;
  const pts=data.map((d,i)=>{const x=(i/(data.length-1))*(w-20)+10;const y=h-10-((d[keyY]-mn)/range)*(h-20);return `${x},${y}`;});
  const path=pts.map((p,i)=>i===0?`M ${p}`:`L ${p}`).join(" ");
  const area=`${path} L ${pts[pts.length-1].split(",")[0]},${h} L ${pts[0].split(",")[0]},${h} Z`;
  return <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",height:h}}><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs><path d={area} fill="url(#lg)"/><path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>{data.map((d,i)=>{const [x,y]=pts[i].split(",");return <g key={i}><circle cx={x} cy={y} r="3" fill={color}/><text x={x} y={h} textAnchor="middle" fill={C.textMuted} fontSize="9">{d[keyX]}</text></g>;})}</svg>;
}

// ============================================================
// ONBOARDING
// ============================================================
function Onboarding({onDone}){
  const [step,setStep]=useState(0);
  const [d,setD]=useState({nama:"",gender:"pria",bb:"",tb:"",age:"",targetBB:"",targetCal:"2700",targetProtein:"140",activity:"sedang"});
  const set=(k,v)=>setD(p=>({...p,[k]:v}));
  const bmi=calcBMI(d.bb,d.tb);
  const bmr=calcBMR(d.bb,d.tb,d.age,d.gender);
  const status=bmi>0?bmiStatus(bmi):null;

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}}>
          {[0,1,2,3].map(i=><div key={i} style={{width:i===step?24:8,height:8,borderRadius:4,background:i<=step?C.accent:C.surfaceEl,transition:"all 0.3s"}}/>)}
        </div>
        {step===0&&(
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:80,marginBottom:20}}>💪</div>
            <div style={{fontSize:26,fontWeight:900,marginBottom:8}}>Selamat Datang!</div>
            <div style={{fontSize:14,color:C.textSub,lineHeight:1.8,marginBottom:32}}>BulkAI akan membantu kamu:<br/>🏋️ Workout terstruktur<br/>🍽️ Makan bergizi untuk bulking<br/>🤖 Saran AI personal<br/>📈 Track progress kamu</div>
            <button onClick={()=>setStep(1)} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:C.accent,color:"#000",fontSize:16,fontWeight:800,cursor:"pointer"}}>Mulai Sekarang →</button>
          </div>
        )}
        {step===1&&(
          <div>
            <div style={{fontSize:22,fontWeight:900,textAlign:"center",marginBottom:24}}>Data Diri Kamu 📋</div>
            <Input label="Nama Kamu" value={d.nama} onChange={e=>set("nama",e.target.value)} placeholder="Nama kamu..."/>
            <Input label="Berat Badan (kg)" value={d.bb} onChange={e=>set("bb",e.target.value)} type="number" placeholder="60"/>
            <Input label="Tinggi Badan (cm)" value={d.tb} onChange={e=>set("tb",e.target.value)} type="number" placeholder="170"/>
            <Input label="Usia" value={d.age} onChange={e=>set("age",e.target.value)} type="number" placeholder="20"/>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:C.textSub,marginBottom:6,fontWeight:600}}>Jenis Kelamin</div>
              <div style={{display:"flex",gap:8}}>
                {["pria","wanita"].map(g=><button key={g} onClick={()=>set("gender",g)} style={{flex:1,padding:12,borderRadius:10,border:`2px solid ${d.gender===g?C.accent:C.border}`,background:d.gender===g?C.accent+"22":C.surfaceEl,color:d.gender===g?C.accent:C.textMuted,fontWeight:700,cursor:"pointer"}}>{g==="pria"?"👨 Pria":"👩 Wanita"}</button>)}
              </div>
            </div>
            {bmi>0&&<Card style={{background:C.surfaceEl,textAlign:"center",marginBottom:14}}><div style={{fontSize:12,color:C.textMuted,marginBottom:4}}>BMI Kamu</div><div style={{fontSize:28,fontWeight:900,color:status.color}}>{bmi}</div><Badge color={status.color}>{status.label}</Badge>{bmr>0&&<div style={{fontSize:12,color:C.textMuted,marginTop:8}}>BMR: {bmr} kcal/hari</div>}</Card>}
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setStep(0)} style={{flex:1,padding:14,borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontWeight:700,cursor:"pointer"}}>← Kembali</button>
              <button onClick={()=>setStep(2)} style={{flex:2,padding:14,borderRadius:12,border:"none",background:C.accent,color:"#000",fontWeight:800,cursor:"pointer"}}>Lanjut →</button>
            </div>
          </div>
        )}
        {step===2&&(
          <div>
            <div style={{fontSize:22,fontWeight:900,textAlign:"center",marginBottom:24}}>Target Fitness 🎯</div>
            <Input label="Target Berat Badan (kg)" value={d.targetBB} onChange={e=>set("targetBB",e.target.value)} type="number" placeholder="65"/>
            <Input label="Target Kalori Harian (kcal)" value={d.targetCal} onChange={e=>set("targetCal",e.target.value)} type="number" placeholder="2700"/>
            <Input label="Target Protein Harian (g)" value={d.targetProtein} onChange={e=>set("targetProtein",e.target.value)} type="number" placeholder="140"/>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:C.textSub,marginBottom:8,fontWeight:600}}>Level Aktivitas</div>
              {[{id:"rendah",label:"🛋️ Rendah",desc:"Jarang olahraga"},{id:"sedang",label:"🚶 Sedang",desc:"Olahraga 2-3x/minggu"},{id:"tinggi",label:"🏃 Tinggi",desc:"Olahraga 5x+/minggu"}].map(a=>(
                <div key={a.id} onClick={()=>set("activity",a.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,border:`2px solid ${d.activity===a.id?C.accent:C.border}`,background:d.activity===a.id?C.accent+"11":C.surfaceEl,cursor:"pointer",marginBottom:8}}>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{a.label}</div><div style={{fontSize:11,color:C.textMuted}}>{a.desc}</div></div>
                  {d.activity===a.id&&<span style={{color:C.accent,fontWeight:900}}>✓</span>}
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:14,borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontWeight:700,cursor:"pointer"}}>← Kembali</button>
              <button onClick={()=>setStep(3)} style={{flex:2,padding:14,borderRadius:12,border:"none",background:C.accent,color:"#000",fontWeight:800,cursor:"pointer"}}>Lanjut →</button>
            </div>
          </div>
        )}
        {step===3&&(
          <div>
            <div style={{fontSize:22,fontWeight:900,textAlign:"center",marginBottom:24}}>Izin Akses 🔔</div>
            <Card style={{background:C.surfaceEl,marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>🔔 Notifikasi</div>
              <div style={{fontSize:13,color:C.textMuted,marginBottom:12,lineHeight:1.6}}>Untuk pengingat workout, makan, minum air, dan tidur tepat waktu.</div>
              <button onClick={()=>reqNotif(()=>alert("✅ Notifikasi aktif!"))} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:C.accent,color:"#000",fontWeight:800,cursor:"pointer",fontSize:13}}>🔔 Aktifkan Notifikasi</button>
            </Card>
            <Card style={{background:C.surfaceEl,marginBottom:20}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:8}}>📍 GPS Lokasi</div>
              <div style={{fontSize:13,color:C.textMuted,marginBottom:12,lineHeight:1.6}}>Untuk tracking lari, bersepeda & aktivitas outdoor.</div>
              <button onClick={()=>navigator.geolocation?.getCurrentPosition(()=>alert("✅ GPS aktif!"),()=>alert("GPS ditolak"))} style={{width:"100%",padding:12,borderRadius:10,border:`1px solid ${C.blue}44`,background:C.blue+"11",color:C.blue,fontWeight:800,cursor:"pointer",fontSize:13}}>📍 Aktifkan GPS</button>
            </Card>
            <button onClick={()=>onDone(d)} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:`linear-gradient(135deg,${C.accent},${C.accentDim})`,color:"#000",fontSize:16,fontWeight:900,cursor:"pointer"}}>🚀 Mulai BulkAI!</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({profile,checklist,setChecklist,streak}){
  const today=new Date().toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long"});
  const mot=MOTIVASI[new Date().getDay()%MOTIVASI.length];
  const done=checklist.filter(c=>c.done).length;
  const pct=Math.round((done/checklist.length)*100);
  const xp=checklist.filter(c=>c.done).reduce((s,c)=>s+c.xp,0);
  const bmi=calcBMI(profile.bb,profile.tb);
  const status=bmi>0?bmiStatus(bmi):null;
  const todayCal=MEAL_TEMPLATES.reduce((s,m)=>s+m.cal,0);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:`linear-gradient(135deg,${C.accent}15,transparent)`,border:`1px solid ${C.accent}33`,borderRadius:20,padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:12,color:C.textMuted,textTransform:"uppercase",letterSpacing:2}}>{today}</div>
            <div style={{fontSize:22,fontWeight:900,marginTop:4}}>Hai, {profile.nama||"Bro"}! 💪</div>
            <div style={{fontSize:13,color:C.textSub,marginTop:4}}>Siap latihan hari ini?</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:28,fontWeight:900,color:C.accent}}>{pct}%</div>
            <div style={{fontSize:11,color:C.textMuted}}>Target selesai</div>
          </div>
        </div>
        <div style={{marginTop:16}}>
          <PBar value={done} max={checklist.length}/>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontSize:11,color:C.textMuted}}>{done}/{checklist.length} aktivitas</span>
            <span style={{fontSize:11,color:C.accent,fontWeight:700}}>+{xp} XP hari ini</span>
          </div>
        </div>
      </div>

      <Card style={{borderLeft:`3px solid ${C.accent}`,background:C.surfaceEl}}>
        <div style={{fontSize:11,color:C.accent,fontWeight:700,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>💬 Motivasi Hari Ini</div>
        <div style={{fontSize:14,color:C.text,lineHeight:1.6}}>{mot}</div>
      </Card>

      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <StatCard icon="⚖️" label="Berat Badan" value={`${profile.bb||"-"} kg`} sub={`Target: ${profile.targetBB||"-"} kg`}/>
        <StatCard icon="🔥" label="Streak" value={`${streak} 🔥`} sub="Hari berturut" color={C.orange}/>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <StatCard icon="🔥" label="Kalori Hari Ini" value={todayCal} sub={`Target: ${profile.targetCal||2700} kcal`} color={C.orange}/>
        <StatCard icon="🥩" label="Target Protein" value={`${profile.targetProtein||0}g`} sub="per hari" color={C.blue}/>
      </div>

      {bmi>0&&<Card style={{background:C.surfaceEl}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:13,fontWeight:700}}>📊 Status Tubuh</div><div style={{fontSize:12,color:C.textMuted,marginTop:4}}>TB: {profile.tb} cm • BB: {profile.bb} kg</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:22,fontWeight:900,color:status.color}}>{bmi}</div><Badge color={status.color}>{status.label}</Badge></div>
        </div>
      </Card>}

      <Card>
        <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>✅ Checklist Harian</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {checklist.map(item=>(
            <div key={item.id} onClick={()=>setChecklist(p=>p.map(c=>c.id===item.id?{...c,done:!c.done}:c))} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,cursor:"pointer",background:item.done?C.accent+"11":C.surfaceEl,border:`1px solid ${item.done?C.accent+"44":C.border}`,transition:"all 0.2s"}}>
              <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${item.done?C.accent:C.border}`,background:item.done?C.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {item.done&&<span style={{color:"#000",fontSize:12,fontWeight:900}}>✓</span>}
              </div>
              <span style={{fontSize:18}}>{item.icon}</span>
              <span style={{flex:1,fontSize:13,color:item.done?C.textMuted:C.text,textDecoration:item.done?"line-through":"none"}}>{item.label}</span>
              <span style={{fontSize:11,color:C.accent,fontWeight:700}}>+{item.xp}XP</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// WORKOUT
// ============================================================
function WorkoutPage(){
  const [tab,setTab]=useState("upper");
  const [done,setDone]=useState(()=>ls("workout_done",{}));
  const [restTimer,setRestTimer]=useState(0);
  const timerRef=useRef();
  useEffect(()=>()=>clearInterval(timerRef.current),[]);

  useEffect(()=>lsSet("workout_done",done),[done]);

  const tabs=[{id:"upper",label:"Upper",emoji:"💪"},{id:"lower",label:"Lower",emoji:"🦵"},{id:"fullbody",label:"Full Body",emoji:"🔥"},{id:"rest",label:"Rest",emoji:"🧘"}];
  const workouts=WORKOUT_TEMPLATES[tab];
  const doneCount=workouts.filter((_,i)=>done[`${tab}-${i}`]).length;

  const startRest=(sec=60)=>{
    clearInterval(timerRef.current);
    setRestTimer(sec);
    timerRef.current=setInterval(()=>setRestTimer(p=>{
  if(p<=1){
    clearInterval(timerRef.current);
    timerRef.current=null;
    sendNotif("⏱️ Istirahat Selesai!","Lanjutkan set berikutnya!");
    return 0;
  }
  return p-1;
}),1000);

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Workout Planner 🏋️</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Template workout bulking pemula</div></div>
      <div style={{display:"flex",gap:8,background:C.surfaceEl,padding:4,borderRadius:12}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,background:tab===t.id?C.accent:"transparent",color:tab===t.id?"#000":C.textMuted}}>{t.emoji}<br/>{t.label}</button>)}
      </div>
      <Card style={{background:`linear-gradient(135deg,${C.accent}15,transparent)`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,fontWeight:700}}>Progress Sesi</span><span style={{fontSize:13,color:C.accent,fontWeight:700}}>{doneCount}/{workouts.length}</span></div>
        <PBar value={doneCount} max={workouts.length}/>
      </Card>
      {restTimer>0&&<Card style={{textAlign:"center",background:`linear-gradient(135deg,${C.orange}22,transparent)`,border:`1px solid ${C.orange}44`}}>
        <div style={{fontSize:11,color:C.orange,fontWeight:700,marginBottom:4}}>⏱️ ISTIRAHAT</div>
        <div style={{fontSize:48,fontWeight:900,color:C.orange,fontFamily:"monospace"}}>{restTimer}s</div>
        <button onClick={()=>{clearInterval(timerRef.current);setRestTimer(0);}} style={{marginTop:8,padding:"6px 16px",borderRadius:8,border:`1px solid ${C.orange}`,background:"transparent",color:C.orange,cursor:"pointer",fontWeight:700,fontSize:12}}>Skip</button>
      </Card>}
      {workouts.map((w,i)=>{
        const key=w.id,isDone=done[key];
        return<Card key={i} style={{border:`1px solid ${isDone?C.accent+"55":C.border}`,background:isDone?C.accent+"08":C.surface}}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{fontSize:28}}>{w.emoji}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:isDone?C.textMuted:C.text,textDecoration:isDone?"line-through":"none"}}>{w.name}</div>
                <Badge color={w.diff==="Mudah"?C.accent:w.diff==="Sedang"?C.orange:C.red}>{w.diff}</Badge>
              </div>
              <div style={{display:"flex",gap:16,marginTop:8,flexWrap:"wrap"}}>
                <div style={{fontSize:12,color:C.textSub}}><span style={{color:C.accent,fontWeight:700}}>{w.sets}</span> Set</div>
                <div style={{fontSize:12,color:C.textSub}}><span style={{color:C.accent,fontWeight:700}}>{w.reps}</span> Reps</div>
                <div style={{fontSize:12,color:C.textSub}}>⏱ {w.dur}</div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:12}}>
                <button onClick={()=>setDone(p=>({...p,[key]:!p[key]}))} style={{flex:1,padding:"8px 12px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,background:isDone?C.surfaceEl:C.accent,color:isDone?C.textMuted:"#000"}}>{isDone?"✓ Selesai":"Tandai Selesai"}</button>
                {!isDone&&<button onClick={()=>startRest(60)} style={{padding:"8px 12px",borderRadius:8,border:`1px solid ${C.orange}44`,background:C.orange+"11",color:C.orange,cursor:"pointer",fontWeight:700,fontSize:12}}>⏱ Rest</button>}
              </div>
            </div>
          </div>
        </Card>;
      })}
      {doneCount===workouts.length&&workouts.length>0&&<Card style={{textAlign:"center",background:`linear-gradient(135deg,${C.accent}22,${C.accent}08)`,border:`1px solid ${C.accent}`}}><div style={{fontSize:40}}>🏆</div><div style={{fontSize:18,fontWeight:900,color:C.accent,marginTop:8}}>WORKOUT SELESAI!</div><div style={{fontSize:13,color:C.textSub,marginTop:4}}>Istirahat & makan protein! 💪</div></Card>}
    </div>
  );
}

// ============================================================
// CARDIO
// ============================================================
function CardioPage({profile}){
  const [sel,setSel]=useState(null);
  const [running,setRunning]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const [dist,setDist]=useState(0);
  const [history,setHistory]=useState(()=>ls("cardio_history",[]));
  const timerRef=useRef();

  useEffect(()=>lsSet("cardio_history",history),[history]);

  const start=()=>{
    if(!sel) return;
    reqNotif(null);
    setRunning(true);setElapsed(0);setDist(0);
    timerRef.current=setInterval(()=>{setElapsed(p=>p+1);setDist(p=>+(p+0.003).toFixed(3));},1000);
  };
  const stop=()=>{
    setRunning(false);clearInterval(timerRef.current);
    const cal=Math.round((sel.met*(parseFloat(profile.bb)||65)*elapsed)/3600);
    const entry={type:sel.name,emoji:sel.emoji,dur:elapsed,dist:dist.toFixed(2),cal,time:new Date().toLocaleString("id-ID")};
    setHistory(p=>[entry,...p.slice(0,9)]);
    sendNotif(`✅ ${sel.name} Selesai!`,`${dist.toFixed(2)} km • ${cal} kcal terbakar`);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Cardio & Aktivitas 🏃</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Track aktivitas outdoor kamu</div></div>
      {!running?(
        <>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {CARDIO_TYPES.map(ct=><div key={ct.id} onClick={()=>setSel(ct)} style={{flex:"1 1 calc(33% - 10px)",minWidth:90,padding:14,borderRadius:14,border:`2px solid ${sel?.id===ct.id?C.accent:C.border}`,background:sel?.id===ct.id?C.accent+"15":C.surfaceEl,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}><div style={{fontSize:28}}>{ct.emoji}</div><div style={{fontSize:12,fontWeight:700,marginTop:4,color:sel?.id===ct.id?C.accent:C.text}}>{ct.name}</div></div>)}
          </div>
          {sel&&<button onClick={start} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:`linear-gradient(135deg,${C.accent},${C.accentDim})`,color:"#000",fontSize:16,fontWeight:900,cursor:"pointer"}}>▶ Mulai {sel.name}</button>}
        </>
      ):(
        <Card style={{textAlign:"center",background:`linear-gradient(135deg,${C.accent}15,transparent)`,border:`1px solid ${C.accent}44`}}>
          <div style={{fontSize:32}}>{sel.emoji}</div>
          <div style={{fontSize:12,color:C.accent,fontWeight:700,marginTop:8,textTransform:"uppercase",letterSpacing:2}}>{sel.name} - AKTIF</div>
          <div style={{fontSize:52,fontWeight:900,fontFamily:"monospace",color:C.accent,margin:"16px 0"}}>{fmtTime(elapsed)}</div>
          <div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:20}}>
            <div><div style={{fontSize:22,fontWeight:800}}>{dist.toFixed(2)}</div><div style={{fontSize:11,color:C.textMuted}}>km</div></div>
            <div><div style={{fontSize:22,fontWeight:800,color:C.orange}}>{Math.round((sel.met*(parseFloat(profile.bb)||65)*elapsed)/3600)}</div><div style={{fontSize:11,color:C.textMuted}}>kcal</div></div>
          </div>
          <button onClick={stop} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:C.red,color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>⏹ Stop & Simpan</button>
        </Card>
      )}
      {history.length>0&&<Card><div style={{fontWeight:800,fontSize:15,marginBottom:14}}>📊 Riwayat</div>{history.map((h,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<history.length-1?`1px solid ${C.border}`:"none"}}><span style={{fontSize:24}}>{h.emoji}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{h.type}</div><div style={{fontSize:11,color:C.textMuted}}>{h.dist} km • {fmtTime(h.dur)}</div></div><span style={{fontSize:13,color:C.orange,fontWeight:700}}>{h.cal} kcal</span></div>)}</Card>}
    </div>
  );
}

// ============================================================
// MEAL
// ============================================================
function MealPage({profile}){
  const [eaten,setEaten]=useState(()=>ls("meal_eaten",[]));
  useEffect(()=>lsSet("meal_eaten",eaten),[eaten]);
  const total={cal:MEAL_TEMPLATES.reduce((s,m)=>s+m.cal,0),protein:MEAL_TEMPLATES.reduce((s,m)=>s+m.protein,0),carbs:MEAL_TEMPLATES.reduce((s,m)=>s+m.carbs,0),fat:MEAL_TEMPLATES.reduce((s,m)=>s+m.fat,0)};
  const setReminder=(m)=>reqNotif(()=>{const [h,mn]=m.time.split(":").map(Number),now=new Date(),t=new Date();t.setHours(h,mn,0,0);const diff=t-now;if(diff>0)setTimeout(()=>sendNotif(`🍽️ ${m.name}!`,m.foods),diff);alert(`✅ Pengingat ${m.name} jam ${m.time} diset!`);});

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Meal Planner 🍽️</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Jadwal makan bulking harian</div></div>
      <Card style={{background:`linear-gradient(135deg,${C.orange}15,transparent)`}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:14,color:C.orange}}>📊 Makro Hari Ini</div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          {[{label:"Kalori",val:total.cal,target:profile.targetCal||2700,color:C.orange},{label:"Protein",val:total.protein,target:profile.targetProtein||140,color:C.accent},{label:"Karbo",val:total.carbs,target:300,color:C.blue},{label:"Lemak",val:total.fat,target:80,color:C.red}].map(m=><div key={m.label} style={{flex:1,minWidth:70,textAlign:"center"}}><div style={{fontSize:16,fontWeight:900,color:m.color}}>{m.val}</div><div style={{fontSize:10,color:C.textMuted}}>{m.label}</div><div style={{marginTop:4}}><PBar value={m.val} max={m.target} color={m.color} height={4}/></div></div>)}
        </div>
      </Card>
      {MEAL_TEMPLATES.map((m,i)=>{
        const isEaten=eaten.includes(i);
        return<Card key={i} style={{border:`1px solid ${isEaten?C.accent+"55":C.border}`}}>
          <div style={{display:"flex",gap:12}}>
            <div style={{fontSize:12,color:C.accent,fontFamily:"monospace",fontWeight:700,minWidth:44}}>{m.time}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:14,fontWeight:800}}>{m.name}</div><span style={{fontSize:13,color:C.orange,fontWeight:700}}>{m.cal} kcal</span></div>
              <div style={{fontSize:12,color:C.textMuted,marginTop:4}}>{m.foods}</div>
              <div style={{display:"flex",gap:10,marginTop:6}}><span style={{fontSize:11,color:C.accent}}>P:{m.protein}g</span><span style={{fontSize:11,color:C.blue}}>K:{m.carbs}g</span><span style={{fontSize:11,color:C.red}}>L:{m.fat}g</span></div>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button onClick={()=>setEaten(p=>isEaten?p.filter(x=>x!==i):[...p,i])} style={{flex:1,padding:"6px 10px",borderRadius:8,border:`1px solid ${isEaten?C.accent:C.border}`,background:isEaten?C.accent+"22":"transparent",color:isEaten?C.accent:C.textMuted,cursor:"pointer",fontWeight:700,fontSize:11}}>{isEaten?"✓ Sudah Makan":"Tandai Makan"}</button>
                <button onClick={()=>setReminder(m)} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${C.orange}44`,background:C.orange+"11",color:C.orange,cursor:"pointer",fontWeight:700,fontSize:11}}>🔔</button>
              </div>
            </div>
          </div>
        </Card>;
      })}
    </div>
  );
}

// ============================================================
// AI ASSISTANT
// ============================================================
function AIPage(){
  const [msgs,setMsgs]=useState(()=>ls("ai_msgs",[{role:"assistant",content:"Halo! Saya AI Nutrition & Fitness Assistant kamu! 🤖💪\n\nCeritakan makanan atau tanya apa saja tentang bulking, nutrisi, dan workout!"}]));
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const endRef=useRef();
  const today=new Date().toDateString();
const [aiUsage,setAiUsage]=useState(()=>{const u=ls("ai_usage",{date:"",count:0});return u.date===today?u:{date:today,count:0};});
const limitReached=aiUsage.count>=5;
  useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  useEffect(()=>lsSet("ai_msgs",msgs.slice(-20)),[msgs]);

  const SYSTEM=`Kamu adalah AI Personal Trainer dan Nutrition Assistant yang ahli dalam bulking dan fitness. Berbicara dalam bahasa Indonesia yang ramah dan memotivasi. Analisis makanan, estimasi nutrisi, beri saran clean bulking, tips workout. Gunakan emoji. Target harian bulking pemula: Kalori 2500-3000, Protein 120-150g, Karbo 300-350g, Lemak 60-80g. Selalu akhiri dengan motivasi singkat.`;

  const send=async()=>{
    if(!input.trim()||loading||limitReached) return;
    const userMsg={role:"user",content:input};
    const newMsgs=[...msgs,userMsg];
    setMsgs(newMsgs);setInput("");setLoading(true);
    const newUsage={date:today,count:aiUsage.count+1}setAIUsage(newUsage);lsSet("ai_usage",newUsage);
    const reply=await askClaude(newMsgs.map(m=>({role:m.role,content:m.content})),SYSTEM);
    setMsgs(p=>[...p,{role:"assistant",content:reply}]);
    setLoading(false
  };

  const QUICK=["Analisis makanan saya hari ini","Tips clean bulking pemula","Makanan murah protein tinggi","Workout upper body pemula","Evaluasi progress bulking saya"];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      <div style={{paddingBottom:16}}><div style={{fontSize:22,fontWeight:900}}>AI Assistant 🤖</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Personal trainer + nutrition coach AI</div></div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {QUICK.map((q,i)=><button key={i} onClick={()=>setInput(q)} style={{padding:"6px 12px",borderRadius:20,border:`1px solid ${C.accent}44`,background:C.accent+"11",color:C.accent,fontSize:11,cursor:"pointer",fontWeight:600}}>{q}</button>)}
      </div>
      <div style={{overflowY:"auto",display:"flex",flexDirection:"column",gap:12,minHeight:300,maxHeight:420}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            {m.role==="assistant"&&<div style={{width:32,height:32,borderRadius:10,background:C.accent+"22",border:`1px solid ${C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,marginRight:8}}>🤖</div>}
            <div style={{maxWidth:"78%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?C.accent:C.surfaceEl,color:m.role==="user"?"#000":C.text,fontSize:13,lineHeight:1.7,border:m.role==="assistant"?`1px solid ${C.border}`:"none",whiteSpace:"pre-wrap"}}>{m.content}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:32,height:32,borderRadius:10,background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center"}}>🤖</div><div style={{padding:"12px 16px",background:C.surfaceEl,borderRadius:"18px 18px 18px 4px",border:`1px solid ${C.border}`}}><div style={{display:"flex",gap:4}}>{[0,1,2].map(j=><div key={j} style={{width:6,height:6,borderRadius:"50%",background:C.accent,animation:`pulse ${0.8+j*0.2}s infinite`,opacity:0.7}}/>)}</div></div></div>}
        <div ref={endRef}/>
      </div>
      <div style={{display:"flex",gap:8,marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder={limitReached?"❌ Limit 5 pertanyaan hari ini. Kembali besok!":"Ceritakan makanan atau tanya apapun..."} style={{flex:1,padding:"12px 16px",borderRadius:12,border:`1px solid ${C.border}`,background:C.surfaceEl,color:C.text,fontSize:13,outline:"none"}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{padding:"12px 18px",borderRadius:12,border:"none",background:input.trim()?C.accent:C.surfaceEl,color:input.trim()?"#000":C.textMuted,cursor:input.trim()?"pointer":"default",fontWeight:700,fontSize:16,transition:"all 0.2s"}}>↑</button>
      </div>
    </div>
  );
}

// ============================================================
// JOURNAL
// ============================================================
function JournalPage(){
  const [j,setJ]=useState({food:"",workout:"",mood:"😊",sleep:"",weight:"",notes:""});
  const [aiEval,setAiEval]=useState("");
  const [loading,setLoading]=useState(false);
  const [history,setHistory]=useState(()=>ls("journal_history",[]));
  const moods=["😴","😔","😐","😊","🔥"];
  useEffect(()=>lsSet("journal_history",history),[history]);

  const analyze=async()=>{
    setLoading(true);setAiEval("");
    const prompt=`Analisis jurnal harian fitness ini dalam bahasa Indonesia:\nMakanan: ${j.food||"Tidak diisi"}\nWorkout: ${j.workout||"Tidak diisi"}\nMood: ${j.mood}\nTidur: ${j.sleep||"?"} jam\nBerat: ${j.weight||"?"} kg\nCatatan: ${j.notes||"-"}\n\nBerikan: 1) Evaluasi nutrisi 2) Evaluasi workout 3) Yang perlu diperbaiki 4) Tips besok 5) Motivasi. Gunakan emoji dan poin jelas.`;
    const reply=await askClaude([{role:"user",content:prompt}],"Kamu adalah AI fitness coach yang ramah dan memotivasi. Evaluasi jurnal harian fitness dalam bahasa Indonesia yang jelas dan actionable.");
    setAiEval(reply);
    setHistory(p=>[{...j,aiEval:reply,date:new Date().toLocaleDateString("id-ID")},...p.slice(0,9)]);
    setLoading(false);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Daily Journal 📓</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Catat aktivitas, AI akan evaluasi</div></div>
      <Card><div style={{fontSize:12,color:C.accent,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Makanan Hari Ini</div><textarea value={j.food} onChange={e=>setJ(p=>({...p,food:e.target.value}))} placeholder="Ceritakan semua yang kamu makan hari ini..." style={{width:"100%",minHeight:80,background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:10,padding:12,color:C.text,fontSize:13,resize:"vertical",outline:"none",fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.6}}/></Card>
      <Card><div style={{fontSize:12,color:C.accent,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>Workout Yang Dilakukan</div><textarea value={j.workout} onChange={e=>setJ(p=>({...p,workout:e.target.value}))} placeholder="Workout apa yang dilakukan hari ini?" style={{width:"100%",minHeight:60,background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:10,padding:12,color:C.text,fontSize:13,resize:"vertical",outline:"none",fontFamily:"inherit",boxSizing:"border-box",lineHeight:1.6}}/></Card>
      <div style={{display:"flex",gap:12}}>
        <Card style={{flex:1}}><div style={{fontSize:12,color:C.accent,fontWeight:700,marginBottom:10}}>Mood</div><div style={{display:"flex",gap:6}}>{moods.map(m=><button key={m} onClick={()=>setJ(p=>({...p,mood:m}))} style={{fontSize:20,background:j.mood===m?C.accent+"33":"transparent",border:`2px solid ${j.mood===m?C.accent:"transparent"}`,borderRadius:8,padding:4,cursor:"pointer"}}>{m}</button>)}</div></Card>
        <Card style={{flex:1}}>
          <div style={{fontSize:12,color:C.accent,fontWeight:700,marginBottom:6}}>Tidur (jam)</div>
          <input type="number" value={j.sleep} onChange={e=>setJ(p=>({...p,sleep:e.target.value}))} placeholder="7.5" step="0.5" style={{width:"100%",background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
          <div style={{fontSize:12,color:C.accent,fontWeight:700,marginBottom:6}}>Berat (kg)</div>
          <input type="number" value={j.weight} onChange={e=>setJ(p=>({...p,weight:e.target.value}))} placeholder="62.0" step="0.1" style={{width:"100%",background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box"}}/>
        </Card>
      </div>
      <button onClick={analyze} disabled={loading} style={{padding:"14px",borderRadius:14,border:"none",background:loading?C.surfaceEl:`linear-gradient(135deg,${C.accent},${C.accentDim})`,color:loading?C.textMuted:"#000",fontSize:14,fontWeight:800,cursor:loading?"default":"pointer",transition:"all 0.2s"}}>{loading?"🤖 AI sedang menganalisis...":"🤖 Analisis dengan AI"}</button>
      {aiEval&&<Card style={{borderLeft:`3px solid ${C.accent}`,background:C.surfaceEl}}><div style={{fontSize:12,color:C.accent,fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>✨ Evaluasi AI</div><div style={{fontSize:13,color:C.text,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{aiEval}</div></Card>}
    </div>
  );
}

// ============================================================
// PROGRESS
// ============================================================
function ProgressPage({profile}){
  const [bbLog,setBbLog]=useState(()=>ls("bb_log",[]));
  const [newBB,setNewBB]=useState("");
  const [newTB,setNewTB]=useState("");
  const [showAdd,setShowAdd]=useState(false);

  useEffect(()=>lsSet("bb_log",bbLog),[bbLog]);

  const addEntry=()=>{
    if(!newBB) return;
    const entry={date:`${new Date().toLocaleDateString("id-ID",{day:"numeric",month:"short"})}`,val:parseFloat(newBB)};
    setBbLog(p=>[...p,entry]);
    setNewBB("");setShowAdd(false);
    alert("✅ BB berhasil dicatat!");
  };

  const BADGES=[
    {icon:"🏆",label:"First Blood",desc:"Workout pertama selesai",earned:bbLog.length>0||ls("workout_done",{}) && Object.keys(ls("workout_done",{})).length>0},
    {icon:"🔥",label:"Week Warrior",desc:"7 hari streak berturut",earned:false},
    {icon:"💪",label:"Protein God",desc:"Target protein 5 hari berturut",earned:false},
    {icon:"✨",label:"Clean Bulker",desc:"30 hari clean bulking",earned:false},
    {icon:"📈",label:"Gaining",desc:"Berat naik 1 kg",earned:bbLog.length>=2&&bbLog[bbLog.length-1]?.val-bbLog[0]?.val>=1},
  ];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Progress Tracker 📈</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Pantau perkembangan dari waktu ke waktu</div></div>

      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontWeight:800,fontSize:15}}>⚖️ Log Berat Badan</div>
          <button onClick={()=>setShowAdd(!showAdd)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:C.accent,color:"#000",fontWeight:700,fontSize:12,cursor:"pointer"}}>+ Tambah</button>
        </div>
        {showAdd&&<div style={{display:"flex",gap:8,marginBottom:14}}>
          <input type="number" value={newBB} onChange={e=>setNewBB(e.target.value)} placeholder="BB sekarang (kg)" step="0.1" style={{flex:1,background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",color:C.text,fontSize:14,outline:"none"}}/>
          <button onClick={addEntry} style={{padding:"10px 16px",borderRadius:10,border:"none",background:C.accent,color:"#000",fontWeight:800,cursor:"pointer"}}>Simpan</button>
        </div>}
        {bbLog.length>0&&<div style={{marginTop:8}}><MiniLineChart data={bbLog} keyX="date" keyY="val" color={C.accent}/><div style={{display:"flex",justifyContent:"space-between",marginTop:8}}><span style={{fontSize:12,color:C.textMuted}}>Awal: {bbLog[0]?.val} kg</span><span style={{fontSize:12,color:C.accent,fontWeight:700}}>Terkini: {bbLog[bbLog.length-1]?.val} kg</span></div></div>}
        {bbLog.length===0&&<div style={{textAlign:"center",padding:20,color:C.textMuted,fontSize:13}}>Belum ada data. Tekan "Tambah" untuk mulai track!</div>}
      </Card>

      <Card>
        <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>🏅 Badge Pencapaian</div>
        {BADGES.map((b,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,background:b.earned?C.accent+"11":C.surfaceEl,border:`1px solid ${b.earned?C.accent+"44":C.border}`,opacity:b.earned?1:0.5,marginBottom:8}}><span style={{fontSize:26}}>{b.icon}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{b.label}</div><div style={{fontSize:11,color:C.textMuted}}>{b.desc}</div></div><Badge color={b.earned?C.accent:C.textMuted}>{b.earned?"Earned ✓":"Belum"}</Badge></div>)}
      </Card>
    </div>
  );
}

// ============================================================
// BELANJA & EDUKASI
// ============================================================
function BelanjaPage(){
  const [tab,setTab]=useState("belanja");
  const [quizIdx,setQuizIdx]=useState(0);
  const [quizAns,setQuizAns]=useState(null);
  const quiz=QUIZ_LIST[quizIdx%QUIZ_LIST.length];

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Info & Edukasi 📚</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Tips belanja hemat & ilmu fitness</div></div>
      <div style={{display:"flex",gap:8,background:C.surfaceEl,padding:4,borderRadius:12}}>
        {[{id:"belanja",label:"🛒 Belanja"},{id:"edukasi",label:"📚 Edukasi"},{id:"quiz",label:"🧠 Quiz"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 4px",borderRadius:8,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,background:tab===t.id?C.accent:"transparent",color:tab===t.id?"#000":C.textMuted}}>{t.label}</button>)}
      </div>
      {tab==="belanja"&&(
        <>
          <Card style={{background:`linear-gradient(135deg,${C.accent}15,transparent)`}}>
            <div style={{fontSize:13,fontWeight:700,color:C.accent,marginBottom:4}}>💡 Tips Belanja Bulking Hemat</div>
            <div style={{fontSize:12,color:C.textMuted,lineHeight:1.7}}>Prioritas: Telur → Tempe/Tahu → Ayam → Ikan. Beli dalam jumlah besar lebih hemat. Pasar tradisional lebih murah!</div>
          </Card>
          {BELANJA_ITEMS.map((b,i)=><Card key={i} style={{padding:"14px 16px"}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:28}}>{b.emoji}</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:800}}>{b.name}</div><div style={{fontSize:11,color:C.textMuted}}>{b.cal} • {b.protein}</div></div><div style={{fontSize:13,color:C.accent,fontWeight:800}}>{b.price}</div></div></Card>)}
        </>
      )}
      {tab==="edukasi"&&EDUKASI.map((e,i)=><Card key={i}><div style={{display:"flex",gap:12,alignItems:"flex-start"}}><span style={{fontSize:24,flexShrink:0}}>{e.emoji}</span><div><div style={{fontSize:14,fontWeight:800,marginBottom:8,color:C.accent}}>{e.title}</div><div style={{fontSize:13,color:C.textSub,lineHeight:1.7}}>{e.isi}</div></div></div></Card>)}
      {tab==="quiz"&&(
        <Card style={{background:C.surfaceEl}}>
          <div style={{fontSize:11,color:C.accent,fontWeight:700,marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>🧠 Quiz #{quizIdx+1}</div>
          <div style={{fontSize:15,fontWeight:700,marginBottom:20,lineHeight:1.6}}>{quiz.q}</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {quiz.opts.map((o,i)=><button key={i} onClick={()=>setQuizAns(i)} style={{padding:"12px 16px",borderRadius:10,border:`2px solid ${quizAns===null?C.border:i===quiz.ans?C.accent:quizAns===i?C.red:C.border}`,background:quizAns===null?C.surfaceEl:i===quiz.ans?C.accent+"22":quizAns===i?C.red+"22":C.surfaceEl,color:quizAns===null?C.text:i===quiz.ans?C.accent:quizAns===i?C.red:C.textMuted,cursor:"pointer",fontWeight:600,fontSize:13,textAlign:"left"}}>{o}</button>)}
          </div>
          {quizAns!==null&&(
            <div>
              <div style={{marginTop:14,padding:12,borderRadius:10,background:quizAns===quiz.ans?C.accent+"22":C.red+"22",border:`1px solid ${quizAns===quiz.ans?C.accent:C.red}44`}}>
                <div style={{fontSize:13,color:quizAns===quiz.ans?C.accent:C.red,fontWeight:700}}>{quizAns===quiz.ans?"✅ Benar!":"❌ Salah!"}</div>
                <div style={{fontSize:12,color:C.textSub,marginTop:4}}>Jawaban: {quiz.opts[quiz.ans]}</div>
              </div>
              <button onClick={()=>{setQuizIdx(p=>p+1);setQuizAns(null);}} style={{width:"100%",marginTop:12,padding:12,borderRadius:10,border:"none",background:C.accent,color:"#000",fontWeight:800,cursor:"pointer"}}>Soal Berikutnya →</button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// ============================================================
// PROFILE
// ============================================================
function ProfilePage({profile,setProfile}){
  const [saved,setSaved]=useState(false);
  const bmi=calcBMI(profile.bb,profile.tb);
  const bmr=calcBMR(profile.bb,profile.tb,profile.age,profile.gender);
  const status=bmi>0?bmiStatus(bmi):null;

  const save=()=>{lsSet("profile",profile);setSaved(true);setTimeout(()=>setSaved(false),2000);};

  const setAllReminders=()=>reqNotif(()=>{
    const reminders=[
      {time:"07:00",title:"🍳 Waktunya Sarapan!",body:"Jangan skip sarapan!"},
      {time:"10:00",title:"🍌 Snack Pagi",body:"Makan snack untuk energi"},
      {time:"13:00",title:"🍗 Makan Siang",body:"Makan siang bergizi"},
      {time:"16:00",title:"⚡ Pre-Workout",body:"Makan sebelum latihan!"},
      {time:"19:30",title:"🍽️ Makan Malam",body:"Makan malam untuk recovery"},
      {time:"21:00",title:"🥛 Susu Malam",body:"Minum susu sebelum tidur"},
      {time:"22:00",title:"😴 Waktunya Tidur!",body:"Tidur cukup untuk otot"},
    ];
    reminders.forEach(r=>{const [h,m]=r.time.split(":").map(Number),now=new Date(),t=new Date();t.setHours(h,m,0,0);const diff=t-now;if(diff>0)setTimeout(()=>sendNotif(r.title,r.body),diff);});
    alert("✅ Semua pengingat harian berhasil diset!");
  });

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div><div style={{fontSize:22,fontWeight:900}}>Profil & Target 👤</div><div style={{fontSize:13,color:C.textMuted,marginTop:4}}>Atur profil dan target kamu</div></div>
      <Card style={{background:`linear-gradient(135deg,${C.accent}15,transparent)`,textAlign:"center"}}>
        <div style={{width:70,height:70,borderRadius:"50%",background:C.accent+"33",border:`3px solid ${C.accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 12px"}}>💪</div>
        <div style={{fontSize:18,fontWeight:900}}>{profile.nama||"BulkBro"}</div>
        {bmi>0&&<><div style={{marginTop:8}}><Badge color={status.color}>BMI {bmi} - {status.label}</Badge></div><div style={{fontSize:12,color:C.textMuted,marginTop:6}}>BMR: {bmr} kcal/hari</div></>}
      </Card>
      <Card>
        <div style={{fontSize:14,fontWeight:800,marginBottom:14,color:C.accent}}>📋 Data Diri</div>
        <Input label="Nama" value={profile.nama||""} onChange={e=>setProfile(p=>({...p,nama:e.target.value}))} placeholder="Nama kamu"/>
        <Input label="Berat Badan (kg)" value={profile.bb||""} onChange={e=>setProfile(p=>({...p,bb:e.target.value}))} type="number" placeholder="60"/>
        <Input label="Tinggi Badan (cm)" value={profile.tb||""} onChange={e=>setProfile(p=>({...p,tb:e.target.value}))} type="number" placeholder="170"/>
        <Input label="Usia" value={profile.age||""} onChange={e=>setProfile(p=>({...p,age:e.target.value}))} type="number" placeholder="20"/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.textSub,marginBottom:6,fontWeight:600}}>Jenis Kelamin</div>
          <div style={{display:"flex",gap:8}}>
            {["pria","wanita"].map(g=><button key={g} onClick={()=>setProfile(p=>({...p,gender:g}))} style={{flex:1,padding:10,borderRadius:8,border:`2px solid ${profile.gender===g?C.accent:C.border}`,background:profile.gender===g?C.accent+"22":C.surfaceEl,color:profile.gender===g?C.accent:C.textMuted,fontWeight:700,cursor:"pointer",fontSize:12}}>{g==="pria"?"👨 Pria":"👩 Wanita"}</button>)}
          </div>
        </div>
      </Card>
      <Card>
        <div style={{fontSize:14,fontWeight:800,marginBottom:14,color:C.accent}}>🎯 Target Fitness</div>
        <Input label="Target BB (kg)" value={profile.targetBB||""} onChange={e=>setProfile(p=>({...p,targetBB:e.target.value}))} type="number" placeholder="65"/>
        <Input label="Target Kalori (kcal)" value={profile.targetCal||""} onChange={e=>setProfile(p=>({...p,targetCal:e.target.value}))} type="number" placeholder="2700"/>
        <Input label="Target Protein (g)" value={profile.targetProtein||""} onChange={e=>setProfile(p=>({...p,targetProtein:e.target.value}))} type="number" placeholder="140"/>
        <button onClick={save} style={{width:"100%",padding:12,borderRadius:12,border:"none",background:saved?C.accent+"44":C.accent,color:saved?C.accent:"#000",fontSize:14,fontWeight:800,cursor:"pointer",transition:"all 0.3s"}}>{saved?"✅ Tersimpan!":"Simpan Profil & Target"}</button>
      </Card>
      <Card>
        <div style={{fontSize:14,fontWeight:800,marginBottom:12}}>🔔 Pengingat Otomatis</div>
        <div style={{fontSize:12,color:C.textMuted,marginBottom:12,lineHeight:1.6}}>Set pengingat untuk: Sarapan • Snack • Makan Siang • Pre-Workout • Makan Malam • Susu Malam • Tidur</div>
        <button onClick={setAllReminders} style={{width:"100%",padding:12,borderRadius:12,border:"none",background:C.accent,color:"#000",fontSize:13,fontWeight:800,cursor:"pointer"}}>🔔 Aktifkan Semua Pengingat</button>
      </Card>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function BulkAI(){
  const [onboarded,setOnboarded]=useState(()=>ls("onboarded",false));
  const [profile,setProfile]=useState(()=>ls("profile",{nama:"",gender:"pria",bb:"",tb:"",age:"",targetBB:"",targetCal:"2700",targetProtein:"140",activity:"sedang"}));
  const [page,setPage]=useState("home");
  const [checklist,setChecklist]=useState(()=>ls("checklist",CHECKLIST_ITEMS.map(c=>({...c,done:false}))));
  const [streak,setStreak]=useState(()=>ls("streak",0));

  useEffect(()=>lsSet("profile",profile),[profile]);
  useEffect(()=>{
    lsSet("checklist",checklist);
    if(checklist.every(c=>c.done)){
      const today=new Date().toDateString();
      const lastDay=ls("last_streak_day","");
      if(lastDay!==today){lsSet("last_streak_day",today);const newStreak=streak+1;setStreak(newStreak);lsSet("streak",newStreak);sendNotif("🔥 Streak!",`Streak kamu sekarang ${newStreak} hari!`);}
    }
  },[checklist]);

  const handleOnboard=(data)=>{setProfile(data);lsSet("profile",data);lsSet("onboarded",true);setOnboarded(true);};
  const handleNotifBell=()=>reqNotif(()=>sendNotif("🔔 BulkAI","Notifikasi aktif! Siap memberikan pengingat."));

  if(!onboarded) return <Onboarding onDone={handleOnboard}/>;

  const NAV=[
    {id:"home",icon:"⊞",label:"Home"},
    {id:"workout",icon:"🏋️",label:"Workout"},
    {id:"cardio",icon:"🏃",label:"Cardio"},
    {id:"meal",icon:"🍽️",label:"Makan"},
    {id:"ai",icon:"🤖",label:"AI"},
    {id:"journal",icon:"📓",label:"Jurnal"},
    {id:"progress",icon:"📈",label:"Progress"},
    {id:"info",icon:"📚",label:"Info"},
    {id:"profile",icon:"👤",label:"Profil"},
  ];

  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"-apple-system, BlinkMacSystemFont, sans-serif",maxWidth:480,margin:"0 auto"}}>
      <style>{`*{box-sizing:border-box;}body{margin:0;background:#080808;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}}@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}`}</style>

      <div style={{position:"sticky",top:0,zIndex:100,background:C.bg+"ee",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}`,padding:"14px 16px 10px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:32,height:32,borderRadius:10,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>💪</div>
            <div style={{fontSize:16,fontWeight:900,letterSpacing:-0.5,color:C.accent}}>BULK<span style={{color:C.text}}>AI</span></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:20,background:C.surfaceEl,border:`1px solid ${C.border}`}}>
              <span style={{fontSize:11,color:C.orange,fontWeight:700}}>{streak} 🔥</span>
            </div>
            <button onClick={handleNotifBell} style={{width:36,height:36,borderRadius:10,background:C.surfaceEl,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer"}}>🔔</button>
          </div>
        </div>
      </div>

      <div style={{padding:"20px 16px 120px",animation:"slideUp 0.3s ease"}}>
        {page==="home"&&<Dashboard profile={profile} checklist={checklist} setChecklist={setChecklist} streak={streak}/>}
        {page==="workout"&&<WorkoutPage/>}
        {page==="cardio"&&<CardioPage profile={profile}/>}
        {page==="meal"&&<MealPage profile={profile}/>}
        {page==="ai"&&<AIPage/>}
        {page==="journal"&&<JournalPage/>}
        {page==="progress"&&<ProgressPage profile={profile}/>}
        {page==="info"&&<BelanjaPage/>}
        {page==="profile"&&<ProfilePage profile={profile} setProfile={setProfile}/>}
      </div>

      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.surface+"f8",backdropFilter:"blur(20px)",borderTop:`1px solid ${C.border}`,padding:"6px 2px 10px",zIndex:100}}>
        <div style={{display:"flex",justifyContent:"space-around"}}>
          {NAV.map(n=>{
            const active=page===n.id;
            return<button key={n.id} onClick={()=>setPage(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"5px 2px",border:"none",background:"transparent",cursor:"pointer",borderRadius:10}}>
              <div style={{fontSize:15,filter:active?"none":"grayscale(100%)",opacity:active?1:0.45,transform:active?"scale(1.15)":"scale(1)",transition:"all 0.2s"}}>{n.icon}</div>
              <span style={{fontSize:8,fontWeight:active?800:500,color:active?C.accent:C.textMuted}}>{n.label}</span>
              {active&&<div style={{width:3,height:3,borderRadius:"50%",background:C.accent}}/>}
            </button>;
          })}
        </div>
      </div>
    </div>
  );
}
