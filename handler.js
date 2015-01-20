var connection = require('./connection')
function exist (request,response) {
    connection(function(databaseConnection) {
    databaseConnection.collection('contracts', function(error, collection) {
            if (error){
                console.warn(error.message);
                response.writeHead(400, {"Content-Type": "text/html"});
                response.end('server error(1):'+error.message);
            }
            var uuids = request.body;
            console.warn(uuids);
            collection.find({_id:{$in:uuids}},
                function (err, cursor) {
                if (err){
                    console.warn(err.message);
                    response.writeHead(400, {"Content-Type": "text/html"});
                    response.end('server error(2):'+err.message);
                }else{
                    cursor.toArray(function  (err,items) {
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.end(JSON.stringify(items));
                    });
                }
            });
        });
    });    
}
function add (request,response) {
    connection(function(databaseConnection) {
    databaseConnection.collection('contracts', function(error, collection) {
            if (error){
                console.warn(error.message);
                response.writeHead(400, {"Content-Type": "text/html"});
                response.end('server error(1):'+error.message);
            }
            var users = request.body;
            console.warn(users);
            collection.insert(users,{w:1}, function (err, doc) {
                if (err){
                    console.warn(err.message);
                    response.writeHead(400, {"Content-Type": "text/html"});
                    response.end('server error(2):'+err.message);
                }else{
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify(doc));
                }
            });
        });
    });
}
function remove (request,response) {
    connection(function(databaseConnection) {
    databaseConnection.collection('contracts', function(error, collection) {
            if (error){
                console.warn(error.message);
                response.writeHead(400, {"Content-Type": "text/html"});
                response.end('server error(1):'+error.message);
            }
            var uuids = request.body;
            console.warn(uuids);
            collection.remove({_id:{$in:uuids}},
                function (err, result) {
                if (err){
                    console.warn(error.message);
                    response.writeHead(400, {"Content-Type": "text/html"});
                    response.end('server error(2):'+error.message);
                }else{
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(JSON.stringify(result));
                }
            });
        });
    }); 
}


exports.exist = exist
exports.add = add
exports.remove = remove
