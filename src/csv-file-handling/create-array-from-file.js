/**
Opens the file and returns it as an array which represents the lines of the file.
*/
{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for loadAndCheckFilesAndTemplates",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.createArrayFromFile = function () {
        try {
            var file = File.openDialog("Please choose the file with the relevant texts", "txt");
            var doc = new File(file);
            if (!doc.exists) throw new Error("No file found or couldn't read it!");

            var contentAry = [];
            file.open('r');
            while (!file.eof) {
                contentAry[contentAry.length] = file.readln();
            }
            file.close();

            if (contentAry.length < 2) throw new Error("Couldn't read file. Seems to have less than two lines or is empty.");

            return contentAry;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: "createArrayFromFile",
                title: "Error loading CSV file",
                message: e.message
            });
        }
    }
}
