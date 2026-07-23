import "dotenv/config";
import jsconfigPaths from "vite-jsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [jsconfigPaths()],
	test: {
		globals: true,
		hookTimeout: 1000 * 60, // 60s
		fileParallelism: false,
	},
});
