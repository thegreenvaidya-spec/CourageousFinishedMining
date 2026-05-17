import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isBuild = process.env.NODE_ENV === "production" || process.argv.includes("build");

const rawPort = process.env.PORT;
const port = rawPort && !isNaN(Number(rawPort)) && Number(rawPort) > 0 ? Number(rawPort) : 5173;

const basePath = process.env.BASE_PATH || "/";

const plugins = [react(), tailwindcss()];

if (!isBuild && process.env.REPL_ID !== undefined) {
  const dynamicPlugins = async () => {
    const m1 = await import("@replit/vite-plugin-runtime-error-modal");
    const m2 = await import("@replit/vite-plugin-cartographer");
    const m3 = await import("@replit/vite-plugin-dev-banner");
    return [
      m1.default ? m1.default() : m1.runtimeErrorOverlay(),
      m2.cartographer({ root: path.resolve(import.meta.dirname, "..") }),
      m3.devBanner ? m3.devBanner() : m3.default(),
    ];
  };
}

export default defineConfig({
  base: basePath,
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
