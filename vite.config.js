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
    server: {
        host: "127.0.0.1",
        port: 4000
    },
    base: './',
    build: {
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
    },
})
