// DONE Every function should have an error handling gh:3 id:15

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/get-comp-item-or-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for getCompItem",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.getCompItem = function (itemName, source, parentFolderName) {
        try {
            return sbVideoScript.getCompItemOrFolder({
                type: 'composition',
                source: source,
                itemName: itemName,
                parentFolderName: parentFolderName
            });

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'getCompItem',
                title: "Error loading composition with the name '"+ itemName +"'",
                message: e.message
            })
        }
    }
}
