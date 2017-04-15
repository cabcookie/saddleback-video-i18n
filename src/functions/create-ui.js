'use strict';

import configuration from './configuration';
import checkUIPositions from './check-ui-positions';
import changeStatusMessage from './change-status-message';
import createCompsFromTextFile from './functions/create-comps-from-text-file';
import searchItemInTimeline from './seach-item-in-timeline';
import configuration from './configuration';
import clone from './clone';

/**
The following lines provide information to test the function
*/
// var uiPanel;
// uiPanel = createUI(this);

/**
*/
export default function createUI(thisObj) {
    var pan = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Saddleback Video Translation", undefined, {resizeable: false});
    var clr, l;
    var X_WIDTH, NULL_SIZE, MAX_SIZE, NO_SPLIT_BTNS;
    var titlePos, pos, statusWidth, btnWidth, statusObj, splBtnGrp;

    NULL_SIZE = [0,0];
    MAX_SIZE = [1000,1000];
    NO_SPLIT_BTNS = configuration().uiNoOfSptBtns;

    pan.orientation = "row";
    // colors for status messages
    clr = configuration().statusColors;

    pos = clone(configuration().uiPositions);
    // TODO: hide the title for the split layer controls
    // pos.grSplLay.btnGrp.splBtnGrp.title.pos[3] = pos.grSplLay.btnGrp.splBtnGrp.title.pos[1];
    checkUIPositions(pos);

    pan.grStat = pan.add("group", pos.grStat.pos);
    pan.grStat.orientation = "row";
    pan.grStat.title = pan.grStat.add("statictext", pos.grStat.title.pos, "Status:");

    statusObj = pan.grStat.status = pan.grStat.add("statictext", pos.grStat.status.pos, 'X', {multiline:true});
    X_WIDTH = statusObj.preferredSize[0];
    statusObj.preferredSize = [-1,-1];
    statusObj.characters = ~~(statusWidth/X_WIDTH);
    statusObj.preferredSize[1] = -1;
    changeStatusMessage(statusObj, "Waiting for user input...", clr.YELLOW_FONT, pan);

    // TODO: add selector for compositions to be created

    pan.grCrLay = pan.add("group", pos.grCrLay.pos);
    pan.grCrLay.orientation = "row";
    pan.grCrLay.title = pan.grCrLay.add("statictext", pos.grCrLay.title.pos, "Create Slides & Layers");
    pan.grCrLay.btnGrp = pan.grCrLay.add("group", pos.grCrLay.btnGrp.pos);
    pan.grCrLay.btnGrp.orientation = "row";
    pan.grCrLay.btnGrp.chFile = pan.grCrLay.btnGrp.add("button", pos.grCrLay.btnGrp.chFile.pos, "Choose File...");
    pan.grCrLay.btnGrp.crSlides = pan.grCrLay.btnGrp.add("button", pos.grCrLay.btnGrp.crSlides.pos, "Create Slides");

    // TODO: Add a progress bar and update it in createCompsFromTextFile

    pan.grSplLay = pan.add("group", pos.grSplLay.pos);
    pan.grSplLay.orientation = "row";
    pan.grSplLay.title = pan.grSplLay.add("statictext", pos.grSplLay.title.pos, "Check Layers");
    pan.grSplLay.btnGrp = pan.grSplLay.add("group", pos.grSplLay.btnGrp.pos);
    pan.grSplLay.btnGrp.orientation = "row";
    pan.grSplLay.btnGrp.title = pan.grSplLay.btnGrp.add("statictext", pos.grSplLay.btnGrp.title.pos, "search directions:");
    pan.grSplLay.btnGrp.lArr = pan.grSplLay.btnGrp.add("button", pos.grSplLay.btnGrp.lArr.pos, "<");
    pan.grSplLay.btnGrp.rArr = pan.grSplLay.btnGrp.add("button", pos.grSplLay.btnGrp.rArr.pos, ">");
    pan.grSplLay.btnGrp.splBtnGrp = pan.grSplLay.btnGrp.add("group", pos.grSplLay.btnGrp.splBtnGrp.pos);
    pan.grSplLay.btnGrp.splBtnGrp.title = pan.grSplLay.btnGrp.splBtnGrp.add("statictext", pos.grSplLay.btnGrp.splBtnGrp.title.pos, "Split at Cursor...");

    splBtnGrp = pan.grSplLay.btnGrp.splBtnGrp;
    for (var i = 1; i <= NO_SPLIT_BTNS; i++) {
        l = splBtnGrp['l'+i] = splBtnGrp.add("button", pos.grSplLay.btnGrp.splBtnGrp['l'+i].pos, "Blank Button "+i);
    }
    splBtnGrp.visible = false;
    splBtnGrp.maximumSize = NULL_SIZE;

    pan.grCrLay.btnGrp.crSlides.enabled = false;

    pan.grCrLay.btnGrp.chFile.onClick = function () {
        try {
            pan.csvData = loadAndCheckFilesAndTemplates();
            pan.grCrLay.btnGrp.crSlides.enabled = true;
            changeStatusMessage(statusObj, "Succesfully loaded CSV content.", clr.GREEN_FONT, pan);
        } catch (e) {
            pan.grCrLay.btnGrp.crSlides.enabled = false;
        	if (e instanceof RuntimeError) {
                changeStatusMessage(statusObj, e.message, clr.RED_FONT, pan);
        	} else {
        		throw e;
        	}
        }
    };

    pan.grCrLay.btnGrp.crSlides.onClick = function () {
        try {
            if (!pan.csvData) {
                throw new RuntimeError({
                    func: "crSlides.onClick",
                    title: "No CSV data loaded yet. Please choose a CSV file with consistent data.",
                });
            }
            pan.resultComps = createCompsFromTextFile(pan.csvData);
            changeStatusMessage(statusObj, "Succesfully created compositions.", clr.GREEN_FONT, pan);
        } catch (e) {
            pan.grCrLay.btnGrp.crSlides.enabled = false;
            changeStatusMessage(statusObj, e.message, clr.RED_FONT, pan);
        }
    };

    pan.grSplLay.btnGrp.lArr.onClick = function () {
        var funcName = "lArr.onClick";
        var direction = "left";
        var numDirection = -1;

        try {
            searchItemInTimeline(funcName, direction, numDirection, statusObj, pan, pan.resultComps);
        } catch (e) {
            changeStatusMessage(statusObj, e.message, clr.RED_FONT, pan);
        }
    };

    pan.grSplLay.btnGrp.rArr.onClick = function () {
        var funcName = "rArr.onClick";
        var direction = "right";
        var numDirection = 1;

        try {
            searchItemInTimeline(funcName, direction, numDirection, statusObj, pan, pan.resultComps);
        } catch (e) {
            changeStatusMessage(statusObj, e.message, clr.RED_FONT, pan);
        }
    };

    if (!(thisObj instanceof Panel)) {
        pan.show();
    }
    return pan;
}
