import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';

const input = './src/index.ts';

export default [
	// CommonJS
	{
		input,
		output: [
			{
				file: pkg.main,
				format: 'es'
			}
		],
		external: [
			...Object.keys(pkg.dependencies || {})
		],
		plugins: [
			babel({
				exclude: 'node_modules/**'
			}),
			typescript({
				typescript: require('typescript')
			}),
			terser() // minifies generated bundles
		]
	}
];