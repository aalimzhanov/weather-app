import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If deploying to GitHub Pages at https://<user>.github.io/weather-app,
// set base to '/weather-app/'. Adjust if your repo name differs.
export default defineConfig({
	base: "/weather-app/",
	plugins: [react()],
});
