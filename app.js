const express = require('express');
const app = express();
app.use(express.static('./assets')); // Tất cả Request khách hàng gửi lên thì vào thư mục này

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, function () {
    console.log('App listening on port 3000');
});

const mongoose = require('mongoose'); // Nhúng mongoose vào dự án
mongoose.connect('mongodb://127.0.0.1:27017/messages'); // test ở đây là tên Database cần làm việc
var db = mongoose.connection;
db.once('open', function callback() {
    console.log("Connected MongoDB!");
});
/* ================ */
io.on('connection', (socket) => { /* connection là lắng nghe sự kiện người dùng kết nối lên server*/
    console.log(socket.id + ' vừa kết nối');

    socket.on('user-send-message', function (message) {
        // console.log(message);
        io.sockets.emit('server-send-meesage', message);
    })
});
/* ================ */
app.get('/', (req, res) => {
    res.render('index.ejs')
});