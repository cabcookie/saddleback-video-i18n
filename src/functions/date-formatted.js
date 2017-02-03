'use strict';

import configuration from './configuration';

export default function dateFormatted(date) {
    var fStr = configuration().mainCompositionsToBuild.dateFormat;
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    return fStr.replace('dd', d).replace('mm', m).replace('yyyy', y);
}
