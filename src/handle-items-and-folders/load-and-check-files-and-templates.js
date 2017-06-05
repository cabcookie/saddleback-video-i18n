// TODO Every function should have an error handling gh:3 id:26

function loadAndCheckFilesAndTemplates() {
	// prepare some variables
	this.settings = {};
	var message;
	var linesOfCSV, columnPositions;
	var templates, templatesWithoutMarkers;
	var mediaFootage, minimumSermonDurationInMin;

	// Open a dialog and ask for a file and return an array of lines of that file.
	linesOfCSV = createArrayFromFile();

	// try to parse the file to retrieve the composition informations
	// define the required fields in the CSV file for the script to work properly
	// now parse the first line with the title names to retrieve position in text file
	columnPositions = parseFirstLine(linesOfCSV[0], configuration().requiredFieldsInCSV);

	// load the original video file
	minimumSermonDurationInMin = configuration().minimumSermonDurationInMin;
	mediaFootage = loadVideoFootage(minimumSermonDurationInMin);

	// iterate through all composition templates and
	// find markers for in and out animation
	templates = loadAllExpectedTemplates();
	checkMarkersInTemplates(templates);

	// and identify the number of lines per text layer and store them in the settings
	checkLineNumsInTemplates(templates);

	// create a folder which will contain the expected main compositions that
	// will be rendered later and all computed compositions in a sub-footage folder
	mainCompFolder = createMainCompFolder();

	return {
		linesOfCSV: linesOfCSV,
		columnPositions: columnPositions,
		mediaFootage: mediaFootage,
		templates: templates,
		mainCompFolder: mainCompFolder
	};
}
