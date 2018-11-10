const RuntimeError = (data: {
    func: string;
    title: string;
    params?: string[];
    message: string;
}): Error => {
    this.name = 'RuntimeError';

    let message = "";
    message = this.name + " ";
    if (data.func) { message += "("+ data.func +") " }
    message += data.title;

    if (data.message) {
        if (data.params) {
            data.params.forEach((item, index) => data.message.replace('%'+(index+1), item));
        }
        message = data.message + '\n' + message;
    } else {
        alert("The function '"+ data.func +"' is calling the error handler without a message. That should be fixed.");
    }
    this.message = message;

    return this;
}

RuntimeError.prototype = new Error();
RuntimeError.prototype.constructor = RuntimeError;

export { RuntimeError }
