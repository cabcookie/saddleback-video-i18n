// TODO Every function should have an error handling gh:3 id:59

function createUI(thisObj) {
    var pan = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Saddleback Video Translation", undefined, {resizeable: false});
    var standardWidth = 140;
    var titlePos = [0, 0, standardWidth, 30];
    var statusColors = configuration().statusColors;
    var nextYPos = 0;

    pan.orientation = "row";
    pan.statusGrp = createUISectionStatus(pan, nextYPos, standardWidth*2, titlePos); nextYPos += 100;
    var statusObj = pan.statusGrp.status;
    changeStatusMessage(statusObj, "Waiting for user input...", statusColors.YELLOW_FONT, pan);

    pan.createCompForInOutGrp = createUISectionCreateCompForInOuts(pan, nextYPos, standardWidth, titlePos, statusObj, statusColors); nextYPos += 255;

    pan.findInOutGrp = createUISectionFindInOuts(pan, nextYPos, standardWidth, titlePos); nextYPos += 60;
    pan.changeFindInOutButtonsState(false);

    // pan.loadCSVAndCreateSlidesGrp = createUISectionLoadCSVAndCreateSlides(pan, nextYPos, standardWidth, titlePos, statusObj, statusColors); nextYPos += 90;
    pan.splitTextLayersGrp = createUISectionSplitTextLayers(pan, nextYPos, standardWidth, titlePos, statusObj, statusColors); nextYPos += 450;

    if (!(thisObj instanceof Panel)) {
        pan.show();
    }
    return pan;
}
