'use strict';

import configuration from './configuration';
import findItemIndexByName from './find-item-index-by-name';

/**
This function is to emulate a config file for now
*/
export default function checkMarkersInTemplates() {
    var markersNeeded = 2;
    var ytext = configuration().compositionYouTubeNameExtension;
    var ctemp = configuration().compositionTemplates;
    var comp, markers, cfg, ytname, ytsa, name, index;
    var compWithoutMarkers = [];
    var compTemps = [];
    var comps = [];

    // first we create a list of all names for the composition templates
    // which we need to check for in and out animations
    for (name in ctemp) {
        compTemps.push(name);
        cfg = ctemp[name];
        if (cfg.youtubeAlternative) {
            ytname = name + ytext;
            compTemps.push(ytname);
        }
        if (cfg.isSizeAlternative) {
            ytsa = cfg.sizeAlternative;
            compTemps.push(ytsa);
        }
    }

    // we make the array with composition names unique
    var u = {};
    for(var i = 0, l = compTemps.length; i < l; ++i){
        if(u.hasOwnProperty(compTemps[i])) {
            continue;
        }
        index = findItemIndexByName(compTemps[i]);
        if (index === null) {
            var message = "";
            message += "Missing Composition\n";
            message += "Composition '";
            message += compTemps[i];
            message += "' is missing. Make sure to create it or remove it from the composition settings.";
            alert(message);
            return false;
        }
        comps.push(app.project.item(index));
        u[compTemps[i]] = 1;
    }

    // now we iterate through the list and check for composition markers
    for (var i = 0, cl = comps.length; i < cl; i++) {
        comp = comps[i];
        markers = comp.markerProperty;
        if (!(markers.numKeys == markersNeeded)) {
            // we found a composition template with more or less than two markers
            // we need these two markers to identify the in and out animations
            // so we will prevent the script to continue if the templates
            // are not setup correctly
            compWithoutMarkers.push(comp);
        }
    }

    if (compWithoutMarkers.length == 0) {
        // iterate through the comp names and extract the markers times
        var tempNull, tempPos, exp;
        for (var i = 0, cl = comps.length; i < cl; i++) {
            comp = comps[i];
            tempNull = comp.layers.addNull(comp.duration);
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
            cfg = ctemp[comp.name];
            if (cfg === undefined) {
                cfg = ctemp[comp.name] = {};
            }
            cfg.inBgFullyCovered = tempPos.value[0];
            cfg.outBgFullyCovered = comp.duration - tempPos.value[1];

            // at the end we remove the temp layer
            tempNull.remove();
        }
        return true;
    } else {
        var message = "";
        message += "Missing Composition Markers for Animations\n";
        message += "All compositions need to have exactly "+markersNeeded+" markers. ";
        message += "The following compositions do not fullfill this requirement:";
        for (var i = 0, cwml = compWithoutMarkers.length; i < cwml; i++) {
            message += "\n"+ compWithoutMarkers[i].name;
        }
        alert(message);
        return false;
    }
}
