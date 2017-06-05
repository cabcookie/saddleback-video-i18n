// TODO Every function should have an error handling gh:3 id:13

function getFolder(folderName, parentFolderName) {
    return getCompItemOrFolder({
        type: 'folder',
        itemName: folderName,
        parentFolderName: parentFolderName
    });
}
