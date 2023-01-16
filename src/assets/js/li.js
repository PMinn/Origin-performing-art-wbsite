import { isLiInViewport } from './isElementInViewport.js'

function checkInView() {
  document.querySelectorAll('.li[data-load="false"]').forEach((li, index) => {
    if (isLiInViewport(li)) {
      li.dataset.load = 'true';
      setTimeout(() => {
        li.firstElementChild.style.left = '0';
      }, index * 200)
    }
  })
}

export default {
  start: () => {
    checkInView();
    document.addEventListener('scroll', checkInView);
  },
  stop: () => {
    document.removeEventListener('scroll', checkInView);
    document.querySelectorAll('.li').forEach(li => {
      li.dataset.load = 'false';
      li.firstElementChild.style.left = '-100vw';
    })
  }
}
