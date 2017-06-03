'use strict';

export default function getFolder(folderName, parentFolderName) {
    return getCompItemOrFolder({
        type: 'folder',
        itemName: folderName,
        parentFolderName: parentFolderName
    });
}
