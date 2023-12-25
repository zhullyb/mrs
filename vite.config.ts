import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default () => {
  process.env = { ...process.env, ...loadEnv(process.cwd(),'') };

  const config = {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
  return defineConfig(config)
};
