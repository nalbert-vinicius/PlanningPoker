import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute } from '@angular/router';
import { SocketIoService } from '../socket-io.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  Cardfibo: any[] = [0,1,2,3,5,8,13,21,34,55,59];
  CardSmallFibo: any[] = [0,1,1,2,3,5,8,13,20,40,100];
  text = "";
  idSala: any;
  nomeUsuario: any;

  players: any[] = [];



  constructor(
    private clipboardService: ClipboardService,
    private Route: ActivatedRoute,
    private socketIoService: SocketIoService
  ) { }

  ngOnInit(): void {
    this.Route.params.subscribe((data: any) =>{
      this.idSala = data.id
      this.text = "http://localhost:4200/room/"+data.id;
    })

    this.socketIoService.GetDadosPlayer().subscribe((data:any) =>{
      data.forEach(element => {
        if(element.idSala = this.idSala){
          this.players = [];
          element.players.forEach(element => {
            this.players.push(element)
          });
        }
      });
    });
  }

  votar(data: any){
    this.socketIoService.votar(data);
  }
  

  copiarLink() {
    this.clipboardService.copyFromContent(this.text)
  }

}
