'use strict';

import configuration from './configuration';
import extendLayerDuration from './extend-layer-duration';

/**
*/
export default function extendCompDuration(comp, shouldCompDuration, protection) {
	if (!comp) {
		return;
	}

	var compDuration, compLayers, propsCount, minDuration, offset,
		layer, layerOut, layerComp, isCompItem, layerName;

	compDuration = comp.duration;
	offset = shouldCompDuration - compDuration;
	compLayers = comp.layers;
	propsCount = 0;
	protection = protection || configuration().animationProtectionTime;
	minDuration = compDuration - protection;

	// Walk layers
	for (var l = 1, ll=compLayers.length; l <= ll; l++) { // Layers NON-Zero based!
		layer = compLayers[l];
		layerOut = layer.outPoint;
		layerComp = layer.source;
		isCompItem = (layerComp instanceof CompItem);
		layerName = layer.name;

		if (layerOut >= minDuration) {
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
