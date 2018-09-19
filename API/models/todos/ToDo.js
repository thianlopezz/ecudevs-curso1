var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//unique
var toDoSchema = new Schema({
    descripcion: { type: String, required: true },
    hora: { type: Number, required: true },
    feRealizado: Date,
    estado: { type: String, default: 'A' },
    fe_creacion: { type: Date, default: Date.now },
    fe_modificacion: { type: Date, default: Date.now }
});

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