function LoadingPage(auto = false) {
    this.deg = 0;
    this.loop = null;
    this.hide = () => {
        setTimeout(() => {
            document.getElementById('loading').classList.add('hide');
            clearInterval(this.loop);
        }, 1000);
    };
    if (auto) {
        window.addEventListener("load", this.hide);
    }
    return this;
}

export default LoadingPage;