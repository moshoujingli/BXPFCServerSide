var handler = require('./handler')
var bodyParser = require('body-parser')

module.exports = function (app) {
    app.use(bodyParser.json());
    app.post('/checkExist', handler.exist);
    app.post('/addUUIDs', handler.add);
    app.post('/removeUUIDs', handler.remove);

    app.get("*", function(request, response) {
      response.writeHead(404, {"Content-Type": "text/html"});
      response.end("404");
    });
};