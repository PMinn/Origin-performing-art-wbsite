import Splide from '@splidejs/splide'

export default function () {
  var splide = new Splide('#image-carousel', {
    drag: false,
    height: '100vh',
    disabled: true,
    rewind: true,
    autoplay: 'pause',
    arrows: false,
    pagination: false,
    dots: false,
    interval: 8000,
    speed: 1000,
    pauseOnHover: false,
    focus: 'center',
    intersection: {
      pauseOnHover: false,
      pauseOnFocus: false,
      inView: {
        autoplay: true,
        autoScroll: false
      },
      outView: {
        autoplay: true,
        autoScroll: false
      }
    },
    autoScroll: {
      pauseOnHover: false,
      pauseOnFocus: false
    }
  })
  splide.mount(window.splide.Extensions)

  const timeLine = document.querySelectorAll('#timeline-img>div')
  timeLine[0].classList.add('active')
  splide.on('mounted move', function () {
    var index = splide.index
    if (index == 0) {
      timeLine.forEach(function (t) {
        t.classList.remove('active')
      })
    }
    setTimeout(function () {
      timeLine[index].classList.add('active')
    }, 100)
  })
}
