'use strict';

export default function getCompItem(itemName, source, parentFolderName) {
    return getCompItemOrFolder({
        type: 'composition',
        source: source,
        itemName: itemName,
        parentFolderName: parentFolderName
    });
}
