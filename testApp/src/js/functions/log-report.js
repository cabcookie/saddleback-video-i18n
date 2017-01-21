
export default function logReport(layers) {
  function formatText(key, obj) {
    var value = obj[key];
    var result = '';
    if (value === undefined) {
      return result;
    }
    result = key + ': ';
    if (typeof value === 'string') {
      result += value;
    } else {
      result += Math.round(value);
    }
    result += ' ';
    return result;
  }

  var logProps = ['name', 'startTime', 'inPoint', 'outPoint'];

  var result = '';
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];

    for (var j = 0; j < logProps.length; j++) {
      var prop = logProps[j];
      result += formatText(prop, layer);
    }

    var textLayers = layer.textLayers;
    for (var j = 0; j < textLayers.length; j++) {
      var textLayer = textLayers[j];
      if (textLayer.name === 'Text') {
        result += 'layer.' + formatText('name', textLayer);
        result += 'layer.' + formatText('sourceText', textLayer);
      }
    }

    result += '\n';
  }

  return result;
}
