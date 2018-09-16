import { Injectable } from '@angular/core';
import { ToDoItem } from '../models/to-do-item';

// LOS SERVICES SON CLASES QUE CONTIENEN OPERACIONES COMUNES
// POR EJEMPLO COMUNMENTE EN LOS SERVICE HACEMOS NUESTRAS OPERACIONES DE ACCESO A DATOS
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  // EN ESTE METODO VAMOS A DEVOLVER UN ARREGLO DE OBJETOS TIPO ToDoItem
  get(): Array<ToDoItem> {

    return [
      {
        id: '1',
        descripcion: 'Levantarse',
        hora: 10,
        feRealizado: new Date()
      },
      {
        id: '2',
        descripcion: 'Desayunar',
        hora: 11,
        feRealizado: new Date()
      },
      {
        id: '3',
        descripcion: 'Hacer deberes',
        hora: 12
      }
    ];
  }
}
