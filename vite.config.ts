import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// plugin
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
// autoimport
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
const pathSrc = resolve(__dirname, './src');

export default defineConfig({
  build: {
    outDir: 'vue_template',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {}
  },
  base: './',
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      less: { // antd-vue 主题自定义
        modifyVars: {
          'primary-color': '#009696',
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: process.env.NODE_ENV !== 'production',
    port: 3003,
    proxy: {
      '/api': { // 是否必须以/开头
        target: 'http://192.168.3.206:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 替换 请求url里的 /api 为 ''
        // headers: { // 转发的请求头
        //   'Cookie': 'satoken=d44a8105-34f4-4798-9348-5aa667589d5b',
        // },
      },
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver({
          importStyle: 'less',
        })
      ],
      dts: resolve(pathSrc, 'components.d.ts'),
    })
  ]
})
