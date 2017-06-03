'use strict';

import configuration from './configuration';
import findItemIndexByName from './find-item-index-by-name';
import RuntimeError from './runtime-error';

/**
This functions takes a list of compositions and checks if they have the
expected number of composition markers for identifying in and out animations.
If all compositions have these markers it will store the positions in the
configuration settings of the certain composition name.
If 1+ compositions doesn't have the expected number of markers, it will return
an array of composition names where the markers are missing.
*/
export default function checkMarkersInTemplates(templates) {
    // prepare some vars
    var template, markers, markersNeeded, templatesWithoutMarkers;
    var tempNull, tempPos, exp, cfg;
    var cfgTemplates;

    markersNeeded = configuration().markersNeededInTemplateComps; // script can only handle 2; otherwise reprogramming needed
    cfgTemplates = configuration().compositionTemplates;

    // we iterate through the list of templates and check for composition markers
    for (var i = 0, cl = templates.length; i < cl; i++) {
        template = templates[i];
        markers = template.markerProperty;
        if (!(markers.numKeys == markersNeeded)) {
            // we found a composition template with more or less than two markers
            // we need these two markers to identify the in and out animations
            // so we will prevent the script to continue if the templates
            // are not setup correctly
            throw new RuntimeError({
                func: "checkMarkersInTemplates",
                title: "Missing Composition Markers for Animations",
                message: "All compositions need to have exactly %1 markers. The composition %2 does not fullfill this requirement.",
                params: [
                    markersNeeded,
                    template.name
                ]
            });
        }
    }

    // iterate through the comp names and extract the markers times
    for (var i = 0, cl = templates.length; i < cl; i++) {
        template = templates[i];
        tempNull = template.layers.addNull(template.duration);
        moveItemToTrashFolder(tempNull);
        tempNull.name = "IF THIS IS HERE SOMETHING WENT WRONG - JUST DELETE IT";

        // it is a bit tricky to access comp markers
        // according to https://forums.adobe.com/message/4671642#4671642
        // we can do it by creating a temp layer and adding an Expression to it
        tempPos = tempNull.property("Position");
        exp = "";
        exp += "x = thisComp.marker.key(1).time;";
        exp += "y = thisComp.marker.key(2).time;";
        exp += "[x,y]";
        tempPos.expression = exp;
        cfg = cfgTemplates[template.name];
        if (cfg === undefined) {
            cfg = cfgTemplates[template.name] = {};
        }
        cfg.inBgFullyCovered = tempPos.value[0];
        cfg.outBgFullyCovered = template.duration - tempPos.value[1];

        // at the end we remove the temp layer
        tempNull.remove();
    }
    return true;
}
