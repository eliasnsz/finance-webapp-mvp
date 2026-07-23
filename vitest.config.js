import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		setupFiles: "tests/setup.js",
		hookTimeout: 1000 * 60, // 60s
		fileParallelism: false,
	},
});
