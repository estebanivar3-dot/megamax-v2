import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"
import { fileURLToPath } from "url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib-entry.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime"] },
    outDir: "dist-lib",
  },
})
