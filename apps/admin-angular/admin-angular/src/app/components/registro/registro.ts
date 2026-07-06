import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nombre = '';
  apellidos = '';
  email = '';
  programa = '';
  password = '';
  confirmPassword = '';
  terms = false;
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.nombre || !this.apellidos || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.terms) {
      this.errorMessage = 'Debe aceptar los Términos de uso y la Política de privacidad.';
      return;
    }

    const payload = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      correo_electronico: this.email,
      programa_academico: this.programa || undefined,
      contraseña: this.password
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.successMessage = '¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Ocurrió un error al crear la cuenta.';
      }
    });
  }
}
