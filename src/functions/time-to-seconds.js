'use strict';

/**
 Takes a min:sec:frames string and converts it into seconds
 
 @param timeStr {String} - the time to be converted in the format mm:ss:fr
 @param fps {float} - the frames per seconds to consider
 */
export default function timeToSeconds(timeStr, fps) {
	var time = timeStr.split(":");
	var seconds = parseInt(time[1]);
	seconds += parseInt(time[0]) * 60;
	seconds += parseInt(time[2]) / fps;
	return seconds;
}