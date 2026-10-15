import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

export interface Producto {
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  selector: 'app-ficha',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="card">
      <div class="card-header">
        <h3>{{ producto().nombre }}</h3>
        <span
          class="badge"
          [class.badge-danger]="estado() === 'Agotado'"
          [class.badge-warning]="estado() === 'Inventario bajo'"
          [class.badge-success]="estado() === 'Disponible'"
        >
          {{ estado() }}
        </span>
      </div>

      <div>
        <p>
          <strong>Precio:</strong>
          {{ producto().precio | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}
        </p>
        <p>
          <strong>Existencias:</strong>
          {{ producto().existencias }} u.
        </p>
      </div>

      <button
        class="btn-retirar"
        type="button"
        [disabled]="producto().existencias === 0"
        (click)="retirar.emit()"
      >
        Retirar una unidad
      </button>
    </div>
  `,
  styles: [
    `
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        background: white;
        margin-bottom: 10px;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .card-header h3 {
        margin: 0;
      }

      .badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.85em;
      }

      .badge-danger {
        background: #f8d7da;
        color: #721c24;
      }

      .badge-warning {
        background: #fff3cd;
        color: #856404;
      }

      .badge-success {
        background: #d4edda;
        color: #155724;
      }

      .btn-retirar {
        background: #007bff;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn-retirar:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }
    `,
  ],
})
export class FichaProducto {
  producto = input.required<Producto>();
  retirar = output<void>();

  estado = computed(() => {
    const existencias = this.producto().existencias;

    if (existencias === 0) {
      return 'Agotado';
    }

    if (existencias <= 3) {
      return 'Inventario bajo';
    }

    return 'Disponible';
  });
}
