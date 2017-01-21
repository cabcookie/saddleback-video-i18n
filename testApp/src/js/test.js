'use strict';
import createCompsFromTextFile from '../../../src/functions/create-comps-from-text-file';
import appObj from './functions/app';
import logReport from './functions/log-report';
import _ from 'lodash';

var contentAry = ("startTime	endTime	Composition	Text	Address\n0:49:25	0:56:10	Scripture	Wer mir seinen Dank zeigt, der bringt mir ein Opfer dar, das mich ehrt.	Psalm 50,23\n1:54:10	2:14:01	Lower Third YouTube	1. [FÜR SEIN WESEN]\n13:01:18	13:19:00	Scripture	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula velit id metus ultricies auctor. Nullam sit amet ex nisl. Donec sit amet lobortis lacus. Curabitur quis tortor augue. Sed vel mollis erat, eget condimentum augue. Donec risus lacus, feugiat id maximus nec, convallis vitae odio. Sed vulputate pulvinar lorem et cursus. Nunc mattis, lorem vitae dapibus convallis, nisi nulla cursus est, sed accumsan leo turpis sed ante. Nullam sagittis, augue ac sollicitudin finibus, ligula nibh mollis enim, nec bibendum lacus nisi ut quam. Donec ultricies dui eu lorem laoreet, sit amet luctus est molestie. Mauris mollis cursus lorem fringilla tempus. Suspendisse tristique viverra bibendum. Praesent ante lacus, pellentesque eget commodo sed, condimentum at neque. Vestibulum non nibh erat. Aenean porta ante at pretium pharetra..	Psalm 145,3").split('\n');
self.app = appObj(contentAry[0]);

createCompsFromTextFile(contentAry);

function component (newText) {
  var element = document.createElement('div');
  var text = '<p>';
  text += _.join(newText.split('\n'), '</p><p>');
  text += '</p>';
  element.innerHTML = text;
  return element;
}

document.body.appendChild(component(logReport(self.app.project.activeItem.layers)));
