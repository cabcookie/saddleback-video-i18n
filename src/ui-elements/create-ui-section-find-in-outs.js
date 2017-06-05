// TODO Every function should have an error handling gh:3 id:55

function createUISectionFindInOuts(panel, posY, stdWidth, titlePos) {
    var section;
    var pos = {
        pos: [10, posY, stdWidth+50, posY+60],
        title: { pos: titlePos },
        btnGrp: {
            pos: [0, 30, stdWidth+40, 60],
            rewSecs10: { pos: [0, 0, 30, 22] },
            rewSecs1: { pos: [30, 0, 60, 22] },
            rewFrm1: { pos: [60, 0, 90, 22] },
            forwFrm1: { pos: [90, 0, 120, 22] },
            forwSecs1: { pos: [120, 0, 150, 22] },
            forwSecs10: { pos: [150, 0, 180, 22] }
        }
    };

    section = panel.add("group", pos.pos);
    section.orientation = "row";
    section.title = section.add("statictext", pos.title.pos, "Find In & Out Positions");
    section.btnGrp = section.add("group", pos.btnGrp.pos);
    section.btnGrp.orientation = "row";
    section.btnGrp.rewSecs10 = section.btnGrp.add("iconbutton", pos.btnGrp.rewSecs10.pos, File("./media_controls/rewSecs10.png"));
    section.btnGrp.rewSecs1 = section.btnGrp.add("iconbutton", pos.btnGrp.rewSecs1.pos, File("./media_controls/rewSecs1.png"));
    section.btnGrp.rewFrm1 = section.btnGrp.add("iconbutton", pos.btnGrp.rewFrm1.pos, File("./media_controls/rewFrm1.png"));
    section.btnGrp.forwFrm1 = section.btnGrp.add("iconbutton", pos.btnGrp.forwFrm1.pos, File("./media_controls/forwFrm1.png"));
    section.btnGrp.forwSecs1 = section.btnGrp.add("iconbutton", pos.btnGrp.forwSecs1.pos, File("./media_controls/forwSecs1.png"));
    section.btnGrp.forwSecs10 = section.btnGrp.add("iconbutton", pos.btnGrp.forwSecs10.pos, File("./media_controls/forwSecs10.png"));

    section.btnGrp.rewSecs10.onClick = function () { setActiveTimeInTimeline(-10, 'seconds') }
    section.btnGrp.rewSecs1.onClick = function () { setActiveTimeInTimeline(-1, 'seconds') }
    section.btnGrp.rewFrm1.onClick = function () { setActiveTimeInTimeline(-1, 'frames') }
    section.btnGrp.forwFrm1.onClick = function () { setActiveTimeInTimeline(1, 'frames') }
    section.btnGrp.forwSecs1.onClick = function () { setActiveTimeInTimeline(1, 'seconds') }
    section.btnGrp.forwSecs10.onClick = function () { setActiveTimeInTimeline(10, 'seconds') }

    panel.changeFindInOutButtonsState = function (state) {
        section.btnGrp.rewSecs10.enabled = state;
        section.btnGrp.rewSecs1.enabled = state;
        section.btnGrp.rewFrm1.enabled = state;
        section.btnGrp.forwFrm1.enabled = state;
        section.btnGrp.forwSecs1.enabled = state;
        section.btnGrp.forwSecs10.enabled = state;
    }

    return section;
}
