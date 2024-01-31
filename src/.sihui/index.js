import './index.css'

function component() {
    const element = document.createElement('div');

    // lodash 现在使用 import 引入。
    element.classList.add('hello');

    return element;
}



document.body.appendChild(component());