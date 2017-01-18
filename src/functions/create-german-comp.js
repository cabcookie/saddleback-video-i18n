'use strict';
/**
 Duplicate an existing "template" composition and return the
 new one. It searches by name, as opposed to index to make things easier.
 
 @param originalCompName {String} - the name of the comp to duplicate.
 @param lineNumber {String} - the line number of the file is used to update the new comp name
 @param parentFolder {Object} - the folder where the new comp should be created
 */

import findItemIndexByName from './find-item-index-by-name';

export default function createGermanComp(originalCompName, lineNumber, parentFolder) {
	if (originalCompName === 'Composition') {
		return;
	}
	
	var index = findItemIndexByName(originalCompName);
	var newComp = app.project.items[index].duplicate();
	newComp.name = lineNumber + ' ' + originalCompName;
	newComp.parentFolder = parentFolder;
	return newComp;
}