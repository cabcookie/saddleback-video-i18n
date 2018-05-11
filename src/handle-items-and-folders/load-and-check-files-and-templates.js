{
    try {
        importScript('errors/runtime-error');
        importScript('csv-file-handling/create-array-from-file');
        importScript('csv-file-handling/parse-first-line');
        importScript('handle-items-and-folders/load-audio-footage');
        importScript('handle-items-and-folders/load-video-footage');
        importScript('handle-items-and-folders/load-all-expected-templates');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for loadAndCheckFilesAndTemplates",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.loadAndCheckFilesAndTemplates = function () {
        try {
            sbVideoScript.loadAudioFootage();
        	sbVideoScript.linesOfCSV = sbVideoScript.createArrayFromFile();
        	sbVideoScript.columnPositions = sbVideoScript.parseFirstLine(sbVideoScript.linesOfCSV[0], sbVideoScript.settings.requiredFieldsInCSV);
        	sbVideoScript.loadVideoFootage();
        	sbVideoScript.loadAllExpectedTemplates();

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: "loadAndCheckFilesAndTemplates",
                title: "Error checking all relevant files and templates",
                message: e.message
            });
        }
    }
}
