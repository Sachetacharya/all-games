import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tic-tac-toe/tic-tac-toe-routing.module').then((module => module.TicTacToeRoutingModule)),
    // loadComponent: () =>
  }
];
