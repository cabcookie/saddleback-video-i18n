'use strict';

/**
*/
export default function extendLayerDuration(pGroup, offset, minDuration) {
	if (!pGroup) {
		return;
	}

	var valuesArray, timesArray, prop, propName;

	valuesArray = [];
	timesArray = [];

	for (var p = 1; p <= pGroup.numProperties; p++) { // Properties NON-Zerobased
		prop = pGroup.property(p);
		propName = prop.name;

		if (prop.propertyType == PropertyType.INDEXED_GROUP || prop.propertyType == PropertyType.NAMED_GROUP) {
			extendLayerDuration(prop, offset, minDuration);
		} else if (prop instanceof Property) {
			if (prop.canVaryOverTime && prop.numKeys > 0) {
				while (prop.numKeys > 0 && prop.keyTime(prop.numKeys) >= minDuration) {
					valuesArray.push(prop.keyValue(prop.numKeys));
					timesArray.push(prop.keyTime(prop.numKeys) + offset);
					prop.removeKey(prop.numKeys);
				}

				if (valuesArray.length > 0 && timesArray.length > 0) {
					if (prop.name == "Marker") {
						for (var x = 0; x < valuesArray.length; x++) {
							prop.setValueAtTime(timesArray[x], valuesArray[x]);
						}
					} else {
						prop.setValuesAtTimes(timesArray, valuesArray);
					}
					valuesArray.length = 0;
					timesArray.length = 0;
				}
			}
		}
	}
}
