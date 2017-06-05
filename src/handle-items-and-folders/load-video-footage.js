// TODO Every function should have an error handling gh:3 id:10

function loadVideoFootage(minDuration) {
    // search for a video file with the mininum duration
    // or for a Dynamic Link file
    var items = app.project.items;
    minDuration = minDuration*60;
    var mediaResult = [];
    for (var i = 1, il = items.length; i <= il; i++) {
        var it = items[i];
        if (it instanceof FootageItem) {
            if (it.hasAudio && it.hasVideo && it.duration > minDuration) {
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

    var continueCompCreation = false;
    var message;

    if (mediaResult.length == 1) {
        continueCompCreation = true;
    } else if (mediaResult.length > 1) {
        // alert to user that it seems to be more than one sermon footage in the project
        // the user should decide if he wants to continue
        message = 'More than one footage for sermon found\n';
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

    if (!continueCompCreation) {
        throw new RuntimeError({
            func: "loadVideoFootage",
            title: "No Media Footage found",
            message: "Unfortunately there was no video file found with a minimum duration of %1 Minutes. Please review your footage and import the video before running the script again.",
            params: [
                minimumSermonDurationInMin
            ]
        });
    }

    return mediaResult[0].footage;
}
