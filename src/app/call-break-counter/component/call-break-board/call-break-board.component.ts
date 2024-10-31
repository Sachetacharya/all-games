import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Player } from '../../model/player.model';
import { ScoreService } from '../../services/score/score.service';
import { FormsModule } from '@angular/forms';
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-call-break-board',
  standalone: true,
  imports: [CommonModule, FormsModule, PlayerComponent],
  templateUrl: './call-break-board.component.html',
  styleUrl: './call-break-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallBreakBoardComponent implements OnInit {
  players: Player[] = [];
  tricksWon: { [playerName: string]: number[] } = {};
  totalTricks: { [playerName: string]: number } = {};
  rounds: number[] = [0, 1, 2, 3]; // Example round indices

  constructor(private scoreService: ScoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.scoreService.players$.subscribe(players => {
      this.players = players;

      // Initialize tricksWon for each player
      players.forEach(player => {
        if (!this.tricksWon[player.name]) {
          this.tricksWon[player.name] = Array(4).fill(0);
        }
      });
      this.cdr.detectChanges();
    });
  }

  setTricksWon(playerName: string, round: number, tricks: number) {
    this.tricksWon[playerName][round] = tricks;
  }

  getTricksWon(playerName: string, round: number): number {
    return this.tricksWon[playerName]?.[round] || 0; // Return 0 if undefined
  }

  calculateTricks() {
    this.totalTricks = {}; // Reset total tricks
    this.players.forEach(player => {
      this.totalTricks[player.name] = this.tricksWon[player.name].reduce((acc, curr) => acc + curr, 0);
    });
  }
}