{
    sbVideoScript.setActiveTimeInTimeline = function (change, unit) {
        try {
            importScript('errors/runtime-error');

            var comp = app.project.activeItem;
            if (comp == null) {
                throw new Error("There is no composition selected")
            }

            var currTime = comp.time;
            var newTime = currTime + change / (unit === 'frames' ? comp.frameRate : 1);

            newTime = Math.min(newTime, comp.duration);
            newTime = Math.max(newTime, 0);

            comp.time = newTime;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'setActiveTimeInTimeline',
                title: 'Error using time controls',
                message: e.message
            });
        }
    }
}
