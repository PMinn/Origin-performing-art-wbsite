import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js';

function getURL(storage, path) {
    return getDownloadURL(ref(storage, path));
};

export { getStorage, getURL };