'use strict';

export default function chooseCSVFile(panel, createSlidesButton, statusObj, statusColors) {
    return function () {
        try {
            panel.csvData = loadAndCheckFilesAndTemplates();
            createSlidesButton.enabled = true;
            changeStatusMessage(statusObj, "Succesfully loaded CSV content.", statusColors.GREEN_FONT, panel);
        } catch (e) {
            createSlidesButton.enabled = false;
            if (e instanceof RuntimeError) {
                changeStatusMessage(statusObj, e.message, statusColors.RED_FONT, panel);
            } else {
                throw e;
            }
        }
    }
}
