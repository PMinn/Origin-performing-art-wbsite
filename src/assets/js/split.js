import { isLiInViewport } from './isElementInViewport.js'

const checkSplitElement = function () {
  document.querySelectorAll('.split').forEach(function (li) {
    if (isLiInViewport(li)) li.firstElementChild.style.transform = 'translateZ(0)'
    else li.firstElementChild.style.transform = 'translateY(100%)'
  })
}

export default function () {
  document.addEventListener('scroll', checkSplitElement)
  checkSplitElement()
}
