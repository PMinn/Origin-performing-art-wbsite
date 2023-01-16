import { isLiInViewport } from './isElementInViewport.js'

function checkSplitElement() {
  document.querySelectorAll('.split').forEach(li => {
    if (isLiInViewport(li)) li.firstElementChild.style.transform = 'translateZ(0)'
    else li.firstElementChild.style.transform = 'translateY(100%)'
  })
}

export default {
  start: function () {
    checkSplitElement();
    document.addEventListener('scroll', checkSplitElement);
  },
  stop: function () {
    document.removeEventListener('scroll', checkSplitElement);
    document.querySelectorAll('.split').forEach(li => li.firstElementChild.style.transform = 'translateY(100%)');
  }
}