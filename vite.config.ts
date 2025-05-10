import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";
import path from "path"; 

export default defineConfig({
	build: {
		sourcemap: true,
		cssCodeSplit: false,
		chunkSizeWarningLimit: 2 ** 20,
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"), 
		},
	},
	plugins: [
		react(),
		visualizer({
			template: "treemap",
			filename: "stats.html",
			sourcemap: true,
			gzipSize: true,
		}),
	],
});

