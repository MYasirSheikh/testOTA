var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/fw2_ota', (req, res) => {
    console.log(req);
    res.sendFile('http://test-ota.herokuapp.com/firmwareOTAServer/public/main.ino.bin')
})

app.listen(80);
console.log('listening on port 1234')