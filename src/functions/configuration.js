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
                columnsToSwap: {
                    'German': 1,
                    'English': 2
                },
                audioSettings: {
                    'Left Level': 100,
                    'Right Level': 100,
                    'Left Pan': 100,
                    'Right Pan': -100
                }
            }, {
                name: 'English Service',
                columnsToSwap: {
                    'German': 2,
                    'English': 1
                },
                audioSettings: {
                    'Left Level': 100,
                    'Right Level': 100,
                    'Left Pan': -100,
                    'Right Pan': 100
                }
            }, {
                name: 'German YouTube',
                columnsToSwap: {
                    'German': 1
                },
                audioSettings: {
                    'Left Level': 0,
                    'Right Level': 100,
                    'Left Pan': 0,
                    'Right Pan': 0
                }
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
