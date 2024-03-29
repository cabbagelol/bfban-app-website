import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        copy({
            targets: [{src: 'src/assets/images/*', dest: 'public/images'}],
        }),
    ],
    base: './',
    build: {
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
    },
})
