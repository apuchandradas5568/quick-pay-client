import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Set limit to 1000 kB
  },
  plugins: [react()],
});
