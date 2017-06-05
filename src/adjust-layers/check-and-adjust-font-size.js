// TODO Every function should have an error handling gh:3 id:40

function checkAndAdjustFontSize(text, textLayer, originalLayerName, textIsSplittable) {
    var textProp, textDocument, oldLinePosition, oldFontSize, numLines, numAry;
    var heightOfLines, newFontSize, fontSizeChange, maxFontSizeChange, splittedLayers;

    textProp = textLayer.property("Source Text");
    textDocument = textProp.value;

    // saving some data to make sure the fontSize doesn't get to small
    // and placing the mask and line for the fill ins is possible
    oldLinePosition = textDocument.baselineLocs[1];
    oldFontSize = textDocument.fontSize;

    // TODO: put the check for the number of lines that fit into a text field into the function checkLineNumsInTemplates and save it in the configuration +enhancement id:23 gh:7
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

        // if fontSizeChange is to high than stop and try to split the layers
        // or return an empty array
        // an empty array means we were not succesfull to put the text into the layer
        if (fontSizeChange < maxFontSizeChange) {
            if (textIsSplittable) {
                // we can split the text in the layers for this comp
                // but first we reset to a moderate fontSize
                textDocument.fontSize = oldFontSize * (maxFontSizeChange / 2 + 1);
                textProp.setValue(textDocument);

                splittedLayers = splitTextIntoLayers(text, textLayer, originalLayerName, numLines);
                return splittedLayers;
            } else {
                throw new FontToSmallError("Font gets too small and text is not splittable");
            }
        }
        textDocument.fontSize = newFontSize;
        textProp.setValue(textDocument);
        textDocument = textProp.value;
    }
    return [text];
}
