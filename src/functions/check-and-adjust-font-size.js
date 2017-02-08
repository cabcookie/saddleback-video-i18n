'use strict';

import configuration from './configuration';

export default function checkAndAdjustFontSize(text, textLayer) {
    var textProp, textDocument, oldLinePosition, oldFontSize, numLines, numAry;
    var heightOfLines, newFontSize, fontSizeChange, maxFontSizeChange;

    textProp = textLayer.property("Source Text");
    textDocument = textProp.value;

    // saving some data to make sure the fontSize doesn't get to small
    // and placing the mask and line for the fill ins is possible
    oldLinePosition = textDocument.baselineLocs[1];
    oldFontSize = textDocument.fontSize;

    // try to figure out how many lines will fit into the text field
    // and the height of the lines
    numLines = 20;
    numAry = [];
    for (var n = 1; n <= numLines; n++) {
        numAry[numAry.length] = "a";
    }
    textProp.setValue(numAry.join('\n'));
    textDocument = textProp.value;
    numLines = textDocument.baselineLocs.length / 4;

    // evaluating the height of one line
    // to later extend the text field by one line
    // which will help us to resize the font if the text doesn't fit
    heightOfLines = 0;
    if (numLines > 1) {
        // if it is more than one line, evaluate the diff between two lines
        heightOfLines = textDocument.baselineLocs[5] - textDocument.baselineLocs[1];
    } else {
        heightOfLines = textLayer.sourceRectAtTime(0, true).height;
    }
    textDocument.boxTextSize = [textDocument.boxTextSize[0], textDocument.boxTextSize[1] + heightOfLines];
    textProp.setValue(textDocument);

    // now we change the text for the first time
    // this is to check the size of the text and reducing
    // the fontSize if needed
    textProp.setValue(text);

    // check if text is too long for the text field and
    // adjust fontSize until it fits
    textDocument = textProp.value;
    newFontSize = oldFontSize;
    maxFontSizeChange = configuration().maximumFontSizeChange;
    while (textDocument.baselineLocs.length > numLines * 4) {
        newFontSize -= 1;
        fontSizeChange = newFontSize / oldFontSize - 1;

        // if fontSizeChange is to high than stop and return false
        if (fontSizeChange < maxFontSizeChange) {
            return false;
        }
        textDocument.fontSize = newFontSize;
        textProp.setValue(textDocument);
        textDocument = textProp.value;
    }
    return true;
}
