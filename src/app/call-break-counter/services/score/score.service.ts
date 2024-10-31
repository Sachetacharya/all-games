import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();

  private tricksWonSubject = new BehaviorSubject<{ [playerName: string]: number[] }>({});
  tricksWon$ = this.tricksWonSubject.asObservable();

  constructor() { }

  addPlayer(player: Player) {
    const currentPlayers = this.playersSubject.value;
    if (currentPlayers.some(p => p.name === player.name)) {
      console.error('Player already exists');
      return;
    }

    this.playersSubject.next([...currentPlayers, player]);

    // Initialize tricks for this player if not already set
    const currentTricksWon = this.tricksWonSubject.value;
    currentTricksWon[player.name] = Array(4).fill(0);
    this.tricksWonSubject.next({ ...currentTricksWon });
  }


  updateBid(playerName: string, bid: number) {
    const players = this.playersSubject.value.map(player =>
      player.name === playerName ? { ...player, bid } : player
    );
    this.playersSubject.next(players);
  }

  updateTricksWon(playerName: string, round: number, tricks: number) {
    const currentTricksWon = { ...this.tricksWonSubject.value };
    if (!currentTricksWon[playerName]) {
      currentTricksWon[playerName] = Array(4).fill(0);
    }
    currentTricksWon[playerName][round] = tricks;
    this.tricksWonSubject.next(currentTricksWon);
  }

  resetGame() {
    this.playersSubject.next([]);
    this.tricksWonSubject.next({});
  }

  getPlayer(name: string): Player | undefined {
    return this.playersSubject.value.find(player => player.name === name);
  }
}
