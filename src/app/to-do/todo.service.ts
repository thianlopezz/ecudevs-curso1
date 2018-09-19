import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { ToDoItem } from '../models/to-do-item';

// LOS SERVICES SON CLASES QUE CONTIENEN OPERACIONES COMUNES
// POR EJEMPLO COMUNMENTE EN LOS SERVICE HACEMOS NUESTRAS OPERACIONES DE ACCESO A DATOS
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: Http) { }

  // EN ESTE METODO VAMOS A DEVOLVER UN ARREGLO DE OBJETOS TIPO ToDoItem
  get() {

    return this.http.get('/api/todo/')
      .pipe(map((response: Response) => response.json()));
  }

  insertar(model) {
    return this.http.post('/api/todo/', model)
      .pipe(map((response: Response) => response.json()));
  }

  actualizar(model) {
    return this.http.put('/api/todo/', model)
      .pipe(map((response: Response) => response.json()));
  }
}
