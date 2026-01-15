/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,js, jsx,ts,tsx}'];
export const theme = {
    extend: {
        // Extend colors for glow effect
        colors: {
            glow: '#0ff', // neon-like glow
        },
        boxShadow: {
            'glow-sm': '0px 0 24px rgba(80, 175, 155, 0.6)',
            'glow-md': '0 10px 110px rgba(10, 025, 115, 0.8)',
            'glow-lg': '0 30px 150px rgba(110, 125, 215, 1)',
        },
        textShadow: {
            glow: '10px 4px 4px rgba(230,125,255,0.7)',
        },
        keyframes: {
            glow: {
                '0%, 100%': { textShadow: '0 0 10px #34d399, 0 0 20px #10b981' },
                '40%': { textShadow: '0 0 20px #34d399, 0 0 40px #10b981' },
            },
        },
        animation: {
            glow: 'glow 500s infinite',
        },
    },
};
export const plugins = [
    require('tailwindcss-textshadow'), // optional plugin for text glow
];