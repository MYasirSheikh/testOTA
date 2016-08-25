var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...');
    console.log(request.headers);
    if(request.headers["user-agent"] == 'ESP8266-http-Update'){
        if(request.headers["x-esp8266-version"] == 'myVersion'){
            console.log("need to update");
        }
    }

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
    

    var extname = path.extname(filePath);
    console.log(extname);
    var contentType = 'text/html';
    switch (extname) {
        case '.bin':
            contentType = 'application/octet-stream';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {

        
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            var stat = fs.statSync(filePath);
            console.log(stat.size);
            response.writeHead(200, { 'Content-Type': contentType, 'Content-Length': stat.size });
            response.end(content, 'utf-8');
        }
    });

}).listen(process.env.PORT || 8125);
console.log('Server running at http://127.0.0.1:8125/');