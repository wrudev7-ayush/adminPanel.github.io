
/* GSAP ENTRANCE + SCROLL */
gsap.from(".animate",{
  y:80,
  opacity:0,
  duration:1.2,
  stagger:.15,
  ease:"power4.out",
  scrollTrigger:{ trigger:".animate", start:"top 85%" }
});

/* COUNTERS */
document.querySelectorAll(".stat-number").forEach(el=>{
  gsap.to(el,{
    innerText:el.dataset.count,
    duration:2,
    snap:{innerText:1}
  });
});

/* CURSOR PARALLAX */
document.querySelectorAll(".parallax").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    card.style.setProperty("--x",e.offsetX+"px");
    card.style.setProperty("--y",e.offsetY+"px");
  });
});

/* THEME TOGGLE */
document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("light");
};

/* FULL CALENDAR */
new FullCalendar.Calendar(document.getElementById("calendar"),{
  initialView:"dayGridMonth",
  height:420,
  events:[
    {title:"Flight Booking",date:"2026-01-05"},
    {title:"Hotel Booking",date:"2026-01-10"},
    {title:"Activity",date:"2026-01-18"}
  ]
}).render();

/* CHART */
new Chart(document.getElementById("chart"),{
  type:"line",
  data:{
    labels:["Jan","Feb","Mar","Apr","May","Jun"],
    datasets:[{
      data:[12,19,8,15,10,20],
      borderColor:"#38bdf8",
      borderWidth:3,
      tension:.4
    }]
  },
  options:{plugins:{legend:{display:false}}}
});