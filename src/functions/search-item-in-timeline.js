'use strict';

import configuration from './configuration';
import adjustUIForSplittedLayers from './adjust-ui-for-splitted-layers';
/**
The following lines provide information to test the function
*/

// example to understand structure of compositionsData
/**
compositionsData = {
    mainComp1: {
        comp: mainComp1Composition,
        layers: [{
            layerName: '1 Scripture',
            line: 1,
            compType: 'Scripture',
            startTime: 15.2,
            endTime: 18.4,
            textLayers: [{
                layerName: 'Text 1',
                texts: [
                    'This is the text which is splitted in the first layer...',
                    '... and this the text of the second layer',
                ],
            }],
        }]
    },
    mainComp2: {
        ...
    },
};
*/

/**
*/
export default function searchItemInTimeline(func, direction, numDirection, statusObj, pan, compositionsData) {
    var clr, comp, currTime, mainComp, index, testLay, layer, newTime;
    // colors for status messages
    clr = configuration().statusColors;

    if (!compositionsData) {
        throw new RuntimeError({
            func: func,
            title: "No composition results to iterate through yet. Please load CSV file and create slides and layers.",
        });
    }
    comp = app.project.activeItem;
    currTime = comp.time;
    currTime += numDirection/comp.frameRate
    if (!compositionsData[comp.name]) {
        throw new RuntimeError({
            func: func,
            title: "Composition can't be searched.",
            message: "The composition %1 is not a main composition and thus you can't search for IN and OUT times or split layers in this comp.",
            params: [
                comp.name
            ]
        });
    }

    newTime = numDirection === 1 ? comp.duration : 0;
    mainComp = compositionsData[comp.name];
    for (var l = 0, mll = mainComp.layers.length; l < mll; l++) {
        index = numDirection === 1 ? l : mll - l - 1;
        testLay = mainComp.layers[index];
        if (numDirection === 1) {
            if (testLay.startTime > currTime && testLay.startTime < newTime) {
                newTime = testLay.startTime;
                layer = testLay;
            } else if (testLay.endTime > currTime && testLay.endTime < newTime) {
                newTime = testLay.endTime;
                layer = testLay;
            }
        } else {
            if (testLay.endTime < currTime && testLay.endTime > newTime) {
                newTime = testLay.endTime;
                layer = testLay;
            } else if (testLay.startTime < currTime && testLay.endTime > newTime) {
                newTime = testLay.startTime;
                layer = testLay
            }
        }
    }

    if (newTime === comp.duration) {
        var msg = "No further IN/OUT position in the "+ direction +" direction.";
        // var msg = "currTime = "+ comp.time +"; newTime = "+ newTime;
        changeStatusMessage(statusObj, msg, clr.YELLOW_FONT, pan);
        return;
    }

    var msg = "Found next IN/OUT position by searching "+ direction +".";
    comp.time = newTime;
    comp.openInViewer();
    adjustUIForSplittedLayers(layer, pan, statusObj);
    changeStatusMessage(statusObj, msg, clr.GREEN_FONT, pan);
}
