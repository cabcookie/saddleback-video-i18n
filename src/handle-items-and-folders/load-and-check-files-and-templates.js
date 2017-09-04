{
    try {
        importScript('errors/runtime-error');
        importScript('csv-file-handling/create-array-from-file');
        importScript('csv-file-handling/parse-first-line');
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
            // Open a dialog and ask for a file and return an array of lines of that file.
        	sbVideoScript.linesOfCSV = sbVideoScript.createArrayFromFile();

            // try to parse the file to retrieve the composition informations
        	// define the required fields in the CSV file for the script to work properly
        	// now parse the first line with the title names to retrieve position in text file
        	sbVideoScript.columnPositions = sbVideoScript.parseFirstLine(sbVideoScript.linesOfCSV[0], sbVideoScript.settings.requiredFieldsInCSV);

        	// load the original video file
        	sbVideoScript.loadVideoFootage();

            // iterate through all composition templates and
        	// find markers for in and out animation
            // and identify the number of lines per text layer and store them in the settings
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
