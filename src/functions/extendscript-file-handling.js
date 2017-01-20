/**
 Opens the file and returns it as an array which represents the lines of the file.
 */

export default function createArrayFromFile() {
  var file = File.openDialog("Please choose the file with the relevant texts", "txt");
  var doc = new File(file);

	if (doc.exists) {
		var contentAry = [];
		file.open('r');
		while (!file.eof) {
			contentAry[contentAry.length] = file.readln();
		}
		file.close();
	}

  return contentAry;
}
