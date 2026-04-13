import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "srcid.github.io/react-2048-game/",
  plugins: [react(), tailwindcss()],
});
