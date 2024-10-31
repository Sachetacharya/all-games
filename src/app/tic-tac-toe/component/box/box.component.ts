import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  constructor() { }
  @Input() value: 'X' | 'O' | any;
}
