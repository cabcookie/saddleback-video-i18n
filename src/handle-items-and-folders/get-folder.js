// DONE Every function should have an error handling gh:3 id:13

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/get-comp-item-or-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for getFolder",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.getFolder = function (folderName, parentFolderName) {
        try {
            return sbVideoScript.getCompItemOrFolder({
                type: 'folder',
                itemName: folderName,
                parentFolderName: parentFolderName
            });

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'getFolder',
                title: "Error loading or creating folder with name '"+ folderName +"' in '"+ parentFolderName +"'.",
                message: e.message
            })
        }
    }
}
