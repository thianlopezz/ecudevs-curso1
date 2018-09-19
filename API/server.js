
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = require('./rutas/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist/to-do-app')));


app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/to-do-app/index.html'));
});

const conn_str = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecudevs2';
mongoose.connect(conn_str, { useNewUrlParser: true });

const port = process.env.PORT || '9000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic happens on port:${port}`));
