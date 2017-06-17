// DONE Every function should have an error handling gh:3 id:20
// DONE: store the template information globally in sbVideoScript +enhancement id:82 gh:27
// DONE: Move the check for markers and the check for how many lines fit into the text layers into this function so that we don't iterate through the compositions over and over again and we improve performance a bit +enhancement id:90 gh:34
// DONE: better idea: call the checkLineNumsInTemplates function from checkAndAdjustFontSize and if it is the first time to check the template we do the test and store the information into the settings; if the function is called a second time it just returns the result from the settings +enhancement id:93 gh:37

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/find-item-index-by-name');
        importScript('handle-items-and-folders/check-markers-in-templates');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for loadAllExpectedTemplates",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.loadAllExpectedTemplates = function () {
        try {
            var expTemps = sbVideoScript.settings.compositionTemplates;
            var expTempNames = [];
            var youtubeNameExtension = sbVideoScript.settings.compositionYouTubeNameExtension;

            // first we create a list of all names for the composition templates
            // which we need to check for in and out animations
            for (var expTempName in expTemps) {
                expTempNames.push(expTempName);
                var tempCfg = expTemps[expTempName];
                if (tempCfg.youtubeAlternative) {
                    var youtubeTempName = expTempName + youtubeNameExtension;
                    expTempNames.push(youtubeTempName);
                }
                if (tempCfg.isSizeAlternative) {
                    expTempNames.push(tempCfg.sizeAlternative);
                }
            }

            // we make the array with composition names unique
            // and if it is unique we push it into the result list
            var uniqueNames = {};
            var resultComps = [];
            for(var i = 0, l = expTempNames.length; i < l; ++i){
                var expTempName = expTempNames[i];
                if(uniqueNames.hasOwnProperty(expTempName)) {
                    continue;
                }
                var index = sbVideoScript.findItemIndexByName(expTempName);

                if (index === null) {
                    // we couldn't find the expected template name
                    // so we will throw an exception
                    throw new Error("Composition '"+ expTempName +"' is missing. Make sure to create it or remove it from the composition settings.");
                }

                var templateComp = app.project.item(index);
                sbVideoScript.checkMarkersInTemplates(templateComp);

                resultComps.push(templateComp);
                uniqueNames[expTempName] = 1;
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'loadAllExpectedTemplates',
                title: "Error searching and analyzing for expected templates",
                message: e.message
            });
        }

        // we now have all expected template compositions in an array which we will store now
        sbVideoScript.templates = resultComps;
    }
}
