'use strict';

export default function getCompItemOrFolder(settings) {
    var errFunc = "getCompItemOrFolder";
    try {
        var itemName = settings.itemName;
        if (!itemName) {
            throw new RuntimeError({
                func: errFunc,
                title: "itemName is not defined",
                message: "To find or create a composition or folder the name of the item needs to be defined."
            });
        }

        var itemIdx = findItemIndexByName(itemName);
        if (itemIdx) {
            // item found so return it
            return app.project.item(itemIdx);
        }

        var parent;
        if (settings.parentFolderName) {
            parent = getFolder(settings.parentFolderName);
        }

        if (!(settings.type === 'folder' || settings.type === 'composition')) {
            throw new RuntimeError({
                func: errFunc,
                title: "Type not defined",
                message: "The settings.type of the item isn't defined. Should be either '%1' or '%2' but it is '%3'.",
                params: [
                    'folder',
                    'composition',
                    settings.type
                ]
            });
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
                throw new RuntimeError({
                    func: errFunc,
                    title: "settings.source is not defined",
                    message: "To create a CompItem with the name '%1' a settings.source must be defined.",
                    params: [itemName]
                });
            }

            var comp = app.project.items.addComp(itemName, settings.source.width, settings.source.height, settings.source.pixelAspect, settings.source.duration, settings.source.frameRate);
            comp.layers.add(settings.source);
            if (parent) {
                comp.parentFolder = parent;
            }
            return comp;
        }

        throw new RuntimeError({
            func: errFunc,
            title: "Unknown error",
            message: "An unknown error occured."
        });
    } catch (e) {
        if (e instanceof RuntimeError) {
            alert(e.message);
        } else {
            alert('Not an RuntimeError: ' + e.message);
        }
    }
}
