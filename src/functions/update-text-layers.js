'use strict';

import checkAndAdjustFontSize from './check-and-adjust-font-size';
import checkFillinLayerAddresses from './check-fillin-layer-addresses';
import createAndPositionMasksAndLines from './create-and-position-masks-and-lines';
import configuration from './configuration';
import RuntimeError from './runtime-error';
import FontToSmallError from './font-to-small-error';

/**
Update the text layer of a given comp.

@Usage this is used to replace the text in duplicated "German" comps with text from a file.
@param comp {Object} - a composition.
@param textLayers {Array} - an array of text layers with its name and new content.
@param parentFolder {Object} - the parentFolder where pre-composed layers will be consolidated
*/
export default function updateTextLayers(comp, parsedContentLine, parentFolder) {
    if (!comp) {
        throw new RuntimeError({
            func: "updateTextLayers",
            title: "Composition wasn't provided"
        });
    }

    var textLayers, textLayer, fillInDelimiter, resultingTextLayers, resultingTextLayer,
        newText, layerName, resultText, originalFontSize, maxFontSizeChange, originalLayerName,
        textProp, textDocument, bl, baselines, templateCompName, textForLayer,
        arrOfMaskAddresses, maskLayerName, maskLayer, lineLayer, lineLayerName,
        message, textIsSplittable;

    textLayers = parsedContentLine.layers;
    fillInDelimiter = configuration().fillInDelimiter;
    resultingTextLayers = [];

    // iterate through all expected text layers
    for (var i = 0, tl = textLayers.length; i < tl; i++) {
        newText = textLayers[i].text;

        if (newText) {
            newText = newText.split(configuration().delimiterForNewLines).join('\n');

            // if newText is not empty we first load the data we need to process the text
            layerName = textLayers[i].layerName;
            originalLayerName = textLayers[i].originalLayerName;
            textLayer = comp.layer(layerName);

            if (textLayer) {
                resultText = newText.replace(fillInDelimiter[0],'').replace(fillInDelimiter[1],'');

                // store baselines assuming the mask and line start at the very
                // left of the template text and we only need to know how far
                // it will be moved left or right
                textProp = textLayer.property("Source Text");
                textDocument = textProp.value;
                bl = textDocument.baselineLocs;
                baselines = {
                    x: bl[0],
                    y: bl[1]
                };

                // let's check if we have permission to split the text
                templateCompName = comp.name.split(" ");
                templateCompName.shift();
                templateCompName = templateCompName.join(" ");
                textIsSplittable = configuration().compositionTemplates[templateCompName].splitLongTexts;

                // try to fit the text into the layer by adjusting the fontSize
                resultingTextLayer = {
                    layerName: layerName,
                    texts: checkAndAdjustFontSize(resultText, textLayer, originalLayerName, textIsSplittable)
                };
                resultingTextLayers.push(resultingTextLayer);

                // the script can't handle text where layers are splitted
                // so the template should not have any masks and layers
                // so we make sure we don't check for fill ins and thus
                // replace the splitted text with the full text again
                if (!textIsSplittable) {
                    // evaluate if there is more than one fill in
                    // or a fill in is splitted over lines
                    // if this is the case than duplicate masks and lines and precompose them
                    arrOfMaskAddresses = checkFillinLayerAddresses(newText, textLayer, fillInDelimiter);

                    maskLayerName = configuration().maskLayerNamePrefix + ' ' + layerName[layerName.length - 1];
                    maskLayer = comp.layer(maskLayerName);
                    lineLayerName = configuration().lineLayerNamePrefix + ' ' + layerName[layerName.length - 1];
                    lineLayer = comp.layer(lineLayerName);

                    // check if there is no fill in and hide the mask and the line
                    // check if there is more than one fill in
                    if (arrOfMaskAddresses.length === 0) {
                        textLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
                        if (lineLayer) {
                            lineLayer.remove();
                        }
                    } else {
                        // TODO: check for expected maskLayer and lineLayer within load-all-expected-templates
                        if (maskLayer) {
                            if (lineLayer) {
                                // fill ins found, so we need to create and position the mask layers
                                createAndPositionMasksAndLines(arrOfMaskAddresses, maskLayer, lineLayer, baselines, parentFolder);
                            } else {
                                // if lineLayer doesn't exist something is wrong with the template
                                message = "";
                                message += "Template Error\n";
                                message += "The current composition '";
                                message += comp.name;
                                message += "' shows that the layer '";
                                message += lineLayerName;
                                message += "' is missing. Please correct and run the script again.\n\n";
                                message += "The script will continue to execute.";
                                alert(message);
                                return resultingTextLayers;
                            }
                        } else {
                            // if maskLayer doesn't exist something is wrong with the template
                            message = "";
                            message += "Template Error\n";
                            message += "The current composition '";
                            message += comp.name;
                            message += "' shows that the layer '";
                            message += maskLayerName;
                            message += "' is missing. Please correct and run the script again.\n\n";
                            message += "The script will continue to execute.";
                            alert(message);
                            return resultingTextLayers;
                        }
                    }
                }
            }
        }
    }
    return resultingTextLayers;
}
