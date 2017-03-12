'use strict';

import clone from './clone';

export default function cloneColumnPositionsForMainComp(columnPositions, tcConf) {
    // adjust the columnPositions for this specific composition
    var colPos = clone(columnPositions);
    for (var l = 0, cl = colPos.layers.length; l < cl; l++) {
        var lay = colPos.layers[l];
        lay.originalLayerName = lay.layerName;
        for (var key in tcConf.columnsToSwap) {
            var val = tcConf.columnsToSwap[key];
            lay.layerName = lay.layerName.replace(key, val);
        }
    }

    return colPos;
}
