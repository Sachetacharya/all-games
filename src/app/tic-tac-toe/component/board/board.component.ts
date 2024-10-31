import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class BoardComponent implements OnInit {
  squares: string[] = [];
  xIsNext: boolean = false;
  winner: string | null = '';
  gameMode: 'human' | 'computer' = 'human';

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  setMode(mode: 'human' | 'computer'): void {
    this.gameMode = mode;
    this.newGame();
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (!this.squares[idx] && !this.winner) {
      this.squares[idx] = this.player;
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();

      // Delay the computer's move if in "vs Computer" mode
      if (this.gameMode === 'computer' && !this.winner && !this.xIsNext) {
        setTimeout(() => this.computerMove(), 500); // 2-second delay
      }
    }
  }

  computerMove(): void {
    const availableMoves = this.squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];

    if (availableMoves.length > 0) {
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      this.squares[move] = 'O';
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
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
    for (let [a, b, c] of lines) {
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