// TODO Every function should have an error handling gh:3 id:51

/**
Create all compositions from a given text file based on templates.

@IMPORTANT: You MUST have a default template composition for the different
"types" of compositions => "Scripture", "Lower Third", etc.
*/
function createMainCompsFromConfig(data) {
    try {
        var compForInOuts = getCompItem(configuration().compositionNameForInOuts);
        var mainComps = configuration().mainCompositionsToBuild;
        var mainCompsConfig = mainComps.compositionsConfig;
        var resultingMainComps = {};

        // iterate through all comps that needs to be created and adjust
        // the relevant columns of CSV file
        for (var i = 0; i < mainCompsConfig.length; i++) {
            var compConfig = mainCompsConfig[i];
            var main = createMainCompAndFootageFolder(data.mainCompFolder, compConfig, data.mediaFootage);
            var colPos = cloneColumnPositionsForMainComp(data.columnPositions, compConfig);

            main.comp.openInViewer();

            var resultingLayers = [];
            resultingMainComps[main.comp.name] = {
                comp: main.comp,
                layers: resultingLayers,
            };

            app.beginUndoGroup("Creating Slides for '" + main.comp.name + "'");

            var layLen = compForInOuts.layers.length - 1;
            for (var l = layLen; l > 0; l--) {
                var layer = compForInOuts.layers[l];
                var layerNameArr = layer.name.split(' ');
                if (layerNameArr.length === 1) {
                    throw new RuntimeError({
                        func: 'createMainCompsFromConfig',
                        title: 'Error at creating main comps',
                        message: "Unable to create main composition '%1'. In %2 was a problem to identify line number or template name in layer '%3'.",
                        params: [
                            compConfig.name,
                            compForInOuts.name,
                            layer.name
                        ]
                    });
                }

                var csvLine = data.linesOfCSV[parseInt(layerNameArr[0])];
                layerNameArr.shift();
                var templateName = layerNameArr.join(' ');
                var startTime = layer.inPoint;
                var endTime = layer.outPoint;
                var resultingLayer = createSlideForMainComp(main, csvLine, l, colPos, compConfig, startTime, endTime, templateName);
                resultingLayers.push(resultingLayer);
            }

            // master the audio and add the main comp to the render queue
            masteringComp(main.comp);

            app.endUndoGroup();
        }
        return resultingMainComps;
    } catch (e) {
        e.message = 'in createMainCompsFromConfig' + '\n' + e.message;
        alert(e.message);
        throw e;
    }
}
