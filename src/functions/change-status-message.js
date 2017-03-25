'use strict';

/**
The following lines provide information to test the function
*/

/**
This functions creates a status message with the expected font color
*/
export default function changeStatusMessage(statusObj, statusText, statusColor) {
    // var gr = statusObj.graphics;
    // gr.foregroundColor = gr.newPen(gr.PenType.SOLID_COLOR, statusColor, 1);
    statusObj.text = "[" + statusColor + "] " + statusText;
}
