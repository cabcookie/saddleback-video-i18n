'use strict';

export default function createAndPositionMasksAndLines(maskAddr, mask, line, base, parentFolder) {
  var animationProtectionTime = 2;
  var tolerancePx = 4;
  var compLayers = mask.containingComp.layers;
  var masksForPreCompose = [];
  var parentLayer = mask.parent;

  // if I need more than one fill in make the mask layer visible
  // we will later pre-compose all mask layers and
  // we will than make the pre-composition invisible again
  if (maskAddr.length > 1) {
    mask.enabled = true;
  }
  // iterate through all mask addresses from top to down
  for (var i = maskAddr.length - 1; i >= 0; i--) {
    var currMask = {};
    if (i === 0) {
      // if I only need one fill in nothing needs to be created
      currMask = mask;
    } else {
      // if I need more than one fill in
      // duplicate the maskLayer
      // duplicate the lineLayer and set the new maskLayer as parent
      currMask = mask.duplicate();
      line.duplicate().parent = currMask;
    }
    var adr = maskAddr[i];

    // save the mask for later pre composing
    masksForPreCompose.push(currMask);

    // position the mask and size it
    var maskPropPos = currMask.property("Position");
    var posMask = maskPropPos.value;
    var moveX = adr.startX - base.x - tolerancePx;
    var moveY = adr.y - base.y;
    var width = adr.endX - adr.startX + tolerancePx * 2;
    posMask[0] += moveX;
    posMask[1] += moveY;
    maskPropPos.setValue(posMask);

    var maskPropScale = currMask.property("Scale");
    var orgMaskWidth = currMask.sourceRectAtTime(animationProtectionTime, true).width;
    var newScale = maskPropScale.value;
    newScale[0] = width / orgMaskWidth * newScale[0];
    maskPropScale.setValue(newScale);
  }

  // put all masks into a precomp
  if (maskAddr.length > 1) {
    var items = [];
    for (var t = 0; t < masksForPreCompose.length; t++) {
      items.push(masksForPreCompose[t].index);
    }
    var newCompName = mask.name + '-composed';
    var newComp = compLayers.precompose(items, newCompName);
    newComp.parentFolder = parentFolder;
    var precomposedLayer = compLayers.byName(newCompName);
    precomposedLayer.enabled = false;

    // extend the size of the new comp (3 times larger)
    newComp.width *= 3;
    newComp.height *= 3;

    // set the parent of the layer to the text
    precomposedLayer.parent = parentLayer;
  }

  // make sure the structure of layers isn't messed up
  // (lines together, mask on top of the text layer)

}
