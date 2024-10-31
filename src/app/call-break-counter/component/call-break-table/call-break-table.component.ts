import { Component } from '@angular/core';
import { Player } from '../../model/player.model';
import { ScoreService } from '../../services/score/score.service';
import { CallBreakBoardComponent } from "../call-break-board/call-break-board.component";
import { PlayerComponent } from "../player/player.component";

@Component({
  selector: 'app-call-break-table',
  standalone: true,
  imports: [CallBreakBoardComponent, PlayerComponent],
  templateUrl: './call-break-table.component.html',
  styleUrl: './call-break-table.component.scss'
})
export class CallBreakTableComponent {
  players: Player[] = [];

  constructor(private scoreService: ScoreService) { }
}
