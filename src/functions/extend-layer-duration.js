'use strict';

/**
The following lines provide information to test the function
*/
// var layer = app.project.activeItem.selectedLayers[0];
// var offset = -2;
// var minDuration = 20;
// extendLayerDuration(layer, offset, minDuration);

/**
*/
export default function extendLayerDuration(pGroup, offset, minDuration) {
	if (!pGroup) {
		return;
	}

	var valuesArray, timesArray, inEaseArray, outEaseArray, interpolationType;
	var prop, propName, propNumKeys, propKeyTime, currKey;

	valuesArray = [];
	timesArray = [];
	inEaseArray = [];
	outEaseArray = [];

	for (var p = 1, pnp = pGroup.numProperties; p <= pnp; p++) { // Properties NON-Zerobased
		prop = pGroup.property(p);
		propName = prop.name;

		if (prop.propertyType == PropertyType.INDEXED_GROUP || prop.propertyType == PropertyType.NAMED_GROUP) {
			extendLayerDuration(prop, offset, minDuration);
		} else if (prop instanceof Property) {
			propNumKeys = prop.numKeys;
			if (prop.canVaryOverTime && propNumKeys > 0) {
				propKeyTime = prop.keyTime(propNumKeys);
				while (propNumKeys > 0 && propKeyTime >= minDuration) {
					valuesArray.push(prop.keyValue(propNumKeys));
					inEaseArray.push(prop.keyInTemporalEase(propNumKeys));
					outEaseArray.push(prop.keyOutTemporalEase(propNumKeys));
					timesArray.push(propKeyTime + offset);
					prop.removeKey(propNumKeys);
					propNumKeys = prop.numKeys;
					propKeyTime = prop.keyTime(propNumKeys);
				}

				if (valuesArray.length > 0 && timesArray.length > 0) {
					if (propName == "Marker") {
						for (var x = 0; x < valuesArray.length; x++) {
							prop.setValueAtTime(timesArray[x], valuesArray[x]);
						}
					} else {
						prop.setValuesAtTimes(timesArray, valuesArray);

						// since we stored the key frames in the opposite order
						// we need to restore them the other way around
						// we set the currKey accordingly
						for (var e = 0, iea = inEaseArray.length; e < iea; e++) {
							currKey = propNumKeys + iea - e - 1;
							prop.setTemporalEaseAtKey(currKey, inEaseArray[e], outEaseArray[e]);
						}
						currKey = propNumKeys;
						interpolationType = prop.keyInInterpolationType(currKey);
						prop.setInterpolationTypeAtKey(currKey, interpolationType, KeyframeInterpolationType.HOLD);
					}
					valuesArray.length = 0;
					timesArray.length = 0;
					inEaseArray.length = 0;
					outEaseArray.length = 0;
				}
			}
		}
	}
}
