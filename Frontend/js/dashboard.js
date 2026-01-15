document.querySelectorAll(".count").forEach(el => {
  const target = +el.getAttribute("data-count");
  const isPercent = el.classList.contains("percent");

  gsap.fromTo(el,
    { innerText: 0 },
    {
      innerText: target,
      duration: 1.6,
      ease: "power3.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        el.innerText = isPercent
          ? parseFloat(el.innerText).toFixed(2) + "%"
          : Number(el.innerText).toLocaleString();
      }
    }
  );
});
const ctx = document.getElementById("pageViewChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Actual",
        data: [300, 400, 380, 520, 480, 600, 580, 650],
        borderColor: "#3b6cff",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      },
      {
        label: "Projected",
        data: [280, 360, 420, 500, 540, 620, 640, 700],
        borderColor: "#9ca3af",
        borderDash: [6, 6],
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: "#eef1f6"
        },
        ticks: {
          color: "#6b7280"
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#6b7280"
        }
      }
    }
  }
});

const osCtx = document.getElementById("osChart");

new Chart(osCtx, {
  type: "doughnut",
  data: {
    labels: ["Windows", "macOS", "Linux", "Android", "iOS"],
    datasets: [{
      data: [45, 25, 10, 12, 8],
      backgroundColor: [
        "#3b6cff",
        "#22c55e",
        "#f97316",
        "#06b6d4",
        "#a855f7"
      ],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          boxWidth: 12
        }
      }
    }
  }
});

const sessionCtx = document.getElementById("sessionOsChart");

new Chart(sessionCtx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Windows",
        data: [120, 150, 140, 180, 160, 190, 210],
        borderColor: "#3b6cff",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      },
      {
        label: "macOS",
        data: [90, 110, 105, 130, 120, 140, 150],
        borderColor: "#22c55e",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      },
      {
        label: "Android",
        data: [70, 95, 90, 110, 100, 120, 130],
        borderColor: "#06b6d4",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      },
      {
        label: "iOS",
        data: [60, 80, 75, 95, 90, 105, 115],
        borderColor: "#a855f7",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: "#eef1f6"
        },
        ticks: {
          color: "#6b7280"
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#6b7280"
        }
      }
    }
  }
});

document.querySelectorAll(".heat").forEach(cell => {
  const value = parseInt(cell.dataset.value, 10);

  // Color intensity based on value
  let bgColor = "#f3f4f6";

  if (value >= 80) bgColor = "#1d4ed8";
  else if (value >= 60) bgColor = "#2563eb";
  else if (value >= 40) bgColor = "#60a5fa";
  else if (value >= 25) bgColor = "#93c5fd";
  else bgColor = "#dbeafe";

  cell.style.backgroundColor = bgColor;
  cell.style.color = value >= 60 ? "#fff" : "#111827";

  // Tooltip
  cell.title = `Retention: ${value}%`;
});

// jwt authentication here 


// BLOCK ACCESS IF NOT LOGGED IN
// if (!localStorage.getItem("token")) {
//   window.location.href = "login.html";
// }

// CALL PROTECTED API
// fetch("http://localhost:8080/admin/auth/verify-otp", {
//   headers: {
//     Authorization: "Bearer " + localStorage.getItem("token")
//   }
// })
// .then(res => {
//   if (res.status === 401) {
//     localStorage.removeItem("token");
//     window.location.href = "login.html";
//   }
//   return res.json();
// })
// .then(data => {
//   console.log("Users API Response:", data);
// })
// .catch(err => console.error(err));


// BLOCK ACCESS IF NOT LOGGED IN
if (!localStorage.getItem("token")) {
  window.location.href = "login-signup.html";
}

console.log("Logged in successfully. Token:", localStorage.getItem("token"));
