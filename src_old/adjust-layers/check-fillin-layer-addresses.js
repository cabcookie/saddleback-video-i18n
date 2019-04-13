// TODO: If a fill in starts at the very beginning of a line it creates problems with the location of the mask and line +bug gh:57 id:0

{
    try {
        importScript('errors/runtime-error');
        importScript('adjust-layers/add-text-to-layer-and-check-outcome');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for checkFillinLayerAddresses",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.checkFillinLayerAddresses = function (text, textLayer) {
        try {
            var fillInHandling = sbVideoScript.settings.fillInHandling;

            // create array of fill in start positions with their mathching animation option
            var restText = text;
            var textFullyChecked = false;
            var textAry = [];
            while (!textFullyChecked) {
                var leftPosition = -1;
                var aryObj = {};
                for (var fillInOption in fillInHandling) {
                    var option = fillInHandling[fillInOption];
                    var delimiter = option.delimiter;
                    var len = delimiter.length / 2;
                    var delimiterLeft = delimiter.substring(0, len);

                    var pos = restText.indexOf(delimiterLeft);
                    if (pos >= 0 && (pos < leftPosition || leftPosition < 0)) {
                        leftPosition = pos;
                        aryObj.text = restText.substring(0, pos);
                        aryObj.fillInOption = option;
                        aryObj.delimiterRight = delimiter.substring(len, len*2);
                    }
                }
                if (leftPosition > 0) {
                    textAry.push({text: aryObj.text});
                    var option = aryObj.fillInOption;
                    var len = option.delimiter.length/2;
                    restText = restText.substring(leftPosition+len, restText.length);
                    var pos = restText.indexOf(aryObj.delimiterRight);
                    if (pos < 0) {
                        throw new Error("Closing bracket '"+ aryObj.delimiterRight +"' is missing for text '"+ restText +"'");
                    }
                    textAry.push({
                        text: restText.substring(0, pos),
                        textMaskHandling: aryObj.fillInOption.textMaskHandling
                    })
                    restText = restText.substring(pos+len, restText.length);

                } else {
                    if (restText.length > 0) {
                        textAry.push({text: restText});
                    }
                    textFullyChecked = true;
                }
            }

            // iterate through the array of texts and add their baseline positions
            var evaluate = [];
            var testText = "";
            var maskAddressAry = [];
            for (var i = 0; i < textAry.length; i++) {
                var part = textAry[i];
                testText += part.text;
                // TODO: how can we handle centered text? +feature id:79 gh:24
                evaluate = sbVideoScript.addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);

                if (part.textMaskHandling) {
                    maskAddressAry.push({
                        positions: evaluate,
                        textMaskHandling: part.textMaskHandling
                    })
                }
            }

            return maskAddressAry;

        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'checkFillinLayerAddresses',
                title: "Error checking positions in text layer to highlight as a fill in",
                message: e.message
            })
        }
    }
}
