import * as promisePath from 'promise-path'
import * as pathTool from 'path'
import * as globby from 'globby'
import * as   ioHelper from 'io-helper'
import common from './common'
const { exit, prompt, confirm } = common;

function joinArr(arr, prefix) {
    return arr.map((n) => {
        return pathTool.join(prefix, n)
    });
}
export default {
    /**
     * 启动
     */
    async start(data) {
        console.log(`\n*******replacePattern:${data.replacePattern}*******\n`)
        const params = [];
        let count = 0;
        globby([data.pattern], { cwd: common.cwd, dot: true, ignore: ['**/node_modules/**/*'] }).then(async (paths) => {
            for (let p of paths) {
                console.log(`路径${++count}:`, p)
                let dirname = pathTool.dirname(p)
                //与执行命令所在路径拼接
                dirname = pathTool.join(common.cwd, dirname)
                let pathData = this.getPathData(p)
                let newFilename = this.replaceWithData(data.replacePattern, pathData)
                params.push([dirname, pathData.full, newFilename])
            }
        }).then(() => {
            if (params.length == 0) {
                console.log(`\n ***未匹配到文件*** \n`)
                return
            }
            //测试模式不执行
            if (data.test == 'no') {
                return confirm('\n 确认开始执行重命名操作')
            }
        }).
            then((ensure = '') => {
                return ensure.indexOf('y') != -1
            }).
            then((ok) => {
                if (ok) {
                    const promises = params.map(n => {
                        return ioHelper.renameAsync.apply(null, n)
                    })
                    console.log(`\n 正在重命名${promises.length}个文件 \n`)
                    return Promise.all(promises)
                }
            })
            .then(() => {
                console.log(`\n 完成!\n `);
                exit()
            });

    },
    replaceWithData(str, data) {
        Object.keys(data).forEach((key) => {
            str = str.replace(new RegExp(`\\[(${key})\\]`, 'ig'), (strItem, $1, index, str) => {
                return data[key]
            })
        })
        return str
    },
    getPathData(dir) {
        let full = pathTool.basename(dir);
        let ext = pathTool.extname(dir);
        let name = pathTool.basename(dir, ext)
        return { full, ext, name }
    }
}