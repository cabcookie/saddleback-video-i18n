/**
This functions takes a list of compositions and checks if they have the
expected number of composition markers for identifying in and out animations.
If all compositions have these markers it will store the positions in the
configuration settings of the certain composition name.
If 1+ compositions doesn't have the expected number of markers, it will return
an array of composition names where the markers are missing.
*/
{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/move-item-to-trash-folder');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for checkMarkersInTemplates",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.checkMarkersInTemplates = function (templateComp) {
        try {
            var markersNeeded = sbVideoScript.settings.markersNeededInTemplateComps; // script can only handle 2; otherwise reprogramming needed
            var markers = templateComp.markerProperty;
            if (!(markers.numKeys == markersNeeded)) {
                // we found a composition template with more or less than two markers
                // we need these two markers to identify the in and out animations
                // so we will prevent the script to continue if the templates
                // are not setup correctly
                throw new Error("All compositions need to have exactly '"+ markersNeeded +"' markers. The composition '"+ templateComp.name +"' does not fullfill this requirement.");
            }

            var cfgTemplates = sbVideoScript.settings.compositionTemplates;

            var tempNull = templateComp.layers.addNull(templateComp.duration);
            sbVideoScript.moveItemToTrashFolder(tempNull);
            tempNull.name = "IF THIS IS HERE SOMETHING WENT WRONG - JUST DELETE IT";

            // it is a bit tricky to access comp markers
            // according to https://forums.adobe.com/message/4671642#4671642
            // we can do it by creating a temp layer and adding an Expression to it
            var tempPos = tempNull.property("Position");
            var exp = "";
            exp += "x = thisComp.marker.key(1).time;";
            exp += "y = thisComp.marker.key(2).time;";
            exp += "[x,y]";
            tempPos.expression = exp;
            var cfg = cfgTemplates[templateComp.name];
            if (cfg === undefined) {
                cfg = cfgTemplates[templateComp.name] = {};
            }
            cfg.inBgFullyCovered = tempPos.value[0];
            cfg.outBgFullyCovered = templateComp.duration - tempPos.value[1];

            // at the end we remove the temp layer
            tempNull.remove();

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'checkMarkersInTemplates',
                title: "Error reviewing all templates and finding their expected markers",
                message: e.message
            });
        }
    }
}
