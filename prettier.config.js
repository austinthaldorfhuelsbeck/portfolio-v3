/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: false,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	trailingComma: "all"
};

export default config;
