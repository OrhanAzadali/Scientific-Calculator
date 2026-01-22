import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    // content: ['./src/**/*.{html,js}'],

    server: {
        port: 3000,
    },

    plugins: [
        react(),
        tailwindcss(),
    ],

    resolve: {
        alias: {
            '@': './src',
        },
    },


    css: {
        postcss: './postcss.config.js'
    },

    build: {
        outDir: 'build', // CRA default was 'build', Vite default is 'dist'
    },

});


