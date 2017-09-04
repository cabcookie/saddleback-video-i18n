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

{
    try {
        importScript('errors/runtime-error');
        importScript('adjust-timeline/extend-comp-duration');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for placeCompInTimeline",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.placeCompInTimeline = function (comp, targetComp, startTime, endTime, splittedTextLayers) {
        try {
            if (!comp) { throw new Error("Composition was empty or undefined, thus couldn't be placed in timeline.") }

            var shouldCompDuration = endTime - startTime;
            var compDuration = comp.duration;
            if (shouldCompDuration != compDuration) {
                sbVideoScript.extendCompDuration(comp, shouldCompDuration, splittedTextLayers, sbVideoScript.settings.animationProtectionTime);
            }

            var targetLayer = targetComp.layers.add(comp);
            targetLayer.startTime = startTime;
            return comp.name;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'placeCompInTimeline',
                title: "Error placing composition in timeline",
                message: e.message
            })
        }
    }
}
