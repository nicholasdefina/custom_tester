
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    const {value} = document.querySelector('input');
    const header = document.querySelector('h1');

    // dummy validate
    if (value.includes('@')) {
        header.innerHTML = 'All is well'
    } else {
        header.innerHTML = 'What have you done?'
    }
})
