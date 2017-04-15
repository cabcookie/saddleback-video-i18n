'use strict';

import configuration from './configuration';
import extendCompDuration from './extend-comp-duration';

/**
Places a given comp on a timeline of a target comp by using the given
start and end time. The comp will be a Layer in the target comp and
it will be splitted in three parts: beginning, middle and end.

@param comp {Object} - the comp that needs to be placed in the timeline
@param targetComp {Object} - the comp where the given comp needs to be placed in the timeline
@param startTime {String} - where the comp should start on the timeline of the targetComp
@param endTime {String} - where the comp should end on the timeline of the targetComp
@param splittedTextLayers {Array} - layers where text was splitted and now needs timeline adjustments
*/
export default function placeCompInTimeline(comp, targetComp, startTime, endTime, splittedTextLayers) {
	if (!comp) {
		throw new RuntimeError({
			func: "placeCompInTimeline",
			title: "Composition was empty or undefined, thus couldn't be placed in timeline."
		});
	}

	var compDuration, shouldCompDuration, targetLayer;

	shouldCompDuration = endTime - startTime;
	compDuration = comp.duration;
	if (shouldCompDuration != compDuration) {
		extendCompDuration(comp, shouldCompDuration, splittedTextLayers, configuration().animationProtectionTime);
	}

	targetLayer = targetComp.layers.add(comp);
	targetLayer.startTime = startTime;
	return comp.name;
}
