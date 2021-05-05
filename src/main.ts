const prompts = require('prompts')
const shell = require('shelljs')
const fs = require('fs')

async function init () {
    const packPath = '../../package.json'
    const pack = require(packPath)

    // 获取最新版本号
    let nextVersion = pack.version.split('.')
    nextVersion[nextVersion.length - 1] = Number(nextVersion[nextVersion.length - 1]) + 1
    nextVersion = nextVersion.join('.')

    const _version = [{
        type: 'text',
        name: 'version',
        message: `当前版本${pack.version}`,
        initial: nextVersion
    }]

    const { version } = await prompts(_version)

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

    shell.echo('rollup building......')
    shell.exec('rollup -c')

    // 修改npm version
    fs.writeFileSync(packPath, JSON.stringify({
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
