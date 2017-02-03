'use strict';

import configuration from './configuration';
import isEmpty from './is-empty';

export default function createMainCompFolder() {
    // check if a the folder for the main comps already exists
    // if not create it
    var mainCompFolder = {};
    var items = app.project.items;
    for (var i = 1; i <= items.length; i++) {
        var it = items[i];
        if (it instanceof FolderItem) {
            if (it.name === configuration().mainCompositionsToBuild.folderName) {
                mainCompFolder = it;
                break;
            }
        }
    }
    if (isEmpty(mainCompFolder)) {
        mainCompFolder = items.addFolder(configuration().mainCompositionsToBuild.folderName);
    }
    return mainCompFolder;
}
