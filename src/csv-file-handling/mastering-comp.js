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

            // find the audioChannels for the current comp
            var audioChannels;
            for (var i = 0, ccl = cc.length; i < ccl; i++) {
                var n = cc[i].name;
                if (comp.name.indexOf(n) === 0) {
                    audioChannels = cc[i].audioChannels;
                    break;
                }
            }

            var layersForAudioChannels = {};
            var layersFound = 0;

            for (var l = comp.layers.length; l > 0; l--) {
                var layer = comp.layers[l];
                for (var lang in sbVideoScript.audioFiles) {
                    if (sbVideoScript.audioFiles[lang] === layer.source) {
                        layersForAudioChannels[lang] = l;
                        layersFound++;
                        break;
                    }
                }
                if (l + layersFound === comp.layers.length) {
                    break;
                }
            }
            var propTrans = sbVideoScript.settings.propertyTranslations;
            var numberOfLanguagesSupported = propTrans.languages.length;
            var langIdx = sbVideoScript.settings.languageIndexNumber;

            for (var lang in audioChannels) {
                try {
                    var settingForLanguage = audioChannels[lang];
                    var layerIndex = layersForAudioChannels[lang];
                    var layer = comp.layers[layerIndex];

                    if (settingForLanguage === 'mute') {
                        layer.audioEnabled = false;
                    } else {
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

                        var key;

                        if (settingForLanguage === 'left') {
                            key = 'Right Level';
                        } else if (settingForLanguage === 'right') {
                            key = 'Left Level';
                        } else {
                            throw new Error("Wrong setting for the language of the audio channels. It must be set to [mute, left, right].");
                        }

                        var transKey = propTrans[key][langIdx];
                        var prop = lp.property(transKey);
                        prop.setValue(0);

                    }
                } catch (e) {}
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
