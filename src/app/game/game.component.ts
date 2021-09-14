import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  Cardfibo: any[] = [0,1,2,3,5,8,13,21,34,55,59]

  constructor() { }

  ngOnInit(): void {
  }



}
