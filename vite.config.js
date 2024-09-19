import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    build: {
      outDir: "static/react",
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "src/react/lastfm/index.jsx"),
        output: {
          entryFileNames: "lastfm.js",
          format: "iife",
          // Ensure no chunk files are generated
          manualChunks: undefined,
        },
      },
    },
    // Prevent Vite from copying public directory
    publicDir: false,
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
    },
  };
});
