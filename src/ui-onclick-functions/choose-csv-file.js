{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/create-comp-for-in-outs');
        importScript('handle-items-and-folders/load-and-check-files-and-templates');
        importScript('csv-file-handling/clone-column-positions-for-main-comp');
        importScript('csv-file-handling/parse');
        importScript('ui-elements/set-content-list');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for chooseCSVFile",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.chooseCSVFile = function () {
        try {
            sbVideoScript.createCompForInOuts();
            sbVideoScript.loadAndCheckFilesAndTemplates();
            sbVideoScript.setContentList();
            sbVideoScript.createSlidesButton.enabled = true;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'chooseCSVFile',
                title: 'Error choosing and loading CSV file',
                message: e.message
            });
        }
    }
}
