'use strict';

// panel.csvData contains the following information:
// {
//     linesOfCSV: linesOfCSV,
//     columnPositions: columnPositions,
//     mediaFootage: mediaFootage,
//     templates: templates,
//     mainCompFolder: mainCompFolder
// }

export default function createSlides(panel, statusObj, statusColors) {
    return function () {
        try {
            if (!panel.csvData) {
                throw new RuntimeError({
                    func: "crSlides.onClick",
                    title: "No CSV data loaded yet. Please choose a CSV file with consistent data.",
                });
            }
            panel.resultComps = createCompsFromTextFile(panel.csvData);
            changeStatusMessage(statusObj, "Succesfully created compositions.", statusColors.GREEN_FONT, panel);
        } catch (e) {
            section.btnGrp.crSlides.enabled = false;
            changeStatusMessage(statusObj, e.message, statusColors.RED_FONT, panel);
        }
    };
}
