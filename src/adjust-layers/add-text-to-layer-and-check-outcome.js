// TODO Every function should have an error handling gh:3 id:41

function addTextToLayerAndCheckOutcome(text, textLayer, result) {
    var textProp = textLayer.property("Source Text");
    var lastBlLength = textProp.value.baselineLocs.length;
    textProp.setValue(text);
    var textDocument = textProp.value;
    result.blLength = textDocument.baselineLocs.length;
    var bl = textDocument.baselineLocs;
    result.lineY = bl[result.blLength-1];
    result.lineStartX = bl[result.blLength-4];
    result.lineEndX = bl[result.blLength-2];

    // for every line break we add the lineEndX to an object
    result.lastLineEndX = {};
    while (result.blLength > lastBlLength) {
        result.lastLineEndX[lastBlLength] = bl[lastBlLength-2];
        lastBlLength += 4;
    }
}
