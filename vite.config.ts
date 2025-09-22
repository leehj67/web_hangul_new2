import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/web_hangul_new2/',   // 레포 이름
  plugins: [react()],
  build: { outDir: 'docs' },
})
