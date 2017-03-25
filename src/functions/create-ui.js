'use strict';

import configuration from './configuration';
import extendLayerDuration from './extend-layer-duration';
import checkUIPositions from './check-ui-positions';
import changeStatusMessage from './change-status-message';
import createCompsFromTextFile from './functions/create-comps-from-text-file';

/**
The following lines provide information to test the function
*/
// var uiPanel;
// uiPanel = createUI(this);

/**
*/
export default function createUI(thisObj) {
    var pan = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Saddleback Video Translation", undefined, {resizeable: false});
    var RED_FONT, GREEN_FONT, YELLOW_FONT;
    var statusText, X_WIDTH, titlePos, pos, statusWidth, btnWidth, statusObj, csvData;
    pan.orientation = "row";

    // colors for status messages
    RED_FONT = "ERR";
    GREEN_FONT = "SUC";
    YELLOW_FONT = "WARN";

    // value of type String means to take the Y2 position of the named attribute
    // as a basis to calculate position
    btnWidth = 140;
    titlePos = [0, 0, btnWidth, 30];
    statusWidth = btnWidth * 2;
    pos = {
        grStat: {
            pos: [10, 0, statusWidth+30, "status"],
            title: {
                pos: titlePos,
            },
            status: {
                pos: [20, 30, statusWidth+20,90],
            },
        },
        grCrLay: {
            pos: [10, "grStat", btnWidth+30, "btnGrp"],
            title: {
                pos: titlePos,
            },
            btnGrp: {
                pos: [20, 30, btnWidth+20, "blank"],
                chFile: {
                    pos: [0, 0, btnWidth, 25],
                },
                crSlides: {
                    pos: [0, 30, btnWidth, 55],
                },
                blank: {
                    pos: [0, 55, 10, 60],
                },
            },
        },
        grSplLay: {
            pos: [10, "grCrLay", btnWidth+30, "btnGrp"],
            title: {
                pos: titlePos,
            },
            btnGrp: {
                pos: [20, 30, btnWidth+20, "splBtnGrp"],
                title: {
                    pos: titlePos,
                },
                lArr: {
                    pos: [0, 25, btnWidth/2-2, 50],
                },
                rArr: {
                    pos: [btnWidth/2+2, 25, btnWidth, 50],
                },
                splBtnGrp: {
                    pos: [0, 60, btnWidth, 600],
                    title: {
                        pos: titlePos,
                    },
                    // to delete, it's just for test purposes
                    l1: {
                        pos: [0, 30, btnWidth, 55],
                    },
                    l2: {
                        pos: [0, 60, btnWidth, 85],
                    },
                    l3: {
                        pos: [0, 90, btnWidth, 115],
                    },
                },
            },
        },
    };
    checkUIPositions(pos);

    pan.grStat = pan.add("group", pos.grStat.pos);
    pan.grStat.orientation = "row";
    pan.grStat.title = pan.grStat.add("statictext", pos.grStat.title.pos, "Status:");

    statusText = "Waiting for user input...";
    statusObj = pan.grStat.status = pan.grStat.add("statictext", pos.grStat.status.pos, 'X', {multiline:true});
    X_WIDTH = statusObj.preferredSize[0];
    statusObj.preferredSize = [-1,-1];
    statusObj.characters = ~~(statusWidth/X_WIDTH);
    statusObj.preferredSize[1] = -1;
    changeStatusMessage(statusObj, statusText, YELLOW_FONT);

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
    pan.grSplLay.title = pan.grSplLay.add("statictext", pos.grSplLay.title.pos, "Adjust Splitted Layers");
    pan.grSplLay.btnGrp = pan.grSplLay.add("group", pos.grSplLay.btnGrp.pos);
    pan.grSplLay.btnGrp.orientation = "row";
    pan.grSplLay.btnGrp.title = pan.grSplLay.btnGrp.add("statictext", pos.grSplLay.btnGrp.title.pos, "search directions:");
    pan.grSplLay.btnGrp.lArr = pan.grSplLay.btnGrp.add("button", pos.grSplLay.btnGrp.lArr.pos, "<");
    pan.grSplLay.btnGrp.rArr = pan.grSplLay.btnGrp.add("button", pos.grSplLay.btnGrp.rArr.pos, ">");
    pan.grSplLay.btnGrp.splBtnGrp = pan.grSplLay.btnGrp.add("group", pos.grSplLay.btnGrp.splBtnGrp.pos);
    pan.grSplLay.btnGrp.splBtnGrp.title = pan.grSplLay.btnGrp.splBtnGrp.add("statictext", pos.grSplLay.btnGrp.splBtnGrp.title.pos, "Split at Cursor...");
    pan.grSplLay.btnGrp.splBtnGrp.l1 = pan.grSplLay.btnGrp.splBtnGrp.add("button", pos.grSplLay.btnGrp.splBtnGrp.l1.pos, "Text German {1 > 2}");
    pan.grSplLay.btnGrp.splBtnGrp.l2 = pan.grSplLay.btnGrp.splBtnGrp.add("button", pos.grSplLay.btnGrp.splBtnGrp.l2.pos, "Text German {2 > 3}");
    pan.grSplLay.btnGrp.splBtnGrp.l3 = pan.grSplLay.btnGrp.splBtnGrp.add("button", pos.grSplLay.btnGrp.splBtnGrp.l3.pos, "Text English {1 > 2}");

    pan.grCrLay.btnGrp.crSlides.enabled = false;

    pan.grCrLay.btnGrp.chFile.onClick = function () {
        try {
            csvData = loadAndCheckFilesAndTemplates();
            pan.grCrLay.btnGrp.crSlides.enabled = true;
            changeStatusMessage(statusObj, "Succesfully loaded CSV content.", GREEN_FONT);
        } catch (e) {
            pan.grCrLay.btnGrp.crSlides.enabled = false;
        	if (e instanceof RuntimeError) {
                changeStatusMessage(statusObj, e.message, RED_FONT);
        	} else {
        		throw e;
        	}
        }
    };

    pan.grCrLay.btnGrp.crSlides.onClick = function () {
        try {
            if (!csvData) {
                throw "UIError - No CSV data loaded yet. Please choose a CSV file with consistent data.";
            }
            createCompsFromTextFile(csvData);
            changeStatusMessage(statusObj, "Succesfully created compositions.", GREEN_FONT);
        } catch (e) {
            pan.grCrLay.btnGrp.crSlides.enabled = false;
            changeStatusMessage(statusObj, e.message, RED_FONT);
        }
    };

    if (!(thisObj instanceof Panel)) {
        pan.show();
    }
    return pan;
}
