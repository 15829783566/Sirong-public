/**
 * 上传小程序代码
 * 命令：node up 
 */
const ci = require('miniprogram-ci');
(async () => {
    const project = new ci.Project({
        appid: 'wx292************8d6d',
        type: 'miniProgram',
        projectPath: './dist/build/mp-weixin',
        privateKeyPath: './private-v22.key',
        ignores: ['node_modules/**/*'],
    })
    const uploadResult = await ci.upload({
        project,
        version: '1.0.0',
        desc: '体验版-wang',
        robot: 8,
        setting: {
            es6: true, // es6 转 es5
            es7: true, // 增强编译
            disableUseStrict: true,
            autoPrefixWXSS: true, // 上传时样式自动补全
            minifyJS: true,
            minifyWXML: true,
            minifyWXSS: true,
        },
    })
    console.log(uploadResult)
    console.log('发布成功！')
})()
