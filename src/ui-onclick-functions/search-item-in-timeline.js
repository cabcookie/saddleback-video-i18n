{
    try {
        importScript('errors/runtime-error');
        importScript('ui-elements/adjust-ui-for-splitted-layers');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for searchItemInTimeline",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.searchItemInTimeline = function (direction) {
        try {
            if (direction !== 1 && direction !== -1) { throw new Error("Direction must be +1 or -1 but is "+ direction) }

            var comp;
            var activeName = app.project.activeItem.name;
            var mainCompsToBuild = sbVideoScript.settings.mainCompositionsToBuild.compositionsConfig;

            for (var i = 0; i < mainCompsToBuild.length; i++) {
                var name = mainCompsToBuild[i].name;

                if (activeName.indexOf(name) === 0) {
                    comp = app.project.activeItem;
                    break;
                }
            }

            if (!comp) { throw new Error("No main composition selected") }

            var currTime = comp.time + direction/comp.frameRate;
            var maxDuration = sbVideoScript.settings.minimumSermonDurationInMin * 60;

            var newMidPoint = direction === 1 ? comp.duration : 0;
            var selectedLayer;

            for (var i = 1; i <= comp.layers.length; i++) {
                var layer = comp.layers[i];
                var midPoint = (layer.inPoint + layer.outPoint) / 2.0;

                if ((layer.outPoint - layer.inPoint) < maxDuration) {
                    if (direction ===  1 && midPoint > currTime && midPoint < newMidPoint) { newMidPoint = midPoint }
                    if (direction === -1 && midPoint < currTime && midPoint > newMidPoint) { newMidPoint = midPoint }
                    if (newMidPoint === midPoint) { selectedLayer = layer }
                }
            }

            comp.time = newMidPoint;
            sbVideoScript.adjustUIForSplittedLayers(selectedLayer);

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'searchItemInTimeline',
                title: "Error searching layers within the timeline. Moving "+ (direction == -1 ? 'left' : 'right') +".",
                message: e.message
            })
        }
    }
}
