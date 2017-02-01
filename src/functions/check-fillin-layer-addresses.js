'use strict';

import addTextToLayerAndCheckOutcome from './add-text-to-layer-and-check-outcome';

export default function checkFillinLayerAddresses(text, textLayer, delimiter) {
  // we evaluate the text before the first fill in and in which line it ends
  var textAry = text.split(delimiter[0]);
  var testText = textAry[0];
  var evaluate = {};
  addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);
  var lastBl = evaluate.blLength;

  // the end of this text is the beginning of the first fill in
  // and thus the starting point of the mask for it
  var maskAddress = {
    startX: evaluate.lineEndX,
    y: evaluate.lineY
  };
  var maskAddressAry = [];

  for (var i = 1; i < textAry.length; i++) {
    // we split the fill in from the text behind it and evaluate
    // if there is a line break within the fill in
    var elem = textAry[i].split(delimiter[1]);
    testText += elem[0];
    addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);
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
      // TODO: how can we handle centered text?
    }

    // now that we iterated through all lines we can add the end of the current line
    // thus it is the end of the fill in
    maskAddress.endX = evaluate.lineEndX;
    maskAddressAry[maskAddressAry.length] = maskAddress;

    // add the text after the fill in and set the new end of the current line
    // as a new starting point for the next possible fill in
    testText += elem[1];
    addTextToLayerAndCheckOutcome(testText, textLayer, evaluate);
    lastBl = evaluate.blLength;
    maskAddress = {
      startX: evaluate.lineEndX,
      y: evaluate.lineY
    };
  }
  return maskAddressAry;
}
