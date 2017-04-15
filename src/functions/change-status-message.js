'use strict';

/**
The following lines provide information to test the function
*/

/**
This functions creates a status message with the expected font color
*/
export default function changeStatusMessage(statusObj, statusText, statusColor, uiPanel) {
    // var gr = statusObj.graphics;
    // var ui = uiPanel.graphics;
    // gr.foregroundColor = ui.newPen(ui.BrushType.SOLID_COLOR, [0,0,0], 1);
    statusObj.text = "[" + statusColor + "] " + statusText;
}
