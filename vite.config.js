import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/ghack_Assignment/",
  define: {
    'process.env': process.env 
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://ghackbackend.onrender.com', // Your Express server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Use true if your backend is served over HTTPS
      },
    },
  },
})
