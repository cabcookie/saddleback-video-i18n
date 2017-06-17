// DONE Every function should have an error handling gh:3 id:29

/**
 Make sense of a tab separated text file.

 @param rawText {String} - literally the contents of a .txt file.
 @param columnPositions {Object} - the index of the required and optional fields
 @param delimiter {String} [Optional] - a delimiter between parts of a long string.
 */

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for parse",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.parse = function (rawText, columnPositions, delimiter) {
        try {
            delimiter = delimiter || sbVideoScript.settings.standardCSVDelimiter;
    		var lineObj = {};

    		// check if the line starts and ends with a " character
    		// and delete them
    		var lineLength = rawText.length;
    		var firstAndLastChar = rawText.charAt(0) + rawText.charAt(lineLength - 1);
    		if (firstAndLastChar === '""') {
    			rawText = rawText.substring(1, lineLength - 1);
    		}

    		// split the line into columns
    		var text = rawText.split(delimiter);

    		if (text.length > 1) {
    			// get the content of all columns from the line and put them into the right
    			// position of the object
    			// lineObj.comp = text[columnPositions.compositionIndex];
    			lineObj.layers = [];
    			for (var i = 0, cpll = columnPositions.layers.length; i < cpll; i++) {
    				var layer = columnPositions.layers[i];
    				var colText = text[layer.layerIndex];
    				lineObj.layers.push({
    					layerName: layer.layerName,
    					originalLayerName: layer.originalLayerName,
    					text: colText
    				});
    			}

    			// lineObj.startTime = timeToSeconds(text[columnPositions.startTimeIndex], frameRate);
    			// lineObj.endTime = timeToSeconds(text[columnPositions.endTimeIndex], frameRate);
    		}

    		// Return an object with the parts we need.
    		return lineObj;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'parse',
                title: "Error parsing CSV document",
                message: e.message
            });
        }
    }
}
