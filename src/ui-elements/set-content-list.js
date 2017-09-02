{
    try {
        importScript('errors/runtime-error');

    } catch (e) {
        throw new sbVideoScript.RuntimeError({
            func: "importScript's for setContentList",
            title: 'Error loading neccesary functions',
            message: e.message
        })
    }

    sbVideoScript.setContentList = function (groupContentList) {
        try {
            groupContentList = groupContentList || sbVideoScript.groupContentList;
            if (!groupContentList) { throw new Error("function called without a reference to the dropdownlist UI element") }
            sbVideoScript.groupContentList = groupContentList;
            groupContentList.maximumSize.height = 300;

            if (sbVideoScript.linesOfCSV && sbVideoScript.linesOfCSV.length > 1) {
                var colPos = sbVideoScript.columnPositions;
                var layers = colPos.layers;

                // Parse the first line to create headers for the listbox
                var firstLine = sbVideoScript.parse(sbVideoScript.linesOfCSV[0], colPos);
                var colHeaders = [];
                var maxHeaders = Math.min(firstLine.layers.length, 4);
                for (var l = 0; l < maxHeaders; l++) {
                    colHeaders.push(firstLine.layers[l].layerName);
                }

                if (sbVideoScript.contentList) { groupContentList.remove(sbVideoScript.contentList) }
                var contentList = groupContentList.add('listbox', undefined, '', {
                    numberOfColumns:maxHeaders, showHeaders:true, columnTitles:colHeaders
                });
                sbVideoScript.contentList = contentList;

                for (var i = 1; i < sbVideoScript.linesOfCSV.length; i++) {
                    var line = sbVideoScript.linesOfCSV[i];

                    if (line.length > 0) {
                        var parsedLine = sbVideoScript.parse(line, colPos);

                        var firstCol = parsedLine.layers[0].text;
                        var splitter = sbVideoScript.settings.splitSettings.seperatorForSplitting;

                        if (firstCol.length > 40) { firstCol = firstCol.substring(0,40) + splitter }

                        var lineItem = contentList.add('item', firstCol);

                        for (var l = 1; l < maxHeaders; l++) {
                            var item = parsedLine.layers[l].text;
                            if (item.length > 40) { item = item.substring(0,40) + splitter }
                            lineItem.subItems[l-1].text = item;
                        }
                    }
                }

                var pan = sbVideoScript.uiPanel;
                if (pan instanceof Window) {
                    pan.center();
                    pan.show();
                } else {
                    pan.layout.layout(true);
                    pan.layout.resize();
                }

            }
        } catch (e) {
            throw new sbVideoScript.RuntimeError({
                func: 'setContentList',
                title: 'Error loading the templates',
                message: e.message
            });
        }
    }
}
