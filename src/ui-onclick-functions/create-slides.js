// TODO: do I really need the resultingMainComps? +enhancement id:97 gh:41

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/get-comp-item');
        importScript('handle-items-and-folders/create-main-comp-and-footage-folder');
        importScript('csv-file-handling/clone-column-positions-for-main-comp');
        importScript('csv-file-handling/create-slide-for-main-comp');
        importScript('csv-file-handling/mastering-comp');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for createSlides",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createSlides = function () {
        try {
            if (!sbVideoScript.linesOfCSV) { throw new Error("No CSV data loaded yet. Please choose a CSV file with consistent data.") }
            if (!sbVideoScript.loadVideoFootage()) { throw new Error("No video footage found. Please load a video into the project") }

            var compForInOuts = sbVideoScript.getCompItem(sbVideoScript.settings.compositionNameForInOuts);
            var mainComps = sbVideoScript.settings.mainCompositionsToBuild;
            var mainCompsConfig = mainComps.compositionsConfig;
            var resultingMainComps = {};

            if (!(compForInOuts && mainComps)) { throw new Error("Please make sure you first load the content and create a composition which shows the in/out points of the slides and content being used") }

            // iterate through all comps that needs to be created and adjust
            // the relevant columns of CSV file
            for (var i = 0; i < mainCompsConfig.length; i++) {
                var compConfig = mainCompsConfig[i];
                var main = sbVideoScript.createMainCompAndFootageFolder(compConfig);
                var colPos = sbVideoScript.cloneColumnPositionsForMainComp(compConfig);

                main.comp.openInViewer();

                var resultingLayers = [];
                resultingMainComps[main.comp.name] = {
                    comp: main.comp,
                    layers: resultingLayers,
                };

                app.beginUndoGroup("Creating Slides for '" + main.comp.name + "'");

                // TODO: Add a progress bar when creating the main compositions and their slides +feature

                var layerLen = compForInOuts.layers.length - 1;
                for (var l = layerLen; l > 0; l--) {
                    var layer = compForInOuts.layers[l];
                    var layerNameArr = layer.name.split(' ');
                    if (layerNameArr.length === 1) { throw new Error("Unable to create main composition '"+ compConfig.name +"'. In '"+ compForInOuts.name +"' was a problem to identify line number or template name in layer '"+ layer.name +"'.") }

                    var lineNumber = parseInt(layerNameArr[0]);
                    var csvLine = sbVideoScript.linesOfCSV[lineNumber];
                    layerNameArr.shift();
                    var templateName = layerNameArr.join(' ');
                    var startTime = layer.inPoint;
                    var endTime = layer.outPoint;
                    var resultingLayer = sbVideoScript.createSlideForMainComp(main, csvLine, lineNumber, colPos, compConfig, startTime, endTime, templateName);
                    resultingLayers.push(resultingLayer);
                }

                // master the audio and add the main comp to the render queue
                sbVideoScript.masteringComp(main.comp);

                app.endUndoGroup();
            }

        } catch (e) {
            sbVideoScript.createSlidesButton.enabled = false;
            throw new sbVideoScript.RuntimeError({
                func: 'createSlides',
                title: 'Error creating slides from the given information',
                message: e.message
            })
        }
    }
}
