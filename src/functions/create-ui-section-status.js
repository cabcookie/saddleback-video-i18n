'use strict';

export default function createUISectionStatus(panel, posY, stdWidth, titlePos) {
    var pos = {
        pos: [10, posY, stdWidth+30, posY + 90],
        title: { pos: titlePos },
        status: { pos: [20, 30, stdWidth+20, 90]}
    };
    var section, X_WIDTH;

    section = panel.add("group", pos.pos);
    section.orientation = "row";
    section.title = section.add("statictext", pos.title.pos, "Status:");

    section.status = section.add("statictext", pos.status.pos, 'X', {multiline:true});
    X_WIDTH = section.status.preferredSize[0];
    section.status.preferredSize = [-1,-1];
    section.status.characters = ~~(stdWidth/X_WIDTH);
    section.status.preferredSize[1] = -1;

    return section;
}
