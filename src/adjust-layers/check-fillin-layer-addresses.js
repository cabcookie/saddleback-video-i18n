// TODO: If a fill in spreads over more than one line, the first and the last line works fine but the lines in between appear in the last line +bug id:94 gh:38
// TODO: If a fill in starts at the very beginning of a line it creates problems with the location of the mask and line +bug gh:57

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

    sbVideoScript.checkFillinLayerAddresses = function (text, textLayer, delimiter) {
        try {
            // we evaluate the text before the first fill in and in which line it ends
            var textAry = text.split(delimiter[0]);
            var testText = textAry[0];
            var evaluate = {};
            sbVideoScript.addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);
            var lastBl = evaluate.blLength;

            // the end of this text is the beginning of the first fill in
            // and thus the starting point of the mask for it
            var maskAddress = {
                startX: evaluate.lineEndX,
                y: evaluate.lineY
            };
            var maskAddressAry = [];

            for (var i = 1, tl = textAry.length; i < tl; i++) {
                // we split the fill in from the text behind it and evaluate
                // if there is a line break within the fill in
                var elem = textAry[i].split(delimiter[1]);
                testText += elem[0];
                sbVideoScript.addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);
                var newBl = evaluate.blLength;

                // if the newBl has more lines than the lastBl there is at least
                // one line break in the fill in; then we split the fill in and store information
                // about the start and end position for the masks
                while (newBl > lastBl) {
                    // evaluating the line end of the lastBl line and take this as
                    // the end of the maskLayer
                    maskAddress.endX = evaluate.lastLineEndX[lastBl];

                    // add these complete maskAddress to the array of masks
                    // which we will use for later to create and position the mask layers
                    maskAddressAry[maskAddressAry.length] = maskAddress;

                    // now create the new starting point for the next mask layer
                    // thus the fill in continues after the line break
                    lastBl += 4;
                    var maskAddress = {
                        startX: evaluate.lineStartX,
                        y: evaluate.lineY
                    };
                    // attention when we add more text to this line and the text is centered
                    // the starting point may change

                    // TODO: how can we handle centered text? +feature id:79 gh:24
                }

                // now that we iterated through all lines we can add the end of the current line
                // thus it is the end of the fill in
                maskAddress.endX = evaluate.lineEndX;
                maskAddressAry[maskAddressAry.length] = maskAddress;

                // add the text after the fill in and set the new end of the current line
                // as a new starting point for the next possible fill in
                testText += elem[1];
                sbVideoScript.addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);
                lastBl = evaluate.blLength;
                maskAddress = {
                    startX: evaluate.lineEndX,
                    y: evaluate.lineY
                };
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
