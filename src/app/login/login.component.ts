import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Message } from 'primeng/api';
import { Credenciales } from '../interface/credenciales.interface';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    ci: new FormControl<number | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  });
  public mensajes: Message[] = [];

  constructor(
    private servicioSesion: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token: string | null = localStorage.getItem('token');
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      if(!jwt.isTokenExpired(token)){
        this.router.navigate(['/app']);
      }
    }
  }

  public iniciarSesion(){
    this.actualizarValidacion();
    if(this.form.valid){
      const cred: Credenciales = {
        ci: this.form.get('ci')?.value,
        password: this.form.get('password')?.value
      }
      this.servicioSesion.iniciar(cred).subscribe({
        next: (respuesta) => {
          this.mensajes = [{severity: 'success', summary: 'Inicio de sesión correcto'}];
          this.router.navigate(['/app']);
        },
        error: (e) => {
          console.error('Error al iniciar sesion', e)
          if(e.status === 401){
            this.mensajes = [{severity: 'error', summary: 'CI o Contraseña incorrecta'}]
          }else{
            this.mensajes =[{severity: 'error', summary: 'Error al iniciar sesion', detail: e.message}]
          }  
        }
      });
    }
    console.log(this.form.get('ci')?.value);
    console.log(this.form.get('password')?.value);
  }

  private actualizarValidacion(){
    if(this.form.get('ci')?.invalid){
      this.form.get('ci')?.markAsTouched();
      this.form.get('ci')?.markAsDirty();
    }
    if(this.form.get('password')?.invalid){
      this.form.get('password')?.markAsTouched();
      this.form.get('password')?.markAsDirty();
  }
}
}
