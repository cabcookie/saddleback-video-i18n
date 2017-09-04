{
    sbVideoScript.setTemplateList = function (dropdownlist) {
        try {
            importScript('errors/runtime-error');
            importScript('config/configuration');

            var templates = sbVideoScript.settings.compositionTemplates;
            var youtubeTempName = sbVideoScript.settings.compositionYouTubeNameExtension;
            dropdownlist.removeAll();

            for (var name in templates) {
                if (name.indexOf(youtubeTempName) === -1) {
                    dropdownlist.add('item', name);
                }
            }
            sbVideoScript.templateList = dropdownlist;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'setTemplateList',
                title: 'Error loading the templates',
                message: e.message
            });
        }
    }
}
