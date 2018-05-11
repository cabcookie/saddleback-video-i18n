{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for loadProjectSettings",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.loadProjectSettings = function () {
        function updateSetting(global, local) {
            for (var key in local) {
                if (key === 'toJSON') {
                    global = local;
                } else if (global.hasOwnProperty(key)) {
                    global[key] = updateSetting(global[key], local[key]);
                } else {
                    global[key] = local[key];
                }
            }
            return global;
        }

        function adaptSettings(parentSettings, childSettings) {
            sbVideoScript.settings = updateSetting(sbVideoScript.settings, parentSettings);
            return childSettings;
        }

        function loadSettings(folder, iteration, childSettings) {
            var MAX_PARENTS = 2;
            if (iteration === MAX_PARENTS) return childSettings;
            var settings = {};
            try {
                settings = JSON.parse(loadFile(folder.fsName + '/project-settings.json'));
            } catch (e) {
            }
            return adaptSettings(loadSettings(folder.parent, iteration + 1, settings), childSettings);
        }

        try {
            loadSettings(app.project.file.parent, 0, {});

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'loadProjectSettings',
                title: 'Error while importing project settings',
                message: e.message
            });
        }
    }
}
