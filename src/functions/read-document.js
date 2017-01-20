'use strict';
/**
 Read a chosen text document, with line skipping option.

 @param file {Object} - the file chosen by the user.
 @param lineToSkip {Number} - how many lines to skip?
 */
export default function readDocument(contentAry, lineToSkip) {
	contentAry.splice(0, lineToSkip);

	var contentList = contentAry.join('_dpt_')
		.toString()
		.replace(new RegExp('_dpt_', 'g'), "\r");

	return {
		'contentAry': contentAry,
		'contentList': contentList
	}
}
