import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FichaProducto, Producto } from './ficha-producto';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FichaProducto, CurrencyPipe],
  template: `
    <div class="container">
      <h2>Inventario de Periféricos</h2>

      <div class="totales-panel">
        <p>
          <strong>Valor total:</strong>
          {{ valorTotal() | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}
        </p>
        <p><strong>Unidades totales:</strong> {{ unidadesTotales() }} u.</p>
        <p><strong>Productos agotados:</strong> {{ productosAgotados() }}</p>
      </div>

      @if (productos().length > 0) {
        <div>
          @for (item of productos(); track item.nombre) {
            <app-ficha [producto]="item" (retirar)="retirarProducto(item)" />
          }
        </div>

        <button class="btn-vaciar" type="button" (click)="vaciarInventario()">
          Vaciar inventario
        </button>
      } @else {
        <p class="empty-message">El inventario está vacío.</p>
      }
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .totales-panel {
        margin-bottom: 20px;
        padding: 15px;
        border-radius: 8px;
        background: #e9ecef;
      }

      .totales-panel p {
        margin: 5px 0;
        font-size: 1.1em;
      }

      .btn-vaciar {
        margin-top: 10px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background: #dc3545;
        color: white;
        cursor: pointer;
      }

      .empty-message {
        padding: 15px;
        border-radius: 8px;
        background: #fff3cd;
        color: #856404;
        font-weight: bold;
        text-align: center;
      }
    `,
  ],
})
export class Inventario {
  productos = signal<Producto[]>([
    { nombre: 'Teclado', precio: 85000, existencias: 8 },
    { nombre: 'Mouse', precio: 45000, existencias: 12 },
    { nombre: 'Audífonos', precio: 120000, existencias: 3 },
  ]);

  valorTotal = computed(() =>
    this.productos().reduce(
      (total, producto) => total + producto.precio * producto.existencias,
      0,
    ),
  );

  unidadesTotales = computed(() =>
    this.productos().reduce(
      (total, producto) => total + producto.existencias,
      0,
    ),
  );

  productosAgotados = computed(
    () => this.productos().filter((producto) => producto.existencias === 0).length,
  );

  retirarProducto(producto: Producto): void {
    this.productos.update((productos) =>
      productos.map((actual) =>
        actual.nombre === producto.nombre && actual.existencias > 0
          ? { ...actual, existencias: actual.existencias - 1 }
          : actual,
      ),
    );
  }

  vaciarInventario(): void {
    this.productos.set([]);
  }
}
