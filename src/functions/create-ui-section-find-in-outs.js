'use strict';

export default function createUISectionFindInOuts(panel, posY, stdWidth, titlePos) {
    var section;
    var pos = {
        pos: [10, posY, stdWidth+30, posY+150],
        title: { pos: titlePos },
        prevBtnGrp: {
            pos: [20, 30, stdWidth+20, 90],
            title: { pos: titlePos },
            prev10s: { pos: [0, 30, 44, 55] },
            prev1s: { pos: [48, 30, 92, 55] },
            prev1f: { pos: [96, 30, 140, 55] }
        },
        nextBtnGrp: {
            pos: [20, 90, stdWidth+20, 150],
            title: { pos: titlePos },
            next1f: { pos: [0, 30, 44, 55] },
            next1s: { pos: [48, 30, 92, 55] },
            next10s: { pos: [96, 30, 140, 55] }
        }
    };

    section = panel.add("group", pos.pos);
    section.orientation = "row";
    section.title = section.add("statictext", pos.title.pos, "Find In & Out Positions");
    section.prevBtnGrp = section.add("group", pos.prevBtnGrp.pos);
    section.prevBtnGrp.orientation = "row";
    section.prevBtnGrp.title = section.prevBtnGrp.add("statictext", pos.prevBtnGrp.title.pos, "go back in time");
    section.prevBtnGrp.prev10s = section.prevBtnGrp.add("button", pos.prevBtnGrp.prev10s.pos, "<10s");
    section.prevBtnGrp.prev1s = section.prevBtnGrp.add("button", pos.prevBtnGrp.prev1s.pos, "<1s");
    section.prevBtnGrp.prev1f = section.prevBtnGrp.add("button", pos.prevBtnGrp.prev1f.pos, "<1f");
    section.nextBtnGrp = section.add("group", pos.nextBtnGrp.pos);
    section.nextBtnGrp.orientation = "row";
    section.nextBtnGrp.title = section.nextBtnGrp.add("statictext", pos.nextBtnGrp.title.pos, "go forward in time");
    section.nextBtnGrp.next1f = section.nextBtnGrp.add("button", pos.nextBtnGrp.next1f.pos, ">1f");
    section.nextBtnGrp.next1s = section.nextBtnGrp.add("button", pos.nextBtnGrp.next1s.pos, ">1s");
    section.nextBtnGrp.next10s = section.nextBtnGrp.add("button", pos.nextBtnGrp.next10s.pos, ">10s");

    section.prevBtnGrp.prev10s.onClick = function () { setActiveTimeInTimeline(-10, 'seconds') }
    section.prevBtnGrp.prev1s.onClick = function () { setActiveTimeInTimeline(-1, 'seconds') }
    section.prevBtnGrp.prev1f.onClick = function () { setActiveTimeInTimeline(-1, 'frames') }
    section.nextBtnGrp.next1f.onClick = function () { setActiveTimeInTimeline(1, 'frames') }
    section.nextBtnGrp.next1s.onClick = function () { setActiveTimeInTimeline(1, 'seconds') }
    section.nextBtnGrp.next10s.onClick = function () { setActiveTimeInTimeline(10, 'seconds') }

    section.changeButtonState = function (state) {
        section.prevBtnGrp.prev10s.enabled = state;
        section.prevBtnGrp.prev1s.enabled = state;
        section.prevBtnGrp.prev1f.enabled = state;
        section.nextBtnGrp.next1f.enabled = state;
        section.nextBtnGrp.next1s.enabled = state;
        section.nextBtnGrp.next10s.enabled = state;
    }

    return section;
}
