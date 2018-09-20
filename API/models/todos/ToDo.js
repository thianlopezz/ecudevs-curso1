var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Este documento define una estructura de coleccion de base de datos
// MongoDB, estamos definiendo los datos que va a tener nuestra coleccion
// para lo cual usamos Mongoose
// https://mongoosejs.com/docs/schematypes.html
var toDoSchema = new Schema({
    descripcion: { type: String, required: true },
    hora: { type: Number, required: true },
    feRealizado: Date,
    estado: { type: String, default: 'A' },
    fe_creacion: { type: Date, default: Date.now },
    fe_modificacion: { type: Date, default: Date.now }
});

// De esta manera definimos una accion a ejecutar cuando estamos
// guardando un documento dentro de nuestra coleccion
// https://mongoosejs.com/docs/middleware.html
toDoSchema.pre('save', function (next) {

    let ahora = new Date();

    this.fe_modificacion = ahora;

    if (!this.fe_creacion) {
        this.fe_creacion = ahora;
    }

    next();
});

var ToDo = mongoose.model('ToDo', toDoSchema);

module.exports = ToDo;