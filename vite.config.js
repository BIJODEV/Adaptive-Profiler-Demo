import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Adaptive-Profiler-Demo/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true
  }
})
