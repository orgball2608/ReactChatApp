/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1E90FF',
                'simple-gray': '#131313',
                'dark-light': '#1a1a1a',
                'label-white': '#8f8f8f',
                'blue-button': '#2b09ff',
                'dark-header': '#151515',
                'border-conversations': '#5454543d',
                'modal-background': '#121212',
                'overlay-background': '#000000c4',
                'conversation-form': '#161616',
                'message-form': '#101010',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                Inter: ['Inter', 'sans-serif'],
            },
            invisible: ['group-hover'],
            width: {
                86: '21.5rem',
                88: '22rem',
                42: '10.5rem',
                18: '4.5rem',
                26: '6.5rem',
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                'side-out': {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'translateX(0)' },
                },
                'side-in': {
                    from: { transform: 'translateX(50%)' },
                    to: { transform: 'translateX(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.3s forwards',
                'fade-in-slow': 'fade-in 0.5s forwards',
                'side-out': 'side-out 0.2s forwards',
                'side-in': 'side-in 0.2s forwards',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
