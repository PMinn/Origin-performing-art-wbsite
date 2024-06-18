
function Color(value) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    if (value) {
        if (typeof value === 'string') {
            if (value.startsWith('#')) {
                value = value.replace('#', '');
                if (value.length == 3) {
                    this.r = parseInt(value.substring(0, 1).repeat(2), 16);
                    this.g = parseInt(value.substring(1, 2).repeat(2), 16);
                    this.b = parseInt(value.substring(2, 3).repeat(2), 16);
                } else {
                    this.r = parseInt(value.substring(0, 2), 16);
                    this.g = parseInt(value.substring(2, 4), 16);
                    this.b = parseInt(value.substring(4, 6), 16);
                }
                if (value.length > 6) this.a = parseInt(value.substring(6, 8), 16);
            } else if (value.startsWith('rgba')) {
                const rgba = value.match(/\d+/g);
                this.r = parseInt(rgba[0]);
                this.g = parseInt(rgba[1]);
                this.b = parseInt(rgba[2]);
                this.a = parseInt(rgba[3]);
            } else if (value.startsWith('rgb')) {
                const rgb = value.match(/\d+/g);
                this.r = parseInt(rgb[0]);
                this.g = parseInt(rgb[1]);
                this.b = parseInt(rgb[2]);
            }
        } else if (Array.isArray(value)) {
            this.r = value[0];
            this.g = value[1];
            this.b = value[2];
            if (value.length > 3) this.a = value[3];

        }
    }
}

Color.prototype.clone = function () {
    return new Color(this.toRGBA());
}

Color.prototype.equals = function (color) {
    return this.r == color.r && this.g == color.g && this.b == color.b && this.a == color.a;
}

Color.prototype.relativeLuminance = function () {
    if (this.r == 0 && this.g == 0 && this.b == 0) return 0;
    const [r, g, b] = [this.r, this.g, this.b].map(channel => {
        if (channel / 255 <= 0.03928) return channel / 255 / 12.92;
        return ((channel / 255 + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

Color.prototype.getContrast = function (color) {
    const luminance1 = this.relativeLuminance();
    const luminance2 = color.relativeLuminance();
    if (luminance1 > luminance2) return (luminance1 + 0.05) / (luminance2 + 0.05);
    return (luminance2 + 0.05) / (luminance1 + 0.05);
}

Color.prototype.getContrastByRelativeLuminance = function (luminance1, luminance2) {
    if (luminance1 > luminance2) return (luminance1 + 0.05) / (luminance2 + 0.05);
    return (luminance2 + 0.05) / (luminance1 + 0.05);
}

Color.prototype.isDark = function () {
    return this.relativeLuminance() < 0.179;
}

Color.prototype.hslToRgb = function (h, s, l) {
    /**
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = Color.hueToRgb(p, q, h + 1 / 3);
        g = Color.hueToRgb(p, q, h);
        b = Color.hueToRgb(p, q, h - 1 / 3);
    }

    return [round(r * 255), round(g * 255), round(b * 255)];
}

Color.prototype.hueToRgb = function (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

// set

Color.prototype.setRGB = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    if (a) this.a = a;
}

Color.prototype.setHex = function (hex) {
    hex = hex.replace('#', '');
    this.r = parseInt(hex.substring(0, 2), 16);
    this.g = parseInt(hex.substring(2, 4), 16);
    this.b = parseInt(hex.substring(4, 6), 16);
    if (hex.length > 6) this.a = parseInt(hex.substring(6, 8), 16);
}

Color.prototype.setRGBString = function (rgbOrRgba) {
    const rgb = rgbOrRgba.match(/\d+/g);
    this.r = parseInt(rgb[0]);
    this.g = parseInt(rgb[1]);
    this.b = parseInt(rgb[2]);
    if (rgb.length > 3) this.a = parseInt(rgb[3]);
}

// to

Color.prototype.toHex = function (n) {
    return `${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${n == 8 || (!n && this.a < 255) ? this.a.toString(16).padStart(2, '0') : ''}`;
}

Color.prototype.toHexString = function () {
    return `#${this.toHex()}`;
}

Color.prototype.toRGB = function () {
    return [this.r, this.g, this.b];
}

Color.prototype.toRGBA = function () {
    return [this.r, this.g, this.b, this.a];
}

Color.prototype.toRGBString = function () {
    return `rgb(${this.toRGB().join(', ')})`;
}

Color.prototype.toRGBAString = function () {
    return `rgba(${this.toRGBA().join(', ')})`;
}

Color.prototype.toHSL = function () {
    const [r, g, b] = [this.r, this.g, this.b].map(channel => channel / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max == min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
    return [h, s, l];
}

Color.prototype.toHSLString = function () {
    const [h, s, l] = this.toHSL();
    return `hsl(${round(h * 360)}, ${round(s * 100)}%, ${round(l * 100)}%)`;
}

Color.prototype.toCMYK = function () {
    const [r, g, b] = [this.r, this.g, this.b].map(channel => channel / 255);
    const k = 1 - Math.max(r, g, b);
    if (k == 1) return [0, 0, 0, 1];
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);
    return [c, m, y, k];
}

export default Color;