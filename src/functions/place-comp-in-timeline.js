'use strict';
/**
 Places a given comp on a timeline of a target comp by using the given
 start and end time. The comp will be a Layer in the target comp and
 it will be splitted in three parts: beginning, middle and end.
 
 @param comp {Object} - the comp that needs to be placed in the timeline
 @param targetComp {Object} - the comp where the given comp needs to be placed in the timeline
 @param startTime {String} - where the comp should start on the timeline of the targetComp
 @param endTime {String} - where the comp should end on the timeline of the targetComp
 @parem protection {int} - the parts in seconds of the start and end that should not be splitted
 */
export default function placeCompInTimeline(comp, targetComp, startTime, endTime, protection) {
	if (!comp) {
		return;
	}
	protection = protection || 2; // Use 2 seconds by default.
	
	var durationComp = comp.duration;
	
	// Create three layers per comp, the startLayer and endLayer will be
	// [protection] seconds long whereas the middleLayer will
	// fill the gap between startLayer and endLayer
	var startLayer = targetComp.layers.add(comp);
	var endLayer = targetComp.layers.add(comp);
	
	// Adjust the start time and end time of the layers and the time they are shown
	startLayer.startTime = startTime;
	startLayer.outPoint = startTime + protection;
	startLayer.name = comp.name + " [Start]";
	
	endLayer.startTime = endTime - durationComp;
	endLayer.inPoint = endTime - protection;
	endLayer.name = comp.name + " [End]";
	
	// create as many middleLayers as needed to fill the gap by
	// recognizing length of the fill in and length of the comp
	var durationMiddleLayer = endTime - startTime - 2 * protection;
	var count = 0;
	var startOfMiddleLayer = startTime;
	do {
		var middleLayer = targetComp.layers.add(comp);
		middleLayer.name = comp.name + " [Middle " + (count + 1) + "]";
		middleLayer.startTime = startOfMiddleLayer;
		middleLayer.inPoint = startOfMiddleLayer + protection;
		middleLayer.outPoint = Math.min(startOfMiddleLayer + durationComp - protection, endTime - protection);
		
		// preparation for next iteration
		startOfMiddleLayer += (durationComp - 2 * protection);
		durationMiddleLayer -= (durationComp - 2 * protection);
		count++;
	} while (durationMiddleLayer > 0);
	
	// structure the layers a bit by moving the endLayer back to the top
	endLayer.moveToBeginning();
}