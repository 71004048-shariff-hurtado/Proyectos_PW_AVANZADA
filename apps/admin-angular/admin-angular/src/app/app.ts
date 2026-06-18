import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref,  RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  
  usuario = {
    nombre: 'Wilder',
    items: [
      {id: 1, name: 'Computadora'},
      {id: 2, name: 'Celular'}
    ]
  }
  esActivo = true;
  colorFavorito = 'blue';
  mensaje = 'Bienvenido querido profesor';

}
