'use strict';

import checkAndAdjustFontSize from './check-and-adjust-font-size';
import checkFillinLayerAddresses from './check-fillin-layer-addresses';
import createAndPositionMasksAndLines from './create-and-position-masks-and-lines';
import configuration from './configuration';

/**
Update the text layer of a given comp.

@Usage this is used to replace the text in duplicated "German" comps with text from a file.
@param comp {Object} - a composition.
@param textLayers {Array} - an array of text layers with its name and new content.
@param parentFolder {Object} - the parentFolder where pre-composed layers will be consolidated
*/
export default function updateTextLayers(comp, textLayers, parentFolder) {
    if (!comp) {
        return;
    }

    var fillInDelimiter = configuration().fillInDelimiter;
    var templateOkay;

    // iterate through all expected text layers
    for (var i = 0, tl = textLayers.length; i < tl; i++) {
        var newText = textLayers[i].text;

        if (newText) {
            newText = newText.split(configuration().delimiterForNewLines).join('\n');

            // if newText is not empty we first load the data we need to process the text
            var layerName = textLayers[i].layerName;
            var textLayer = comp.layer(layerName);

            if (textLayer) {
                var resultText = newText.replace(fillInDelimiter[0],'').replace(fillInDelimiter[1],'');

                // store baselines assuming the mask and line start at the very
                // left of the template text and we only need to know how far
                // it will be moved left or right
                var bl = textLayer.property("Source Text").value.baselineLocs;
                var baselines = {
                    x: bl[0],
                    y: bl[1]
                };

                // adjust the fontSize if the text doesn't fit into the text field
                templateOkay = checkAndAdjustFontSize(resultText, textLayer);

                if (!templateOkay) {
                    return false;
                }
                // evaluate if there is more than one fill in
                // or a fill in is splitted over lines
                // if this is the case than split text layers and texts
                var arrOfMaskAddresses = checkFillinLayerAddresses(newText, textLayer, fillInDelimiter);

                var maskLayerName = configuration().maskLayerNamePrefix + ' ' + layerName[layerName.length - 1];
                var maskLayer = comp.layer(maskLayerName);
                var lineLayerName = configuration().lineLayerNamePrefix + ' ' + layerName[layerName.length - 1];
                var lineLayer = comp.layer(lineLayerName);
                // check if there is no fill in and hide the mask and the line
                // check if there is more than one fill in
                if (arrOfMaskAddresses.length === 0) {
                    textLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
                    if (lineLayer) {
                        lineLayer.remove();
                    }
                } else {
                    // fill ins found, so we need to create and position the mask layers
                    createAndPositionMasksAndLines(arrOfMaskAddresses, maskLayer, lineLayer, baselines, parentFolder);
                }
            }
        }
    }
    return true;
}
