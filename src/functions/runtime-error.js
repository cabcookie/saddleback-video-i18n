'use strict';

export default function RuntimeError(data) {
    this.name = 'RuntimeError';
    this.message = this.name + " ";
    this.message += data.func ? "(" + data.func + ") " : "";
    this.message += data.title;
    if (data.message) {
        this.message += '\n';
        if (data.params && data.params.length > 0) {
            for (var i = 0, pl = data.params.length; i < pl; i++) {
                data.message.replace('%'+(i+1), data.params[i]);
            }
        }
        this.message += data.message;
    }
}

RuntimeError.prototype = new Error();
RuntimeError.prototype.constructor = RuntimeError;
