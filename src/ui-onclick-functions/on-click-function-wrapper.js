{
    try {
        importScript('errors/runtime-error');
        importScript('ui-onclick-functions/set-active-time-in-timeline');
        importScript('ui-onclick-functions/choose-csv-file');
        importScript('ui-onclick-functions/set-in-out-layer');
        importScript('ui-onclick-functions/create-slides');
        importScript('ui-onclick-functions/search-item-in-timeline');
        importScript('ui-onclick-functions/change-split-text-layer-time');

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
                        case 'searchItemInTimeline':
                            sbVideoScript.searchItemInTimeline(paramArray[0]);
                            break;
                        case 'changeSplitTextLayerTime':
                            sbVideoScript.changeSplitTextLayerTime(paramArray[0], paramArray[1]);
                            break;
                        default:
                            throw new Error("Unknown function '"+ functionName +"'.");
                    }
                } catch (e) {
                    throw new sbVideoScript.RuntimeError({
                        func: 'onClickFunctionWrapper',
                        title: "Error proceeding onClick function",
                        message: e.message
                    });
                }
            } catch (e) {
                alert(e.message);
            }
        }
    }
}
