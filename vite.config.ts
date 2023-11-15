import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import { join } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(process.cwd(), 'src'),
    }
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        "run-at": 'document-start',
        version: '4.0.0',
        license: 'GPL-3.0',
        author: 'SublimeCT',
        icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
        name: 'CSDN 去广告沉浸阅读模式',
        namespace: 'SublimeCT',
        require: [
          'https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js',
        ],
        match: [
          '*://blog.csdn.net/*/article/details/*',
          // example 1: https://lgdsunday.blog.csdn.net/article/details/77644618?spm=1001.2014.3001.5502
          '*://*.blog.csdn.net/article/details/*',
        ],
        // include: [
        //   /https:\/\/\[\d\w]+\.iteye\.com\/blog\/\d+$/,
        //   /https:\/\/[\d\w]+\.iteye\.com\/news\/\d+$/,
        //   /https:\/\/ask\.csdn\.net\/questions\/\d+$/,
        // ]
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
