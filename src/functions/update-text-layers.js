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
	
	for (var i = 0; i < textLayers.length; i++) {
		var newText = textLayers[i].text;
		
		if (newText) {
			var textLayer = comp.layer(textLayers[i].layerName);
			textLayer.property("Source Text").setValue(newText);
		}
	}
}