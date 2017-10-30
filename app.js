let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let db = require('./models/db');
let feed;

io.on('connection', function (socket) {
    feed = require('./models/feeds')(socket);
});

let dbModel = new db();

dbModel.setupDb();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/view'));
app.use(require('./controllers'));

http.listen(3000, function(){
    console.log('listening on port 3000');
});