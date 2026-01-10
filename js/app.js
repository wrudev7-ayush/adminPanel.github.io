const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

// function toggleSubMenu(button){

//   if(!button.nextElementSibling.classList.contains('show')){
//     closeAllSubMenus()
//   }

//   button.nextElementSibling.classList.toggle('show')
//   button.classList.toggle('rotate')

//   if(sidebar.classList.contains('close')){
//     sidebar.classList.toggle('close')
//     toggleButton.classList.toggle('rotate')
//   }
// }

function toggleSubMenu(button){

  const submenu = button.nextElementSibling;

  // Close only sibling submenus (same level)
  const parentUl = button.parentElement.parentElement;

  parentUl.querySelectorAll(':scope > li > .sub-menu.show').forEach(ul => {
    if (ul !== submenu) {
      ul.classList.remove('show');
      ul.previousElementSibling.classList.remove('rotate');
    }
  });

  submenu.classList.toggle('show');
  button.classList.toggle('rotate');

  // keep sidebar open on mobile
  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}




