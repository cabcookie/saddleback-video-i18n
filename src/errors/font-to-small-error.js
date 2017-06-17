// DONE Every function should have an error handling gh:3 id:37

sbVideoScript.FontToSmallError = function (text, textLayerName, templateCompName) {
    this.name = 'FontToSmallError';
    this.message = "FontToSmallError: Font gets too small and text is not splittable. ";
    this.message += "text = "+ (text || "") +", ";
    this.message += "textLayerName = "+ (textLayerName || "") +", ";
    this.message += "templateCompName = "+ (templateCompName || "");
}

sbVideoScript.FontToSmallError.prototype = new Error();
sbVideoScript.FontToSmallError.prototype.constructor = sbVideoScript.FontToSmallError;
