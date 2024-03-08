import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			scale: {
				101: "1.01",
				102: "1.02",
				103: "1.03",
				104: "1.04",
			},
		},
	},
	plugins: [],
} satisfies Config;
