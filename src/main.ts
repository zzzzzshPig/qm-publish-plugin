const prompts = require('prompts')
const shell = require('shelljs')
const fs = require('fs')

async function init () {
    const pack = require('../../package.json')

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

    shell.echo('write package.json start')

    // 修改npm version
    fs.writeFileSync('./package.json', JSON.stringify({
        ...pack,
        version
    }, null, 4))

    shell.echo('write package.json success')

    shell.echo('write README.md start')

    // 尝试修改README中的版本号
    let readMe = fs.readFileSync('./README.md').toString()
    readMe = readMe.replace(/#\d+\.\d+\.\d+/, `#${version}`)
    fs.writeFileSync('./README.md', readMe)

    shell.echo('write README.md success')

    shell.exec(`git commit -a -m "${commit}"`)
    shell.exec(`git tag -a ${version} -m "${version}"`)

    if (push) {
        shell.exec('git push origin --follow-tags')
        shell.exec('git push gitlab --follow-tags')
    }
}

init()
