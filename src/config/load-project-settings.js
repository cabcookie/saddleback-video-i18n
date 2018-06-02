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
        var MAX_PARENTS = 2;

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

        function adaptSettings(projSettingsArr) {
            for (var i = projSettingsArr.length; i > 0; i--) {
                var settings = projSettingsArr[i-1];
                sbVideoScript.settings = updateSetting(sbVideoScript.settings, settings);
            }
        }

        // function adaptSettings(parentSettings, childSettings) {
        //     sbVideoScript.settings = updateSetting(sbVideoScript.settings, parentSettings);
        //     return childSettings;
        // }

        function loadSettings(folder, iteration, projSettingsArr) {
            if (iteration === MAX_PARENTS) return;
            var settings = {};
            try {
                settings = JSON.parse(loadFile(folder.fsName + 'project-settings.json'));
                projSettingsArr.push(settings);
            } catch (e) {
            }
            loadSettings(folder.parent, iteration + 1, projSettingsArr);
        }

        // function loadSettings(folder, iteration, childSettings) {
        //     if (iteration === MAX_PARENTS) return childSettings;
        //     var settings = {};
        //     try {
        //         settings = JSON.parse(loadFile(folder.fsName + '/project-settings.json'));
        //     } catch (e) {
        //     }
        //     return adaptSettings(loadSettings(folder.parent, iteration + 1, settings), settings);
        // }

        try {
            var projSettingsArr = [];
            loadSettings(app.project.file.parent, 0, projSettingsArr);
            adaptSettings(projSettingsArr);

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'loadProjectSettings',
                title: 'Error while importing project settings',
                message: e.message
            });
        }
    }
}
