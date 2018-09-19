import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToDoItem } from '../models/to-do-item';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  // SETEAMOS NUESTRO ARREGLO
  // ESTE ARREGLO VA A CONTENER LA INFORMACION
  // QUE SERA MAPEADA EN NUESTRA VISTA
  // EL ARREGLO SERA LLENADO CON OBJESTOS TIPO ToDoItem
  toDos = [];

  // ESTA BANDERA CONTROLA QUE MOSTREMOS NUESTRO FORMULARIO DE INGRESO DE TAREA
  show = false;

  // ESTA PROPIEDAD DE COMPONENTE VA A RECIBIR UN PARAMETRO
  // EN CASO DE QUE ESTE LLEGUE POR URL
  idTodo;

  // EN EL CONSTRUCTOR INYECTAMOS NUESTRO SERVICIOS
  // EN ESTE CASO VAMOS A HACER USO DE EL SERVICIO TodoService DEFINIDO POR NOSOTROS
  // Y EL SERVICE route QUE ES PARTE DE ANGULAR
  constructor(private todoService: TodoService,
    private route: ActivatedRoute) {

    // EN ESTA LINEA CAPTURAMOS NUESTRO PARAMETRO QUE LLEGA EN LA URL (1) FORMA
    // ESTA MANERA SE CAPTURA EL PARAEMTRO SOLO UNA VEZ
    // this.idTodo = this.route.snapshot.params.idTodo; // snapshot onInit, activated route

    // ESTA ES OTRA FORMA DE CAPUTRAR EL PARAMETRO Y ES LA RECOMENDADA
    // NOS SUSCRIBIMOS A ESTE EVENTO PARA PODER DETECTAR UN CAMBIO EN EL PARAMETRO
    // EN CASO DE QUE EL PARAMETRO CAMBIE EVITAMOS RECARGAR TODA LA PAGINA
    // Y EJECUTAMOS EL PROCESO CORRESPONDIENTE AL CAMBIO DE PARAMETRO
    this.route.paramMap.subscribe(params => {
      // CAPTURAMOS EL PARAMETRO Y LLAMAMOS A LA FUNCION GETBYID PARA FILTRAR NUESTRO ARREGLO
      this.idTodo = params.get('idTodo');
      this.getToDos();
    });
  }

  ngOnInit() {
    this.getToDos();
  }

  getToDos() {

    // LLAMAMOS AL METODO DE NUESTRO SERVICE QUE NOS DEVUELVE TODOS LOS TODOS
    this.todoService.get()
      .subscribe(response => {
        this.toDos = response;
        if (this.idTodo) {
          // EN CASO DE QUE TENGAMOS UN PARAMETRO POR URL FILTRAMOS NUESTRO ARRAY
          this.toDos = this.toDos.filter(x => x.id === this.idTodo);
        }
      }, error => {
        console.log(error);
      });
  }

  // ESTE METODO VA A AGREGAR NUESTRO MODELO
  // A NUESTRO ARRAY toDos
  agregar(model) {

    this.todoService.insertar(model)
      .subscribe(response => {
        console.log(response);
        this.getToDos();
      }, error => {
        console.log(error);
      });

    // REALIZAMOS UN PUSH DE NUESTRO MODELO
    this.toDos.push(model);

    // OCULTAMOS NUESTRO PEQUENO FORMULARIO
    this.show = false;
  }

  // ESTE METODO VA A PONER EN TRUE LA VANDER show
  // QUE HACE QUE MUESTR NUESTRO PEQUENO FORMULARIO
  showInput() {
    this.show = true;
  }

  // ESTE METODO VA A BUSCAR UN ELEMENTO DE NUESTRO ARREGLO Y ASIGNARLE UNA FECHA
  // DICIENDO QUE HEMOS REALIZADO UNA TAREA
  realizado(i) {
    // tslint:disable-next-line:prefer-const
    let model = this.toDos[i];
    model.feRealizado = new Date();

    this.todoService.actualizar(model)
      .subscribe(response => {
        console.log(response);
        this.getToDos();
      }, error => {
        console.log(error);
      });
  }

  // ESTE METODO VA A SACAR UN ELEMENTO DEL ARREGLO
  eliminar(i) {
    // EL PRIMER PARAMETRO DE SPLICE ES LA POSICION DEL OBJETO QUE VAMOS A SACAR DE NUESTRO ARREGLO
    // EL SEGUNDO PARAMETRO INDICA CUANTOS ELEMENTOS VAMOS A SACAR A PARTIR DEL i
    // EJ -> ['A', 'B', 'C', 'D'].splice(1,2) DA COMO RESULTADO ['A', 'D']
    this.toDos.splice(i, 1);
  }

}
