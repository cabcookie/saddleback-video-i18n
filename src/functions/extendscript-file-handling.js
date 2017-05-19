'use strict';

import RuntimeError from './runtime-error';

/**
Opens the file and returns it as an array which represents the lines of the file.
*/
export default function createArrayFromFile() {
    var file = File.openDialog("Please choose the file with the relevant texts", "txt");
    var doc = new File(file);
    if (!doc.exists) throw new RuntimeError({
        func: "createArrayFromFile",
        title: "No file found or couldn't read it!"
    });

    var contentAry = [];
    file.open('r');
    while (!file.eof) {
        contentAry[contentAry.length] = file.readln();
    }
    file.close();

    return contentAry;
}
