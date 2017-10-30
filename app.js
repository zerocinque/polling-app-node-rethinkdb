let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let db = require('./models/db');

let dbModel = new db();

dbModel.setupDb();
app.use(bodyParser.json());
app.use(require('./controllers'));

http.listen(3000, function(){
    console.log('listening on port 3000');
});