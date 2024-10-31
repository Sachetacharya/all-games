import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../model/player.model';
import { ScoreService } from '../../services/score/score.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  newPlayerName: string = '';
  bids: { [key: string]: number } = {};
  players: Player[] = [];  // Define players property

  constructor(private scoreService: ScoreService) { }
  ngOnInit() {
    // Subscribe to the players observable to update the players array
    this.scoreService.players$.subscribe(players => {
      this.players = players;
    });
  }
  addPlayer() {
    if (!this.newPlayerName.trim()) {
      alert('Please enter a valid player name.');
      return;
    }

    const newPlayer: Player = {
      name: this.newPlayerName,
      bid: 0,
      points: 0,
      tricksWon: Array(4).fill(0), // Initialize tricks array for 4 rounds
    };

    this.scoreService.addPlayer(newPlayer); // Use service to add the player
    this.bids[newPlayer.name] = 0;
    this.newPlayerName = ''; // Clear the input field
  }

  setBid(playerName: string, bid: number) {
    this.bids[playerName] = bid;
    this.scoreService.updateBid(playerName, bid); // Use service to update the bid
  }

  resetGame() {
    this.scoreService.resetGame(); // Use service to reset game data
  }
}
