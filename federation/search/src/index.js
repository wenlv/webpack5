// import("nav/Header").then((Header) => {
//     const body = document.createElement('div');
//     body.appendChild(Header.default());

//     document.body.appendChild(body);
// })

Promise.all([import('nav/Header'), import('home/HomeList')]).then(([{ default: Header }, {
    default: HomeList,
}]) => {
    document.body.appendChild(Header());
    document.body.innerHTML += HomeList(3);
})
