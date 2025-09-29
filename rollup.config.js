import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/ha-grow-box-card.ts',
  output: {
    file: 'dist/ha-grow-box-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      declaration: false,
    }),
    ...(process.env.ROLLUP_WATCH ? [serve({ contentBase: ['dist'] })] : []),
  ],
};