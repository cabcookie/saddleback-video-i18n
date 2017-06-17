// DONE Every function should have an error handling gh:3 id:21
// DONE: create reference to the trash folder into the sbVideoScript +enhancement id:84 gh:29

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/get-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for moveItemToTrashFolder",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.moveItemToTrashFolder = function (layerItem) {
        try {
            if (layerItem instanceof AVLayer) {
                if (layerItem.source instanceof FootageItem) {
                    var folderNameForTrash = sbVideoScript.settings.folderNameForTrash;
                    var mainCompFolderName = sbVideoScript.settings.mainCompositionsToBuild.folderName;

                    if (!sbVideoScript.trashFolder) {
                        sbVideoScript.trashFolder = sbVideoScript.getFolder(folderNameForTrash, mainCompFolderName);
                    }
                    layerItem.source.parentFolder = sbVideoScript.trashFolder;
                }
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'moveItemToTrashFolder',
                title: "Error moving item into trash folder",
                message: e.message
            });
        }
    }
}
