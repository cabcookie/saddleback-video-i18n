{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/get-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for getMainCompFolder",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.getMainCompFolder = function () {
        try {
            if (sbVideoScript.mainCompFolder) {
                return sbVideoScript.mainCompFolder;
            }

            var mainCompFolderName = sbVideoScript.settings.mainCompositionsToBuild.folderName;
            sbVideoScript.mainCompFolder = sbVideoScript.getFolder(mainCompFolderName);
            return sbVideoScript.mainCompFolder;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'getMainCompFolder',
                title: 'Error loading or creating main composition folder',
                message: e.message
            })
        }
    }
}
