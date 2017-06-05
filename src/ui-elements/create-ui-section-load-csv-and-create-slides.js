// TODO Every function should have an error handling gh:3 id:60

// panel.csvData contains the following information:
// {
//     linesOfCSV: linesOfCSV,
//     columnPositions: columnPositions,
//     mediaFootage: mediaFootage,
//     templates: templates,
//     mainCompFolder: mainCompFolder
// }

function createUISectionLoadCSVAndCreateSlides(panel, posY, stdWidth, titlePos, statusObj, statusColors) {
    var section;
    var pos = {
        pos: [10, posY, stdWidth+30, posY+90],
        title: { pos: titlePos },
        btnGrp: {
            pos: [20, 30, stdWidth+20, 90],
            chFile: {
                pos: [0, 0, stdWidth, 25],
            },
            crSlides: {
                pos: [0, 30, stdWidth, 55],
            },
            blank: {
                pos: [0, 55, 10, 60],
            }
        }
    };

    section = panel.add("group", pos.pos);
    section.orientation = "row";
    section.title = section.add("statictext", pos.title.pos, "Create Slides & Layers");
    section.btnGrp = section.add("group", pos.btnGrp.pos);
    section.btnGrp.orientation = "row";
    section.btnGrp.chFile = section.btnGrp.add("button", pos.btnGrp.chFile.pos, "Choose File...");
    section.btnGrp.crSlides = section.btnGrp.add("button", pos.btnGrp.crSlides.pos, "Create Slides");

    section.btnGrp.crSlides.enabled = false;

    section.btnGrp.chFile.onClick = chooseCSVFile(panel, section.btnGrp.crSlides, statusObj, statusColors);
    section.btnGrp.crSlides.onClick = createSlides(panel, statusObj, statusColors);

    return section;
}
