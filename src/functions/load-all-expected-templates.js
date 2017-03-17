'use strict';

import configuration from './configuration';
import findItemIndexByName from './find-item-index-by-name';
import RuntimeError from './runtime-error';

export default function loadAllExpectedTemplates() {
    // prepare required vars
    var expTemps, expTempName, expTempNames;
    var tempCfg;
    var youtubeTempName, youtubeNameExtension, sizeAltName;
    var index, uniqueNames, resultComps;

    expTemps = configuration().compositionTemplates;
    expTempNames = [];
    youtubeNameExtension = configuration().compositionYouTubeNameExtension;

    // first we create a list of all names for the composition templates
    // which we need to check for in and out animations
    for (expTempName in expTemps) {
        expTempNames.push(expTempName);
        tempCfg = expTemps[expTempName];
        if (tempCfg.youtubeAlternative) {
            youtubeTempName = expTempName + youtubeNameExtension;
            expTempNames.push(youtubeTempName);
        }
        if (tempCfg.isSizeAlternative) {
            expTempNames.push(tempCfg.sizeAlternative);
        }
    }

    // we make the array with composition names unique
    // and if it is unique we push it into the result list
    uniqueNames = {};
    resultComps = [];
    for(var i = 0, l = expTempNames.length; i < l; ++i){
        expTempName = expTempNames[i];
        if(uniqueNames.hasOwnProperty(expTempName)) {
            continue;
        }
        index = findItemIndexByName(expTempName);

        if (index === null) {
            // we couldn't find the expected template name
            // so we will throw an exception
            throw new RuntimeError({
                func: "loadAllExpectedTemplates",
                title: "Missing Composition",
                message: "Composition '%1' is missing. Make sure to create it or remove it from the composition settings.",
                params: [
                    expTempName
                ]
            });
        }

        resultComps.push(app.project.item(index));
        uniqueNames[expTempName] = 1;
    }

    // we now have all expected template compositions in an array which we will return
    return resultComps;
}
