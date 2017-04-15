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
        var btnWidth, titlePos, statusWidth;
        btnWidth = 140;
        titlePos = [0, 0, btnWidth, 30];
        statusWidth = btnWidth * 2;
        this.settings = {
            uiNoOfSptBtns: 11,
            uiPositions: {
                grStat: {
                    // value of type String means to take the Y2 position of the named attribute
                    // as a basis to calculate position
                    pos: [10, 0, statusWidth+30, "status"],
                    title: {
                        pos: titlePos,
                    },
                    status: {
                        pos: [20, 30, statusWidth+20,90],
                    },
                },
                grCrLay: {
                    pos: [10, "grStat", btnWidth+30, "btnGrp"],
                    title: {
                        pos: titlePos,
                    },
                    btnGrp: {
                        pos: [20, 30, btnWidth+20, "blank"],
                        chFile: {
                            pos: [0, 0, btnWidth, 25],
                        },
                        crSlides: {
                            pos: [0, 30, btnWidth, 55],
                        },
                        blank: {
                            pos: [0, 55, 10, 60],
                        },
                    },
                },
                grSplLay: {
                    pos: [10, "grCrLay", btnWidth+30, "btnGrp"],
                    title: {
                        pos: titlePos,
                    },
                    btnGrp: {
                        pos: [20, 30, btnWidth+20, "splBtnGrp"],
                        title: {
                            pos: titlePos,
                        },
                        lArr: {
                            pos: [0, 25, btnWidth/2-2, 50],
                        },
                        rArr: {
                            pos: [btnWidth/2+2, 25, btnWidth, 50],
                        },
                        splBtnGrp: {
                            pos: [0, 60, btnWidth, 'l11'],
                            title: {
                                pos: titlePos
                            },
                            l1: {
                                pos: [0, 30, btnWidth, 30+25],
                            },
                            l2: {
                                pos: [0, 60, btnWidth, 60+25],
                            },
                            l3: {
                                pos: [0, 90, btnWidth, 90+25],
                            },
                            l4: {
                                pos: [0, 120, btnWidth, 120+25],
                            },
                            l5: {
                                pos: [0, 150, btnWidth, 150+25],
                            },
                            l6: {
                                pos: [0, 180, btnWidth, 180+25],
                            },
                            l7: {
                                pos: [0, 210, btnWidth, 210+25],
                            },
                            l8: {
                                pos: [0, 240, btnWidth, 240+25],
                            },
                            l9: {
                                pos: [0, 270, btnWidth, 270+25],
                            },
                            l10: {
                                pos: [0, 300, btnWidth, 300+25],
                            },
                            l11: {
                                pos: [0, 330, btnWidth, 330+25],
                            },
                        },
                    },
                },
            },
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
            requiredFieldsInCSV: ['startTime', 'endTime', 'composition'],
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
