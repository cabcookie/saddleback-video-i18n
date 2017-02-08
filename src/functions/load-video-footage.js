'use strict';

export default function loadVideoFootage() {
    // search for a video file with the mininum duration
    // or for a Dynamic Link file
    var items = app.project.items;
    var mediaResult = [];
    for (var i = 1, il = items.length; i <= il; i++) {
        var it = items[i];
        if (it instanceof FootageItem) {
            if (it.hasAudio && it.hasVideo && it.duration > configuration().minimumSermonDurationInMin*60) {
                // when we found a video footage we push it into a result array
                // for further review later
                var ext = it.name.split('.');
                var typ = ext[ext.length-1].toUpperCase();
                var obj = {
                    fileType: typ,
                    fileName: it.name,
                    footage: it
                };
                if (typ === configuration().preferredSermonFormat) {
                    mediaResult.unshift(obj);
                } else {
                    mediaResult.push(obj);
                }
            }
        }
    }

    var continueCompCreation = true;
    if (mediaResult.length > 1) {
        // alert to user that it seems to be more than one sermon footage in the project
        // the user should decide if he wants to continue
        var message = 'More than one footage for sermon found\n';
        message += 'There seems to be more than one footage for the sermon. We recommend to go in with this footage:\n';
        message += mediaResult[0].fileName;
        message += '\n\nBut there are these other files found as well:\n';
        for (var m = 1, mrl = mediaResult.length; m < mrl; m++) {
            message += mediaResult[m].fileName;
            message += '\n';
        }
        message += '\nDo you want to continue with the recommended file?';
        continueCompCreation = confirm(message);
    }

    if (continueCompCreation) {
        return mediaResult[0].footage;
    } else {
        return false;
    }
}
