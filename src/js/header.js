const mobileMenu = document.querySelector('.mobile-menu');
const openMenuButton = document.querySelector('.open-mobile-menu-btn');
const closeMenuButton = document.querySelector('.close-mobile-menu-btn');
const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');

mobileMenu.addEventListener('click', e => {
  e.stopPropagation();
});

function closeMenu() {
  mobileMenuWrapper.classList.remove('is-open');
  document.body.classList.remove('not-scrollable');
}


const toggleMenu = isOpen => {
  mobileMenuWrapper.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('not-scrollable', isOpen);
};

openMenuButton.addEventListener('click', () => toggleMenu(true));
closeMenuButton.addEventListener('click', () => toggleMenu(false));
mobileMenuWrapper.addEventListener('click', () => toggleMenu(false));