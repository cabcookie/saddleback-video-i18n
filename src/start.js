{
    var SCRIPT_DIR = '~/(Saddleback Video i18n Functions)/';

    function loadFile(filePathAndName) {
        var file = new File(filePathAndName);
        file.open("r");
        var fileContent = file.read();
        if (fileContent.length < 5) {
            throw new Error("File not found: "+filePathAndName);
        }
        file.close();
        return fileContent;
    }

    function importScript(fileName) {
        sbVideoScript.filesLoaded = sbVideoScript.filesLoaded || {};
        var fileAlreadyLoaded = sbVideoScript.filesLoaded[fileName];
        if (!fileAlreadyLoaded) {
            try {
                var fileContent = loadFile(SCRIPT_DIR + fileName + '.js');
                sbVideoScript.filesLoaded[fileName] = true;
                eval(fileContent);
            } catch (e) {
                sbVideoScript.filesLoaded[fileName] = false;
                throw new Error("Error while importing '"+ fileName + "': " + e.message);
            }
        }
    }


    function loadGlobalSettings() {
        var fileContent = loadFile(SCRIPT_DIR + 'config/settings.json');
        return JSON.parse(fileContent);
    }

    try {
        var sbVideoScript = {};
        importScript('errors/runtime-error');
        importScript('ui-elements/create-ui');
        importScript('config/json');

        sbVideoScript.settings = loadGlobalSettings();
        sbVideoScript.uiPanel = sbVideoScript.createUI(this);

    } catch (e) {
        alert(e.message);
    }

}
