import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { SecurityService } from 'src/app/services/security.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  message!: string;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'warning' | 'danger' = 'success';

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
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
      ],
    });
    this.requestSecurityToken();
  }
  requestSecurityToken(): void {
    this.securityService.getSecurityToken().subscribe(
      (data: any) => {
        this.registerForm.get('token')?.setValue(data.token);
      },
      (error) => {
        console.error('Error al obtener el token de seguridad:', error);
      }
    );
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const { token, ...newCustomer } = this.registerForm.value;
      this.customerService.registerCustomer(newCustomer, token).subscribe(
        (response) => {
          this.toastr.success(response.message, 'Proceso correcto!');
          this.registerForm.reset();
          this.router.navigate(['/welcome']);
        },
        (error) => {
          this.toastr.error(error.error.message, 'Hubo un error!');
        }
      );
    }
  }

  get passwordsMatch(): boolean {
    return (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmPassword')?.value
    );
  }
}
