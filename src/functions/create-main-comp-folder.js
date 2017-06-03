'use strict';

import configuration from './configuration';
import isEmpty from './is-empty';

export default function createMainCompFolder() {
    var mainCompFolderName = configuration().mainCompositionsToBuild.folderName;
    return getFolder(mainCompFolderName);
}
