const nav = function () {
    var isMenuOpen = false;
    const menu_icon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
    menu_icon.addEventListener('click', function () {
        if (isMenuOpen) {
            // menu_icon.querySelector('div:nth-child(1)').style.transform = 'rotateZ(0)';
            // menu_icon.querySelector('div:nth-child(1)').style.top = 'calc(50% - 5px)';
            // menu_icon.querySelector('div:nth-child(2)').style.transform = 'rotateZ(0)';
            // menu_icon.querySelector('div:nth-child(2)').style.top = 'calc(50% + 5px)';
            // document.getElementById('menu').style.opacity = '0';
            menu_icon.classList.remove('open');
            menu.classList.remove('open');
            setTimeout(() => {
                menu.style.display = 'none';
            }, 500);
            isMenuOpen = false;
        } else {
            // menu_icon.querySelector('div:nth-child(1)').style.transform = 'rotateZ(45deg)';
            // menu_icon.querySelector('div:nth-child(1)').style.top = '50%';
            // menu_icon.querySelector('div:nth-child(2)').style.transform = 'rotateZ(-45deg)';
            // menu_icon.querySelector('div:nth-child(2)').style.top = '50%';
            menu_icon.classList.add('open');
            menu.style.display = 'flex';
            setTimeout(() => {
                menu.classList.add('open');
                // menu.style.opacity = '1';
            }, 100);
            isMenuOpen = true;
        }
    });
};

export default nav;