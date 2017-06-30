{
    try {
        importScript('errors/runtime-error');
        importScript('adjust-timeline/extend-layer-duration');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for changeSplitTextLayerTime",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.changeSplitTextLayerTime = function (layer1, layer2) {
        try {
            var comp = layer1.containingComp;
            if (!comp === app.project.activeItem) { throw new Error("You haven't selected the right composition anymore. Please open composition '"+ comp.name +"' to continue.") }

            var currTime = comp.time;
            if (currTime < 0 || currTime > comp.duration) { throw new Error("The time indicator is currently not in the layer '"+ comp.name +"'. Please remove before splitting.") }

            var protection = sbVideoScript.settings.splitSettings.animationProtectionTime;
            var lay1Name = layer1.name;
            var lay2Name = layer2.name;
            var l1MinDuration = layer1.outPoint - protection;
            var l1Offset = currTime - layer1.outPoint;
            var l2MinDuration = layer2.outPoint - protection;
            var l2Offset = layer2.inPoint - currTime;

            app.beginUndoGroup("Layer split positions changed between '"+ lay1Name +"' and '"+ lay2Name +"'");
            {
                sbVideoScript.extendLayerDuration(layer1, l1Offset, l1MinDuration);
                layer1.outPoint += l1Offset;

                sbVideoScript.extendLayerDuration(layer2, l2Offset, l2MinDuration);
                layer2.startTime -= l2Offset;
                layer2.outPoint += l2Offset;
            }
            app.endUndoGroup();

            comp.openInViewer();

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'changeSplitTextLayerTime',
                title: "Couldn't change the time where the text is being splitted.",
                message: e.message
            })
        }
    }
}
