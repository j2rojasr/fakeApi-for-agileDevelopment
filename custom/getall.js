var jsonServer = require('json-server')
var router = jsonServer.router('./db_extends.json')

let getall = (req, res, next) => {
  if (req.query['getall']) {
    var resourcesArr = req.query['getall'].split(","),
      db = router.db, //lowdb instance
      allResources; //to store the aggregated resources

    allResources = resourcesArr.reduce(function (accumulator, resource) {
      accumulator[resource] = db.get(resource).value()
      return accumulator;
    }, {});

    res.json(allResources);
  } else {
    //proceed normally if no `getall` querystring
    next()
  }
};

module.exports = getall;