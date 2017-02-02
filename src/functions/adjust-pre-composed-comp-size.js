'use strict';

import evaluateShift from './evaluate-shift';

/**
Evaluate how parent layers are shifting the current layer and make sure the
layers in the composition are shifted accoordingly
There might still be some position animation on those layers. Thus we need to
make sure we don't mess up with them.
*/
export default function adjustPreComposedCompSize(comp, pcLayer) {
    if(comp instanceof CompItem) {
        if (pcLayer instanceof AVLayer) {
            var orgW, orgH;
            orgW = comp.width;
            orgH = comp.height;
            comp.width *= 3;
            comp.height *= 3;

            for (var l = 1; l <= comp.layers.length; l++) {
                var lay = comp.layers[l];
                var posProp = lay.property("Position");
                var pos = posProp.value;
                pos[0] += orgW;
                pos[1] += orgH;
                posProp.setValue([pos[0], pos[1]]);
            }
        }
    }
}
