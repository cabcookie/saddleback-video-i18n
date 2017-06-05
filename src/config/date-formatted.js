// TODO Every function should have an error handling gh:3 id:33

function dateFormatted(date) {
    var fStr = configuration().mainCompositionsToBuild.dateFormat;
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    return fStr.replace('dd', d).replace('mm', m).replace('yyyy', y);
}
