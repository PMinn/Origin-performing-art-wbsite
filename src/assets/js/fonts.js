export default function () {
  window.addEventListener('load', function () {
    function appendCSS (styles) {
      var styleSheet = document.createElement('style')
      styleSheet.innerText = styles
      document.head.appendChild(styleSheet)
    }
    appendCSS(`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&family=Zen+Kurenaido&display=swap');
        .ENG {
            font-family: 'Zen Kurenaido', sans-serif;
        }
        .ZH {
            font-family: 'Noto Sans TC', sans-serif;
        }
    `)
  })
}
