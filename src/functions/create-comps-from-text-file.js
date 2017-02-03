'use strict';

import createGermanComp from './create-german-comp';
import readDocument from './read-document';
import parseFirstLine from './parse-first-line';
import updateTextLayers from './update-text-layers';
import placeCompInTimeline from './place-comp-in-timeline';
import parse from './parse';
import dateFormatted from './date-formatted';
import loadVideoFootage from './load-video-footage';
import createMainCompFolder from './create-main-comp-folder';
import createMainCompAndFootageFolder from './create-main-comp-and-footage-folder';
import cloneColumnPositionsForMainComp from './clone-column-positions-for-main-comp';
import adjustCompTypeIfNeeded from './adjust-comp-type-if-needed';
import isEmpty from './is-empty';
import clone from './clone';
import configuration from './configuration';

/**
 Create all compositions from a given text file based on templates.

 @IMPORTANT: You MUST have a default template composition for the different
 "types" of compositions => "Scripture", "Lower Third", etc.
 */
export default function createCompsFromTextFile(contentAry) {
	var content = readDocument(contentAry, 0).contentAry,
		contentLength = content.length,
		currentLine,
		parsedContentLine,
		parsedContentLineArr;

	var mediaFootage = loadVideoFootage();

	if (mediaFootage) {
		// get the frameRate of the selected file
		var fps = mediaFootage.frameRate;

		// define the required fields in the CSV file for the script to work properly
		// now parse the first line with the title names to retrieve position in text file
		var columnPositions = parseFirstLine(content[0], configuration().requiredFieldsInCSV);

		var mainCompFolder = createMainCompFolder();

		// iterate through all comps that needs to be created and adjust
		// the relevant columns of CSV file
		var mc = configuration().mainCompositionsToBuild;
		var cc = mc.compositionsConfig;
		for (var i = 0; i < cc.length; i++) {
			var tcConf = cc[i];

			var main = createMainCompAndFootageFolder(mainCompFolder, tcConf, mediaFootage);
				// comp: targetComp,
				// footageFolder: compFootageFolder

			var colPos = cloneColumnPositionsForMainComp(columnPositions, tcConf);

			main.comp.openInViewer();

			// now process all activities to create comps from template
			// place the comps in the timeline and modify the text layers
			for (var c = 1; c < content.length; c++) {
				currentLine = content[c];
				parsedContentLineArr = parse(currentLine, colPos, fps);

				for (var j = 0; j < parsedContentLineArr.length; j++) {
					parsedContentLine = parsedContentLineArr[j];

					adjustCompTypeIfNeeded(tcConf, parsedContentLine);

					var newComp = createGermanComp(parsedContentLine.comp, c + "." + j, main.footageFolder);
					placeCompInTimeline(newComp, main.comp, parsedContentLine.startTime, parsedContentLine.endTime);
					updateTextLayers(newComp, parsedContentLine.layers, main.footageFolder);
				}
			}
		}
	}
}
