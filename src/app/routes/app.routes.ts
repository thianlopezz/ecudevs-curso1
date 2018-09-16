import { Routes, RouterModule } from '@angular/router';
import { ToDoComponent } from '../to-do/to-do.component';
import { HomeComponent } from '../home/home.component';

// ESTE ARCHIVO CONTIENE NUESTRO SISTEMA DE RUTAS
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'todo', component: ToDoComponent },
    { path: 'todo/:idTodo', component: ToDoComponent },
    // { path: 'home', component: HomeComponent, canActivate: [RouteActivatorService] },

    // EN CASO DE QUE LA RUTA NO HAGA MATCH CON NINGUNA DE LAS RUTAS DEFINIDAS ARRIBA
    // VAMOS A REDIRECCIONAR A NUESTRO PATH BASE
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
