'use strict';

export default function setInOutLayer(btnName, action, newAction, store, templateDropdown) {
    return function () {
        var comp = app.project.activeItem;
        var currTime = comp.time;
        var attrName = 'time' + action;
        var newBtnName = btnName.replace(action, newAction);
        store[attrName] = currTime;
        store[btnName].enabled = false;
        store[newBtnName].enabled = true;
        if (action === 'Out') {
            // alert('Nun müsste der Layer erstellt werden: ' + templateDropdown.selection.text);
            store.numberOfLayers += 1;
            var duration = store.timeOut - store.timeIn;
            var newLayerName = store.numberOfLayers + ' ' + templateDropdown.selection.text;
            var newLayer = comp.layers.addSolid([1, 1, 1], newLayerName, comp.width, comp.height, comp.pixelAspect, duration);
            newLayer.inPoint = store.timeIn;
            templateDropdown.selection = null;
        }
    };
}
