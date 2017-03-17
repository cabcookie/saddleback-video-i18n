'use strict';

import configuration from './configuration';

export default function splitTextIntoLayers(text, textLayer, originalLayerName, maxLines) {
	if (text.length === 0) {
		return [];
	}

	var markSplits, generalSplitters, specificSplitters, splitter, textArr, preparedText;
	var textProp, textDocument, seperatorForSplitting, layerName, layerNo, splittedLayers;
	var brackets, lBrack, rBrack;

	markSplits = configuration().splitSettings.markerForSplitPositions;
	generalSplitters = configuration().splitSettings.splitPositions.allTexts;
	specificSplitters = configuration().splitSettings.splitPositions[originalLayerName];
	seperatorForSplitting = configuration().splitSettings.seperatorForSplitting;
	brackets = configuration().splitSettings.bracketsForLayerCounting;
	lBrack = brackets[0];
	rBrack = brackets[2];
	preparedText = text;

	// set markers into the text to identify possible split positions
	for (var i = 0, gs = generalSplitters.length; i < gs; i++) {
		splitter = generalSplitters[i];
		preparedText = preparedText.split(splitter).join(splitter + markSplits);
	}
	for (var i = 0, gs = specificSplitters.length; i < gs; i++) {
		splitter = specificSplitters[i];
		preparedText = preparedText.split(splitter).join(markSplits + splitter);
	}

	textArr = preparedText.split(markSplits);
	preparedText = textArr.join("");
	textProp = textLayer.property("Source Text");
	textProp.setValue(preparedText);
	textDocument = textProp.value;

	while (textDocument.baselineLocs.length > maxLines * 4) {
		textArr.pop();
		if (textArr.length === 0) {
			throw new RuntimeError({
				func: "splitTextIntoLayers",
				title: "No adequate position for text splitting was found"
			});
		}
		preparedText = textArr.join("") + seperatorForSplitting;
		textProp.setValue(preparedText);
		textDocument = textProp.value;
    }

	layerName = textLayer.name.split(' ' + lBrack);
	layerNo = layerName.length == 1 ? 1 : parseInt(layerName[1].split(rBrack)[0]) + 1;
	textLayer.name = layerName[0] + ' ' + brackets.replace('#', layerNo);

	splittedLayers = [preparedText];
	text = text.replace(textArr.join(""), "");

	if (text.length > 0) {
		var temp = splitTextIntoLayers(seperatorForSplitting + ' ' + text, textLayer.duplicate(), originalLayerName, maxLines);
		for (var i = 0, tl = temp.length; i < tl; i++) {
			splittedLayers.push(temp[i]);
		}
	}

	return splittedLayers;
}
