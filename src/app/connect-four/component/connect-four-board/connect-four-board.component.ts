import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-connect-four-board',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule, BrowserModule],
  templateUrl: './connect-four-board.component.html',
  styleUrl: './connect-four-board.component.scss',
  animations: [
    trigger('dropAnimation', [
      state('void', style({ transform: 'translateY(-100%)' })),
      transition('void => player1, void => player2', [
        animate('0.5s ease-out', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ConnectFourBoardComponent {
  board: number[][] = [];
  currentPlayer: number = 1; // 1 for Player 1, 2 for Player 2
  rows: number = 6;
  columns: number = 7;
  gameOver: boolean = false;

  constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
  }

  makeMove(column: number) {
    if (this.gameOver) return;

    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        this.board[row][column] = this.currentPlayer;
        if (this.checkWin(row, column)) {
          this.gameOver = true;
          alert(`Player ${this.currentPlayer} wins!`);
        }
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; // Switch players
        break;
      }
    }
  }

  checkWin(row: number, column: number): boolean {
    // Check horizontal, vertical, and diagonal for a win
    return (
      this.checkDirection(row, column, 1, 0) || // Horizontal
      this.checkDirection(row, column, 0, 1) || // Vertical
      this.checkDirection(row, column, 1, 1) || // Diagonal \
      this.checkDirection(row, column, 1, -1)   // Diagonal /
    );
  }

  checkDirection(row: number, column: number, rowDelta: number, colDelta: number): boolean {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
      const r = row + i * rowDelta;
      const c = column + i * colDelta;
      if (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.board[r][c] === this.currentPlayer) {
        count++;
        if (count === 4) return true; // Four in a row
      } else {
        count = 0; // Reset count if the chain is broken
      }
    }
    return false;
  }

  resetGame() {
    this.initializeBoard();
    this.currentPlayer = 1;
    this.gameOver = false;
  }
}