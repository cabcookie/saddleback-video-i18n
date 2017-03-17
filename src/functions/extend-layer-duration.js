'use strict';

/**
*/
export default function extendLayerDuration(pGroup, offset, minDuration) {
	if (!pGroup) {
		return;
	}

	var valuesArray, timesArray, prop, propName, propNumKeys, propKeyTime;

	valuesArray = [];
	timesArray = [];

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
					}
					valuesArray.length = 0;
					timesArray.length = 0;
				}
			}
		}
	}
}
