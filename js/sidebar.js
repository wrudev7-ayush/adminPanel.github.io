let sidebar;
let toggleButton;

function initSidebar() {
  sidebar = document.getElementById('sidebar');
  toggleButton = document.getElementById('toggle-btn');
}

/* ===== SIDEBAR TOGGLE ===== */
function toggleSidebar() {
  if (!sidebar || !toggleButton) return;

  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  closeAllSubMenus();
}

/* ===== SUB MENU TOGGLE ===== */
function toggleSubMenu(button) {
  const submenu = button.nextElementSibling;
  if (!submenu) return;

  const parentUl = button.parentElement.parentElement;

  parentUl
    .querySelectorAll(':scope > li > .sub-menu.show')
    .forEach(ul => {
      if (ul !== submenu) {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
      }
    });

  submenu.classList.toggle('show');
  button.classList.toggle('rotate');

  if (sidebar.classList.contains('close')) {
    sidebar.classList.remove('close');
    toggleButton.classList.remove('rotate');
  }
}

function closeAllSubMenus() {
  document.querySelectorAll('#sidebar .sub-menu.show').forEach(menu => {
    menu.classList.remove('show');
    menu.previousElementSibling?.classList.remove('rotate');
  });
}
