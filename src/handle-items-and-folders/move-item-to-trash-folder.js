// TODO Every function should have an error handling gh:3 id:21

function moveItemToTrashFolder(layerItem) {
    if (layerItem instanceof AVLayer) {
        if (layerItem.source instanceof FootageItem) {
            var folderNameForTrash = configuration().folderNameForTrash;
            var mainCompFolderName = configuration().mainCompositionsToBuild.folderName;

            var trashFolder = getFolder(folderNameForTrash, mainCompFolderName);

            layerItem.source.parentFolder = trashFolder;
        }
    }
}
