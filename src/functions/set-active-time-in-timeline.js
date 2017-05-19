'use strict';

export default function setActiveTimeInTimeline(change, unit) {
    var comp = app.project.activeItem;
    var currTime = comp.time;
    var newTime = currTime + change / (unit === 'frames' ? comp.frameRate : 1);

    newTime = Math.min(newTime, comp.duration);
    newTime = Math.max(newTime, 0);

    comp.time = newTime;
}
