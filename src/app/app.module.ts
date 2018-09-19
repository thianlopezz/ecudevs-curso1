import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';
import { NumeroDirective } from './directives/numero.directive';
import { UpperDirective } from './directives/upper.directive';
import { HeaderComponent } from './comun/header/header.component';
import { HomeComponent } from './home/home.component';

import { routing } from './routes/app.routes';
import { ToDoListComponent } from './to-do/to-do-list/to-do-list.component';
import { ToDoFormComponent } from './to-do/to-do-form/to-do-form.component';
import { HttpModule } from '@angular/http';

// EN *DECLARATIONS* SE REFERENCIAN
// COMPONENTES, DIRECTIVAS
// QUE VAMOS A USAR PARA ESTE MODULO PRINCIPAL

// EN *IMPORTS* VAMOS A CARGAR TODAS LOS MODULOS
// DE ANGULAR QUE NECESITEMOS
// TAMBIEN PODEMOS CARGAR NUESTROS PROPIOS MODULOS

// EN *BOOTSTRAP* VA EL COMPONENTE PRINCIPAL (NO CONFUNDIR CON BOOTRAP CSS)
// PARA NUESTRO CASO app.component
@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    NumeroDirective,
    UpperDirective,
    HeaderComponent,
    HomeComponent,
    ToDoListComponent,
    ToDoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
