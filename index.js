const express = require('express');
const morgan = require('morgan');

const port = process.env.PORT || 5000;
const dirWebRoot = 'www';

const app = express();

app.use(morgan('dev'));
app.use(express.static(dirWebRoot));


app.get('/version', (req, res) => {
    res.json({ version: '1.2.3'})
       .end();
});
app.get('/ping', (req, res) => {
    res.json({ msg: 'pong'})
       .end();
});
app.get('/env', (req, res) => {
    res.json(process.env)
       .end();
});


app.get('/time', (req, res) => {
    res.json({ timestamp: new Date(Date.now()).toISOString() })
       .end();
});
app.get('/health', (req, res) => {
    res.json({ checks: [
            { name: 'port', description: 'Port in use: ' + port, 'sucessfull': true },
            { name: 'db', description: 'Database', 'sucessfull': true },
            { name: 'mail', description: 'Mail server x.mail.com' + port, 'sucessfull': false,'error': 'Unable to connect.' }
        ],
        'memoryUsage': process.memoryUsage()
    })
    .end();
});
app.get('/exception', (req, res) => {
    console.error('Simulating exception');
    const a = null;
    a.fail();
});
app.get('/application-crash', (req, res) => {
    console.error('Simulating the app crashing');
    process.exit(3);
});



app.listen(port);
console.log('Application listening on port: ' + port);
console.log('Serving static files from: ' + dirWebRoot);
