/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

colors.primary = '#EB5604';

// tahiti-gold
colors.secondary = {
    DEFAULT: '#eb7d05',
    '50': '#fff9eb',
    '100': '#ffeec6',
    '200': '#ffda88',
    '300': '#ffc249',
    '400': '#ffa920',
    '500': '#eb7d05',
    '600': '#dd6002',
    '700': '#b74006',
    '800': '#95300b',
    '900': '#7a280d',
    '950': '#461302',
}

// scarlet
colors.tertiary = {
    DEFAULT: '#f13007',
    '50': '#fff4ed',
    '100': '#ffe6d4',
    '200': '#ffc8a8',
    '300': '#ffa271',
    '400': '#ff7138',
    '500': '#fe4a11',
    '600': '#f13007',
    '700': '#c61f08',
    '800': '#9d1a0f',
    '900': '#7e1a10',
    '950': '#440906',
}

// gamboge
colors.quaternary = {
    DEFAULT: '#eb9d05',
    '50': '#fffceb',
    '100': '#fff6c6',
    '200': '#ffeb88',
    '300': '#ffdb49',
    '400': '#ffc820',
    '500': '#eb9d05',
    '600': '#dd7e02',
    '700': '#b75906',
    '800': '#95440b',
    '900': '#7a380d',
    '950': '#461c02',
}

// jaffa
colors.quinary = {
    DEFAULT: '#eb8853',
    '50': '#fdf6ef',
    '100': '#fbe9d9',
    '200': '#f7cfb1',
    '300': '#f1af80',
    '400': '#eb8853',
    '500': '#e5642a',
    '600': '#d74b1f',
    '700': '#b2391c',
    '800': '#8e2f1e',
    '900': '#73291b',
    '950': '#3e120c',
}

colors.gray = {
    '50': '#FAFAFA',
    '100': '#F5F5F5',
    '200': '#EEEEEE',
    '300': '#E0E0E0',
    '400': '#BDBDBD',
    '500': '#9E9E9E',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    '950': '#121212',
}

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors,
        extend: {},
    },
    plugins: [],
}