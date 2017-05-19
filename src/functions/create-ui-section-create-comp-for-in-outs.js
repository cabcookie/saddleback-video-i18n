'use strict';

export default function createUISectionCreateCompForInOuts(panel, posY, stdWidth, titlePos) {
    var section;
    var templateNames = [];

    var pos = {
        pos: [10, posY, stdWidth+30, posY+150],
        title: { pos: titlePos },
        createCompGrp: {
            pos: [20, 30, stdWidth+20, 60],
            createCompBtn: { pos: [0, 0, stdWidth, 25] }
        },
        setInOutsGrp: {
            pos: [20, 60, stdWidth+20, 150],
            title: { pos: titlePos },
            selectTemplateDrp: { pos: [0, 30, stdWidth, 55] },
            setInPosBtn: { pos: [0, 60, stdWidth/2-3, 85] },
            setOutPosBtn: { pos: [stdWidth/2+3, 60, stdWidth, 85] }
        }
    };

    var templates = configuration().compositionTemplates;
    var youtubeTempName = configuration().compositionYouTubeNameExtension;
    for (var name in templates) {
        if (name.indexOf(youtubeTempName) === -1) {
            templateNames.push(name);
        }
    }

    section = panel.add("group", pos.pos);
    section.orientation = "row";
    section.title = section.add("statictext", pos.title.pos, "Set In/Out Times");
    section.createCompGrp = section.add("group", pos.createCompGrp.pos);
    section.createCompGrp.orientation = "row";
    section.createCompGrp.createCompBtn = section.createCompGrp.add("button", pos.createCompGrp.createCompBtn.pos, "Create Composition");
    section.setInOutsGrp = section.add("group", pos.setInOutsGrp.pos);
    section.setInOutsGrp.orientation = "row";
    section.setInOutsGrp.title = section.setInOutsGrp.add("statictext", pos.setInOutsGrp.title.pos, "Select template & In/Out");
    section.setInOutsGrp.selectTemplateDrp = section.setInOutsGrp.add("dropdownlist", pos.setInOutsGrp.selectTemplateDrp.pos, templateNames);
    section.setInOutsGrp.setInPosBtn = section.setInOutsGrp.add("button", pos.setInOutsGrp.setInPosBtn.pos, "Set In Pos");
    section.setInOutsGrp.setOutPosBtn = section.setInOutsGrp.add("button", pos.setInOutsGrp.setOutPosBtn.pos, "Set Out Pos");

    section.setInOutsGrp.setOutPosBtn.enabled = false;
    section.setInOutsGrp.numberOfLayers = 0;

    section.createCompGrp.createCompBtn.onClick = createCompForInOuts(panel, section);
    section.setInOutsGrp.setInPosBtn.onClick = setInOutLayer('setInPosBtn', 'In', 'Out', section.setInOutsGrp, section.setInOutsGrp.selectTemplateDrp);
    section.setInOutsGrp.setOutPosBtn.onClick = setInOutLayer('setOutPosBtn', 'Out', 'In', section.setInOutsGrp, section.setInOutsGrp.selectTemplateDrp);

    return section;
}
