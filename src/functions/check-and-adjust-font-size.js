'use strict';

export default function checkAndAdjustFontSize(text, textLayer) {
  var textProp = textLayer.property("Source Text");
  var textDocument = textProp.value;
  var maximumFontSizeChange = -0.10;

  // saving some data to make sure the fontSize doesn't get to small
  // and placing the mask and line for the fill ins is possible
  var oldLinePosition = textDocument.baselineLocs[1];
  var oldFontSize = textDocument.fontSize;

  // try to figure out how many lines will fit into the text field
  // and the height of the lines
  var numLines = 20;
  var numAry = [];
  for (var n = 1; n <= numLines; n++) {
    numAry[numAry.length] = "a";
  }
  textProp.setValue(numAry.join('\n'));
  textDocument = textProp.value;
  numLines = textDocument.baselineLocs.length / 4;

  // evaluating the height of one line
  // to later extend the text field by one line
  // which will help us to resize the font if the text doesn't fit
  var heightOfLines = 0;
  if (numLines > 1) {
    // if it is more than one line, evaluate the diff between two lines
    heightOfLines = textDocument.baselineLocs[5] - textDocument.baselineLocs[1];
  } else {
    heightOfLines = textLayer.sourceRectAtTime(0, true).height;
  }
  textDocument.boxTextSize = [textDocument.boxTextSize[0], textDocument.boxTextSize[1] + heightOfLines];
  textProp.setValue(textDocument);

  // now we change the text for the first time
  // this is to check the size of the text and reducing
  // the fontSize if needed
  textProp.setValue(text);

  // check if text is too long for the text field and
  // adjust fontSize until it fits
  textDocument = textProp.value;
  while (textDocument.baselineLocs.length > numLines * 4) {
    textDocument.fontSize -= 1;
    textProp.setValue(textDocument);
    textDocument = textProp.value;
  }

  var newFontSize = textDocument.fontSize;

  // check if fontSize is now to small and do something
  var fontSizeChange = newFontSize / oldFontSize - 1;
  if (fontSizeChange < maximumFontSizeChange) {
    // TODO: do something when fontSize is reduced to much
    // maybe we need to switch from a Lower Third to a Full Screen
  }
}
