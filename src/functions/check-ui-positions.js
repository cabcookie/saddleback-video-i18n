'use strict';

import configuration from './configuration';
import extendLayerDuration from './extend-layer-duration';

/**
The following lines provide information to test the function
*/

/**
The function receives an object with attributes its position array and sub items if needed
The function return the pos[3] value of the posObj
*/
export default function checkUIPositions(posObj, parObj) {
    if (!posObj.pos) {
        var attr, itm;
        for (attr in posObj) {
            checkUIPositions(posObj[attr], posObj);
        }
        return false;
    } else {
        if (typeof posObj.pos[1] === 'string') {
            posObj.pos[1] = checkUIPositions(parObj[posObj.pos[1]]);
        }
        if (typeof posObj.pos[3] === 'string') {
            posObj.pos[3] = checkUIPositions(posObj[posObj.pos[3]], posObj) + posObj.pos[1];
        }
        return posObj.pos[3];
    }
}
