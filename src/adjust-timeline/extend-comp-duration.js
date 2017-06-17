// DONE Every function should have an error handling gh:3 id:47

{
    try {
        importScript('errors/runtime-error');
        importScript('adjust-timeline/extend-layer-duration');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for extendCompDuration",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.extendCompDuration = function (comp, shouldCompDuration, splittedTextLayers, protection) {
        try {
            if (!comp) { throw new Error("Composition is empty") }

            var compDuration = comp.duration;
            var offset = shouldCompDuration - compDuration;
            var compLayers = comp.layers;
            protection = protection || sbVideoScript.settings.animationProtectionTime;
            var minDuration = compDuration - protection;
            var layersWithSplittedTexts = {};
            var brackets = sbVideoScript.settings.splitSettings.bracketsForLayerCounting;

            // Walk through all splitted text layers and create new symbol object
            for (var t = 0, tl = splittedTextLayers.length; t < tl; t++) {
                var spt = splittedTextLayers[t];
                if (spt.texts.length > 1) {
                    var numChars = 0;
                    // aLay = layersWithSplittedTexts[spt.layerName] = {
                    // 	texts: spt.texts
                    // };
                    for (var st = 0, stl = spt.texts.length; st < stl; st++) {
                        numChars += spt.texts[st].length;
                    }
                    var aInPointShare = 0;
                    for (var st = 0, stl = spt.texts.length; st < stl; st++) {
                        var aText = spt.texts[st];
                        var aLayNo = st + 1;
                        var aLayName = spt.layerName + ' ' + brackets.replace('#', aLayNo);
                        var aLay = layersWithSplittedTexts[aLayName] = {
                            text: aText,
                            timeShare: aText.length / numChars,
                            inPointShare: aInPointShare
                        };
                        aInPointShare += aLay.timeShare;
                    }
                }
            }

            // Walk layers
            for (var l = 1, ll=compLayers.length; l <= ll; l++) { // Layers NON-Zero based!
                var layer = compLayers[l];
                var layerOut = layer.outPoint;
                var layerComp = layer.source;
                var isCompItem = (layerComp instanceof CompItem);
                var layerName = layer.name;
                var aLay = layersWithSplittedTexts[layerName];

                if (aLay) {
                    var currSpLayDur = layer.outPoint - layer.inPoint
                    var totSpLayDur = currSpLayDur + offset;
                    var aLayDur = totSpLayDur * aLay.timeShare;
                    var aLayStartOff = totSpLayDur * aLay.inPointShare;
                    var aLayMinDur = currSpLayDur - protection;
                    var aLayOff = aLayDur - currSpLayDur;
                    sbVideoScript.extendLayerDuration(layer, aLayOff, aLayMinDur);
                    layer.startTime += aLayStartOff;
                    layer.outPoint += aLayOff;
                } else if (layerOut >= minDuration) {
                    // Walk props
                    sbVideoScript.extendLayerDuration(layer, offset, minDuration);
                    if (isCompItem && layerComp.duration < shouldCompDuration) {
                        sbVideoScript.extendCompDuration(layerComp, shouldCompDuration, protection);
                    }
                    layer.outPoint += offset;
                }
            }

            comp.duration += offset;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'extendCompDuration',
                title: "Error extending the duration of the composition",
                message: e.message
            })
        }
    }
}
