function nav() {
    var isMenuOpen = false;
    const menu_icon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
    menu_icon.addEventListener('click', function () {
        if (isMenuOpen) {
            menu_icon.classList.remove('open');
            menu.classList.remove('open');
            isMenuOpen = false;
            setTimeout(() => {
                if (!isMenuOpen) menu.style.display = 'none';
            }, 500);
        } else {
            menu_icon.classList.add('open');
            menu.style.display = 'flex';
            isMenuOpen = true;
            setTimeout(() => {
                if (isMenuOpen) menu.classList.add('open');
            }, 100);
        }
    });
};

export default nav;