// TODO Every function should have an error handling gh:3 id:58

// panel.csvData contains the following information:
// {
//     linesOfCSV: linesOfCSV,
//     columnPositions: columnPositions,
//     mediaFootage: mediaFootage,
//     templates: templates,
//     mainCompFolder: mainCompFolder
// }

function createUISectionSplitTextLayers(panel, posY, standardWidth, titlePos, statusObj, statusColors) {
    var section;
    var pos = {
        pos: [10, posY, standardWidth+30, posY+450],
        title: { pos: titlePos },
        btnGrp: {
            pos: [20, 30, standardWidth+20, 450],
            title: { pos: titlePos },
            lArr: { pos: [0, 25, standardWidth/2-2, 50] },
            rArr: { pos: [standardWidth/2+2, 25, standardWidth, 50] },
            splBtnGrp: {
                pos: [0, 60, standardWidth, 420],
                title: { pos: titlePos },
                l1: { pos: [0, 30, standardWidth, 30+25] },
                l2: { pos: [0, 60, standardWidth, 60+25] },
                l3: { pos: [0, 90, standardWidth, 90+25] },
                l4: { pos: [0, 120, standardWidth, 120+25] },
                l5: { pos: [0, 150, standardWidth, 150+25] },
                l6: { pos: [0, 180, standardWidth, 180+25] },
                l7: { pos: [0, 210, standardWidth, 210+25] },
                l8: { pos: [0, 240, standardWidth, 240+25] },
                l9: { pos: [0, 270, standardWidth, 270+25] },
                l10: { pos: [0, 300, standardWidth, 300+25] },
                l11: { pos: [0, 330, standardWidth, 330+25] }
            }
        }
    };

    NULL_SIZE = [0,0];
    NO_SPLIT_BTNS = 11;

    section = panel.add("group", pos.pos);
    section.orientation = "row";
    section.title = section.add("statictext", pos.title.pos, "Check Layers");
    section.btnGrp = section.add("group", pos.btnGrp.pos);
    section.btnGrp.orientation = "row";
    section.btnGrp.title = section.btnGrp.add("statictext", pos.btnGrp.title.pos, "search directions:");
    section.btnGrp.lArr = section.btnGrp.add("button", pos.btnGrp.lArr.pos, "<");
    section.btnGrp.rArr = section.btnGrp.add("button", pos.btnGrp.rArr.pos, ">");
    section.btnGrp.splBtnGrp = section.btnGrp.add("group", pos.btnGrp.splBtnGrp.pos);
    section.btnGrp.splBtnGrp.title = section.btnGrp.splBtnGrp.add("statictext", pos.btnGrp.splBtnGrp.title.pos, "Split at Cursor...");

    splBtnGrp = section.btnGrp.splBtnGrp;
    for (var i = 1; i <= NO_SPLIT_BTNS; i++) {
        l = splBtnGrp['l'+i] = splBtnGrp.add("button", pos.btnGrp.splBtnGrp['l'+i].pos, "Blank Button "+i);
    }
    splBtnGrp.visible = false;
    splBtnGrp.maximumSize = NULL_SIZE;

    section.btnGrp.lArr.onClick = searchItemInTimeline("lArr.onClick", -1, statusObj, panel, splBtnGrp, statusColors);
    section.btnGrp.rArr.onClick = searchItemInTimeline("rArr.onClick",  1, statusObj, panel, splBtnGrp, statusColors);

    return section;
}
