// TODO Every function should have an error handling gh:3 id:16

function createCompForInOuts(panel, section) {
    // load the original video file
	var minimumSermonDurationInMin = configuration().minimumSermonDurationInMin;
	var mediaFootage = loadVideoFootage(minimumSermonDurationInMin);

    // create a folder which will contain the expected main compositions that
	// will be rendered later and all computed compositions in a sub-footage folder
	var mainCompFolder = createMainCompFolder();

    var compForInOutsName = configuration().compositionNameForInOuts;
    var compForInOuts = getCompItem(compForInOutsName, mediaFootage, mainCompFolder.name);

    // we check for the first template composition weather it has a drop frame timecode
    var firstTemplateName = '';
    for (firstTemplateName in configuration().compositionTemplates) {
        break;
    }
    compForInOuts.dropFrame = getCompItem(firstTemplateName).dropFrame;
    compForInOuts.openInViewer();
    panel.changeFindInOutButtonsState(true);
}
