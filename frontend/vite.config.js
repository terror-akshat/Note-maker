import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
    },
    host: true,
  },
  plugins: [react()],
});
