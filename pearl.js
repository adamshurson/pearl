class Pearl {
    instance = null;
    subscribers = [];
    state = {};
    history = [];
    constructor() {
        if (this.instance === null || this.instance.constructor.name !== this.constructor.name) {
            this.instance = this;
            this.init();
        }
        return this.instance;
    }
    init() {
        throw new Error("Init function not set");
    }
    setState(newState) {
        this.history.push(this.state);
        const temp = Object.assign({}, this.state);
        this.state = Object.assign(temp, newState);
        this.update();
    }
    subscribe(callback) {
        this.subscribers.push(callback);
        callback(this.state);
    }
    update() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i](this.state);
        }
    }
}