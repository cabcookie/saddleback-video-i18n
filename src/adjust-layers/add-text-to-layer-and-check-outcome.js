// DONE Every function should have an error handling gh:3 id:41

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for addTextToLayerAndCheckOutcome",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.addTextToLayerAndCheckOutcome = function (text, textLayer, result) {
        try {
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

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'addTextToLayerAndCheckOutcome',
                title: "Error adding text to layer and checking effect",
                message: e.message
            })
        }
    }
}
