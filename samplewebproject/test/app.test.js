const render = require("../../render");
const assert = require('assert');

it('has a text input', async () => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    assert(input)
})

it('shows success message on valid email', async () => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    const h1 = dom.window.document.querySelector('h1')
    assert.strictEqual(h1.innerHTML, '')
    input.value = 'test@test.com';
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
    assert.strictEqual(h1.innerHTML, 'All is well'); 
})

it('shows failure message on invalid email', async () => {
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    const h1 = dom.window.document.querySelector('h1')
    assert.strictEqual(h1.innerHTML, '')
    input.value = 'test.com';
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
    assert.strictEqual(h1.innerHTML, 'What have you done?'); 
})