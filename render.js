const jsdom = require('jsdom');
const { JSDOM } = jsdom; // constructor for jsdom
const path = require('path');

const render = async (filename) => {
    console.log(filename, process.cwd())
    const filePath = path.join(process.cwd(), filename)

    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom);
        })
    })
};

module.exports = render;