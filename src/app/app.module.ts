import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenubarModule} from 'primeng/menubar';
import { AutoresComponent } from './autores/autores.component';
import { LibrosComponent } from './libros/libros.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoresComponent,
    LibrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
