import { initializeApp } from "firebase/app";
import { getStorage, ref as storage_ref, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as database_ref, get, query as database_query, orderByChild, startAt, limitToFirst } from "firebase/database";
import { getFirestore, collection, query as firestore_query, where, getDocs, doc, getDoc } from "firebase/firestore";

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

async function fetchFileURL(storage, path) {
  return await getDownloadURL(storage_ref(storage, path));
}

async function fetchImage(url) {
  const storage = getStorage(app);
  return await fetchFileURL(storage, url);
}

async function fetchBlogList() {
  const database = getDatabase(app);
  const storage = getStorage(app);
  var blogList = [];
  const order = database_query(database_ref(database, 'blogs'), orderByChild('date'));
  // const filter = database_query(order, startAt(startIndex), limitToFirst(10));
  const data = await get(order).then(async snapshot => await snapshot.val());
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    var d = data[keys[i]];
    d.oid = keys[i];
    d.img = await fetchFileURL(storage, d.img);
    blogList.push(d);
  }
  return blogList;
}

async function fetchBlog({ id }) {
  try {
    const storage = getStorage(app);
    const db = getFirestore(app);

    const docSnap = await getDoc(doc(db, 'blog', id));
    if (docSnap.exists()) {
      var blog = docSnap.data();
      blog.img = await fetchFileURL(storage, blog.img);
      blog.html = blog.html.replaceAll('\\n', '\n');
      blog.code = 200;
      return blog;
    }
  } catch (e) {
    return {
      error: e,
      code: 500
    };
  }
  return {
    code: 404,
    error: 'No such document!'
  };
}

export { app, fetchImage, fetchBlogList, fetchBlog };