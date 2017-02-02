'use strict';

/**
This function is to emulate a config file for now
*/
export default function configuration() {
    var settings = {
        compositionYouTubeNameExtension: ' YouTube',
        compositionTemplates: [{
            name: 'Lower Third',
            youtubeAlternative: true,
            isSizeAlternative: true,
            sizeAlternative: 'Full Screen'
        }, {
            name: 'Full Screen',
            youtubeAlternative: true,
            isSizeAlternative: false
        }, {
            name: 'Scripture',
            youtubeAlternative: false,
            isSizeAlternative: false
        }, {
            name: 'Two Columns',
            youtubeAlternative: true,
            isSizeAlternative: false
        }],
        parentFolderFootageExtensions: " Footage [Script Results]",
        requiredFieldsInCSV: ['startTime', 'endTime', 'composition'],
        standardCSVDelimiter: "\t",
        maskLayerNamePrefix: 'Mask',
        lineLayerNamePrefix: 'Line',
        fillInDelimiter: '[]',
        delimiterForNewLines: '{n}',
        maximumFontSizeChange: -0.10,
        animationProtectionTime: 2,
        tolerancePxForMaskPositioning: 4,
        preComposedMaskLayerExtension: '-composed-',
        columnNameToProcessForSplitting: 'Text',
        numberOfWordsBeforeSplitting: 80,
        seperatorForSplitting: '...',
        seperatorForTimeStrings: ":",
    };
    return settings;
}
