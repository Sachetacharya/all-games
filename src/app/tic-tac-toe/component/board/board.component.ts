import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  squares: string[] = [];
  xIsNext: boolean = false;
  winner: string | null = '';

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(): null | string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i of lines) {
      const [a, b, c] = i;
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}