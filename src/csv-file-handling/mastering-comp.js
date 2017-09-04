{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for masteringComp",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.masteringComp = function (comp) {
        try {
            var mc = sbVideoScript.settings.mainCompositionsToBuild;
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
            // the script can currently only handle English and German language
            // settings of the After Effects UI
            var lastLayer = comp.layers.length;
            var layer = comp.layers[lastLayer];

            var propTrans = sbVideoScript.settings.propertyTranslations;
            var numberOfLanguagesSupported = propTrans.languages.length;
            var langIdx = sbVideoScript.settings.languageIndexNumber;

            var effName = propTrans['Effects'][langIdx];
            var mixName = propTrans['Stereo Mixer'][langIdx];
            var lp = layer(effName)(mixName);

            while (lp === null) {
                try {
                    lp = layer(effName).addProperty(mixName);
                } catch (e) {
                    langIdx += 1;
                    if (langIdx >= numberOfLanguagesSupported) { throw new Error("Something is wrong with the language settings of the After Effects UI. We currently only support "+ propTrans.languages.join(', ') +" languages.") }
                    effName = propTrans['Effects'][langIdx];
                    mixName = propTrans['Stereo Mixer'][langIdx];
                    lp = null;
                }
            }

            sbVideoScript.settings.languageIndexNumber = langIdx;

            // change the audio settings of the Stereo Mixer
            for (var key in audioSettings) {
                var transKey = propTrans[key][langIdx];
                var prop = lp.property(transKey);
                var newVal = audioSettings[key];
                prop.setValue(newVal);
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'masteringComp',
                title: "Error while mastering a composition",
                message: e.message
            })
        }
    }
}
