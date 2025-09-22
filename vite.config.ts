import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwind from '@tailwindcss/vite'   // v4 쓰면 이거 추가

export default defineConfig({
  base: '/web_hangul_new/',   // ← 레포 이름과 일치!
  plugins: [react(), tailwind()],
  build: { outDir: 'docs' }
})
