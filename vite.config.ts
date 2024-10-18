import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'

// 安装 vite-plugin-electron 的时候，就同时安装了 vite-plugin-electron-renderer
import electronRender from 'vite-plugin-electron-renderer'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // 设置代理目标
        changeOrigin: true, // 是否改变请求源地址
        rewrite: (path) => path.replace(/^\/api/, '') // 将 /api 替换为空字符串
      }
    }
  },
  plugins: [
    vue(),
    
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }), electronRender()
  ],
   build: {
    rollupOptions: {
      external: ['sqlite3'],  // 如果使用 sqlite3，请确保这里的包名正确
    },
  },
})


