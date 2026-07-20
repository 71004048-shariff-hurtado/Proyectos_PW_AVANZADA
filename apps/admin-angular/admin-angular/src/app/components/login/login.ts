import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese su correo electrónico y contraseña.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.saveSession(res.token, res.role, res.user);
        if (res.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (res.role === 'docente') {
          this.router.navigate(['/dashboard-docente']);
        } else {
          this.router.navigate(['/dashboard-estudiante']);
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Credenciales incorrectas o error en el servidor.';
      }
    });
  }
}
