import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	const env = loadEnv(mode, process.cwd());

	return {
		base: env.VITE_BASE_URL || "/",
		plugins: [reactRouter(), tsconfigPaths()],
	};
});
