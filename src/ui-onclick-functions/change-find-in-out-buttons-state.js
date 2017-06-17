{
    sbVideoScript.changeFindInOutButtonsState = function (state, grpTimeControls) {
        try {
            importScript('errors/runtime-error');

            var timeControls = grpTimeControls || sbVideoScript.grpTimeControls;
            if (timeControls) {
                sbVideoScript.grpTimeControls = timeControls;
                sbVideoScript.grpTimeControls.rewSecs10.enabled = state;
                sbVideoScript.grpTimeControls.rewSecs1.enabled = state;
                sbVideoScript.grpTimeControls.rewFrm1.enabled = state;
                sbVideoScript.grpTimeControls.forwFrm1.enabled = state;
                sbVideoScript.grpTimeControls.forwSecs1.enabled = state;
                sbVideoScript.grpTimeControls.forwSecs10.enabled = state;

            } else {
                throw new Error("function called without a reference to the time controls UI elements");
            }
        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'changeFindInOutButtonsState',
                title: 'Error changing state of time controls',
                message: e.message
            });
        }
    }
}
