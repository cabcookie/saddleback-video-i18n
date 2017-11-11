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

    sbVideoScript.addTextToLayerAndCheckOutcome = function (text, textLayer, lastResult) {
        try {
            var textProp = textLayer.property("Source Text");
            var lastBlLength = textProp.value.baselineLocs.length;
            textProp.setValue(text);
            var textDocument = textProp.value;
            var bl = textDocument.baselineLocs;
            lastBlLength = lastBlLength === 0 || lastBlLength > bl.length ? 4 : lastBlLength;
            var lines = [];

            for (var i = lastBlLength; i <= bl.length; i += 4) {
                var line = {};
                if (i === lastBlLength && lastResult.length > 0) {
                    var lastLine = lastResult[lastResult.length - 1];
                    line.startX = lastLine.endX;
                    line.startY = lastLine.endY;
                } else {
                    line.startX = bl[i-4];
                    line.startY = bl[i-3];
                }
                line.endX = bl[i-2];
                line.endY = bl[i-1];

                lines.push(line);
            }

            return lines;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'addTextToLayerAndCheckOutcome',
                title: "Error adding text to layer and checking effect",
                message: e.message
            })
        }
    }
}
