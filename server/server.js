const path = require('path');
const express = require('express');
const morgan = require('morgan');

const port = (process.env.PORT || 8080);

const server = function () {
    const app = express();

    // configure logger
    app.use(morgan('dev'));

    // serve static files
    app.use('/', express.static(path.join(__dirname, '../dist')));

    // serve index.html for everything else
    app.get('*', function (_, res) {
        res.sendFile(path.join(__dirname, '/../dist/index.html'))
    });

    return app
};

var app = server();
app.listen(port);

console.log(`Listening at http://localhost:${port}`);