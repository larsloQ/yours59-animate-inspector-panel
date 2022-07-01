// import { uglify } from 'rollup-plugin-uglify'
import commonjs from "rollup-plugin-commonjs";
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";

const config = [
  {
    input: 'animate.js',
    output: {
      file: '../../css/animate-core-blocks.css',
      format: 'es'
    },
    plugins: [
      postcss({
        modules: false,
        extract: true
      }),
      resolve({
        jsnext: true,
        browser: true,
      }),
      commonjs(),
      terser({
      	                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    compress: true,
                    keep_fnames: true,
                    keep_classnames: true,
                    toplevel: true,
                    mangle: {
                        keep_classnames: true,
                    }
      }),
    ],
  },
];

export default config