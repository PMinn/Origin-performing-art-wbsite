import { isLiInViewport } from './isElementInViewport.js';

function checkInView() {
    document.querySelectorAll('.li[data-load="false"]').forEach((li, index) => {
        if (isLiInViewport(li)) {
            li.dataset.load = 'true';
            setTimeout(() => {
                li.firstElementChild.style.left = '0';
            }, index * 200);
        }
    })
}

const liFunc = function () {
    checkInView();
    document.addEventListener('scroll', checkInView);
};

export default liFunc;