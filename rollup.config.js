import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

function baseConfig () {
    return {
        input: 'src/main.ts',
        output: {
            name: 'qm-publish-plugin',
            banner: '/* Author by zsh */',
            exports: 'named'
        },
        plugins: [
            commonjs({
                ignore: ['conditional-runtime-dependency']
            }),
            terser(),
            typescript()
        ],
        external: []
    }
}

const cjs = baseConfig()
cjs.output.format = 'cjs'
cjs.output.file = 'dist/index.js'
cjs.plugins.push(
    nodeResolve()
)

export default [
    cjs
]
