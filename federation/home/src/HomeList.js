const HomeList = (num) => {
    let str = "<ui>"

    for (let i = 0; i < num; i++) {
        str += `<li>item${i}</li>`;
    }
    str += "</ul>";

    return str;
}

export default HomeList;