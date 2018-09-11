class Pearl {
    constructor() {
        if (window[this.constructor.name] === undefined) {
            window[this.constructor.name] = this;
            window[this.constructor.name].subscribers = [];
            window[this.constructor.name].state = {};
            window[this.constructor.name].history = [];
            window[this.constructor.name].init();
            window[this.constructor.name].extend();
        }
        return window[this.constructor.name];
    }
    init() {
        throw new Error("PearlError: Init function not set");
    }
    extend(functionObject) {
        window[this.constructor.name].functions = functionObject;
    }
    setState(newState) {
        window[this.constructor.name].history.push(window[this.constructor.name].state);
        const temp = Object.assign({}, window[this.constructor.name].state);
        window[this.constructor.name].state = Object.assign(temp, newState);
        window[this.constructor.name].update();
    }
    subscribe(callback, field) {
        field = field || null;
        window[this.constructor.name].subscribers.push({
            callback: callback,
            field: field
        });
        callback(window[this.constructor.name].state[field] || window[this.constructor.name].state);
    }
    update() {
        for (let i = 0; i < window[this.constructor.name].subscribers.length; i++) {
            const field = window[this.constructor.name].subscribers[i].field || null;
            if (field === null) {
                window[this.constructor.name].subscribers[i].callback(window[this.constructor.name].state);
            } else {
                if (window[this.constructor.name].state.hasOwnProperty(field)) {
                    // field must be changed if state includes it now
                    if (window[this.constructor.name].history.length <= 1) {
                        window[this.constructor.name].subscribers[i].callback(window[this.constructor.name].state);
                    } else {
                        // check if state field has changed in history
                        if (window[this.constructor.name].history[window[this.constructor.name].history.length-2][field] !== window[this.constructor.name].history[window[this.constructor.name].history.length-1][field]) {
                            window[this.constructor.name].subscribers[i].callback(window[this.constructor.name].state[field]);
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