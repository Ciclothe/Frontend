import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "socket.io-client": "socket.io-client/dist/socket.io.js",
      "xmlhttprequest-ssl":
        "./node_modules/engine.io-client/lib/xmlhttprequest.js",
      "@": path.resolve(__dirname, "src"),
    },
  },
});
