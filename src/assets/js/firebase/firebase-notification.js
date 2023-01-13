import { getRemoteConfig, fetchAndActivate, getValue } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-remote-config.js'

export default function notification (page) {
  const remoteConfig = getRemoteConfig()
  remoteConfig.settings.minimumFetchIntervalMillis = 300000// 3600000
  const notificationBar = document.getElementById('notification-bar')
  fetchAndActivate(remoteConfig)
    .then(() => {
      const val = getValue(remoteConfig, 'notification_bar_' + page)
      const text = val.asString()
      console.log(val)
      if (text) {
        function closeNotification () {
          notificationBar.classList.remove('show')
          notificationBar.querySelector('img').removeEventListener('click', closeNotification)
        }
        notificationBar.querySelector('div').innerText = text
        notificationBar.classList.add('show')
        notificationBar.querySelector('img').addEventListener('click', closeNotification)
      }
    })
    .catch((err) => {
      console.error('error')
    })
}
