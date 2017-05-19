'use strict';

import configuration from './configuration';
import checkUIPositions from './check-ui-positions';
import changeStatusMessage from './change-status-message';
import createCompsFromTextFile from './functions/create-comps-from-text-file';
import searchItemInTimeline from './seach-item-in-timeline';
import configuration from './configuration';
import clone from './clone';
import loadAndCheckFilesAndTemplates from './load-and-check-files-and-templates';
import RuntimeError from './runtime-error';

/**
The following lines provide information to test the function
*/
// var uiPanel;
// uiPanel = createUI(this);

/**
*/
export default function createUI(thisObj) {
    var pan = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Saddleback Video Translation", undefined, {resizeable: false});
    var standardWidth = 140;
    var titlePos = [0, 0, standardWidth, 30];
    var statusColors = configuration().statusColors;
    var nextYPos = 0;

    pan.orientation = "row";
    pan.statusGrp = createUISectionStatus(pan, nextYPos, standardWidth*2, titlePos); nextYPos += 100;
    var statusObj = pan.statusGrp.status;
    changeStatusMessage(statusObj, "Waiting for user input...", statusColors.YELLOW_FONT, pan);

    pan.createCompForInOutGrp = createUISectionCreateCompForInOuts(pan, nextYPos, standardWidth, titlePos); nextYPos += 150;

    pan.findInOutGrp = createUISectionFindInOuts(pan, nextYPos, standardWidth, titlePos); nextYPos += 150;
    pan.findInOutGrp.changeButtonState(false);
    pan.createCompForInOutGrp.changeButtonState = pan.findInOutGrp.changeButtonState;

    pan.loadCSVAndCreateSlidesGrp = createUISectionLoadCSVAndCreateSlides(pan, nextYPos, standardWidth, titlePos, statusObj, statusColors); nextYPos += 90;
    pan.splitTextLayersGrp = createUISectionSplitTextLayers(pan, nextYPos, standardWidth, titlePos, statusObj, statusColors); nextYPos += 450;

    if (!(thisObj instanceof Panel)) {
        pan.show();
    }
    return pan;
}
