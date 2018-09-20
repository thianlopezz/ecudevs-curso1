
// Este documento deefine las configuraciones
// de nuestro servidor Express
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const api = require('./rutas/api');

// Instanciamos nuestro obejto Express a la constante app
const app = express();

// Configuramos bodyParser para
// poder interpretar los objetos que nos llegan por
// HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// De esta manra servimos el directorio que contendra
// nuestros archivos de Angular ya compilados
app.use(express.static(path.join(__dirname, '../dist/to-do-app')));

// Configuramos el archivo de rutas de nuestro API
// todas las llamdas a la ruta /api llegaran a las rutas
// configuradas en este archivo api.js
app.use('/api', api);

// Todos las peticiones tipo get a la ruta -> /
// Dirigen a nuestro Single Page Application 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/to-do-app/index.html'));
});

// Configuramos nuestra coneccion a nuestra base de datos MongoDB
// process.env define que vamos a obtener el valor de nuestra variable de entorno MONGODB_URI
const conn_str = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecudevs2';
mongoose.connect(conn_str, { useNewUrlParser: true });

// Definimos y configuramos el puerto de escucha de nuestro servidor
const port = process.env.PORT || '9000';
app.set('port', port);

// creamos nuestro servidor
const server = http.createServer(app);

// y lo ponemos a escuchar las peticiones
server.listen(port, () => console.log(`Magic happens on port:${port}`));
