'use strict';
/**
 Parse the first line of a tab separated text file to retrieve
 column positions for further use. The result will be an object where for each
 required field it has an "Index" attribute where the values is the column
 number of this certain field.
 If this function finds more columns than just the required fields it puts all
 these columns in the attribute "layer". It's an array of object with its
 "layerName"s and its "layerIndex"es.
 Why is that helpful? Because you can now put more layers into your template
 composition in After Effects which you want to be changed by the script. You
 just add these additional layer names as columns into your text file and
 that's it. You don't need to re-program this script. Only if you want to
 change the required fields.
 
 @param rawText {String} - literally the contents of a .txt file.
 @param requiredFields {Array} - the array that includes all columns that are required in the text file
 @param delimiter {String} [Optional] - a delimiter between parts of a long string.
 */
export default function parseFirstLine(rawText, requiredFields, delimiter) {
	delimiter = delimiter || "\t"; // Use tabs by default.
	var text = rawText.split(delimiter);
	var ret = {
		layers: []
	};
	
	// TODO: validate if a column exists twice
	
	for (var i = 0; i < text.length; i++) {
		var requiredFound = false;
		for (var j = 0; j < requiredFields.length; j++) {
			if (text[i].toUpperCase() === requiredFields[j].toUpperCase()) {
				var attributeName = requiredFields[j] + "Index";
				ret[attributeName] = i;
				requiredFound = true;
			}
		}
		if (!requiredFound) {
			ret.layers.push({
				layerName: text[i],
				layerIndex: i
			});
		}
	}
	
	// Return an object with the parts we need.
	return ret;
}