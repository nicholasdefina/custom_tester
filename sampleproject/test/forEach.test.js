const assert = require('assert');
const {forEach} = require('../index');

let nums;
beforeEach(() => {
    nums = [1,2,3];
});

it('should sum an array', () => {
    let total = 0;
    forEach(nums, (n) => {
        total += n;
    });

    assert.strictEqual(total, 6);

    nums.push(...[4,5,6])
})


it('beforeEach is run each time', () => {
    assert.deepStrictEqual(nums, [1,2,3]);
})