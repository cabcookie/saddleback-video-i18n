// TODO Every function should have an error handling gh:3 id:47

function extendCompDuration(comp, shouldCompDuration, splittedTextLayers, protection) {
    if (!comp) {
        return;
    }

    var compDuration, compLayers, minDuration, offset,
    layer, layerOut, layerComp, isCompItem, layerName,
    spt, numChars, layersWithSplittedTexts, aLay, aText,
    brackets, aLayName, aLayNo, aInPointShare, currSpLayDur,
    aLayOff, aLayMinDur, aLayStartOff, totSpLayDur, aLayDur;

    compDuration = comp.duration;
    offset = shouldCompDuration - compDuration;
    compLayers = comp.layers;
    protection = protection || configuration().animationProtectionTime;
    minDuration = compDuration - protection;
    layersWithSplittedTexts = {};
    brackets = configuration().splitSettings.bracketsForLayerCounting;

    // Walk through all splitted text layers and create new symbol object
    for (var t = 0, tl = splittedTextLayers.length; t < tl; t++) {
        spt = splittedTextLayers[t];
        if (spt.texts.length > 1) {
            numChars = 0;
            // aLay = layersWithSplittedTexts[spt.layerName] = {
            // 	texts: spt.texts
            // };
            for (var st = 0, stl = spt.texts.length; st < stl; st++) {
                numChars += spt.texts[st].length;
            }
            aInPointShare = 0;
            for (var st = 0, stl = spt.texts.length; st < stl; st++) {
                aText = spt.texts[st];
                aLayNo = st + 1;
                aLayName = spt.layerName + ' ' + brackets.replace('#', aLayNo);
                aLay = layersWithSplittedTexts[aLayName] = {
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
        layer = compLayers[l];
        layerOut = layer.outPoint;
        layerComp = layer.source;
        isCompItem = (layerComp instanceof CompItem);
        layerName = layer.name;
        aLay = layersWithSplittedTexts[layerName];

        if (aLay) {
            currSpLayDur = layer.outPoint - layer.inPoint
            totSpLayDur = currSpLayDur + offset;
            aLayDur = totSpLayDur * aLay.timeShare;
            aLayStartOff = totSpLayDur * aLay.inPointShare;
            aLayMinDur = currSpLayDur - protection;
            aLayOff = aLayDur - currSpLayDur;
            extendLayerDuration(layer, aLayOff, aLayMinDur);
            layer.startTime += aLayStartOff;
            layer.outPoint += aLayOff;
        } else if (layerOut >= minDuration) {
            // Walk props
            extendLayerDuration(layer, offset, minDuration);
            if (isCompItem && layerComp.duration < shouldCompDuration) {
                extendCompDuration(layerComp, shouldCompDuration, protection);
            }
            layer.outPoint += offset;
        }
    }

    comp.duration += offset;
}
