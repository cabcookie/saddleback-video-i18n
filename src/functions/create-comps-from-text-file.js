/**
 Create all compositions from a given text file based on templates.

 @IMPORTANT: You MUST have a default template composition for the different
 "types" of compositions => "Scripture", "Lower Third", etc.
 */

import createGermanComp from './create-german-comp';
import readDocument from './read-document';
import parseFirstLine from './parse-first-line';
import updateTextLayers from './update-text-layers';
import placeCompInTimeline from './place-comp-in-timeline';
import parse from './parse';

export default function createCompsFromTextFile(contentAry) {
	var content = readDocument(contentAry, 0).contentAry,
		contentLength = content.length,
		currentLine,
		parsedContentLine,
		parsedContentLineArr;

	// retrieve the current selected comp from the project
	// this will be the comp where we add the duplicated comps
	var targetComp = app.project.activeItem;

	// get the frameRate of the selected comp
	var fps = targetComp.frameRate;

	// retrieve the name of the comp and create the name for the footage folder
	var parentFolderName = targetComp.name + " Footage [Script Results]";

	// create a parent folder for the new comps
	var parentFolder = app.project.items.addFolder(parentFolderName);

	// define the required fields in the CSV file for the script to work properly
	var requiredFields = ['startTime', 'endTime', 'composition'];
	// now parse the first line with the title names to retrieve position in text file
	var columnPositions = parseFirstLine(content[0], requiredFields);

	for (var i = 1; i < contentLength; i++) {
		currentLine = content[i];
		parsedContentLineArr = parse(currentLine, columnPositions, fps);

		for (var j = 0; j < parsedContentLineArr.length; j++) {
			parsedContentLine = parsedContentLineArr[j];
			var newComp = createGermanComp(parsedContentLine.comp, i + "." + j, parentFolder);
			placeCompInTimeline(newComp, targetComp, parsedContentLine.startTime, parsedContentLine.endTime);
			updateTextLayers(newComp, parsedContentLine.layers, parentFolder);
		}

	}
}
