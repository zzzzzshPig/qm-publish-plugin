const prompts = require('prompts')
const shell = require('shelljs')
const fs = require('fs')
const pack = require('./package.json')

let nextVersion = pack.version.split('.')
nextVersion[nextVersion.length - 1] = Number(nextVersion[nextVersion.length - 1]) + 1
nextVersion = nextVersion.join('.')

async function init () {
    const _version = [{
        type: 'text',
        name: 'version',
        message: `当前版本${pack.version}`,
        initial: nextVersion
    }]

    const { version } = await prompts(_version)
    shell.echo('rollup building......')
    shell.exec('rollup -c')

    const _git = [
        {
            type: 'text',
            name: 'commit',
            message: 'Input Your git commit log',
            initial: `Update: ${version}`
        },
        {
            name: 'push',
            type: 'confirm',
            message: 'Can you push code?'
        }
    ]

    const { commit, push } = await prompts(_git)

    // 修改npm version
    fs.writeFileSync('./package.json', JSON.stringify({
        ...pack,
        version
    }, null, 4))

    shell.exec(`git commit -a -m "${commit}"`)
    shell.exec(`git tag -a ${version} -m "${version}"`)

    if (push) {
        shell.exec('git push origin --follow-tags')
        shell.exec('git push gitlab --follow-tags')
    }
}

init()
