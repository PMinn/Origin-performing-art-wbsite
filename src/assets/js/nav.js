export default function () {
  this.isMenuOpen = false;


  this.show = () => {
    this.menu_icon.classList.add('open')
    this.menu.style.display = 'flex';
    this.isMenuOpen = true;
    setTimeout(() => {
      if (this.isMenuOpen) this.menu.classList.add('open');
    }, 100)
  }
  this.hidden = () => {
    this.menu_icon.classList.remove('open');
    this.menu.classList.remove('open');
    this.isMenuOpen = false;
    setTimeout(() => {
      if (!this.isMenuOpen) this.menu.style.display = 'none';
    }, 500)
  }

  document.addEventListener('DOMContentLoaded', () => {
    this.menu_icon = document.getElementById('menu-icon');
    this.menu = document.getElementById('menu');
    this.menu_icon.addEventListener('click', () => {
      if (this.isMenuOpen) this.hidden();
      else this.show();
    })
  })

  return this;
}