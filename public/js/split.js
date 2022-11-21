import { isElementInViewport, isLiInViewport } from './isElementInViewport.js';

function checkSplitElement() {
    document.querySelectorAll('.split').forEach(li => {
        if (isLiInViewport(li)) {
            li.firstElementChild.style.transform = 'translateZ(0)';
        } else {
            li.firstElementChild.style.transform = 'translateY(100%)';
        }
    })
};

const Split = function () {
    document.addEventListener('scroll', checkSplitElement);
    checkSplitElement();
};

export default Split;