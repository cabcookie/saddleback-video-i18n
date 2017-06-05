// TODO Every function should have an error handling gh:3 id:30

function chooseCSVFile(panel, section, createSlidesButton, statusObj, statusColors) {
    return function () {
        try {
            createCompForInOuts(panel, section);
            panel.csvData = loadAndCheckFilesAndTemplates();

            var tcConf = configuration().mainCompositionsToBuild.compositionsConfig[0];
            var colPos = cloneColumnPositionsForMainComp(panel.csvData.columnPositions, tcConf);

            var contentLines = [];
            for (var i = 1; i < panel.csvData.linesOfCSV.length; i++) {
                var item = '';
                var currentLine = panel.csvData.linesOfCSV[i];
                if (currentLine.length > 0) {
                    var parsedContentLine = parse(currentLine, colPos);

                    for (var l = 0; l < parsedContentLine.layers.length; l++) {
                        var lay = parsedContentLine.layers[l];
                        if (lay.layerName.indexOf(' 1') > 0 && lay.text.length > 0) {
                            if (lay.text.length > 40) {
                                item += lay.text.substring(0, 40) + '… // ';
                            } else {
                                item += lay.text + ' // ';
                            }
                        }
                    }
                    contentLines.push(item);
                }
            }
            panel.setContentLines(contentLines);

            createSlidesButton.enabled = true;
            changeStatusMessage(statusObj, "Succesfully loaded CSV content.", statusColors.GREEN_FONT, panel);
        } catch (e) {
            createSlidesButton.enabled = false;
            alert(e.message);
            if (e instanceof RuntimeError) {
                changeStatusMessage(statusObj, e.message, statusColors.RED_FONT, panel);
            } else {
                throw e;
            }
        }
    }
}
