{
    try {
        importScript('errors/runtime-error');
        importScript('csv-file-handling/clone-column-positions-for-main-comp');
        importScript('ui-onclick-functions/on-click-function-wrapper');
        importScript('config/replace-bad-characters');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for adjustUIForSplittedLayers",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.adjustUIForSplittedLayers = function (selectedLayer, uiElement) {
        try {
            uiElement = uiElement || sbVideoScript.groupSelectedTextLayers;
            if (!uiElement) { throw new Error("function called without a reference to the UI element") }

            // create the tabbed panel and the main tab to jump to layers with splitted texts
            if (!uiElement.tabs) { uiElement.tabs = uiElement.add('tabbedpanel') }
            var tabs = uiElement.tabs;

            if (!tabs.layersWithSplittedTexts) {
                tabs.tabs = {};
                tabs.layersWithSplittedTexts = tabs.add('tab', undefined, "Split Layers");
                // TODO: review all layers and search for layers with splitted texts +enhancement
            }
            // and remove all other tabs
            for (var tabName in tabs.tabs) { tabs.remove(tabs.tabs[tabName]) }
            tabs.tabs = {};

            sbVideoScript.groupSelectedTextLayers = uiElement;
            uiElement.maximumSize.height = 300;

            if (selectedLayer) {
                if (!sbVideoScript.columnPositions) { throw new Error("No CSV were loaded yet, so no required text layer was identified") }

                var comp;
                var activeName = app.project.activeItem.name;
                var mainCompsToBuild = sbVideoScript.settings.mainCompositionsToBuild.compositionsConfig;
                var columnPositions;

                for (var i = 0; i < mainCompsToBuild.length; i++) {
                    var name = mainCompsToBuild[i].name;

                    if (activeName.indexOf(name) === 0) {
                        columnPositions = sbVideoScript.cloneColumnPositionsForMainComp(mainCompsToBuild[i]);
                        comp = app.project.activeItem;
                        break;
                    }
                }

                if (!comp) { throw new Error("No main composition selected") }
                if (!columnPositions) { throw new Error("No column position configuration was found for comp '"+ comp.name +"'") }

                var layerComp = selectedLayer.source;
                var selectedLayers = comp.selectedLayers;
                for (var i = 0; i < selectedLayers.length; i++) {
                    selectedLayers[i].selected = false;
                }
                selectedLayer.selected = true;
                var isCompItem = (layerComp instanceof CompItem);
                var textLayersFound = {};

                // find all layers which seem to be text layers with texts splitted
                for (var i = 1; i <= layerComp.layers.length; i++) {
                    var name = layerComp.layers[i].name;
                    for (var key in columnPositions) {
                        if (key !== 'layers' && name.indexOf(key) === 0 && name !== key) {
                            textLayersFound[key] = true;
                            break;
                        }
                    }
                    for (var j = 0; j < columnPositions.layers.length; j++) {
                        var layerName = columnPositions.layers[j].layerName;
                        if (name.indexOf(layerName) === 0 && name !== layerName) {
                            textLayersFound[layerName] = true;
                            break;
                        }
                    }
                }

                // now review all found text layers and create the UI
                var brackets = sbVideoScript.settings.splitSettings.bracketsForLayerCounting;
                for (var key in textLayersFound) {
                    var tabRessource =
                    "tab { \
                        text:'"+ key +"', \
                        alignment:['fill','fill'], alignChildren:['fill','top'] \
                    }";

                    var tab = tabs.tabs[key] = tabs.add(tabRessource);

                    var layerFound;
                    var layerNo = 0;
                    do {
                        layerNo += 1;
                        var layerName = key + ' ' + brackets.replace('#', layerNo);
                        layerFound = layerComp.layer(layerName);
                    } while (layerFound);
                    layerNo -= 1;

                    for (var i = 1; i < layerNo; i++) {
                        var lay1Name = key + ' ' + brackets.replace('#', i);
                        var lay2Name = key + ' ' + brackets.replace('#', i+1);
                        var lay1 = layerComp.layer(lay1Name);
                        var lay2 = layerComp.layer(lay2Name);
                        var lay1Text = sbVideoScript.replaceBadCharacters(lay1.property("Source Text").value.text);
                        var lay2Text = sbVideoScript.replaceBadCharacters(lay2.property("Source Text").value.text);

                        var groupRessource =
                        "Group { \
                            alignChildren:['fill','top'], \
                            layer1: StaticText { properties:{multiline:true}, text:'"+ lay1Text +"' }, \
                            splitButton: Button { text:'Split at current time' }, \
                            layer2: StaticText { properties:{multiline:true}, text:'"+ lay2Text +"' } \
                        }";
                        var group = tab.add(groupRessource);
                        group.splitButton.minimumSize.width = 115;
                        group.splitButton.preferredSize.width = 115;
                        group.splitButton.onClick = sbVideoScript.onClickFunctionWrapper('changeSplitTextLayerTime', [lay1, lay2]);
                    }
                }

                var pan = sbVideoScript.uiPanel;
                if (pan instanceof Window) {
                    pan.center();
                    pan.show();
                } else {
                    pan.layout.layout(true);
                    pan.layout.resize();
                }

            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'adjustUIForSplittedLayers',
                title: "Error adjusting the UI for text layers where text is splitted.",
                message: e.message
            })
        }
    }
}
