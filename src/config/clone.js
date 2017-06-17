// DONE Every function should have an error handling gh:3 id:27

{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for clone",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.clone = function (obj) {
        try {
            if (obj == null || typeof(obj) != 'object')
        		return obj;

        	var temp = new obj.constructor();
        	for (var key in obj)
        		temp[key] = sbVideoScript.clone(obj[key]);

        	return temp;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'clone',
                title: "Error cloning object",
                message: e.message
            });
        }
    }
}
