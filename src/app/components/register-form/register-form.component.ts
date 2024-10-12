import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder, 
    // private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      token: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ], // Campo para el token
    });

    // // Obtener el token al cargar el formulario
    // this.tokenService.getToken().subscribe({
    //   next: (token: string) => {
    //     this.token = token; // Almacenar el token
    //     this.registerForm.get('token')?.setValue(this.token); // Asignar el token al campo del formulario
    //   },
    //   error: (error) => {
    //     console.error('Error obteniendo el token', error);
    //   },
    // });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Data: ', formData);
      // Lógica para enviar datos al backend
    }
  }

  // Método para comparar si las contraseñas coinciden
  get passwordsMatch(): boolean {
    return (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmPassword')?.value
    );
  }
}
