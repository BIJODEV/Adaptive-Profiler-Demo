// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Adaptive-Profiler-Demo/', // Important for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
