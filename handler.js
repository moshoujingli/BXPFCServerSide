var connection = require('./connection')
function exist (request,response) {
    
}
function add (request,response) {
    connection(function(databaseConnection) {
    databaseConnection.collection('contracts', function(error, collection) {
            if (error){
                console.warn(error.message);
                response.writeHead(400, {"Content-Type": "text/html"});
                response.end('server error(1)');
            }
            var users = request.body;
            console.warn(users);
            collection.insert(users,{w:1}, function (err, doc) {
                if (err){
                    console.warn(error.message);
                    response.writeHead(400, {"Content-Type": "text/html"});
                    response.end('server error(2)');
                }else{
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify(doc));
                }
            });
        });
    });
}
function remove (request,response) {}


exports.exist = exist
exports.add = add
exports.remove = remove
