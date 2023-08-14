import { initializeApp } from "firebase/app";
import { getStorage, ref as storage_ref, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as database_ref, get, query as database_query, orderByChild, limitToLast, startAt, endBefore, limitToFirst, child, startAfter, orderBy } from "firebase/database";
import { getFirestore, collection, query as firestore_query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { type } from "os";

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

async function fetchEventList({ before }) {
  try {
    var eventList = [];
    const database = getDatabase(app);
    const storage = getStorage(app);
    var order = database_query(database_ref(database, 'events'), orderByChild('sort'));
    var filter = database_query(order, endBefore(before), limitToLast(10));
    const data = await get(filter).then(async snapshot => await snapshot.val());
    const keys = Object.keys(data);
    console.log(data)
    for (let i = 0; i < keys.length; i++) {
      if (typeof data[keys[i]] != 'object') continue; // 避免處理maxSort
      var d = data[keys[i]];
      d.oid = keys[i];
      d.image = await fetchFileURL(storage, d.image);
      eventList.push(d);
    }
    eventList.sort((a, b) => b.sort - a.sort);
  } catch (e) {
    console.log(e)
  }
  return eventList;
}

async function fetchEvent({ id }) {
  try {
    const storage = getStorage(app);
    const db = getFirestore(app);

    const docSnap = await getDoc(doc(db, 'event', id));
    if (docSnap.exists()) {
      var event = docSnap.data();
      event.image = await fetchFileURL(storage, event.image);
      event.html = event.html.replaceAll('\\n', '\n');
      event.lists = event.lists.map(list => {
        var start = list.start.toDate();
        var end = list.end.toDate();
        list.timeString = `${start.getMonth() + 1}/${start.getDate()} - ${end.getMonth() + 1}/${end.getDate()}, ${start.getFullYear()} ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
        return list;
      })
      event.code = 200;
      return event;
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

async function fetchDatabase(path) {
  const database = getDatabase(app);
  return await get(child(database_ref(database), path)).then(snapshot => snapshot.val());
}

// async function fetchStorageByPath(path) {
//   const storage = getStorage(app);
//   return await fetchFileURL(storage, path);
// }

async function fetchStorageMutipleByPaths(paths) {
  const storage = getStorage(app);
  return await Promise.all(paths.map(async path => await fetchFileURL(storage, path)));
}

export { app, fetchImage, fetchBlogList, fetchBlog, fetchEventList, fetchEvent, fetchDatabase, fetchStorageMutipleByPaths };