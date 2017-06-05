// TODO Every function should have an error handling gh:3 id:11

function findItemIndexByName(searchName) {
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
