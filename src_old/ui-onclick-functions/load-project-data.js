{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/create-comp-for-in-outs');
        importScript('handle-items-and-folders/load-and-check-files-and-templates');
        importScript('ui-elements/set-content-list');
        importScript('config/load-project-settings');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for loadProjectData",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.loadProjectData = function () {
        try {
            sbVideoScript.loadProjectSettings();
            sbVideoScript.createCompForInOuts();
            sbVideoScript.loadAndCheckFilesAndTemplates();
            sbVideoScript.setContentList();
            sbVideoScript.createSlidesButton.enabled = true;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'loadProjectData',
                title: 'Error loading the project data (settings, audio, CSV file)',
                message: e.message
            });
        }
    }
}
