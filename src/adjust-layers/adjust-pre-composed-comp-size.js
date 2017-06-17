// DONE Every function should have an error handling gh:3 id:43

/**
Evaluate how parent layers are shifting the current layer and make sure the
layers in the composition are shifted accoordingly
There might still be some position animation on those layers. Thus we need to
make sure we don't mess up with them.
*/

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for adjustPreComposedCompSize",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.adjustPreComposedCompSize = function (comp, pcLayer) {
        try {
            if(comp instanceof CompItem) {
                if (pcLayer instanceof AVLayer) {
                    var orgW, orgH;
                    orgW = comp.width;
                    orgH = comp.height;
                    comp.width *= 3;
                    comp.height *= 3;

                    for (var l = 1, cl = comp.layers.length; l <= cl; l++) {
                        var lay = comp.layers[l];
                        var posProp = lay.property("Position");
                        var pos = posProp.value;
                        pos[0] += orgW;
                        pos[1] += orgH;
                        posProp.setValue([pos[0], pos[1]]);
                    }
                }
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'adjustPreComposedCompSize',
                title: "Error adjusting the size of the composition grouping several masks of one text layer",
                message: e.message
            })
        }
    }
}
