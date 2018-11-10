/**
 Duplicate an existing "template" composition and return the
 new one. It searches by name, as opposed to index to make things easier.

 @param templateName {String} - the name of the comp to duplicate.
 @param lineNumber {String} - the line number of the file is used to update the new comp name
 @param parentFolder {Object} - the folder where the new comp should be created
 */

{
    try {
        importScript('errors/runtime-error');
        importScript('handle-items-and-folders/find-item-index-by-name');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for createCompFromTemplate",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createCompFromTemplate = function (templateName, lineNumber, parentFolder) {
        try {
            if (templateName === 'Composition') { throw new Error("Error with template 'Composition'") }

    		var index = sbVideoScript.findItemIndexByName(templateName);
    		var newComp = app.project.items[index].duplicate();
    		newComp.name = lineNumber + ' ' + templateName;
    		newComp.parentFolder = parentFolder;
    		return newComp;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'createCompFromTemplate',
                title: "Error creating composition from template '"+ templateName +"'",
                message: e.message
            })
        }
    }
}
