var moment = require('moment');


// Jan 1st 1970 00:00:00 am     <- UTC
// -1000 means 1st past from above
// 10000 means Jan 1st 1970 00:00:10 am
// as a timestamp value we always use miliiseconds

// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth()); // start frm 0



/**
 * params for format() - mementjs.com -> Display
 * - MMM shorhand version of month e.g. Mar
 * - YYYY year in number e.g. 2017
 *
 * addition / subtraction of time - momentjs.com -> Manipulate
 */
// var date = moment(); // create new moment obj that represents current point in time
// date.add(100, 'year').subtract(9, 'months'); // singular or plural works same. year / years. same for month/months
// console.log(date.format('MMM Do, YYYY')); // without params it displays a bit ugly time e.g.2017-03-12T16:33:45+11:00


// 10:35 am
// 6:01 am


var someTimestamp = moment().valueOf(); // get timestamp value. same as new Date().getTime()
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt); // example of passing millisecond
console.log(date.format('h:mm a'));