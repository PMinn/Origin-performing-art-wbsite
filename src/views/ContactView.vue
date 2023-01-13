<template>
    <div>
        <h1 class="ZH">聯絡我們</h1>
        <div id="content">
            <a href="/instagram" class="ENG anchor social-link right instagram pointer" target="_blank">
                <div class="contact-logo">
                    <img src="@/assets/media/instagram.svg" alt="">
                </div>
                <span>@origin_performing_art</span>
            </a>
            <a href="/facebook" class="ENG anchor social-link left facebook pointer" target="_blank">
                <div class="contact-logo">
                    <img src="@/assets/media/facebook.svg" alt="">
                </div>
                <span>OriginPerformingArt</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactView'
}
</script>

<style scoped>
h1 {
    margin-top: 2rem;
    margin-bottom: 4rem;
    text-align: center;
    font-weight: 400;
    color: #fff;
}

#content {
    width: 70vw;
    height: 70vh;
    color: #fff;
    margin: 2vh auto;
    display: flex;
    justify-content: space-evenly;
}

.contact-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(145deg, #f8691c, #eb5604);
    box-shadow: 2px 2px 6px #eb5c0f, -2px -2px 6px #fa742c;
    width: 80px;
    height: 80px;
    z-index: 2;
}

.contact-logo>img {
    width: 50%;
    height: 50%;
    object-fit: contain;
}

.social-link {
    display: flex;
    align-items: center;
    align-self: flex-start;
    margin-bottom: 1.5rem;
    text-decoration: none;
    justify-content: space-around;
    flex-direction: column;
}

.social-link>span {
    font-size: 1rem;
    letter-spacing: 0.125rem;
    font-weight: 400;
    background-color: #fff;
    color: #000;
    padding: 7vh 5vw;
    border-radius: 10px;
    transform: translateY(-30px);
    z-index: 1;
    box-shadow: 0 0 10px #fff;
    text-align: center;
}

.social-link>span::before {
    white-space: pre;
    font-weight: 800;
}

.instagram.social-link>span::before {
    content: 'instagram\a\a';
}

.facebook.social-link>span::before {
    content: 'facebook\a\a';
}

@media only screen and (max-width: 480px) {
    #content {
        display: block;
    }

    .contact-logo {
        height: 13vw;
        width: 13vw;
    }

    .social-link:nth-child(odd) {
        flex-direction: row;
    }

    .social-link:nth-child(even) {
        flex-direction: row-reverse;
    }

    .social-link>span {
        background-color: transparent;
        color: #fff;
        box-shadow: none;
        padding: 0;
        transform: none;
    }

    .social-link>span::before {
        display: none;
    }
}
</style>
