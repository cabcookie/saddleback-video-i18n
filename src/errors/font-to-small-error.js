// TODO Every function should have an error handling gh:3 id:37

function FontToSmallError(message) {
    this.name = 'FontToSmallError';
    this.message = this.name + ": ";
    this.message += (message || "");
}

FontToSmallError.prototype = new Error();
FontToSmallError.prototype.constructor = FontToSmallError;
