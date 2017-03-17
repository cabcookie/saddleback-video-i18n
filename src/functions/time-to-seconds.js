'use strict';

import configuration from './configuration';

/**
 Takes a min:sec:frames string and converts it into seconds

 @param timeStr {String} - the time to be converted in the format mm:ss:fr
 @param fps {float} - the frames per seconds to consider
 */
export default function timeToSeconds(timeStr, fps) {
	var time,seconds=0;
	time = timeStr.split(configuration().timeSeperator);

	seconds += parseInt(time[0]) * 60 * 60; // hours
	seconds += parseInt(time[1]) * 60; // minutes
	seconds += parseInt(time[2]); // seconds
	seconds += parseInt(time[3]) / fps; // frames
	return seconds;
}
