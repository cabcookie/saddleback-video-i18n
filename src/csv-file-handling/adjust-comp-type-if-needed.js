{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for adjustCompTypeIfNeeded",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.adjustCompTypeIfNeeded = function (compConfig, templateName) {
        try {
            var ytExt = sbVideoScript.settings.compositionYouTubeNameExtension;
            var isYtComp = compConfig.name.indexOf(ytExt);
            if (isYtComp >= 0) {
                var ct = sbVideoScript.settings.compositionTemplates[templateName];
                if (ct.youtubeAlternative) {
                    templateName += ytExt;
                }
            }
            return templateName;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'adjustCompTypeIfNeeded',
                title: "Error adjusting template to the main composition's expectations",
                message: e.message
            })
        }
    }
}
