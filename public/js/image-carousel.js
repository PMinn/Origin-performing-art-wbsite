import { Splide } from 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.esm.js';
import { Intersection } from 'https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-intersection@0.2.0/dist/js/splide-extension-intersection.esm.js';


export default function splide() {
    var renderImages = [];
    Promise.all(renderImages)
        .then(() => {
            var splide = new Splide('#image-carousel', {
                drag: false,
                height: '100vh',
                disabled: true,
                rewind: true,
                autoplay: 'pause',
                arrows: false,
                pagination: false,
                dots: false,
                interval: 8000,
                speed: 1000,
                pauseOnHover: false,
                focus: "center",
                intersection: {
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    inView: {
                        autoplay: true,
                        autoScroll: false
                    },
                    outView: {
                        autoplay: true,
                        autoScroll: false
                    }
                },
                autoScroll: {
                    pauseOnHover: false,
                    pauseOnFocus: false
                }
            });
            splide.mount({ Intersection });

            const timeLine = document.querySelectorAll('#timeline-img>div');
            timeLine[0].classList.add("active");
            splide.on('mounted move', function () {
                var index = splide.index;
                if (index == 0) {
                    timeLine.forEach(t => {
                        t.classList.remove("active")
                    })
                }
                setTimeout(() => {
                    timeLine[index].classList.add("active");
                }, 100)
            })
        })
}