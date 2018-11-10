{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/load-video-footage');
        importScript('handle-items-and-folders/get-main-comp-folder');
        importScript('handle-items-and-folders/get-comp-item');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for createCompForInOuts",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createCompForInOuts = function () {
        try {
            // create a folder which will contain the expected main compositions that
        	// will be rendered later and all computed compositions in a sub-footage folder
        	var mainCompFolder = sbVideoScript.getMainCompFolder();
            var compForInOutsName = sbVideoScript.settings.compositionNameForInOuts;
            var compForInOuts = sbVideoScript.getCompItem(compForInOutsName, sbVideoScript.loadVideoFootage(), mainCompFolder.name);

            // we check for the first template composition weather it has a drop frame timecode
            var firstTemplateName = '';
            for (firstTemplateName in sbVideoScript.settings.compositionTemplates) {
                break;
            }
            compForInOuts.dropFrame = sbVideoScript.getCompItem(firstTemplateName).dropFrame;
            compForInOuts.openInViewer();
            sbVideoScript.changeFindInOutButtonsState(true);

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'createCompForInOuts',
                title: 'Error creating composition for highlighting the slides in the timeline',
                message: e.message
            });
        }
    }
}
