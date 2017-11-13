{
    function importScript(fileName) {
        sbVideoScript.filesLoaded = sbVideoScript.filesLoaded || {};
        var fileAlreadyLoaded = sbVideoScript.filesLoaded[fileName];
        if (!fileAlreadyLoaded) {
            try {
                var mainDirectory = '(Saddleback Video i18n Functions)/';
                var extension = '.js';
                var file = new File(mainDirectory + fileName + extension);
                file.open("r");
                var fileContent = file.read();
                if (fileContent.length < 10) { throw new Error("File is missing") }
                sbVideoScript.filesLoaded[fileName] = true;
                eval(fileContent);
                file.close();
            } catch (e) {
                sbVideoScript.filesLoaded[fileName] = false;
                throw new Error("Error while importing '"+ fileName + "': " + e.message);
            }
        }
    }
    try {
        var sbVideoScript = {};
        importScript('errors/runtime-error');
        importScript('ui-elements/create-ui');
        importScript('config/configuration');
        sbVideoScript.uiPanel = sbVideoScript.createUI(this);
    } catch (e) {
        alert(e.message);
    }
}
