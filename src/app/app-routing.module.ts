import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores.component';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './login/login.component';
import { MainAppComponent } from './main-app/main-app.component';

const routes: Routes = [
  { path: 'app', component: MainAppComponent, children: [
     { path: 'libros', component: LibrosComponent },
     { path: 'autores', component: AutoresComponent },
  ]},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
