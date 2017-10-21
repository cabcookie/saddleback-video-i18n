{
    sbVideoScript.setTemplateList = function (dropdownlist) {
        try {
            importScript('errors/runtime-error');
            importScript('config/configuration');

            var templates = sbVideoScript.settings.compositionTemplates;
            dropdownlist.removeAll();

            for (var name in templates) {
                var setting = templates[name];
                if (setting.isSelectable) {
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
