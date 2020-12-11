const fs = require('fs');
const chalk = require('chalk');
const { lstat } = fs.promises;
const path = require('path');

const render = require('./render')

const ignoredDirs = ['node_modules'];


class Runner {
    constructor() {
        this.testFiles = [];
    }
    async collectFiles(targetPath) {
        // top level files
        const files = await fs.promises.readdir(targetPath)

        for (let file of files) {
            const filePath = path.join(targetPath, file)
            const stats = await lstat(filePath)
            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({ name: filePath, shortName: file });
            } else if (stats.isDirectory() && !ignoredDirs.includes(file)) {
                const childFiles = await fs.promises.readdir(filePath);
                files.push(...childFiles.map((f) => path.join(file, f)))
            }
        }
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.grey(`-----Running tests on ${file.shortName}-----`))
            global.render = render;
            const beforeEaches = [];
            global.beforeEach = (func) => { // global is like 'window' in browser. avail to all files and shareable between all
                beforeEaches.push(func)
            }
            global.it = async (desc, func) => {
                beforeEaches.forEach((fn) => fn());
                try {
                    await func();
                    console.log(chalk.green(`\tPASSED: ${desc}`))
                } catch (error) {
                    const message = error.message.replace(/\n/g, '\n\t\t');
                    console.log(chalk.red(`\tFAILED: ${desc}. ${message}`));
                }
            
            }
            try {
                require(file.name);
            } catch (error) {
                console.log(chalk.red(error));
            }
            
        }
    }
}

module.exports = Runner;