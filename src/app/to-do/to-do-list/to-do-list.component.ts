import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

    // Configuramos los datos de entrada para este componente
    @Input() toDos = [];

    // Configuramos la salida de datos de este componente
    // no olvides definir el tipo de dato que vas a enviar de vuelta
    // a traves de este componente
    @Output() realizado = new EventEmitter<number>();
    @Output() eliminar = new EventEmitter<number>();

    constructor() { }

    ngOnInit() {
    }

    onRealizado(i) {
        this.realizado.next(i);
    }

    onEliminar(i) {
        this.eliminar.next(i);
    }

}
