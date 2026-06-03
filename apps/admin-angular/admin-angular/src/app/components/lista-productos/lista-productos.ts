import { Component, inject, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto';

@Component({
  selector: 'app-lista-productos',
  imports: [],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos implements OnInit {

  productos: Producto[] = [];
  private productoService = inject(ProductoService);

  ngOnInit(): void{
    this.productos = this.productoService.getProductos();
  }
}