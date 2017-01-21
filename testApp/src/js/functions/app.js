import clone from '../../../../src/functions/clone';

export default function appObj(firstLine) {
  var requiredFields = ['startTime', 'endTime', 'composition'];
	// var textLayers = parseFirstLine(firstLine, requiredFields).layers;

  var templates = ['Lower Third', 'Lower Third YouTube', 'Full Screen', 'Scripture'];

  var comps = [];

  // TODO: define targetComp
  var targetComp = {
    frameRate: 29.97,
    name: 'English Service',
    layers: comps
  };

  var addComp = function (comp) {
    var newComp = clone(comp);
    newComp.index = 0;
    newComp.textLayers = comp.textLayers;
    newComp.moveToBeginning = function () {
      var oldIndex = newComp.index;
      comps.splice(newComp.index,1);
      comps.unshift(newComp);
      for (var i = 0; i <= comps.oldIndex; i++) {
        comps[i].index = i;
      }
      return;
    };
    comps.unshift(newComp);
    for (var i = 1; i < comps.length; i++) {
      comps[i].index = i;
    }
    return newComp;
  }
  targetComp.layers.add = addComp;

  var getDuplicateFunc = function (i) {
    var duplicate = function () {
      // auch comp
      var newComp = {
        name: templates[i],
        // parentFolder: 'wichtig?',
        duration: 40,
        textLayers: []
      };

      var findTextLayerByName = function (layerName) {
        var textLayer = {
          name: layerName,
          sourceText: layerName
        };
        var changeText = function (newText) {
          textLayer.sourceText = newText;
        };
        textLayer.property = function (propName) {
          return {
            setValue: changeText
          };
        };
        var textLayers = newComp.textLayers;
        textLayers[textLayers.length] = textLayer;
        return textLayer;
      };

      newComp.layer = findTextLayerByName;
      return newComp;
    }
    return duplicate;
  };

  var duplicates = [];
  for (var i = 0; i < templates.length; i++) {
    var template = templates[i];
    duplicates[i] = {
      duplicate: getDuplicateFunc(i)
    };
  }

  var app = {
    project: {
      activeItem: targetComp,
      items: duplicates,
      item: function (i) {
        return {
          name: templates[i]
        };
      }
    }
  };

  app.project.items.addFolder = function (parentFolderName) {
    // TODO: was muss geliefert werden?
    var parentFolder = parentFolderName;
    return parentFolder;
  }

  return app;
}
