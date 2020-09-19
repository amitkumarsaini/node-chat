const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var MESSAGE = require('./messageController/messageController')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myChatModal');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("db open");
});


app.get('/', function (req, res) {
    res.render('index.ejs');
});

router.post('/messages', MESSAGE.addMessage);
router.get('/messages', MESSAGE.getMessage);

io.sockets.on('connection', function (socket) {
    socket.on('username', function (username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function (username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function (message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function () {
    console.log('listening on *:8080');
});