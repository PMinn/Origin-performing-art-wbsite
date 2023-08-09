import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQ-5t6Uzc9SvuvamD3wiEoHhiY_zMMxrM",
  authDomain: "origin-performing-art.firebaseapp.com",
  databaseURL: "https://origin-performing-art-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "origin-performing-art",
  storageBucket: "origin-performing-art.appspot.com",
  messagingSenderId: "32164182626",
  appId: "1:32164182626:web:f98d68695e8b02c0542f3b",
  measurementId: "G-5BMJEJHT05"
};

const app = initializeApp(firebaseConfig);

async function fetchImage(url) {
  const storage = getStorage(app);
  return await getDownloadURL(ref(storage, url));
}

export { app, fetchImage };