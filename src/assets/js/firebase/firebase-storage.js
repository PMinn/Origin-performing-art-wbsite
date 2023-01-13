import { getStorage, ref, getDownloadURL, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js'

function getURL (storage, path) {
  return getDownloadURL(ref(storage, path))
};

function uploadBytes (storage, path, file) {
  return uploadBytes(ref(storage, path), file)
}

export { getStorage, getURL, uploadBytes }
