import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({path: '../config.env'});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 3000, // Use the port from .env or default to 3000
  },
  define: {
    "process.env": {},
  },
  // build: {
  //   rollupOptions: {
  //     external: ['react-hook-form']
  //   }
  // }
});
