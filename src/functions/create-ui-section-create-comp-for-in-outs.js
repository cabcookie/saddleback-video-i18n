'use strict';

export default function createUISectionCreateCompForInOuts(panel, posY, stdWidth, titlePos, statusObj, statusColors) {
    var section;
    var templateNames = [];

    try {
        var pos = {
            pos: [10, posY, stdWidth+30, posY+230],
            title: { pos: titlePos },
            loadFile: { pos: [20, 30, stdWidth+20, 55] },
            selectTemplate: {
                pos: [20, 55, stdWidth+20, 105],
                title: { pos: titlePos },
                selectTemplateDrp: { pos: [0, 25, stdWidth, 50] }
            },
            selectContent: {
                pos: [20, 105, stdWidth+20, 225],
                title: { pos: titlePos },
                selectContentDrp: { pos: [0, 30, stdWidth, 55] },
                setInPosBtn: { pos: [0, 60, stdWidth/2-3, 85] },
                setOutPosBtn: { pos: [stdWidth/2+3, 60, stdWidth, 85] },
                createSlides: { pos: [0, 90, stdWidth, 115] }
            }
        };

        var templates = configuration().compositionTemplates;
        var youtubeTempName = configuration().compositionYouTubeNameExtension;
        for (var name in templates) {
            if (name.indexOf(youtubeTempName) === -1) {
                templateNames.push(name);
            }
        }

        panel.setContentLines = function (contentLines) {
            if (section.selectContent.selectContentDrp) {
                section.selectContent.selectContentDrp.removeAll();
                for (var i = 0; i < contentLines.length; i++) {
                    section.selectContent.selectContentDrp.add('item', contentLines[i]);
                }
            } else {
                section.selectContent.selectContentDrp = section.selectContent.add("dropdownlist", pos.selectContent.selectContentDrp.pos, contentLines);
            }
        }

        section = panel.add("group", pos.pos);
        section.orientation = "row";
        section.title = section.add("statictext", pos.title.pos, "Set In/Out Times");
        section.loadFile = section.add("button", pos.loadFile.pos, "Load content...");

        section.selectTemplate = section.add("group", pos.selectTemplate.pos);
        section.selectTemplate.orientation = "row";
        section.selectTemplate.title = section.selectTemplate.add("statictext", pos.selectTemplate.title.pos, "Select template");
        section.selectTemplate.selectTemplateDrp = section.selectTemplate.add("dropdownlist", pos.selectTemplate.selectTemplateDrp.pos, templateNames);

        section.selectContent = section.add("group", pos.selectContent.pos);
        section.selectContent.orientation = "row";
        section.selectContent.title = section.selectContent.add("statictext", pos.selectContent.title.pos, "Select content & In/Out");
        panel.setContentLines([]);

        section.selectContent.setInPosBtn = section.selectContent.add("button", pos.selectContent.setInPosBtn.pos, "Set In Pos");
        section.selectContent.setOutPosBtn = section.selectContent.add("button", pos.selectContent.setOutPosBtn.pos, "Set Out Pos");
        section.selectContent.setOutPosBtn.enabled = false;

        section.selectContent.createSlides = section.selectContent.add("button", pos.selectContent.createSlides.pos, "Create slides...");
        section.selectContent.createSlides.enabled = false;

        // section.createCompBtn.onClick = createCompForInOuts(panel, section);
        section.loadFile.onClick = chooseCSVFile(panel, section, section.selectContent.createSlides, statusObj, statusColors);
        section.selectContent.setInPosBtn.onClick = setInOutLayer('setInPosBtn', 'In', 'Out', section.selectContent, section.selectTemplate.selectTemplateDrp, section.selectContent.selectContentDrp);
        section.selectContent.setOutPosBtn.onClick = setInOutLayer('setOutPosBtn', 'Out', 'In', section.selectContent, section.selectTemplate.selectTemplateDrp, section.selectContent.selectContentDrp);
        section.selectContent.createSlides.onClick = createSlides(panel, statusObj, statusColors);
    } catch (e) {
        alert(e.message);
    }
    return section;
}
