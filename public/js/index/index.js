import loadFonts from './fonts.js';
import nav from './nav.js';
import split from './split.js';
import liFunc from './li.js';

import app from './firebase.js';

import splide from './image-carousel.js';
// import notification from './js/firebase-notification.js';

import LoadingPage from './loading.js';

loadFonts();
nav();
const loadingPage = new LoadingPage(true);

function start() {
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        window.scroll(0, 0);
        split();
        // imgRun();
        // notification('home');
        liFunc();
    }, 1000);
}

function imgRun() {
    var index = 0;
    var imgs = document.querySelectorAll('#background-img img');
    var times = document.querySelectorAll('#timeline-img>div');

    function nextImage() {
        imgs[index].classList.add('show');
        times[index].classList.add('active');
        index++;
        if (index == imgs.length) {
            setTimeout(() => {
                imgs.forEach(img => {
                    img.classList.remove('show');
                });
                for (let i = 0; i < times.length; i++) {
                    setTimeout(() => {
                        times[i].classList.add('unactive');
                        times[i].classList.remove('active');
                        setTimeout(() => {
                            times[i].classList.remove('unactive');
                        }, 200)
                    }, 200 * (times.length - 1 - i));
                }
            }, 8000);
            index = 0;
        }
    };
    nextImage();
    setInterval(nextImage, 9000);
}
// document.addEventListener("DOMContentLoaded", start);
window.addEventListener("load", start);
document.addEventListener('DOMContentLoaded', splide);
