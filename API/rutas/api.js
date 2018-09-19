const express = require('express');
const router = express.Router();

const ToDoDAO = require('../models/todos/ToDoDAO');

router.get('/', (req, res) => {
    res.send('Hola mundo');
});

router.get('/saludar/', (req, res) => {
    res.send({ mensaje: 'hola!' });
});

router.get('/saludar/:nombre', (req, res) => {
    res.send({ mensaje: 'Hola ' + req.params.nombre + ' por get param.' });
});

router.post('/saludar', (req, res) => {
    res.send({ mensaje: 'Hola ' + req.body.nombre + ' por post.' });
});

router.put('/saludar', (req, res) => {
    res.send({ mensaje: 'Hola ' + req.body.nombre + ' por put.' });
});

// CRUD TODO
router.get('/todo', (req, res) => {
    ToDoDAO.get()
    .then(todos=>res.send(todos))
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