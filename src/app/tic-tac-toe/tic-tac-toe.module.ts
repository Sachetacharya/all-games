import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { BoardComponent } from './component/board/board.component';
import { BoxComponent } from './component/box/box.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TicTacToeRoutingModule,
    BoardComponent,

  ]
})
export class TicTacToeModule { }
