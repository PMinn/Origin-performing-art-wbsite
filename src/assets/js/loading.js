export default function (auto = false) {
  this.deg = 0
  this.loop = null
  this.hide = function () {
    setTimeout(function () {
      document.getElementById('loading').classList.add('hide')
      clearInterval(this.loop)
    }, 1000)
  }
  if (auto) {
    window.addEventListener('load', this.hide)
  }
  return this
}
