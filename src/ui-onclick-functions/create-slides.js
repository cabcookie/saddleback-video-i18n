// TODO Every function should have an error handling gh:3 id:52

// panel.csvData contains the following information:
// {
//     linesOfCSV: linesOfCSV,
//     columnPositions: columnPositions,
//     mediaFootage: mediaFootage,
//     templates: templates,
//     mainCompFolder: mainCompFolder
// }

function createSlides(panel, statusObj, statusColors) {
    return function () {
        try {
            if (!panel.csvData) {
                throw new RuntimeError({
                    func: "crSlides.onClick",
                    title: "No CSV data loaded yet. Please choose a CSV file with consistent data.",
                });
            }

            panel.resultComps = createMainCompsFromConfig(panel.csvData);
            changeStatusMessage(statusObj, "Succesfully created compositions.", statusColors.GREEN_FONT, panel);
        } catch (e) {
            section.btnGrp.crSlides.enabled = false;
            alert(e.message);
            changeStatusMessage(statusObj, e.message, statusColors.RED_FONT, panel);
        }
    };
}
