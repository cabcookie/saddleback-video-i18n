{
    try {
        importScript('errors/runtime-error');
        importScript('config/clone');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for cloneColumnPositionsForMainComp",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.cloneColumnPositionsForMainComp = function (compConf) {
        try {
            // adjust the columnPositions for this specific composition
            var colPos = sbVideoScript.clone(sbVideoScript.columnPositions);
            for (var l = 0, cl = colPos.layers.length; l < cl; l++) {
                var lay = colPos.layers[l];
                lay.originalLayerName = lay.layerName;
                for (var key in compConf.columnsToSwap) {
                    var val = compConf.columnsToSwap[key];
                    lay.layerName = lay.layerName.replace(key, val);
                }
            }

            return colPos;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'cloneColumnPositionsForMainComp',
                title: "Error cloning the column positions for the current composition",
                message: e.message
            });
        }
    }
}
