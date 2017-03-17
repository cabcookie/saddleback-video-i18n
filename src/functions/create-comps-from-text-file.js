'use strict';

import createGermanComp from './create-german-comp';
import updateTextLayers from './update-text-layers';
import placeCompInTimeline from './place-comp-in-timeline';
import parse from './parse';
import createMainCompAndFootageFolder from './create-main-comp-and-footage-folder';
import cloneColumnPositionsForMainComp from './clone-column-positions-for-main-comp';
import adjustCompTypeIfNeeded from './adjust-comp-type-if-needed';
import masteringComp from './mastering-comp';
import isEmpty from './is-empty';
import clone from './clone';
import configuration from './configuration';
import RuntimeError from './runtime-error';
import FontToSmallError from './font-to-small-error';

/**
 Create all compositions from a given text file based on templates.

 @IMPORTANT: You MUST have a default template composition for the different
 "types" of compositions => "Scripture", "Lower Third", etc.
 */
export default function createCompsFromTextFile(data) {
	try {
		var fps, renderQueue;
		var currentLine, parsedContentLine;
		var resultingTextLayers, newComp;

		// get the frameRate of the selected file
		fps = data.mediaFootage.frameRate;

		// load render queue for later rendering of main compositions
		renderQueue = app.project.renderQueue;

		// iterate through all comps that needs to be created and adjust
		// the relevant columns of CSV file
		var mc,cc,tcConf,main,colPos,startTime,endTime,cfg;
		mc = configuration().mainCompositionsToBuild;
		cc = mc.compositionsConfig;
		for (var i = 0, ccl = cc.length; i < ccl; i++) {
			tcConf = cc[i];

			main = createMainCompAndFootageFolder(data.mainCompFolder, tcConf, data.mediaFootage);
			colPos = cloneColumnPositionsForMainComp(data.columnPositions, tcConf);

			main.comp.openInViewer();

			// now process all activities to create comps from template
			// place the comps in the timeline and modify the text layers
			for (var c = 1, col = data.linesOfCSV.length; c < col; c++) {
				currentLine = data.linesOfCSV[c];

				if (currentLine.length > 0) {
					parsedContentLine = parse(currentLine, colPos, fps);
					adjustCompTypeIfNeeded(tcConf, parsedContentLine);

					// we try to use the requested template
					// if the text is too long for this template we
					// need to switch to an alternative template
					// if there is none we inform the user and stop the script
					resultingTextLayers = [];
					while (resultingTextLayers.length == 0) {
						newComp = createGermanComp(parsedContentLine.comp, c, main.footageFolder);

						try {
							resultingTextLayers = updateTextLayers(newComp, parsedContentLine, main.footageFolder);
						} catch (e) {
							if (e instanceof FontToSmallError) {
								cfg = configuration().compositionTemplates[parsedContentLine.comp];
								if (cfg.isSizeAlternative) {
									newComp.remove();
									parsedContentLine.comp = cfg.sizeAlternative;
								} else {
									// we were not able to find an alternative for the current template
									// however the text is too long for this template and therefor
									// we inform the user and stop the script
									throw new RuntimeError({
						                func: "createCompsFromTextFile",
						                title: "Text too long for template",
						                message: "The template \n    '%1'\n\nhas text layers where the expected text doesn't fit. Thus the composition \n    '%2 %1'\n\ncould not be created in the main comp \n    '%3'.\n\nYou should create a new template where the text may fit and adjust the CSV file accordingly.",
						                params: [
						                    parsedContentLine.comp,
						                    c,
											main.comp.name
						                ]
						            });
								}
							} else {
								throw e;
							}
						}

					}

					// adjust comp start and end times by using the configuration information
					// for the template comp (inBgFullyCovered and outBgFullyCovered)
					cfg = configuration().compositionTemplates[parsedContentLine.comp];
					startTime = parsedContentLine.startTime - cfg.inBgFullyCovered;
					endTime = parsedContentLine.endTime + cfg.outBgFullyCovered;
					placeCompInTimeline(newComp, main.comp, startTime, endTime, resultingTextLayers);
				}
			}

			// master the audio and add the main comp to the render queue
			masteringComp(main.comp);
			renderQueue.items.add(main.comp);
		}
		return true;
	} catch (e) {
		if (e instanceof Error) {
			e.message = 'in createCompsFromTextFile' + '\n' + e.message;
			throw e;
		}
	}
}
