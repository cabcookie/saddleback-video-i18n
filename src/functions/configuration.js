'use strict';

/**
This function is to emulate a config file for now
*/
export default function configuration() {
    var toCreate = true;
    if ("settings" in this) {
        if ("compositionTemplates" in this.settings) {
            toCreate = false;
        }
    }
    if (toCreate) {
        this.settings = {
            compositionYouTubeNameExtension: ' YouTube',
            compositionTemplates: {
                'Lower Third': {
                    youtubeAlternative: true,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen'
                },
                'Lower Third YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: true,
                    sizeAlternative: 'Full Screen YouTube'
                },
                'Full Screen': {
                    youtubeAlternative: true,
                    isSizeAlternative: true
                },
                'Full Screen YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: false
                },
                'Two Columns': {
                    youtubeAlternative: true,
                    isSizeAlternative: true
                },
                'Two Columns YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: false
                },
                'Scripture': {
                    youtubeAlternative: true,
                    isSizeAlternative: false,
                    splitLongTexts: true
                },
                'Scripture YouTube': {
                    youtubeAlternative: false,
                    isSizeAlternative: false,
                    splitLongTexts: true
                }
            },
            splitSettings: {
                splitPositions: {
                    allTexts: ['. ', '? ', '! ', '; ', ', ', ' - ', ' – ', '…'],
                    'Text German': ['und'],
                    'Text English': ['and', 'than', 'then'],
                },
                seperatorForSplitting: '…',
                markerForSplitPositions: '*{}*',
                bracketsForLayerCounting: '{#}',
                markSplittedCompsWith: ' [splitted layers]',
                animationProtectionTime: 0.2,
            },
            compositionNameForInOuts: 'Comp for In-Outs',
            folderNameForTrash: 'ZZZ Temporary Items For Trash',
            mainCompositionsToBuild: {
                folderName: 'Sermon  - DELETE BEFORE NEXT SCRIPT START',
                compositionsConfig: [{
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
            statusColors: {
                RED_FONT: "ERR",
                GREEN_FONT: "SUC",
                YELLOW_FONT: "WARN"
            },
            minimumSermonDurationInMin: 10,
            markersNeededInTemplateComps: 2,
            preferredSermonFormat: 'PRPROJ',
            parentFolderFootageExtensions: " Footage [Script Results]",
            requiredFieldsInCSV: [],
            standardCSVDelimiter: "\t",
            maskLayerNamePrefix: 'Mask',
            lineLayerNamePrefix: 'Line',
            fillInDelimiter: '[]',
            delimiterForNewLines: '{n}',
            maximumFontSizeChange: -0.15,
            animationProtectionTime: 2,
            tolerancePxForMaskPositioning: 4,
            preComposedMaskLayerExtension: '-composed-',
            timeSeperator: ';',
        };
        var replaceWithYoutube = ['Full Screen', 'Two Columns'];
        for (var i = 0, l = replaceWithYoutube.length; i < l; i++) {
            var name = replaceWithYoutube[i];
            this.settings.compositionTemplates[name].sizeAlternative = name + this.settings.compositionYouTubeNameExtension;
        }
    }
    return this.settings;
}
