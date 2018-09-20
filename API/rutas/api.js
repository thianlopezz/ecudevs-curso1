const express = require('express');
const router = express.Router();

// Este es nuestro archivo de rutas para nuestro API REST
const ToDoDAO = require('../models/todos/ToDoDAO');

// De esta manera definimos una llamada tipo get
// http://localhost:9000/api
router.get('/', (req, res) => {
    res.send('Hola mundo');
});

// http://localhost:9000/api/saludar
router.get('/saludar/', (req, res) => {
    res.send({ mensaje: 'hola!' });
});

// http://localhost:9000/api/saludar/{parametro}
router.get('/saludar/:nombre', (req, res) => {
    res.send({ mensaje: 'Hola ' + req.params.nombre + ' por get param.' });
});

// Este es un ejemplo de tipo post
// en req.body llega nuestro objeto con parametros
// Recuerda que si no configuras a la aplicacion (ver server.js lineas 18 y 19)
// la libreria bodyParser no se podra leer el contenido del req.body
router.post('/saludar', (req, res) => {
    res.send({ mensaje: 'Hola ' + req.body.nombre + ' por post.' });
});

// De esta menera realizamos una peticion tipo put
router.put('/saludar', (req, res) => {
    res.send({ mensaje: 'Hola ' + req.body.nombre + ' por put.' });
});

// CRUD TODO
// Funciones CRUD de nuestro modelo
router.get('/todo', (req, res) => {
    ToDoDAO.get()
    .then(todos=>res.send(todos))
    // Con res.send enviamos nuestros datos
    .catch(error=>res.status(500).send(error));    
});

router.get('/todo/:idTodo', (req, res) => {
    ToDoDAO.getById(req.params.idTodo)
        .then(todo => res.send(todo))
        .catch(error => res.status(500).send(error));
});

router.post('/todo', (req, res) => {
    ToDoDAO.insertar(req.body)
        .then(todo => res.send(todo))
        .catch(error => res.status(500).send(error));
});

router.put('/todo', (req, res) => {
    ToDoDAO.actualizar(req.body)
        .then(todo => res.send(todo))
        .catch(error => res.status(500).send(error));
});

router.delete('/todo/:idToDo', (req, res) => {
    ToDoDAO.eliminar(req.params.idToDo)
        .then(success => res.send(success))
        .catch(error => res.status(500).send(error));
});


module.exports = router;