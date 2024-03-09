const http = require('http');

const app = http.createServer((req, res) => {
    if (req.url === '/api/hello') {
        res.end('hello world');
    } else if (req.url === '/api/hello1') {
        res.end('hello world11');
    } else if (req.url === '/api/hello2') {
        res.end('hello world22');
    } else if (req.url === '/api/hello3') {
        res.end('hello world33');
    } else if (req.url === '/api/hello4') {
        res.end('hello world44');
    }
});

app.listen(9000, 'localhost', () => {
    console.log('listen 9000');
})
