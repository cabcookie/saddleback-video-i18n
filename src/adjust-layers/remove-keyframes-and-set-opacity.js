{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for removeKeyframesAndSetOpacity",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.removeKeyframesAndSetOpacity = function (layer, newOpacity) {
        try {
            var opacity = layer.property("Opacity");
            var opacityNumKeys = opacity.numKeys;
            if (opacity.canVaryOverTime) {
                while (opacityNumKeys > 0) {
                    opacity.removeKey(opacityNumKeys);
                    opacityNumKeys = opacity.numKeys;
                }
            }
            opacity.setValue(newOpacity);

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'removeKeyframesAndSetOpacity',
                title: "Error while removing keyframes and set opacity",
                message: e.message
            })
        }
    }
}
