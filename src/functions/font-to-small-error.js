'use strict';

export default function FontToSmallError(message) {
    this.name = 'FontToSmallError';
    this.message = this.name + ": ";
    this.message += (message || "");
}

FontToSmallError.prototype = new Error();
FontToSmallError.prototype.constructor = FontToSmallError;
