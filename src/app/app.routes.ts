import { Routes } from '@angular/router';
import { Inventario } from './parcial1/inventario';
export const routes: Routes = [
  { path: 'parcial1', component: Inventario },
  { path: '', redirectTo: 'parcial1', pathMatch: 'full' },
];
