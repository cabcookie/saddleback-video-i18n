{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for findItemIndexByName",
            title: 'Error loading neccesary functions',
            message: e.message
        });
    }

    sbVideoScript.findItemIndexByName = function (searchName) {
        try {
            var itemsLen = app.project.items.length;
            var index = null;

            for (var i = 1; i <= app.project.items.length; i++) {
                var nameProperty = app.project.item(i).name;
                if (nameProperty === searchName) {
                    index = i;
                    break;
                }
            }

            return index;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'findItemIndexByName',
                title: 'Error finding item by name',
                message: e.message
            });
        }
    }
}
