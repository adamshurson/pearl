const window = global.window || window;
class Pearl {
    constructor(className, init) {
        if (window[className] === undefined) {
            init = init || function() {console.log(className + ' init not set.')};
            window[className] = {
                subscribers: [],
                state: {},
                history: [],
                init: init,
                setState: (newState) => {
                    window[className].history.push(window[className].state);
                    const temp = Object.assign({}, window[className].state);
                    window[className].state = Object.assign(temp, newState);
                    window[className].update();
                },
                subscribe: (callback, field) => {
                    field = field || null;
                    window[className].subscribers.push({
                        callback: callback,
                        field: field
                    });
                    callback(window[className].state[field] || window[className].state);
                },
                update: () => {
                    for (let i = 0; i < window[className].subscribers.length; i++) {
                        const field = window[className].subscribers[i].field || null;
                        if (field === null) {
                            window[className].subscribers[i].callback(window[className].state);
                        } else {
                            if (window[className].state.hasOwnProperty(field)) {
                                // field must be changed if state includes it now
                                if (window[className].history.length <= 1) {
                                    window[className].subscribers[i].callback(window[className].state);
                                } else {
                                    // check if state field has changed in history
                                    if (window[className].history[window[className].history.length-2][field] !== window[className].history[window[className].history.length-1][field]) {
                                        window[className].subscribers[i].callback(window[className].state[field]);
                                    } else {
                                        console.log('state updated but field not changed');
                                    }
                                }
                            } else {
                                throw new Error("Field: " + field + " does not exist in state of " + className);
                            }
                        }
                    }
                }
            };
            window[className].init.bind(window[className]);
            window[className].init();
        }
        return window[className];
    }
}
export default Pearl;