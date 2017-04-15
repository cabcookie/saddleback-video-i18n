'use strict';

import findItemIndexByName from './find-item-index-by-name';
import configuration from './configuration';
import clone from './clone';
import extendLayerDuration from './extend-layer-duration';

/**
The following lines provide information to test the function
*/

/**
*/
export default function adjustUIForSplittedLayers(layer, pan, statusObj) {
    var txtLay, txt, btnNames, btnName;
    var protection, clr;
    var splBtnGrp, posSplBtnGrp, pos, name;
    var NULL_SIZE, MAX_SIZE, NO_SPLIT_BTNS;

    NULL_SIZE = [0,0];
    MAX_SIZE = [1000,1000];
    NO_SPLIT_BTNS = configuration().uiNoOfSptBtns;

    protection = configuration().splitSettings.animationProtectionTime;
    btnNames = [];
    clr = configuration().statusColors;

    // we create the list of possible button names before we create the UI
    for (var tl = 0, ltll = layer.textLayers.length; tl < ltll; tl++) {
        txtLay = layer.textLayers[tl];
        for (var t = 1, txl = txtLay.texts.length; t < txl; t++) {
            // das kann nicht mehr hier sein und muss in die Funktion
            // oder ich packe es mit in das Array
            var comp = app.project.item(findItemIndexByName(layer.layerName));
            btnName = txtLay.layerName + ' {'+ t +' -> '+ (t+1) +'}';
            btnNames.push({
                btnName: btnName,
                lay1Name: txtLay.layerName + ' {'+ t +'}',
                lay2Name: txtLay.layerName + ' {'+ (t+1) +'}',
                comp: comp,
            });
        }
    }

    splBtnGrp = pan.grSplLay.btnGrp.splBtnGrp;
    splBtnGrp.visible = (btnNames.length > 0);
    splBtnGrp.maximumSize = splBtnGrp.visible ? MAX_SIZE : NULL_SIZE;
    for (var bn = 1; bn <= NO_SPLIT_BTNS; bn++) {
        var btn = splBtnGrp['l'+bn];
        if (btnNames.length >= bn) {
            btn.visible = true;
            btn.maximumSize = MAX_SIZE;
            var btix = btnNames[bn-1];
            btn.text = btix.btnName;
            btn.layerOptions = btix;
            btn.onClick = function () {
                var lay1, l1Offset, l1Duration, l1MinDuration;
                var lay2, l2Offset, l2Duration, l2MinDuration;

                var bt = this.layerOptions;
                lay1 = bt.comp.layer(bt.lay1Name);
                lay2 = bt.comp.layer(bt.lay2Name);

                var currTime = bt.comp.time;
                if (currTime > 0 && currTime <= bt.comp.duration) {

                    app.beginUndoGroup("Layer split positions changed");

                    try {
                        // l1Duration = lay1.outPoint - lay1.inPoint;
                        // l1MinDuration = l1Duration - protection;
                        l1MinDuration = lay1.outPoint - protection;
                        l1Offset = currTime - lay1.outPoint;
                        extendLayerDuration(lay1, l1Offset, l1MinDuration);
                        lay1.outPoint += l1Offset;

                        // l2Duration = lay2.outPoint - lay2.inPoint;
                        // l2MinDuration = l2Duration - protection;
                        l2MinDuration = lay2.outPoint - protection;
                        l2Offset = lay2.inPoint - currTime;
                        extendLayerDuration(lay2, l2Offset, l2MinDuration);
                        lay2.startTime -= l2Offset;
                        lay2.outPoint += l2Offset;

                        var msg = "Changed transition position between layer '%1' and layer '%2'.";
                        msg = msg.replace('%1', bt.lay1Name);
                        msg = msg.replace('%2', bt.lay2Name);
                        changeStatusMessage(statusObj, msg, clr.GREEN_FONT, pan);
                    } catch (e) {
                        changeStatusMessage(statusObj, e.message, clr.RED_FONT, pan);
                    }

                    app.endUndoGroup();

                    bt.comp.openInViewer();
                } else {
                    var msg = "The time indicator is currently not in the layer '%1'. Please remove before splitting.";
                    msg = msg.replace('%1', bt.comp.name);
                    changeStatusMessage(statusObj, msg, clr.YELLOW_FONT, pan);
                }
            };

        } else {
            btn.visible = false;
            btn.maximumSize = NULL_SIZE;
        }
    }
}
