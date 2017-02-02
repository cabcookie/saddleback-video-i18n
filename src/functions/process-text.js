'use strict';

import configuration from './configuration';

export default function processText(text, limit, prevArr) {
	if (text.length === 0) {
		return [];
	}

	limit = limit || configuration().numberOfWordsBeforeSplitting;

	var retArr = prevArr || [],
		textArr = text.split(' '),
		seperator = configuration().seperatorForSplitting;

	if (textArr.length < limit) {
		retArr[retArr.length] = text;
		return [];
	}

	var cutText = textArr.splice(0, (limit - 10));
	cutText.push(seperator);
	textArr.unshift(seperator);

	retArr[retArr.length] = cutText.join(' ');

	processText(textArr.join(' '), limit, retArr);
	return retArr;
}
