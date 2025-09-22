// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwind from '@tailwindcss/vite'   // ⭐ Tailwind v4 전용 Vite 플러그인

export default defineConfig({
  // 레포 이름과 반드시 일치 (예: web_hangul_new2)
  base: '/web_hangul_new2/',
  plugins: [react(), tailwind()],
  build: { outDir: 'docs' },               // GitHub Pages가 /docs를 보도록
})
