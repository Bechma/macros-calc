import type { Config } from "@react-router/dev/config";

export default {
	// Config options...
	// Server-side render by default, to enable SPA mode set this to `false`
	ssr: false,
	prerender: true,
	basename: "/macros-calc/", // github pages
} satisfies Config;
