// DONE Every function should have an error handling gh:3 id:46
// TODO: when extending a layer the type of a keyframe seems to be ignored when deleting and creating it again +bug id:96 gh:40

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for extendLayerDuration",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.extendLayerDuration = function (pGroup, offset, minDuration) {
        try {
            if (!pGroup) { return }

            var valuesArray = [];
            var timesArray = [];
            var inEaseArray = [];
            var outEaseArray = [];

            for (var p = 1, pnp = pGroup.numProperties; p <= pnp; p++) { // Properties NON-Zerobased
                var prop = pGroup.property(p);
                var propName = prop.name;

                if (prop.propertyType == PropertyType.INDEXED_GROUP || prop.propertyType == PropertyType.NAMED_GROUP) {
                    sbVideoScript.extendLayerDuration(prop, offset, minDuration);
                } else if (prop instanceof Property) {
                    var propNumKeys = prop.numKeys;
                    if (prop.canVaryOverTime && propNumKeys > 0) {
                        var propKeyTime = prop.keyTime(propNumKeys);
                        while (propNumKeys > 0 && propKeyTime >= minDuration) {
                            try {
                                valuesArray.push(prop.keyValue(propNumKeys));
                                inEaseArray.push(prop.keyInTemporalEase(propNumKeys));
                                outEaseArray.push(prop.keyOutTemporalEase(propNumKeys));
                                timesArray.push(propKeyTime + offset);
                                prop.removeKey(propNumKeys);
                                propNumKeys = prop.numKeys;
                                propKeyTime = prop.keyTime(propNumKeys);
                            } catch (e) {
                                throw new Error("Error looping prop '"+ prop.name +"' at "+ propKeyTime + ": " + e.message)
                            }
                        }

                        if (valuesArray.length > 0 && timesArray.length > 0) {
                            if (propName == "Marker") {
                                try {
                                    for (var x = 0; x < valuesArray.length; x++) {
                                        prop.setValueAtTime(timesArray[x], valuesArray[x]);
                                    }
                                } catch (e) {
                                    throw new Error("Error in Marker: " + e.message)
                                }
                            } else {
                                try {
                                    prop.setValuesAtTimes(timesArray, valuesArray);

                                    // since we stored the key frames in the opposite order
                                    // we need to restore them the other way around
                                    // we set the currKey accordingly
                                    var currKey;
                                    for (var e = 0, iea = inEaseArray.length; e < iea; e++) {
                                        currKey = propNumKeys + iea - e - 1;
                                        prop.setTemporalEaseAtKey(currKey, inEaseArray[e], outEaseArray[e]);
                                    }
                                    currKey = propNumKeys;
                                    var interpolationType = prop.keyInInterpolationType(currKey);
                                    prop.setInterpolationTypeAtKey(currKey, interpolationType, KeyframeInterpolationType.HOLD);
                                } catch (e) {
                                    throw new Error("Error in non-Marker: " + e.message)
                                }
                            }
                            valuesArray.length = 0;
                            timesArray.length = 0;
                            inEaseArray.length = 0;
                            outEaseArray.length = 0;
                        }
                    }
                }
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'extendLayerDuration',
                title: "Error extending the duration of the layer",
                message: e.message
            })
        }

    }
}
