
{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for replaceBadCharacters",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.replaceBadCharacters = function (text) {
        var character;
        var charArr = sbVideoScript.settings.badCharactersToBeReplaced.split("");
        try {
            for (var i = 0; i < charArr.length; i++) {
                character = charArr[i];
                text = text.replace(character, "");
            }
            return text;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'replaceBadCharacters',
                title: "Could not replace all bad characters. Problems with character: "+ character,
                message: e.message
            })
        }
    }
}
