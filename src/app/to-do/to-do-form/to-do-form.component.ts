import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToDoItem } from '../../models/to-do-item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent implements OnInit {

  // COMENZAMOS DIFINIENDO NUESTRO MODELO TIPO ToDoItem
  model: ToDoItem = { descripcion: '', hora: 0 };

  @Output() agregar = new EventEmitter<ToDoItem>();

  constructor() { }

  ngOnInit() {
  }

  guardar(f: NgForm) {
    this.agregar.next(this.model);
    this.model = { descripcion: '', hora: 0 };
  }

}
