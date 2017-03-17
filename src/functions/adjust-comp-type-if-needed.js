'use strict';

import configuration from './configuration';

export default function adjustCompTypeIfNeeded(tcConf, parsedContentLine) {
    try {
        var ytExt = configuration().compositionYouTubeNameExtension;
        var isYtComp = tcConf.name.indexOf(ytExt);
        if (isYtComp >= 0) {
            var ct = configuration().compositionTemplates[parsedContentLine.comp];
            if (ct.youtubeAlternative) {
                parsedContentLine.comp += ytExt;
            }
        }
    } catch (e) {
        if (e instanceof Error) {
			e.message = 'in adjustCompTypeIfNeeded' + '\n' + e.message;
			throw e;
		}
    }
}
