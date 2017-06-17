// DONE Every function should have an error handling gh:3 id:30
// DONE: refactor function to be not a callback function anymore and adapt with the new UI ressource string +enhancement id:77 gh:22
// DONE: function should support multi column content list and dropdownlist gh:30 id:87

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
