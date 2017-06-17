// DONE: build an onClick function wrapper to implement error handling for all callback functions just once +enhancement id:68 gh:14

{
    try {
        importScript('errors/runtime-error');
        importScript('ui-onclick-functions/set-active-time-in-timeline');
        importScript('ui-onclick-functions/choose-csv-file');
        importScript('ui-onclick-functions/set-in-out-layer');
        importScript('ui-onclick-functions/create-slides');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for onClickFunctionWrapper",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.onClickFunctionWrapper = function (functionName, paramArray) {
        return function () {
            try {
                try {
                    switch (functionName) {
                        case 'setActiveTimeInTimeline':
                            sbVideoScript.setActiveTimeInTimeline(paramArray[0], paramArray[1]);
                            break;
                        case 'chooseCSVFile':
                            sbVideoScript.chooseCSVFile();
                            break;
                        case 'setInOutLayer':
                            sbVideoScript.setInOutLayer(paramArray[0], paramArray[1]);
                            break;
                        case 'createSlides':
                            sbVideoScript.createSlides();
                            break;
                        default:
                            throw new Error("Unknown function '"+ functionName +"'.");
                    }
                } catch (e) {
                    throw new sbVideoScript.RuntimeError({
                        func: 'onClickFunctionWrapper',
                        title: e.message
                    });
                }
            } catch (e) {
                alert(e.message);
            }
        }
    }
}
