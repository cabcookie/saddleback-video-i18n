sbVideoScript.RuntimeError = function (data) {
    this.name = 'RuntimeError';

    var message;
    message = this.name + " ";
    if (data.func) { message += "("+ data.func +") " }
    message += data.title;

    if (data.message) {
        if (data.params && data.params.length > 0) {
            for (var i = 0, pl = data.params.length; i < pl; i++) {
                data.message.replace('%'+(i+1), data.params[i]);
            }
        }
        message = data.message + '\n' + message;
    } else {
        alert("The function '"+ data.func +"' is calling the error handler without a message. That should be fixed.");
    }
    this.message = message;
}

sbVideoScript.RuntimeError.prototype = new Error();
sbVideoScript.RuntimeError.prototype.constructor = sbVideoScript.RuntimeError;
