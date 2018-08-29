// employees.js
var faker = require('faker')
function generateBids (total) {
  var bids = []
  for (var id = 0; id < total; id++) {
    bids.push(
        {"id": id,
          "amount": faker.random.number({'min': 10,'max': 50000}),
          "time": faker.random.number({'min': 10,'max': 900}),
          "userid": faker.lorem.word(),
          "email": faker.internet.email()
        })
  }
  return bids;
}
module.exports = generateBids
