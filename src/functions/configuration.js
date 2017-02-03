'use strict';

/**
This function is to emulate a config file for now
*/
export default function configuration() {
    var settings = {
        compositionYouTubeNameExtension: ' YouTube',
        compositionTemplates: {
            'Lower Third': {
                youtubeAlternative: true,
                isSizeAlternative: true,
                sizeAlternative: 'Full Screen'
            },
            'Full Screen': {
                youtubeAlternative: true,
                isSizeAlternative: true
            },
            'Full Screen YouTube': {
                youtubeAlternative: false,
                isSizeAlternative: false
            },
            'Scripture': {
                youtubeAlternative: false,
                isSizeAlternative: false
            },
            'Two Columns': {
                youtubeAlternative: true,
                isSizeAlternative: false
            }
        },
        mainCompositionsToBuild: {
            folderName: 'Sermon',
            compositionsConfig: [{
                name: 'German Service',
                'German': 1,
                'English': 2
            }, {
                name: 'English Service',
                'German': 2,
                'English': 1
            }, {
                name: 'German YouTube',
                'German': 1
            }],
            dateFormat: 'dd.mm.yyyy'
        },
        minimumSermonDurationInMin: 10,
        preferredSermonFormat: 'PRPROJ',
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
    settings.compositionTemplates['Full Screen'].isSizeAlternative = 'Full Screen' + settings.compositionYouTubeNameExtension;
    return settings;
}
