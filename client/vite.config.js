import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    headers: {
      "Content-Security-Policy": "connect-src 'localhost:3000'",
    },
  },
  plugins: [react()],
});
