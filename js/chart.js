
    const ctx = document.getElementById("monthlyChart").getContext("2d");

/* Gradient creator */
const gradientFill = (color) => {
  const g = ctx.createLinearGradient(0, 0, 0, 350);
  g.addColorStop(0, color.replace("1)", "0.35)"));
  g.addColorStop(1, color.replace("1)", "0)"));
  return g;
};

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Hotel",
        data: [12,15,14,18,20,22,21,19,23,24,25,26],
        borderColor: "rgba(22,163,74,1)",
        backgroundColor: gradientFill("rgba(22,163,74,1)"),
        fill: true,
        tension: 0.45,
        borderWidth: 3
      },
      {
        label: "Flight",
        data: [20,22,21,24,26,27,29,30,28,31,32,34],
        borderColor: "rgba(37,99,235,1)",
        backgroundColor: gradientFill("rgba(37,99,235,1)"),
        fill: true,
        tension: 0.45,
        borderWidth: 3
      },
      {
        label: "Activities",
        data: [6,8,7,9,10,11,12,13,12,14,15,16],
        borderColor: "rgba(234,88,12,1)",
        backgroundColor: gradientFill("rgba(234,88,12,1)"),
        fill: true,
        tension: 0.45,
        borderWidth: 3
      },
      {
        label: "Car",
        data: [5,6,6,7,8,9,8,9,10,11,12,12],
        borderColor: "rgba(185,28,28,1)",
        backgroundColor: gradientFill("rgba(185,28,28,1)"),
        fill: true,
        tension: 0.45,
        borderWidth: 3
      },
      {
        label: "Transfers",
        data: [4,5,5,6,7,7,8,9,9,10,10,11],
        borderColor: "rgba(22,101,52,1)",
        backgroundColor: gradientFill("rgba(22,101,52,1)"),
        fill: true,
        tension: 0.45,
        borderWidth: 3
      },
      {
        label: "Average",
        data: [9,11,10,13,14,15,15,16,16,18,19,20],
        borderColor: "rgba(109,40,217,1)",
        borderDash: [6,6],
        borderWidth: 4,
        tension: 0.45,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    interaction: {
      mode: "nearest",
      intersect: false
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true
        },
        onHover: (e, item, legend) => {
          legend.chart.data.datasets.forEach((ds, i) => {
            ds.borderWidth = i === item.datasetIndex ? 5 : 2;
            ds.borderColor = i === item.datasetIndex
              ? ds.borderColor
              : ds.borderColor.replace("1)", "0.25)");
          });
          legend.chart.update();
        },
        onLeave: (e, item, legend) => {
          legend.chart.data.datasets.forEach(ds => {
            ds.borderWidth = 3;
            ds.borderColor = ds.borderColor.replace("0.25)", "1)");
          });
          legend.chart.update();
        }
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 14,
        cornerRadius: 10
      }
    },
    animation: {
      duration: 1600,
      easing: "easeOutQuart"
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Profit in USD"
        }
      }
    }
  }
});

/* GSAP entrance animation */
gsap.from(".report-card", {
  y: 50,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out"
});
