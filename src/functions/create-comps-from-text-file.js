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
import checkMarkersInTemplates from './check-markers-in-templates';
import masteringComp from './mastering-comp';
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
		parsedContentLineArr,
		mediaFootage,
		fps,
		renderQueue,
		allTemplatesHaveMarkers,
		columnPositions,
		mainCompFolder,
		newComp,
		templateOkay,
		message;

	mediaFootage = loadVideoFootage();

	if (mediaFootage) {
		// get the frameRate of the selected file
		fps = mediaFootage.frameRate;

		// load render queue for later rendering of main compositions
		renderQueue = app.project.renderQueue;

		// iterate through all composition templates and find markers for
		// in and out animation
		allTemplatesHaveMarkers = checkMarkersInTemplates();

		if (allTemplatesHaveMarkers) {
			// define the required fields in the CSV file for the script to work properly
			// now parse the first line with the title names to retrieve position in text file
			columnPositions = parseFirstLine(content[0], configuration().requiredFieldsInCSV);

			mainCompFolder = createMainCompFolder();

			// iterate through all comps that needs to be created and adjust
			// the relevant columns of CSV file
			var mc,cc,tcConf,main,colPos,startTime,endTime,cfg;
			mc = configuration().mainCompositionsToBuild;
			cc = mc.compositionsConfig;
			for (var i = 0, ccl = cc.length; i < ccl; i++) {
				tcConf = cc[i];

				main = createMainCompAndFootageFolder(mainCompFolder, tcConf, mediaFootage);
				colPos = cloneColumnPositionsForMainComp(columnPositions, tcConf);

				main.comp.openInViewer();

				// now process all activities to create comps from template
				// place the comps in the timeline and modify the text layers
				for (var c = 1, col = content.length; c < col; c++) {
					currentLine = content[c];
					parsedContentLineArr = parse(currentLine, colPos, fps);

					for (var j = 0, pcll = parsedContentLineArr.length; j < pcll; j++) {
						parsedContentLine = parsedContentLineArr[j];
						adjustCompTypeIfNeeded(tcConf, parsedContentLine);

						// we try to use the requested template
						// if the text is too long for this template we
						// need to switch to an alternative template
						// if there is none we inform the user and stop the script
						templateOkay = false;
						while (!templateOkay) {
							newComp = createGermanComp(parsedContentLine.comp, c + "." + j, main.footageFolder);
							templateOkay = updateTextLayers(newComp, parsedContentLine.layers, main.footageFolder);
							cfg = configuration().compositionTemplates[parsedContentLine.comp];
							if (!templateOkay) {
								newComp.remove();
								if (cfg.isSizeAlternative) {
									parsedContentLine.comp = cfg.sizeAlternative;
								} else {
									// we were not able to find an alternative for the current template
									// however the text is too long for this template and therefor
									// we inform the user and stop the script
									message = "Text too long for template\n";
									message += "The template \n";
									message += "    '"+ parsedContentLine.comp +"'\n\n";
									message += "has text layers where the expected text doesn't fit. Thus the composition \n";
									message += "    '"+ c+"."+j + " "+ parsedContentLine.comp +"'\n\n";
									message += "could not be created in the main comp \n";
									message += "    '"+ main.comp.name +"'.\n\n";
									message += "You should create a new template where the text may fit and adjust the CSV file accordingly.";
									alert(message);
									return;
								}
							}
						}

						// adjust comp start and end times by using the configuration information
						// for the template comp (inBgFullyCovered and outBgFullyCovered)
						startTime = parsedContentLine.startTime - cfg.inBgFullyCovered;
						endTime = parsedContentLine.endTime + cfg.outBgFullyCovered;
						placeCompInTimeline(newComp, main.comp, startTime, endTime);
					}
				}

				// master the audio and add the main comp to the render queue
				masteringComp(main.comp);
				renderQueue.items.add(main.comp);
			}
		}
	}
}
