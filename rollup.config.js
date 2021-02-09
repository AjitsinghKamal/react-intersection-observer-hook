import typescript from "@rollup/plugin-typescript";
export default {
	input: "src/useObserver.tsx",
	output: [
		{
			file: "dist/bundle.cjs.js",
			format: "cjs",
			exports: "default",
		},
		{
			file: "dist/bundle.esm.js",
			format: "esm",
		},
	],
	plugins: [typescript()],
	external: ["react", "react-dom"],
};
