import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdkService } from 'src/app/services/sdk.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  token: string = '';
  registrationSuccess: boolean = false;  // Para mostrar mensaje de éxito

  constructor(
    private fb: FormBuilder, 
    // private sdkService: SdkService
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

    // // Obtener el token al cargar el formulario usando el SDK
    // this.sdkService.getToken().subscribe({
    //   next: (token: string) => {
    //     this.token = token;  // Almacenar el token
    //     this.registerForm.get('token')?.setValue(this.token);  // Asignar el token al campo del formulario
    //   },
    //   error: (error) => {
    //     console.error('Error obteniendo el token', error);
    //   }
    // });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // // Usar el SDK para registrar al cliente
      // this.sdkService.registerClient(formData).subscribe({
      //   next: (response) => {
      //     console.log('Registro exitoso:', response);
      //     this.registrationSuccess = true;  // Mostrar mensaje de éxito
      //   },
      //   error: (error) => {
      //     console.error('Error al registrar el cliente:', error);
      //   }
      // });
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
