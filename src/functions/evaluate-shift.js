'use strict';

import configuration from './configuration';

export default function evaluateShift(layer) {
    var apt = configuration().animationProtectionTime;
    var shiftX = 0;
    var shiftY = 0;
    var vBef, vAft, aftSc;

    // check if the layer has a parent
    var parent = layer.parent;
    if (parent) {
        // check if the parent has an animation of position or anchor Point
        // within the protection timeframe
        var posProp = parent.property("Position");
        var apProp = parent.property("Anchor Point");
        var scProp = parent.property("Scale");

        if (apProp.numKeys > 0) {
            // there is an animation on the anchor point
            // evaluate the shift on x and y and add it to the result
            vBef = apProp.valueAtTime(0, false);
            vAft = apProp.valueAtTime(apt, false);

            // scale has large influence on the anchor point
            // TODO: consider scale
        }

        if (posProp.numKeys > 0) {
            vBef = posProp.valueAtTime(0, false);
            vAft = posProp.valueAtTime(apt, false);
            var nextShift = evaluateShift(parent);
            shiftX += vAft[0] - vBef[0] + nextShift[0];
            shiftY += vAft[1] - vBef[1] + nextShift[1];
        }
    }
    return [shiftX, shiftY];
}
