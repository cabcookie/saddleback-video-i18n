// DONE Every function should have an error handling gh:3 id:33

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for dateFormatted",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.dateFormatted = function (date) {
        try {
            var fStr = sbVideoScript.settings.mainCompositionsToBuild.dateFormat;
            var d = date.getDate();
            var m = date.getMonth()+1;
            var y = date.getFullYear();
            return fStr.replace('dd', d).replace('mm', m).replace('yyyy', y);

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'dateFormatted',
                title: "Error transforming a date into a string",
                message: e.message
            })
        }
    }
}
