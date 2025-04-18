import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../src/main/resources/static",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      },
      "/logout": {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
    },
    },
  },
});
