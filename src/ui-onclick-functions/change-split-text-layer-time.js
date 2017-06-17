// TODO: Implement proper error handling for this function +bug id:106 gh:51
// TODO: The function should analyse a composition to find the splitted text layers information. Or we create an object while creating all layers and splitted text layers and if we restart After Effects all these information will be reproduced when loading the CSV file +feature id:107 gh:50

function changeSplitTextLayerTime(layerOptions, protection, statusObj, statusColors) {
    return function () {
        var lay1, l1Offset, l1MinDuration;
        var lay2, l2Offset, l2MinDuration;

        lay1 = layerOptions.comp.layer(layerOptions.lay1Name);
        lay2 = layerOptions.comp.layer(layerOptions.lay2Name);

        var currTime = layerOptions.comp.time;
        if (currTime > 0 && currTime <= layerOptions.comp.duration) {

            app.beginUndoGroup("Layer split positions changed");

            try {
                l1MinDuration = lay1.outPoint - protection;
                l1Offset = currTime - lay1.outPoint;
                extendLayerDuration(lay1, l1Offset, l1MinDuration);
                lay1.outPoint += l1Offset;

                l2MinDuration = lay2.outPoint - protection;
                l2Offset = lay2.inPoint - currTime;
                extendLayerDuration(lay2, l2Offset, l2MinDuration);
                lay2.startTime -= l2Offset;
                lay2.outPoint += l2Offset;

                var msg = "Changed transition position between layer '%1' and layer '%2'.";
                msg = msg.replace('%1', layerOptions.lay1Name);
                msg = msg.replace('%2', layerOptions.lay2Name);
                changeStatusMessage(statusObj, msg, statusColors.GREEN_FONT, panel);
            } catch (e) {
                changeStatusMessage(statusObj, e.message, statusColors.RED_FONT, panel);
            }

            app.endUndoGroup();

            layerOptions.comp.openInViewer();
        } else {
            var msg = "The time indicator is currently not in the layer '%1'. Please remove before splitting.";
            msg = msg.replace('%1', layerOptions.comp.name);
            changeStatusMessage(statusObj, msg, statusColors.YELLOW_FONT, panel);
        }
    }
}
