var mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

// Referencia de nuestro Schema de mongoose
let ToDo = require('./ToDo');

// Para tener una estructura de codigo mas organizada
// definimos un modelo de acceso a datos
// a traves del cual vamos a configurar todas nuestras operaiones
// CRUD de nuestro modelo de datos
function ToDoDAO () {

    this.get = function () {

        // Definimos como retorno una promesa debido a que la funcion
        // que debemos ejecutar es asincrona
        return new Promise((resolve, reject) => {
            // De esta menera buscamos en nuestra colleccion ToDo
            // filtrando todos los documentos que tengan estado = 'A'
            ToDo.find({ estado: 'A' })
                .then(todos => resolve(todos))
                .catch(error => reject(error));
        });
    }

    this.getById = function (idTodo) {
        return new Promise((resolve, reject) => {

            // De esta filtramos una coleccion por ID
            // no olvides que un ID autogenerado de MongoDB es un objeto
            // con esta consideracion debemos configurar nuestro string 
            // a un objeto con ObjectId(id)
            ToDo.findById(ObjectId(idTodo))
                .then(todo => resolve(todo))
                .catch(error => reject(error));
        });
    }

    this.insertar = function (model) {
        return new Promise((resolve, reject) => {

            // Definimos un nuevo modelo de datos ToDo usando este constructor
            // en este caso la variable model debe tener una estructura similar
            // a la definida en nuestro Schema
            let nuevoToDo = new ToDo(model);

            // Una vez instanciado nuestro objeto ejecutamos save
            // para insertar en la base de datos
            nuevoToDo.save()
                .then(todo => resolve(todo))
                .catch(error => reject(error));
        });
    }

    this.actualizar = function (model) {
        return new Promise((resolve, reject) => {
            
            // De esta manera actualizamos nuestro documento en la base de datos
            // enviamos como parametro el ID del objeto y el modelo con los datos
            // que se van a actualizar en nuestro documento
            ToDo.findByIdAndUpdate(ObjectId(model._id), model)
                .then(todo => resolve(todo))
                .catch(error => reject(error));

            // Esta es otra manera de actualizar
            // en la cual primero obtenemos al objeto,
            // accedemos a los campos que queremos modificar y
            // y luego guardamos el documento
            // ToDo.findById(ObjectId(model._id))
            //     .then(todo => {
            //         todo.descripcion = model.descripcion;
            //         todo.hora = model.hora;
            //         todo.feRealizado = model.feRealizado;
            //         todo.save().then(todo_=>resolve(todo_))
            //     })
            //     .catch(error => reject(error));
        });
    }

    this.eliminar = function(idToDo){
        return new Promise((resolve, reject) => {

            // Para eliminar un documento lo hacemos de una manera muy parecida
            // a la actualizacion, a diferencia de que aqui no es necesario enviar el objeto
            // solo el ID del documento que vamos a eliminar
            ToDo.findByIdAndRemove(ObjectId(idToDo))
                .then(() => resolve(true))
                .catch(error => reject(error));
        });
    }
}

module.exports = new ToDoDAO;