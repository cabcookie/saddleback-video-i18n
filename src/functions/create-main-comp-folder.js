'use strict';

import configuration from './configuration';
import isEmpty from './is-empty';

export default function createMainCompFolder() {
    // check if a the folder for the main comps already exists
    // if not create it
    var mainCompFolder = {};
    var mainCompFolderName = configuration().mainCompositionsToBuild.folderName;

    var items = app.project.items;
    for (var i = 1, il = items.length; i <= il; i++) {
        var it = items[i];
        if (it instanceof FolderItem) {
            if (it.name === mainCompFolderName) {
                mainCompFolder = it;
                break;
            }
        }
    }
    if (isEmpty(mainCompFolder)) {
        mainCompFolder = items.addFolder(mainCompFolderName);
    }

    return mainCompFolder;
}
