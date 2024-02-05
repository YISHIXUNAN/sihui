

import _ from 'lodash';
import './index.less';
import print from './print.js';



async function getComponent() {

    const { default: common } = await import('./common.js');
    const element = document.createElement('div');

    // lodash 现在使用 import 引入。
    element.classList.add('hello');
    element.innerHTML = _.join(['Hello', 'Webpack--'], '');
    console.log(common, 'cc');
    print();
    return element;

}



getComponent().then((component) => {
    document.body.appendChild(component);
});
