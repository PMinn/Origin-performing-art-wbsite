function cursor() {
    var cursor_outer = document.createElement('div');
    function mousemove(e) {
        cursor_outer.classList.add('show');
        if (document.querySelectorAll('.pointer:hover').length > 0) {
            cursor_outer.style.transform = `scale(1.5)`;
            cursor_outer.style.top = `${e.clientY - 25}px`;
            cursor_outer.style.left = `${e.clientX - 25}px`;
            cursor_outer.style.opacity = '1';
            cursor_outer.style.backgroundColor = '#ffffff30';
        } else {
            cursor_outer.style.transform = `scale(1)`;
            cursor_outer.style.top = `${e.clientY - 25}px`;
            cursor_outer.style.left = `${e.clientX - 25}px`;
            cursor_outer.style.opacity = '0.8';
            cursor_outer.style.backgroundColor = 'transparent';
        }
    }
    if (window.innerWidth >= 480) {
        cursor_outer.classList.add('cursor');
        cursor_outer.appendChild(document.createElement('div'));
        document.body.appendChild(cursor_outer);
        window.addEventListener('mousemove', mousemove);
    }
}

export default cursor;