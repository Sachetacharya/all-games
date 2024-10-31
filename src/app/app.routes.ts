import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tic-tac-toe/tic-tac-toe-routing.module').then((module => module.TicTacToeRoutingModule)),
  },
  {
    path: 'connect-four',
    loadChildren: () => import('./connect-four/connect-four-routing.module').then((module => module.ConnectFourRoutingModule)),
  }
];
