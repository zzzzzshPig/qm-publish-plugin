import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-polyfill-node'

function baseConfig () {
    return {
        input: 'src/main.ts',
        output: {
            name: 'qm-rollup-template',
            banner: '/* Author by zsh */'
        },
        plugins: [
            terser(),
            typescript()
        ],
        external: []
    }
}

const umd = baseConfig()
umd.output.format = 'umd'
umd.output.file = 'dist/index.browser.js'
umd.plugins.push(
    nodeResolve({
        browser: true,
        preferBuiltins: false
    }),
    nodePolyfills()
)

const esm = baseConfig()
esm.output.format = 'esm'
esm.output.file = 'dist/index.esm.js'
esm.plugins.push(
    nodeResolve()
)

export default [
    umd,
    esm
]
