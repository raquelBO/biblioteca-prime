import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Libro } from 'src/app/interface/libro.interface';
import { LibrosService } from 'src/app/servicios/libros.service';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css']
})
export class FormularioLibroComponent implements OnInit {

  codigo: number | null = null;
  titulo: string | null = null;
  autor: string | null = null;
  paginas: number | null = null;

  codigoValido: boolean = true;
  tituloValido: boolean = true;
  autorValido: boolean = true;
  paginasValido: boolean = true;

  guardando: boolean = false;
  mensajes: Message[] = [];

  constructor(
    private servicioLibros: LibrosService
  ) { }

  ngOnInit(): void {
  }

  guardar(){
    this.validar();
    if(this.codigoValido && this.tituloValido && this.autorValido && this.paginasValido){
      const libro : Libro = {
        id: this.codigo,
        titulo: this.titulo,
        autor: this.autor,
        paginas: this.paginas
      }
      this.guardando = true;
      this.servicioLibros.post(libro).subscribe({
        next: () => {
          this.guardando = false;
          this.mensajes=[{severity: 'success', summary: 'Exito', detail: 'Se registro el libro'}];
        },
        error: (e) => {
          this.guardando = false;
          this.mensajes=[{severity: 'error', summary: 'Error al registrar', detail: e.error}];

         }
      });
      
    }
  }

 validar(){
  this.codigoValido = this.codigo !== null;
  this.tituloValido = this.titulo !== null && this.titulo?.length > 0;
  this.autorValido = this.autor !== null && this.autor?.length > 0;
  this.paginasValido = this.paginas !== null;

 }
}