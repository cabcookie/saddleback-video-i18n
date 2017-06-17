// DONE Every function should have an error handling gh:3 id:32
// DONE: implement check if template was chosen. If not 'Out' is not possible +enhancement id:31 gh:9

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for setInOutLayer",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.setInOutLayer = function (btnName, newBtnName) {
        try {
            var comp = app.project.activeItem;
            if (!comp) { throw new Error("No composition is active in the project") }

            var currTime = comp.time;

            var action = btnName.substring(0, btnName.indexOf('Button'));
            if (action != 'in' && action != 'out') { throw new Error("function was called with wrong button name, expected 'inButton' or 'outButton' but received '"+ btnName +"' (action = '"+ action +"')") }

            var attrName = action + 'Time';
            var store = sbVideoScript.groupInOutButtons;
            if (!store) { throw new Error("Error with the global store for the set in/out buttons 'groupInOutButtons'") }

            // prepare variables if it is the 'set out point' action
            var index;
            var newLayerName;
            if (action === 'out') {
                try {
                    index = sbVideoScript.contentList.selection.index + 1;
                    newLayerName = index + ' ' + sbVideoScript.templateList.selection.text;
                } catch (e) {
                    throw new Error("You need to select a template and a content before you can set the out point.")
                }
            }

            store[attrName] = currTime;
            store[btnName].enabled = false;
            store[newBtnName].enabled = true;

            if (action === 'out') {
                var duration = store.outTime - store.inTime;
                var newLayer = comp.layers.addSolid([1, 1, 1], newLayerName, comp.width, comp.height, comp.pixelAspect, duration);
                sbVideoScript.moveItemToTrashFolder(newLayer);
                newLayer.inPoint = store.inTime;
                sbVideoScript.templateList.selection = null;
                sbVideoScript.contentList.selection = null;
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'setInOutLayer',
                title: 'Error setting in or out times of a layer',
                message: e.message
            });
        }
    }
}
