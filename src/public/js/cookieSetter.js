const form = document.querySelector('#cookieForm');

form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    fetch('/cookies/getcookieuser', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(obj)
})
    .then(res => res.json())
    .then(res => console.log(res))

})

const getCookie = () => {
    console.log(document.cookie)
}
