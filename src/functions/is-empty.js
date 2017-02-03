'use strict';

export default function isEmpty(obj) { 
   for (var x in obj) { return false; }
   return true;
}
