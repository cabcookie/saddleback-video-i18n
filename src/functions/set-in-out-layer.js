'use strict';

export default function setInOutLayer(btnName, action, newAction, store, templateDropdown, contentDropdown) {
    // TODO: consider exception if no template was chosen and then don't enable/disable the buttons
    return function () {
        try {
            var comp = app.project.activeItem;
            var currTime = comp.time;
            var attrName = 'time' + action;
            var newBtnName = btnName.replace(action, newAction);
            store[attrName] = currTime;
            store[btnName].enabled = false;
            store[newBtnName].enabled = true;
            if (action === 'Out') {
                var index = contentDropdown.selection.index + 1;
                var duration = store.timeOut - store.timeIn;
                var newLayerName = index + ' ' + templateDropdown.selection.text;
                var newLayer = comp.layers.addSolid([1, 1, 1], newLayerName, comp.width, comp.height, comp.pixelAspect, duration);
                moveItemToTrashFolder(newLayer);
                newLayer.inPoint = store.timeIn;
                templateDropdown.selection = null;
                contentDropdown.selection = null;
            }
        } catch (e) {
            alert(e.message);
        }
    };
}
