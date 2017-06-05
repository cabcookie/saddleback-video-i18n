// TODO Every function should have an error handling gh:3 id:35

function adjustCompTypeIfNeeded(tcConf, templateName) {
    try {
        var ytExt = configuration().compositionYouTubeNameExtension;
        var isYtComp = tcConf.name.indexOf(ytExt);
        if (isYtComp >= 0) {
            var ct = configuration().compositionTemplates[templateName];
            if (ct.youtubeAlternative) {
                templateName += ytExt;
            }
        }
        return templateName;
    } catch (e) {
        if (e instanceof Error) {
			e.message = 'in adjustCompTypeIfNeeded' + '\n' + e.message;
			throw e;
		}
    }
}
