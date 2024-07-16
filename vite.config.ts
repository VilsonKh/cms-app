import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://sandbox.creos.me",
				changeOrigin: true,
				// rewrite: (path: any) => path.replace(/^\/api/, "/"),
        secure: false,
			},
		},
	},
});
