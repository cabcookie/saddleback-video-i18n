'use strict';
/**
Update the text layer of a given comp.

@Usage this is used to replace the text in duplicated "German" comps with text from a file.
@param comp {Object} - a composition.
@param textLayers {Array} - an array of text layers with its name and new content.
*/
export default function updateTextLayers(comp, textLayers) {
	if (!comp) {
		return;
	}

	// configuration data
	var maximumFontSizeChange = -0.10;
	var maskLayerNamePrefix = 'Mask';
	var lineLayerNamePrefix = 'Line';
	var fillInDelimiter = '[]';
	var animationProtectionTime = 2;
	var oneLineCompName = "Lower Third";

	// iterate through all expected text layers
	for (var i = 0; i < textLayers.length; i++) {
		var newText = textLayers[i].text;

		if (newText) {
			// if newText is not empty we first load the data we need to process the text
			var layerName = textLayers[i].layerName;
			var textLayer = comp.layer(layerName);
			var textProp = textLayer.property("Source Text");
			var textDocument = textProp.value;

			if (comp.name.match("/"+oneLineCompName+"/")) {
				var maskLayerName = maskLayerNamePrefix + ' ' + layerName[layerName.length - 1];
				var maskLayer = comp.layer(maskLayerName);
				var lineLayerName = lineLayerNamePrefix + ' ' + layerName[layerName.length - 1];
				var lineLayer = comp.layer(lineLayerName);

				// saving some data to make sure the fontSize doesn't get to small
				// and placing the mask and line for the fill ins is possible
				var oldLinePosition = textDocument.baselineLocs[1];
				var oldFontSize = textDocument.fontSize;

				// now we change the text for the first time
				// this is to check the size of the text and reducing
				// the fontSize if needed
				var resultText = newText.replace(fillInDelimiter[0],'').replace(fillInDelimiter[1],'');
				textProp.setValue(resultText);

				// check if text is too long for the line and
				// adjust fontSize until it fits
				textDocument = textProp.value;
				while (textDocument.baselineLocs.length > 4) {
					textDocument.fontSize -= 1;
					textProp.setValue(textDocument);
					textDocument = textProp.value;
				}
				var newFontSize = textDocument.fontSize;

				// check if fontSize is now to small and do something
				var fontSizeChange = newFontSize / oldFontSize - 1;
				if (fontSizeChange < maximumFontSizeChange) {
					// TODO: do something when fontSize is reduced to much
					// maybe we need to switch from a Lower Third to a Full Screen
				}

				// did the change on the fontSize needs a change on the
				// position of the mask?
				var newLinePosition = textDocument.baselineLocs[1];
				var heightChange = (newLinePosition - oldLinePosition) /2;
				var positionMaskLayer = maskLayer.property("Position").value;
				positionMaskLayer[1] += heightChange;
				maskLayer.property("Position").setValue(positionMaskLayer);

				// also we now know the position where the text will start
				var resultTextPosX = textDocument.baselineLocs[0];

				// now we iterate through the text to find
				// the fill ins, find their positions and
				// adjust the mask layer
				var textAndFillIns = newText.split(fillInDelimiter[0]);

				// check if there is no fill in and hide the mask and the line
				// check if there is more than one fill in
				if (textAndFillIns.length === 1) {
					textLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
					lineLayer.remove();
				} else {
					// one fill in is found
					// now we need to experiment with the text
					// to identify the exact position and the length
					// of the mask

					// we now evaluate the length of the text before the fill in
					// to identify the start position of the mask and line
					textProp.setValue(textAndFillIns[0]);
					textDocument = textProp.value;
					var bl = textDocument.baselineLocs;
					var tempWidth = bl[2] - bl[0];
					var maskPosX = tempWidth + resultTextPosX;
					// TODO: there might be a problem with a text that is not aligned left; if so, you should consider to change this calculation of maskPosX

					// we iterate now through all available fill ins
					for (var f = 1; f < textAndFillIns.length; f++) {
						if (f > 1) {
							// TODO: if there is more than one fill in do something
							// we might need to create an additional text layer
							// mask layer and line layer
						}

						// we split the fill in from the text after the fill in
						// to evaluate the width of the fill in itself
						var splitFillInAndText = textAndFillIns[f].split(fillInDelimiter[1]);
						textProp.setValue(splitFillInAndText[0]);
						textDocument = textProp.value;
						bl = textDocument.baselineLocs;
						var widthOfFillIn = bl[2] - bl[0];

						// we can now position the mask and set its width
						positionMaskLayer = maskLayer.property("Position").value;
						positionMaskLayer[0] += maskPosX;
						maskLayer.property("Position").setValue(positionMaskLayer);
						var maskLayerScale = maskLayer.property("Scale");
						var newMaskLayerScale = [(widthOfFillIn / maskLayer.sourceRectAtTime(animationProtectionTime, true).width) * maskLayerScale.value[0], maskLayerScale.value[1], maskLayerScale.value[2]];
						maskLayerScale.setValue(newMaskLayerScale);
					}
				}
				textProp.setValue(resultText);
			} else {
				textProp.setValue(newText);
			}
		}
	}
}
