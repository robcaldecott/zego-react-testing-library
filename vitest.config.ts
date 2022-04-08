/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./components"),
      "@/mocks": path.resolve(__dirname, "./mocks"),
      "@/queries": path.resolve(__dirname, "./queries"),
      "@/utils": path.resolve(__dirname, "./utils"),
      "@/providers": path.resolve(__dirname, "./providers"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["setupTests.ts"],
  },
});
