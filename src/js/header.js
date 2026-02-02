const mobileMenu = document.querySelector('.mobile-menu');
const openMenuButton = document.querySelector('.open-mobile-menu-btn');
const closeMenuButton = document.querySelector('.close-mobile-menu-btn');
const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
const navLinkFav = document.querySelector('.header-nav-link-fav');
const navLinkHome = document.querySelector('.header-nav-link-home');

const page = window.PAGE;

if (page === 'fav') {
  navLinkFav.classList.add('active');
}
if (page === 'home') {
  navLinkHome.classList.add('active');
}
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