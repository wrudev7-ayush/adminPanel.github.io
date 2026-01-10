document.addEventListener("DOMContentLoaded", () => {
  fetch("../sidebar.html")   // ✅ CORRECT PATH
    .then(res => {
      if (!res.ok) throw new Error("Sidebar not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("sidebar-container").innerHTML = html;

      // ✅ init after HTML is injected
      if (typeof initSidebar === "function") {
        initSidebar();
      }
    })
    .catch(err => console.error("Sidebar load error:", err));
});
