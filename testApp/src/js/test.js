'use strict';
import createCompsFromTextFile from '../../../src/functions/create-comps-from-text-file';
import clone from '../../../src/functions/clone';

var items = ['Lower Third', 'Full Screen', 'Scripture'];
var duplicateFunc = function () {
  return {};
};

var itemObjects = [];
for (var i = 0; i < items.length; i++) {
  var item = items[i];
  itemObjects[itemObjects.length] = {
    name: item,
    duplicate: duplicateFunc,
  }
};

self.app = {
  project: {
    item: function (i) {
      return {
        name: items[i],
      };
    },
    items: itemObjects,
    activeItem: {
      frameRate: 29.97,
      name: 'English Sunday Service',
      layers: {
        add: function (newComp) {
          return clone(newComp);
        },
      },
    },
  },
};

self.app.project.items.addFolder = function (newFolderName) {
  var newFolder = {
    name: newFolderName
  };
  return newFolder;
};

var contentAry = ("startTime	endTime	Composition	Text	Address\n0:49:25	0:56:10	Scripture	Wer mir seinen Dank zeigt, der bringt mir ein Opfer dar, das mich ehrt.	Psalm 50,23\n1:54:10	2:14:01	Lower Third YouTube	1. [FÜR SEIN WESEN]\n13:01:18	13:19:00	Scripture	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula velit id metus ultricies auctor. Nullam sit amet ex nisl. Donec sit amet lobortis lacus. Curabitur quis tortor augue. Sed vel mollis erat, eget condimentum augue. Donec risus lacus, feugiat id maximus nec, convallis vitae odio. Sed vulputate pulvinar lorem et cursus. Nunc mattis, lorem vitae dapibus convallis, nisi nulla cursus est, sed accumsan leo turpis sed ante. Nullam sagittis, augue ac sollicitudin finibus, ligula nibh mollis enim, nec bibendum lacus nisi ut quam. Donec ultricies dui eu lorem laoreet, sit amet luctus est molestie. Mauris mollis cursus lorem fringilla tempus. Suspendisse tristique viverra bibendum. Praesent ante lacus, pellentesque eget commodo sed, condimentum at neque. Vestibulum non nibh erat. Aenean porta ante at pretium pharetra..	Psalm 145,3").split('\n');

createCompsFromTextFile(contentAry);
