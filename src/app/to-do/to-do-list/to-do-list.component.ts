import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

    @Input() toDos = [];

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
