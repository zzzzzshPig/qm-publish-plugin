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
            terser(),
            typescript()
        ],
        external: []
    }
}

const esm = baseConfig()
esm.output.format = 'esm'
esm.output.file = 'dist/index.js'
esm.plugins.push(
    nodeResolve()
)

export default [
    esm
]
