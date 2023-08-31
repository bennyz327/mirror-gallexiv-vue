import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 官方文檔 https://vitejs.dev/config/
export default defineConfig(
    {
        server: {
            //端口
            port: 3100,
            //host設為true監聽所有地址
            host: '0.0.0.0',
            //端口被占用直接退出
            strictPort: true,
            //是否開啟https
            https: false,
            //跨域設定
            //cors: true,
            /*
            //回傳如下結構可以設定cors的規則
            // {
            //     "origin": "*",
            //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            //     "preflightContinue": false,
            //     "optionsSuccessStatus": 204
            // }
            */
        },
        plugins: [vue()],
        resolve: {
            // 在導入語句沒帶文件後綴時，webpack會自動按照順序添加後綴名查找文件是否存在
            extensions: [
                '.js',
                '.vue',
                '.json',
            ],
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },

    })
