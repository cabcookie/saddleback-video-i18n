// DONE Every function should have an error handling gh:3 id:34
// DONE: use sbVideoScript to store the data instead the panel or the object csvData +enhancement id:75 gh:20

{
    try {
        importScript('errors/runtime-error');
        importScript('config/date-formatted');
        importScript('handle-items-and-folders/get-comp-item');
        importScript('handle-items-and-folders/get-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for createMainCompAndFootageFolder",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createMainCompAndFootageFolder = function (compConfig) {
        try {
            if (!compConfig) { throw new Error("No settings for composition to be created") }
            if (!sbVideoScript.mediaFootage) { throw new Error("No media footage found in the project. Please import a video or link a Premiere sequence.") }
            if (!sbVideoScript.mainCompFolder) { throw new Error("No main folder for the composition has been created.") }

            var sunday = new Date();
            sunday.setDate(sunday.getDate() + (7 - sunday.getDay()));

            var compName = compConfig.name + ' ' + sbVideoScript.dateFormatted(sunday);
            var targetComp = sbVideoScript.getCompItem(compName, sbVideoScript.mediaFootage, sbVideoScript.mainCompFolder.name);

            // we check for the first template composition weather it has a drop frame timecode
            var firstTemplateName = '';
            for (firstTemplateName in sbVideoScript.settings.compositionTemplates) {
                break;
            }
            targetComp.dropFrame = sbVideoScript.getCompItem(firstTemplateName).dropFrame;

            // retrieve the name of the comp and create the name for the footage folder
            var compFootageFolderName = compConfig.name + sbVideoScript.settings.parentFolderFootageExtensions;
            // create a parent folder for the new footages
            var compFootageFolder = sbVideoScript.getFolder(compFootageFolderName, sbVideoScript.mainCompFolder.name);

            return {
                comp: targetComp,
                footageFolder: compFootageFolder
            };

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'createMainCompAndFootageFolder',
                title: 'Error creating composition for config item',
                message: e.message
            })
        }
    }
}
