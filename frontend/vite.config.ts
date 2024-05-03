import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {
      // REACT_APP_BACKEND_URL: "http://localhost:5000"
      REACT_APP_BACKEND_URL: "https://nourishnet-2eyc.onrender.com"
      // REACT_APP_BACKEND_URL: "https://nourish-net-three.vercel.app"
    }
  }
});
