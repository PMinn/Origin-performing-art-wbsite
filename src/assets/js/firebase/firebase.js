import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js'

const app = initializeApp({
  apiKey: 'AIzaSyCQ-5t6Uzc9SvuvamD3wiEoHhiY_zMMxrM',
  authDomain: 'origin-performing-art.firebaseapp.com',
  databaseURL: 'https://origin-performing-art-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'origin-performing-art',
  storageBucket: 'origin-performing-art.appspot.com',
  messagingSenderId: '32164182626',
  appId: '1:32164182626:web:f98d68695e8b02c0542f3b',
  measurementId: 'G-5BMJEJHT05'
})

const analytics = getAnalytics(app)

export default app
export { analytics }
