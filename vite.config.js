import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  chainWebpack: config => {
  	config.resolve.alias.set('@', resolve('./src'))
  		.set('@page', resolve('./src/pages'))
  		.set('@cmp', resolve('./src/components'))
  		
  }
})
