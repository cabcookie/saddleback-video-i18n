{
    try {
        importScript('errors/runtime-error');
        importScript('errors/font-to-small-error');
        importScript('csv-file-handling/parse');
        importScript('csv-file-handling/adjust-comp-type-if-needed');
        importScript('csv-file-handling/create-comp-from-template');
        importScript('adjust-layers/update-text-layers');
        importScript('adjust-timeline/place-comp-in-timeline');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for createSlideForMainComp",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createSlideForMainComp = function (main, currentLine, line, colPos, compConfig, startTime, endTime, templateName) {
        try {
            // now process all activities to create comp from template
            // place the comp in the timeline and modify the text layers
            if (currentLine.length > 0) {
                var parsedContentLine = sbVideoScript.parse(currentLine, colPos);
                templateName = sbVideoScript.adjustCompTypeIfNeeded(compConfig, templateName);

                // we try to use the requested template
                // if the text is too long for this template we
                // need to switch to an alternative template
                // if there is none we inform the user and stop the script
                var resultingTextLayers = [];
                while (resultingTextLayers.length == 0) {
                    var newComp = sbVideoScript.createCompFromTemplate(templateName, line, main.footageFolder);

                    try {
                        resultingTextLayers = sbVideoScript.updateTextLayers(newComp, parsedContentLine, main.footageFolder);
                    } catch (e) {
                        if (e instanceof sbVideoScript.FontToSmallError) {
                            var cfg = sbVideoScript.settings.compositionTemplates[templateName];
                            if (cfg.isSizeAlternative) {
                                newComp.remove();
                                templateName = cfg.sizeAlternative;
                            } else {
                                // we were not able to find an alternative for the current template
                                // however the text is too long for this template and therefor
                                // we inform the user and stop the script
                                throw new Error("The template '"+ templateName +"' has text layers where the expected text doesn't fit. Thus the composition '"+ line +" "+ templateName +"' could not be created in the main comp '"+ main.comp.name +"'. You should create a new template where the text may fit and adjust the settings accordingly.")
                            }
                        } else {
                            throw new Error("Error while creating and adjusting the text layers: "+ e.message)
                        }
                    }
                }

                // adjust comp start and end times by using the configuration information
                // for the template comp (inBgFullyCovered and outBgFullyCovered)
                var cfg = sbVideoScript.settings.compositionTemplates[templateName];
                startTime = startTime - cfg.inBgFullyCovered;
                endTime = endTime + cfg.outBgFullyCovered;
                sbVideoScript.placeCompInTimeline(newComp, main.comp, startTime, endTime, resultingTextLayers);
            }

        } catch (e) {
            var mainCompInfo = "";
            try {
                mainCompInfo += "mainCompName = "+ main.comp.name;
                mainCompInfo += "; templateName = "+ templateName;
                mainCompInfo += "; lineNumber = "+ line;
                mainCompInfo = "[main composition information: "+ mainCompInfo +"]";
            } catch (e) {
                mainCompInfo = "["+ mainCompInfo +"; wasn't able to retrieve main composition's information]";
            }

            throw new sbVideoScript.RuntimeError({
                func: 'createSlideForMainComp',
                title: 'Error creating one slide within the main composition '+ mainCompInfo,
                message: e.message
            })
        }
    }
}
