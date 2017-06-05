// TODO Every function should have an error handling gh:3 id:14

function createMainCompFolder() {
    var mainCompFolderName = configuration().mainCompositionsToBuild.folderName;
    return getFolder(mainCompFolderName);
}
