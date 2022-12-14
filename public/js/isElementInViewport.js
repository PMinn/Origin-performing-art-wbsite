function isLiInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.top < (window.innerHeight || document.documentElement.clientHeight));
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}
export {isLiInViewport , isElementInViewport};