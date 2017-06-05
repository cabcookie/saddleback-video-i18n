// TODO Every function should have an error handling gh:3 id:9
// TODO: Simplify statusMessage function and make it the central info hub and the error alerter id:8

/**
This functions creates a status message with the expected font color
*/
function changeStatusMessage(statusObj, statusText, statusColor, uiPanel) {
    // var gr = statusObj.graphics;
    // var ui = uiPanel.graphics;
    // gr.foregroundColor = ui.newPen(ui.BrushType.SOLID_COLOR, [0,0,0], 1);
    statusObj.text = "[" + statusColor + "] " + statusText;
}
