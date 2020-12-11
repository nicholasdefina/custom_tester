

module.exports = {
    forEach(arr, func){
        for (let elem of arr) {
            func(elem);
        }
    }
}