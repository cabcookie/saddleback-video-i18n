// TODO Every function should have an error handling gh:3 id:49

/**
Create all compositions from a given text file based on templates.

@IMPORTANT: You MUST have a default template composition for the different
"types" of compositions => "Scripture", "Lower Third", etc.
*/
function createSlideForMainComp(main, currentLine, line, colPos, compConfig, startTime, endTime, templateName) {
    try {
        // now process all activities to create comp from template
        // place the comp in the timeline and modify the text layers
        if (currentLine.length > 0) {
            var parsedContentLine = parse(currentLine, colPos);
            templateName = adjustCompTypeIfNeeded(compConfig, templateName);

            // we try to use the requested template
            // if the text is too long for this template we
            // need to switch to an alternative template
            // if there is none we inform the user and stop the script
            var resultingTextLayers = [];
            while (resultingTextLayers.length == 0) {
                var newComp = createGermanComp(templateName, line, main.footageFolder);

                try {
                    resultingTextLayers = updateTextLayers(newComp, parsedContentLine, main.footageFolder);
                    resultingLayer = {
                        line: line,
                        compType: templateName,
                        textLayers: resultingTextLayers,
                    };
                } catch (e) {
                    if (e instanceof FontToSmallError) {
                        var cfg = configuration().compositionTemplates[templateName];
                        if (cfg.isSizeAlternative) {
                            newComp.remove();
                            templateName = cfg.sizeAlternative;
                        } else {
                            // we were not able to find an alternative for the current template
                            // however the text is too long for this template and therefor
                            // we inform the user and stop the script
                            throw new RuntimeError({
                                func: "createSlideForMainComp",
                                title: "Text too long for template",
                                message: "The template \n    '%1'\n\nhas text layers where the expected text doesn't fit. Thus the composition \n    '%2 %1'\n\ncould not be created in the main comp \n    '%3'.\n\nYou should create a new template where the text may fit and adjust the CSV file accordingly.",
                                params: [
                                    templateName,
                                    line,
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
            var cfg = configuration().compositionTemplates[templateName];
            startTime = startTime - cfg.inBgFullyCovered;
            endTime = endTime + cfg.outBgFullyCovered;
            resultingLayer.layerName = placeCompInTimeline(newComp, main.comp, startTime, endTime, resultingTextLayers);
            resultingLayer.startTime = startTime - 2 / main.frameRate;
            resultingLayer.endTime = endTime + 2 / main.frameRate;
        }
        return resultingLayer;
    } catch (e) {
        if (e instanceof Error) {
            e.message = 'in createSlideForMainComp' + '\n' + e.message;
            throw e;
        }
    }
}
