{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/load-video-footage');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for loadAudioFootage",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.loadAudioFootage = function () {
        try {
            var audioSettings = sbVideoScript.settings.mainCompositionsToBuild.additionalAudioFiles;
            var originalVideoLanguage = sbVideoScript.settings.mainCompositionsToBuild.originalVideoLanguage;
            var projectFolder = app.project.file.parent.fsName;
            var originalVideo = sbVideoScript.loadVideoFootage();
            var footageFolder = originalVideo.parentFolder;

            sbVideoScript.audioFiles = sbVideoScript.audioFiles || {};
            for (var lang in sbVideoScript.audioFiles) {
                if (lang !== originalVideoLanguage) {
                    sbVideoScript.audioFiles[lang].remove();
                }
            }

            sbVideoScript.audioFiles[originalVideoLanguage] = originalVideo;

            for (var lang in audioSettings) {
                var fileName = projectFolder + '/' + audioSettings[lang];
                var newAudio = app.project.importFile(new ImportOptions(new File(fileName)));
                newAudio.parentFolder = footageFolder;
                sbVideoScript.audioFiles[lang] = newAudio;
            }

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: "loadAudioFootage",
                title: "Error loading audio footage",
                message: e.message
            });
        }
    }
}
