'use strict';

import processText from './process-text';
import timeToSeconds from './time-to-seconds';
import clone from './clone';
import configuration from './configuration';

/**
 Make sense of a tab separated text file.

 @param rawText {String} - literally the contents of a .txt file.
 @param columnPositions {Object} - the index of the required and optional fields
 @param delimiter {String} [Optional] - a delimiter between parts of a long string.
 */
export default function parse(rawText, columnPositions, frameRate, delimiter, columnNameToProcess) {
	delimiter = delimiter || configuration().standardCSVDelimiter;
	columnNameToProcess = columnNameToProcess || configuration().columnNameToProcessForSplitting;
	var lineObj = {},
		retArr = [];

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
		lineObj.comp = text[columnPositions.compositionIndex];
		lineObj.layers = [];
		var processedTextArr = [];
		for (var i = 0, cpll = columnPositions.layers.length; i < cpll; i++) {
			var layer = columnPositions.layers[i];
			var colText = text[layer.layerIndex];
			lineObj.layers.push({
				layerName: layer.layerName,
				text: colText
			});
			if (layer.layerName === columnNameToProcess) {
				processedTextArr = processText(colText);
			}
		}

		var startTime = timeToSeconds(text[columnPositions.startTimeIndex], frameRate);
		var endTime = timeToSeconds(text[columnPositions.endTimeIndex], frameRate);

		// If the processed text was empty we just have one slide to process
		if (processedTextArr.length === 0) {
			lineObj.startTime = startTime;
			lineObj.endTime = endTime;
			retArr[0] = lineObj;
		} else {
			// if we have processed the text and it has items/slides/lines
			// we create an array of items per slide/line with all the other
			// values of the original comp (like compName)
			var durationPerSlide = (endTime - startTime) / processedTextArr.length;
			for (var i = 0, ptl = processedTextArr.length; i < ptl; i++) {
				var retObj = clone(lineObj);
				var textLine = processedTextArr[i];

				// find the element where we need to replace the long text
				for (var j = 0, rl = retObj.layers.length; j < rl; j++) {
					var layer = retObj.layers[j];
					if (layer.layerName === columnNameToProcess) {
						layer.text = textLine;
					}
				}

				// now we set the right start and end time for the comp to appear
				retObj.startTime = startTime + durationPerSlide * i;
				retObj.endTime = startTime + durationPerSlide * (i + 1);
				// TODO: we need something to easily change the transition between these newly created slides

				retArr[retArr.length] = retObj;
			}
		}
	}

	// Return an object with the parts we need.
	return retArr;
}
