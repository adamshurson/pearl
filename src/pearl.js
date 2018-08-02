class Pearl {
    subscribers = [];
    state = {};
    history = [];
    constructor() {
        if (window[this.constructor.name] === undefined) {
            window[this.constructor.name] = this;
            window[this.constructor.name].init();
        }
        return window[this.constructor.name];
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
    subscribe(callback, field) {
        field = field || null;
        this.subscribers.push({
            callback: callback,
            field: field
        });
        callback(this.state[field] || this.state);
    }
    update() {
        for (let i = 0; i < this.subscribers.length; i++) {
            const field = this.subscribers[i].field || null;
            if (field === null) {
                this.subscribers[i].callback(this.state);
            } else {
                if (this.state.hasOwnProperty(field)) {
                    // field must be changed if state includes it now
                    if (this.history.length <= 1) {
                        this.subscribers[i].callback(this.state);
                    } else {
                        // check if state field has changed in history
                        if (this.history[this.history.length-2][field] !== this.history[this.history.length-1][field]) {
                            this.subscribers[i].callback(this.state[field]);
                        } else {
                            console.log('state updated but field not changed');
                        }
                    }
                } else {
                    throw new Error("Field: " + field + " does not exist in state of " + this.constructor.name);
                }
            }
        }
    }
}
export default Pearl;