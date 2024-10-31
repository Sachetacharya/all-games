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
  squares: (string | null)[] = [];  // Updated to allow 'null' values
  xIsNext: boolean = false;
  winner: string | null = null;     // Updated to allow 'null'
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
  get isDraw(): boolean {
    return this.squares.every(square => square !== null) && !this.winner;
  }
  get getWinnerMessage(): string {
    if (this.winner) {
      if (this.gameMode === 'computer') {
        return this.winner === 'O' ? 'Computer Wins!' : 'You Win!';
      }
      return `Player ${this.winner} Wins!`;
    }
    return '';
  }
  makeMove(idx: number): void {
    if (!this.squares[idx] && !this.winner) {
      this.squares[idx] = this.player;
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();

      // Delay the computer's move if in "vs Computer" mode
      if (this.gameMode === 'computer' && !this.winner && !this.xIsNext) {
        setTimeout(() => this.computerMove(), 500); // 500ms delay
      }
    }
  }

  computerMove(): void {
    const bestMove = this.minimax(this.squares, 'O').index;
    if (bestMove !== undefined) {
      this.squares[bestMove] = 'O';
      this.xIsNext = !this.xIsNext;
      this.winner = this.calculateWinner();
    }
  }

  minimax(newSquares: (string | null)[], player: string): { score: number; index?: number } {
    const availableMoves = newSquares.reduce<number[]>((acc, val, idx) => {
      if (val === null) acc.push(idx);
      return acc;
    }, []);

    // Base cases for minimax algorithm
    const winner = this.calculateWinner();
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    const moves: { score: number; index: number }[] = [];

    for (const idx of availableMoves) {
      // Ensure that move has both 'index' and 'score' properties
      const move: { score: number; index: number } = { index: idx, score: 0 };
      newSquares[idx] = player;

      // Recursive call for minimax to evaluate all potential moves
      const result = this.minimax(newSquares, player === 'O' ? 'X' : 'O');
      move.score = result.score;

      newSquares[idx] = null;
      moves.push(move);
    }

    // Find the best move based on the current player
    let bestMove: { score: number; index: number };
    if (player === 'O') {
      bestMove = moves.reduce((best, curr) => (curr.score > best.score ? curr : best));
    } else {
      bestMove = moves.reduce((best, curr) => (curr.score < best.score ? curr : best));
    }

    return bestMove;
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
