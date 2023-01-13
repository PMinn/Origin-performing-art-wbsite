import { isLiInViewport } from './isElementInViewport.js'

const checkInView = function () {
  document.querySelectorAll('.li[data-load="false"]').forEach(function (li, index) {
    if (isLiInViewport(li)) {
      li.dataset.load = 'true'
      setTimeout(function () {
        li.firstElementChild.style.left = '0'
      }, index * 200)
    }
  })
}

const liFunc = function () {
  checkInView()
  document.addEventListener('scroll', checkInView)
}

export default liFunc
