'use strict';

// import configuration from './configuration';

export default function splitTextIntoLayers(text, textLayer, originalLayerName, maxLines) {
	if (text.length === 0) {
		return [];
	}

	var markSplits, generalSplitters, specificSplitters, splitter, textArr, preparedText;
	var textProp, textDocument, seperatorForSplitting, layerName, splittedLayers;

	markSplits = '*{}*';
	generalSplitters = configuration().splitLongTexts.allTexts;
	specificSplitters = configuration().splitLongTexts[originalLayerName];
	seperatorForSplitting = configuration().seperatorForSplitting;
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
	textProp = textLayer.property("Source Text");
	textProp.setValue(text);
	textDocument = textProp.value;

	while (textDocument.baselineLocs.length > maxLines * 4) {
		textArr.pop();
		if (textArr.length === 0) {
			return [];
		}
		preparedText = textArr.join("") + seperatorForSplitting;
		textProp.setValue(preparedText);
		textDocument = textProp.value;
    }

	layerName = textLayer.name.split('{');
	if (layerName.length == 1) {
		textLayer.name = layerName[0] + ' {1}';
	} else {
		textLayer.name = layerName[0] + '{' + (parseInt(layerName[1].split('}')[0]) + 1) + '}';
	}

	splittedLayers = [preparedText];
	text = text.replace(textArr.join(""), "");

	if (text.length > 0) {
		splittedLayers.push(splitTextIntoLayers(seperatorForSplitting + text, textLayer.duplicate(), originalLayerName, maxLines));
	}

	return splittedLayers;
}
