import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.css',
})
export class DashboardEstudiante implements OnInit {
  currentUser: any = null;
  isMenuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
