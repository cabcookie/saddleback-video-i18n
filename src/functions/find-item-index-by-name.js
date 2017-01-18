'use strict';

/**
 Find an "item" (comp) by name.
 
 @param searchName {String} - a search query.
 */
export default function findItemIndexByName(searchName) {
	var projLength = app.project.items.length,
		index = null;
	
	for (var i = 1; i <= projLength; i++) {
		var nameProperty = app.project.item(i).name;
		if (nameProperty == searchName) {
			index = i;
			break;
		}
	}
	return index;
}