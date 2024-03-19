// 全局store
import { makeAutoObservable } from 'mobx';

class Common {
    constructor() {
        makeAutoObservable(this);
    }

    state: string = 'store state';

    changeState() {
        this.state += ' changed';
    }

    get stateString() {
        return this.state + '  string';
    }
}

export default new Common();
