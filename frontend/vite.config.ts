/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.join(__dirname, "/src") },
      { find: "@contexts", replacement: path.join(__dirname, "/src/contexts") },
    ],
  },
});
