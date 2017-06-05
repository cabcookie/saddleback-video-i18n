// TODO Every function should have an error handling gh:3 id:56

function adjustUIForSplittedLayers(layer, panel, splitLayerButtonGroup, statusColors, statusObj) {
    var txtLay, txt, btnNames, btnName;
    var protection;
    var posSplBtnGrp, pos, name;

    var NULL_SIZE = [0,0];
    var MAX_SIZE = [1000,1000];
    var NO_SPLIT_BTNS = 11;

    protection = configuration().splitSettings.animationProtectionTime;
    btnNames = [];

    // we create the list of possible button names before we create the UI
    for (var tl = 0, ltll = layer.textLayers.length; tl < ltll; tl++) {
        txtLay = layer.textLayers[tl];
        for (var t = 1, txl = txtLay.texts.length; t < txl; t++) {
            var comp = app.project.item(findItemIndexByName(layer.layerName));
            btnName = txtLay.layerName + ' {'+ t +' -> '+ (t+1) +'}';
            btnNames.push({
                btnName: btnName,
                lay1Name: txtLay.layerName + ' {'+ t +'}',
                lay2Name: txtLay.layerName + ' {'+ (t+1) +'}',
                comp: comp,
            });
        }
    }

    splitLayerButtonGroup.visible = (btnNames.length > 0);
    splitLayerButtonGroup.maximumSize = splitLayerButtonGroup.visible ? MAX_SIZE : NULL_SIZE;
    for (var bn = 1; bn <= NO_SPLIT_BTNS; bn++) {
        var btn = splitLayerButtonGroup['l'+bn];
        if (btnNames.length >= bn) {
            btn.visible = true;
            btn.maximumSize = MAX_SIZE;
            var btnLayerOptions = btnNames[bn-1];
            btn.text = btnLayerOptions.btnName;
            btn.onClick = changeSplitTextLayerTime(btnLayerOptions, protection, statusObj, statusColors);
        } else {
            btn.visible = false;
            btn.maximumSize = NULL_SIZE;
        }
    }
}
