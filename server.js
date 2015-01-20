var express = require('express'),
    router  = require('./router');

var app = express();
router(app);
app.listen(7050);