window.addEventListener("load", () => {
    const cover_img = document.getElementById("cover_img");
    ScrollTrigger.create({
        trigger: "#cover_text",
        start: "top top",
        end: "max",
        pin: true,
        pinSpacing: false,
    });

    ScrollTrigger.create({
        trigger: "#cover",
        start: "top top",
        end: "bottom",
        onUpdate: (self) => {
            cover_img.style.opacity = 1 - self.progress;
            cover_img.style.transform = `translateY(${self.progress * 100}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s1",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s1 .text-outer").style.transform = `translateY(${-offset * 100}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s2",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s2 .text-outer").style.transform = `translateY(${-offset * 100}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s3",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s3 .text-outer").style.transform = `translateY(${-offset * 100}vh)`;
        },
    });

    let panelsContainer = document.querySelector("#panels-container");
    gsap.to(gsap.utils.toArray("#panels-container .panel"), {
        x: () => -1 * (panelsContainer.scrollWidth - innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: "#panels-container",
            pin: true,
            start: "top top",
            scrub: 1,
            // snap: {
            //  snapTo: 1 / (panels.length - 1),
            //  inertia: false,
            //  duration: {min: 0.1, max: 0.1}
            // },
            end: () => "+=" + (panelsContainer.scrollWidth - innerWidth),
        },
    });

    ScrollTrigger.create({
        trigger: "#s6",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s6 .text-outer>div>h2").style.transform = `translateY(${-offset * 100}vh)`;
            document.querySelector("#s6 .text-outer>div>h3").style.transform = `translateY(${-offset * 50}vh)`;
            document.querySelector("#s6 .text-outer>hr").style.transform = `translateY(${-offset * 100}vh)`;
            document.querySelector("#s6 .text-outer>p").style.transform = `translateY(${-offset * 100}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s7",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s7 .text-outer>img").style.transform = `translateY(${-offset * 100}vh)`;
            document.querySelector("#s7 .text-outer>div>h2").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s7 .text-outer>div>hr").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s7 .text-outer>div>p").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s7 .text-outer>div>h3").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s7 .text-outer>div>img").style.transform = `translateY(${-offset * 50}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s8",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s8 .text-outer>h2").style.transform = `translateY(${-offset * 100}vh)`;
            document.querySelector("#s8 .text-outer>hr").style.transform = `translateY(${-offset * 100}vh)`;
            document.querySelector("#s8 .text-outer>p").style.transform = `translateY(${-offset * 100}vh)`;
            document.querySelector("#s8 .text-outer>div").style.transform = `translateY(${-offset * 50}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s9",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s9 .text-outer>div").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s9 .text-outer>hr").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s9 .text-outer>p").style.transform = `translateY(${-offset * 10}vh)`;
            document.querySelector("#s9 .text-outer>h3").style.transform = `translateY(${-offset * 150}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s10",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s10 .text-outer").style.transform = `translateY(${-offset * 100}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s11",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s11 .text-outer>h2").style.transform = `translateY(${-offset * 50}vh)`;
            document.querySelector("#s11 .text-outer>hr").style.transform = `translateY(${-offset * 50}vh)`;
            document.querySelector("#s11 .text-outer>p").style.transform = `translateY(${-offset * 50}vh)`;
            document.querySelector("#s11 .text-outer>h3").style.transform = `translateY(${-offset * 150}vh)`;
        },
    });

    ScrollTrigger.create({
        trigger: "#s12",
        start: "top bottom",
        end: "bottom center",
        onUpdate: (self) => {
            let offset = self.progress - 0.65;
            document.querySelector("#s12 .text-outer").style.transform = `translateY(${offset * 50}vh)`;
        },
    });

});
