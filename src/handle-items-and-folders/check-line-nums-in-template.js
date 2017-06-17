// DONE Every function should have an error handling gh:3 id:24
// DONE: move the check for the number of lines fitting into the text field from function checkAndAdjustFontSize to here +enhancement id:25 gh:8
// DONE: better idea: call this function from checkAndAdjustFontSize and if it is the first time to check the template we do the test and store the information into the settings; if the function is called a second time it just returns the result from the settings +enhancement id:92 gh:36

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for checkLineNumsInTemplate",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.checkLineNumsInTemplate = function (templateCompName, textLayer, originalLayerName) {
        try {
            var cfgTemplates = sbVideoScript.settings.compositionTemplates;
            var cfgTemplate = cfgTemplates[templateCompName];
            if (cfgTemplate === undefined) {
                cfgTemplate = cfgTemplates[templateCompName] = {};
            }

            var cfgTextLayers = cfgTemplate.textLayers;
            if (cfgTextLayers === undefined) {
                cfgTextLayers = cfgTemplate.textLayers = {};
            }

            var cfgTextLayer = cfgTextLayers[originalLayerName];
            if (cfgTextLayer) {
                return cfgTextLayer;
            }

            cfgTextLayer = cfgTextLayers[originalLayerName] = {};

            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;

            // try to figure out how many lines will fit into the text field
            // and the height of the lines
            var numLines = 20;
            var numAry = [];
            for (var n = 1; n <= numLines; n++) {
                numAry[numAry.length] = "a";
            }
            textProp.setValue(numAry.join('\n'));
            textDocument = textProp.value;
            numLines = textDocument.baselineLocs.length / 4;

            // evaluating the height of one line
            var heightOfLines = 0;
            if (numLines > 1) {
                // if it is more than one line, evaluate the diff between two lines
                heightOfLines = textDocument.baselineLocs[5] - textDocument.baselineLocs[1];
            } else {
                heightOfLines = textLayer.sourceRectAtTime(0, true).height;
            }

            cfgTextLayer.numLines = numLines;
            cfgTextLayer.heightOfLines = heightOfLines;

            return cfgTextLayer;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'checkLineNumsInTemplate',
                title: "Error checking the number of lines that fit into a text layer's templates",
                message: e.message
            });
        }
    }
}
