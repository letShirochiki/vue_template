const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { vueTemplate, scssTemplate, tsRulesTemplate } = require('./template.cjs');

const resolve = (...file) => path.resolve(__dirname, ...file);
const log = (message) => console.log(chalk.green(`${message}`));
const successLog = (message) => console.log(chalk.blue(`${message}`));
const errorLog = (error) => console.log(chalk.red(`${error}`));

const generateFile = (path, data) => {
    if(fs.existsSync(path)) {
        errorLog(`${path}文件已存在`);
        return;
    }
    return new Promise((resolve, rejects) => {
        fs.writeFile(path, data, 'utf-8', err => {
            if(err) {
                errorLog(err.message);
                rejects(err);
            } else {
                resolve(true);
            }
        })
    })
}
function mkdirs(directory, callback) {
    const exists = fs.existsSync(directory);
    if(exists) {
        callback();
    } else {
        mkdirs(path.dirname(directory), () => {
            fs.mkdirSync(directory);
            callback();
        })
    }
}
function dotExistDirectoryCreate(directory) {
    return new Promise((resolve) => {
        mkdirs(directory, () => {
            resolve(true);
        })
    })
}

log('请输入要生成的页面组件名称、会生成在 views/ 目录下');
let componentName = '';
process.stdin.on('data', async chunk => {
    const inputName = String(chunk).trim();
    const componentPath = resolve('../../../src/views', inputName);
    const vueFile = resolve(componentPath, 'index.vue');
    const scssFile = resolve(componentPath, 'style.scss');
    const ruleFile = resolve(componentPath, `${inputName.toLowerCase()}.d.ts`);

    const hasComponentExists = fs.existsSync(componentPath);
    if(hasComponentExists) {
        errorLog(`${inputName}页面组件已存在, 请重新输入`)
        return
    } else {
        log(`正在生成 component 目录 ${componentPath}`);
        await dotExistDirectoryCreate(componentPath);
    }
    try {
        if(inputName.includes('/')) {
            const inputArr = inputName.split('/');
            componentName = inputArr.at(-1);
        } else {
            componentName = inputName;
        }
        log(`正在生成 vue 文件 ${vueFile}`);
        await generateFile(vueFile, vueTemplate(componentName));
        log(`正在生成 scss 文件 ${scssFile}`);
        await generateFile(scssFile, scssTemplate(componentName));
        log(`正在生成 .d.ts 文件 ${ruleFile}`);
        await generateFile(ruleFile, tsRulesTemplate(componentName));
        successLog('生成成功')
    } catch (e) {
        errorLog(e.message);
    }
    process.stdin.emit('end');
})
process.stdin.on('end', () => {
    log('exit');
    process.exit();
})
