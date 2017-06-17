// DONE Every function should have an error handling gh:3 id:14
// DONE: store a reference to the main comp folder within sbVideoScript +enhancement id:83 gh:28

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/get-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for createMainCompFolder",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createMainCompFolder = function () {
        try {
            var mainCompFolderName = sbVideoScript.settings.mainCompositionsToBuild.folderName;
            if (sbVideoScript.mainCompFolder) {
                return;
            }
            sbVideoScript.mainCompFolder = sbVideoScript.getFolder(mainCompFolderName);

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'createMainCompFolder',
                title: 'Error loading or creating main composition folder',
                message: e.message
            })
        }
    }
}
