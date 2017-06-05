// TODO Every function should have an error handling gh:3 id:15

function getCompItem(itemName, source, parentFolderName) {
    return getCompItemOrFolder({
        type: 'composition',
        source: source,
        itemName: itemName,
        parentFolderName: parentFolderName
    });
}
