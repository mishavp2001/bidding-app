// employees.js
var faker = require('faker')
const _ = require('underscore');
const moment = require('moment');

function generateProjects (total) {
  var projects = []
  for (var id = 0; id < total; id++) {
    let date =  moment(faker.date.between('2018-08-29', '2018-12-01'));
    projects.push({
      "id": id,
      "userId": faker.random.number(),
      "status": faker.random.number(),
      "email": faker.internet.email(),
      "date": date,
      "left":  moment(date.diff(moment())),
      "project": faker.lorem.sentence(2),
      "details": faker.lorem.sentence(25),
      "minbid": faker.random.number({'min': 10,'max': 5000}),
    })
  }
  return _.sortBy(projects, "left");
}
module.exports = generateProjects
