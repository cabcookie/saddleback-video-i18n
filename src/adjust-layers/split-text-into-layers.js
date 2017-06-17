// DONE Every function should have an error handling gh:3 id:39

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for splitTextIntoLayers",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.splitTextIntoLayers = function (text, textLayer, originalLayerName, maxLines) {
        try {
            if (text.length === 0) {
        		return [];
        	}

            var markSplits = sbVideoScript.settings.splitSettings.markerForSplitPositions;
        	var generalSplitters = sbVideoScript.settings.splitSettings.splitPositions.allTexts;
        	var specificSplitters = sbVideoScript.settings.splitSettings.splitPositions[originalLayerName];
        	var seperatorForSplitting = sbVideoScript.settings.splitSettings.seperatorForSplitting;
        	var brackets = sbVideoScript.settings.splitSettings.bracketsForLayerCounting;
        	var lBrack = brackets[0];
        	var rBrack = brackets[2];
        	var preparedText = text;

        	// set markers into the text to identify possible split positions
        	for (var i = 0, gs = generalSplitters.length; i < gs; i++) {
        		var splitter = generalSplitters[i];
        		preparedText = preparedText.split(splitter).join(splitter + markSplits);
        	}
        	for (var i = 0, gs = specificSplitters.length; i < gs; i++) {
        		var splitter = specificSplitters[i];
        		preparedText = preparedText.split(splitter).join(markSplits + splitter);
        	}

        	var textArr = preparedText.split(markSplits);
        	preparedText = textArr.join("");
        	var textProp = textLayer.property("Source Text");
        	textProp.setValue(preparedText);
        	var textDocument = textProp.value;

            while (textDocument.baselineLocs.length > maxLines * 4) {
        		textArr.pop();
        		if (textArr.length === 0) { throw new Error("No adequate position for text splitting was found") }

        		preparedText = textArr.join("") + seperatorForSplitting;
        		textProp.setValue(preparedText);
        		textDocument = textProp.value;
            }

        	var layerName = textLayer.name.split(' ' + lBrack);
        	var layerNo = layerName.length == 1 ? 1 : parseInt(layerName[1].split(rBrack)[0]) + 1;
        	textLayer.name = layerName[0] + ' ' + brackets.replace('#', layerNo);

        	var splittedLayers = [preparedText];
        	text = text.replace(textArr.join(""), "");

            if (text.length > 0) {
        		var temp = sbVideoScript.splitTextIntoLayers(seperatorForSplitting + ' ' + text, textLayer.duplicate(), originalLayerName, maxLines);
        		for (var i = 0, tl = temp.length; i < tl; i++) {
        			splittedLayers.push(temp[i]);
        		}
        	}

        	return splittedLayers;

        } catch (e) {
            var textInfo = "";
            try {
                textInfo += "text = "+ text;
                textInfo += "; textLayerName = "+ textLayer.name;
                textInfo = "[text information: "+ textInfo +"]";
            } catch (e) {
                textInfo = "["+ textInfo +"; wasn't able to retrieve text information]";
            }

            throw new sbVideoScript.RuntimeError({
                func: 'splitTextIntoLayers',
                title: "Error splitting text into several layers "+ textInfo,
                message: e.message
            })
        }
    }
}
