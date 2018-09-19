var mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

let ToDo = require('./ToDo');

function ToDoDAO () {

    this.get = function () {
        return new Promise((resolve, reject) => {
            ToDo.find({ estado: 'A' })
                .then(todos => resolve(todos))
                .catch(error => reject(error));
        });
    }

    this.getById = function (idTodo) {
        return new Promise((resolve, reject) => {
            ToDo.findById(ObjectId(idTodo))
                .then(todo => resolve(todo))
                .catch(error => reject(error));
        });
    }

    this.insertar = function (model) {
        return new Promise((resolve, reject) => {
            let nuevoToDo = new ToDo(model);
            nuevoToDo.save()
                .then(todo => resolve(todo))
                .catch(error => reject(error));
        });
    }

    this.actualizar = function (model) {
        return new Promise((resolve, reject) => {
            
            // let id = model._id;
            // model._id = undefined;

            ToDo.findOne({ _id: ObjectId(model._id)}, model)
                .then(todo => resolve(todo))
                .catch(error => reject(error));

            ToDo.findById(ObjectId(model._id))
                .then(todo => {
                    todo.descripcion = model.descripcion;
                    todo.hora = model.hora;
                    todo.feRealizado = model.feRealizado;
                    todo.save().then(todo_=>resolve(todo_))
                })
                .catch(error => reject(error));
        });
    }

    this.eliminar = function(idToDo){
        return new Promise((resolve, reject) => {

            ToDo.findByIdAndRemove(ObjectId(idToDo))
                .then(() => resolve(true))
                .catch(error => reject(error));
        });
    }
}

module.exports = new ToDoDAO;