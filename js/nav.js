var menu = document.getElementById("menu");
var menu_icon = document.getElementById("menu_icon");
function toggleMenu() {
    if (menu_icon.classList.contains("open")) {
        menu_icon.classList.remove("open");
        menu.classList.remove("open");
    } else {
        menu_icon.classList.add("open");
        menu.classList.add("open");
    }
}