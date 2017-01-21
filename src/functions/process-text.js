'use strict';

export default function processText(text, limit, prevArr) {
	if (text.length === 0) {
		return [];
	}

	limit = limit || 60;

	var retArr = prevArr || [],
		textArr = text.split(' ');

	if (textArr.length < limit) {
		retArr[retArr.length] = text;
		return [];
	}

	var cutText = textArr.splice(0, limit);
	retArr[retArr.length] = cutText.join(' ');

	processText(textArr.join(' '), limit, retArr);
	return retArr;
}
