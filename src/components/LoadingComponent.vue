<template>
    <div id="loading" v-bind:class="{ hidden }">
        <div>
            <div id="logo">
                <img src="@/assets/media/Logo.png" width="100" height="100" alt="" loading="eager">
            </div>
            <div id="circle">
                <img src="@/assets/media/load-circle.png" width="323" height="323" alt="" loading="eager">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingComponent',
    props: ['hidden']
}
</script>

<style scoped>
#loading {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    overflow: hidden;
    z-index: 100;
    will-change: transform;
    transition: all 1s 0s;
    transform: translateY(0);
}

#loading.hidden {
    transform: translateY(-100%);
}

#loading>div {
    width: 200px;
    height: 200px;
    margin: calc(50vh - 100px) calc(50vw - 100px);
    position: relative;
}

#logo {
    position: absolute;
    top: 50px;
    left: 50px;
    transform: rotateY(0);
    animation: logoRotate 10s linear infinite;
}

#logo>img {
    width: 100px;
    height: 100px;
}

#circle {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateZ(0);
    animation: circleRotate 10s linear infinite;
}

#circle>img {
    width: 200px;
    height: 200px;
}

@keyframes logoRotate {
    from {
        transform: rotateY(0);
    }

    25% {
        transform: rotateY(90deg);
    }

    50% {
        transform: rotateY(180deg);
    }

    75% {
        transform: rotateY(270deg);
    }

    to {
        transform: rotateY(360deg);
    }
}

@keyframes circleRotate {
    from {
        transform: rotateZ(0);
    }

    25% {
        transform: rotateZ(90deg);
    }

    50% {
        transform: rotateZ(180deg);
    }

    75% {
        transform: rotateZ(270deg);
    }

    to {
        transform: rotateZ(360deg);
    }
}
</style>
