import HomeList from "./homeList";

import("nav/Header").then((Header) => {
    const body = document.createElement('div');
    body.appendChild(Header.default());

    document.body.appendChild(body);
    document.body.innerHTML += HomeList(5);
})
