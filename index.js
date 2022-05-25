const fs = require('fs')

// cmds = [
//     {
//         title: 'NPM 获取 registry2',
//         code: `npm config get registry`,
//     },
//     {
//         title: 'NPM 设置 registry',
//         code: `npm config set registry https://registry.npmmirror.com`,
//     },
// ]

const dbPath = '/Users/yunser/.yunser/cmd-cli/list'
let cmds = []

window.exports = {
    'cmd': {
        mode: 'list',
        args: {
            // 进入插件时调用（可选）
            enter: (action, callbackSetList) => {
                const content = fs.readFileSync(dbPath, 'utf-8')
                cmds = content.split('\n').map(line => {
                    return {
                        title: line,
                        code: line,
                    }
                })
                // 如果进入插件就要显示列表数据
                callbackSetList(cmds.map(item => {
                    return {
                        title: item.title,
                        description: item.code,
                        // icon: '' // 图标(可选)
                        code: item.code,
                    }
                }))
            },
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            search: (action, searchWord, callbackSetList) => {
                // 获取一些数据
                // 执行 callbackSetList 显示出来
                callbackSetList(cmds.filter(item => {
                    return item.title.includes(searchWord) || item.code.includes(searchWord)
                }).map(item => {
                    return {
                        title: item.title,
                        description: item.code,
                        // icon: '', // 图标(可选)
                        code: item.code,
                    }
                }))
            },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                console.log('itemData', itemData)
                utools.copyText(itemData.code)
                window.utools.hideMainWindow()
                utools.showNotification('已复制')
                window.utools.outPlugin()
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "搜索"
        }
    }
}
