#!/usr/bin/env node --harmony

let yargs = require('yargs')
import startCommand from './command/start'
let argv = yargs
    .command('start', '展现列表', {
        pattern: {
            alias: ['p'],
            default: '**/*.*',
            describe: '匹配模式-glob **/*.*'
        },
        replacePattern: {
            alias: ['r'],
            default: '',
            describe: '重命名模式:[name],[ext],[full]'
        },
        test: {
            alias: ['t'],
            default: '',
            describe: '测试 而不执行'
        }
    },
    (argv) => {
        startCommand.start(argv)
    })
    .help()
    .argv

if (!argv._.length) {
    yargs.showHelp()
}