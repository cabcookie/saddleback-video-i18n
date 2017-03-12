'use strict';

import dateFormatted from './date-formatted';
import configuration from './configuration';
import findItemIndexByName from './find-item-index-by-name';

export default function createMainCompAndFootageFolder(mainCompFolder, tcConf, mediaFootage) {
    var sunday = new Date();
    sunday.setDate(sunday.getDate() + (7 - sunday.getDay()));

    var compName = tcConf.name + ' ' + dateFormatted(sunday);
    var targetComp = app.project.items.addComp(compName, mediaFootage.width, mediaFootage.height, mediaFootage.pixelAspect, mediaFootage.duration, mediaFootage.frameRate);

    // we check for the first template composition weather it has a drop frame timecode
    var firstTemplateName = '';
    for (firstTemplateName in configuration().compositionTemplates) {
        break;
    }
    var index = findItemIndexByName(firstTemplateName);
    targetComp.dropFrame = app.project.item(index).dropFrame;

    targetComp.layers.add(mediaFootage);
    targetComp.parentFolder = mainCompFolder;
    // this will be the comp where we add the duplicated comps

    // retrieve the name of the comp and create the name for the footage folder
    var compFootageFolderName = tcConf.name + configuration().parentFolderFootageExtensions;

    // create a parent folder for the new footages
    var compFootageFolder = app.project.items.addFolder(compFootageFolderName);
    compFootageFolder.parentFolder = targetComp.parentFolder;

    return {
        comp: targetComp,
        footageFolder: compFootageFolder
    };
}
