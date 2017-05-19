'use strict';

export default function createCompForInOuts(panel, section) {
    return function () {
        var minimumSermonDurationInMin, mediaFootage, mainCompFolder, compForInOuts, compForInOutsName, index;

        // load the original video file
    	minimumSermonDurationInMin = configuration().minimumSermonDurationInMin;
    	mediaFootage = loadVideoFootage(minimumSermonDurationInMin);

        // create a folder which will contain the expected main compositions that
    	// will be rendered later and all computed compositions in a sub-footage folder
    	mainCompFolder = createMainCompFolder();

        compForInOutsName = configuration().compositionNameForInOuts;
        index = findItemIndexByName(compForInOutsName);
        if (index == null) {
            compForInOuts = app.project.items.addComp(compForInOutsName, mediaFootage.width, mediaFootage.height, mediaFootage.pixelAspect, mediaFootage.duration, mediaFootage.frameRate);
            // we check for the first template composition weather it has a drop frame timecode
            var firstTemplateName = '';
            for (firstTemplateName in configuration().compositionTemplates) {
                break;
            }
            index = findItemIndexByName(firstTemplateName);
            compForInOuts.dropFrame = app.project.item(index).dropFrame;

            compForInOuts.layers.add(mediaFootage);
            compForInOuts.parentFolder = mainCompFolder;
        } else {
            compForInOuts = app.project.item(index);
        }

        compForInOuts.openInViewer();

        section.changeButtonState(true);
    }
}
