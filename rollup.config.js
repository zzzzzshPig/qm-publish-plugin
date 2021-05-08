import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import fs from 'fs'

// shelljs/shell.js存在require动态包，插件无法导入文件只能替换url，所以在这里覆盖掉shell.js的实现
fs.writeFileSync('./node_modules/shelljs/shell.js', fs.readFileSync('./src/shell.js'))

function baseConfig () {
    return {
        input: 'src/main.ts',
        output: {
            name: 'qm-publish-plugin',
            banner: '/* Author by zsh */',
            exports: 'named'
        },
        plugins: [
            commonjs(),
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
