{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/find-item-index-by-name');
        importScript('handle-items-and-folders/get-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for getCompItemOrFolder",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.getCompItemOrFolder = function (settings) {
        try {
            var itemName = settings.itemName;
            if (!itemName) {
                throw new Error('itemName is not defined')
            }

            var itemIdx = sbVideoScript.findItemIndexByName(itemName);
            if (itemIdx) {
                // item found so return it
                return app.project.item(itemIdx);
            }

            var parent;
            if (settings.parentFolderName) {
                parent = sbVideoScript.getFolder(settings.parentFolderName);
            }

            if (!(settings.type === 'folder' || settings.type === 'composition')) {
                throw new Error("Type not defined. Should be either 'folder' or 'composition' but it is '"+ settings.type +"'.");
            }

            if (settings.type === 'folder') {
                var folder = app.project.items.addFolder(itemName);
                if (parent) {
                    folder.parentFolder = parent;
                }
                return folder;
            }

            if (settings.type === 'composition') {
                if (!settings.source) {
                    throw new Error("settings.source is not defined");
                }

                var comp = app.project.items.addComp(itemName, settings.source.width, settings.source.height, settings.source.pixelAspect, settings.source.duration, settings.source.frameRate);
                comp.layers.add(settings.source);
                if (parent) {
                    comp.parentFolder = parent;
                }
                return comp;
            }

            throw new Error("Unknown error");

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'getCompItemOrFolder',
                title: 'Error loading or creating composition or folder.',
                message: e.message
            })
        }
    }
}
