import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/web_hangul_new2/", // 레포 이름 맞춰야 함
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
