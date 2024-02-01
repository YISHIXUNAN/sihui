import './index.css'

async function getComponent() {

    const { default: common } = await import('./common.js');
    const element = document.createElement('div');

    // lodash 现在使用 import 引入。
    element.classList.add('hello');
    element.innerHTML = 'Hello Webpack--';
    console.log(common);
    return element;

}

getComponent().then((component) => {
    document.body.appendChild(component);
});
