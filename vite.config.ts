import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // This is the base path of the project
  plugins: [react()],
  resolve: {
    alias: {
      "socket.io-client": "socket.io-client/dist/socket.io.js",
      "xmlhttprequest-ssl":
        "./node_modules/engine.io-client/lib/xmlhttprequest.js",
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist", // This is the output directory for the build
  },
});
