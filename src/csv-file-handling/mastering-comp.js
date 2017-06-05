// TODO Every function should have an error handling gh:3 id:50

function masteringComp(comp) {
    var mc = configuration().mainCompositionsToBuild;
    var cc = mc.compositionsConfig;

    // find the audioSettings for the current comp
    var audioSettings;
    for (var i = 0, ccl = cc.length; i < ccl; i++) {
        var n = cc[i].name;
        if (comp.name.indexOf(n) === 0) {
            audioSettings = cc[i].audioSettings;
            break;
        }
    }

    // find the layer and take or add the Stereo Mixer effect
    var lastLayer = comp.layers.length;
    var layer = comp.layers[lastLayer];
    var lp = layer("Effects")("Stereo Mixer");
    if (lp) {
        null;
    } else {
        lp = layer("Effects").addProperty("Stereo Mixer");
    }

    // change the audio settings of the Stereo Mixer
    for (var key in audioSettings) {
        var prop = lp.property(key);
        var newVal = audioSettings[key];
        prop.setValue(newVal);
    }
}
