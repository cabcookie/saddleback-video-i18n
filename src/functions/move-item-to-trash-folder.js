'use strict';

export default function moveItemToTrashFolder(layerItem) {
    if (layerItem instanceof AVLayer) {
        if (layerItem.source instanceof FootageItem) {
            var folderNameForTrash = configuration().folderNameForTrash;
            var mainCompFolderName = configuration().mainCompositionsToBuild.folderName;

            var trashFolder = getFolder(folderNameForTrash, mainCompFolderName);

            layerItem.source.parentFolder = trashFolder;
        }
    }
}
