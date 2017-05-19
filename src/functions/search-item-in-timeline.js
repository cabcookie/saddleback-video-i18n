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
export default function searchItemInTimeline(func, direction, statusObj, panel, splitLayerButtonGroup, statusColors) {
    return function () {
        try {
            var compositionsData = panel.resultComps;
            if (!compositionsData) {
                throw new RuntimeError({
                    func: func,
                    title: "No composition results to iterate through yet. Please load CSV file and create slides and layers.",
                });
            }

            var comp, currTime;
            comp = app.project.activeItem;
            currTime = comp.time;
            currTime += direction/comp.frameRate

            if (!compositionsData[comp.name]) {
                throw new RuntimeError({
                    func: func,
                    title: "Composition can't be searched.",
                    message: "The composition %1 is not a main composition and thus you can't search for IN and OUT times or split layers in this comp.",
                    params: [ comp.name ]
                });
            }

            var newTime, mainComp, index, testLay, layer;

            newTime = direction === 1 ? comp.duration : 0;
            mainComp = compositionsData[comp.name];

            for (var l = 0, mll = mainComp.layers.length; l < mll; l++) {
                index = direction === 1 ? l : mll - l - 1;
                testLay = mainComp.layers[index];
                if (direction === 1) {
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
                var msg = "No further IN/OUT position in the "+ (direction === 1 ? 'right' : 'left') +" direction.";
                changeStatusMessage(statusObj, msg, statusColors.YELLOW_FONT, panel);
                return;
            }

            var msg = "Found next IN/OUT position by searching "+ (direction === 1 ? 'right' : 'left') +".";
            comp.time = newTime;
            comp.openInViewer();
            adjustUIForSplittedLayers(layer, panel, splitLayerButtonGroup, statusColors, statusObj);
            changeStatusMessage(statusObj, msg, statusColors.GREEN_FONT, panel);
        } catch (e) {
            changeStatusMessage(statusObj, e.message, statusColors.RED_FONT, panel);
        }
    }
}
