import _lodash from 'lodash';

import test from './test';
import { testTs } from './typescript/testTs'

import imgSrc from './assets/img-1.png';
import imgSvg from './assets/webpack-logo.svg';
import helloTxt from './assets/hello.txt';
import jpgMap from './assets/qianfeng-sem.jpg';

import styles from './styles/index.css';
import global from './styles/index.global.css';
import './styles/index.less';

console.log(styles)
console.log(global)
testTs();

test();

const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);

const img2 = document.createElement('img');
img2.style.cssText = 'width:600px;height:300px';
img2.src = imgSvg;
document.body.appendChild(img2);

const txtDiv = document.createElement('div');
txtDiv.style.cssText = 'width:600px;height:300px;background:red';
txtDiv.classList.add(styles.blockImg);
txtDiv.textContent = helloTxt;
document.body.appendChild(txtDiv);

const img3 = document.createElement('img');
img3.style.cssText = 'width:600px;height:300px';
img3.src = jpgMap;
document.body.appendChild(img3);

document.body.classList.add(styles.hello);

const span = document.createElement('span');
span.classList.add(styles.icon);
span.innerHTML = '&#ex668;';
document.body.appendChild(span);

console.log(_lodash.join(['index', 'lodash', 'module'], ' '));

const divLoad = document.createElement('div');
divLoad.classList.add(global.btn);
divLoad.innerHTML = '点击添加';

divLoad.addEventListener('click', () => {
    // import('./math.js').then(({ add }) => {
    // import(/*webpackChunkName:'math',webpackPreload:true*/ './math.js').then(({ add }) => {
    import(/* webpackChunkName:'math',webpackPrefetch:true */ './math').then(({ add }) => {
        console.log(add(3, 4));
    });
});
document.body.appendChild(divLoad);
// if (module.hot) {
//     module.hot.access('/', () => { });
// }
