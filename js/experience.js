if (window.matchMedia("(min-width: 64rem)").matches) {
    window.addEventListener("load", () => {
        ScrollTrigger.create({
            trigger: "#s4",
            start: "top bottom",
            end: "bottom center",
            onUpdate: (self) => {
                let offset = self.progress - 0.65;
                document.querySelector("#s4 .text-outer").style.transform = `translateY(${-offset * 100}%)`;
            },
        });

        ScrollTrigger.create({
            trigger: "#s5",
            start: "top bottom",
            end: "bottom center",
            onUpdate: (self) => {
                let offset = self.progress - 0.65;
                document.querySelector("#s5 .text-outer").style.transform = `translateY(${-offset * 100}%)`;
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
    });
}