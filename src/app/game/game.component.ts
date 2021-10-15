import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketIoService } from '../socket-io.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  Cardfibo: any[] = [0,1,2,3,5,8,13,21,34,55,59, '?'];
  CardSmallFibo: any[] = [0,1,1,2,3,5,8,13,20,40,100, '?'];
  linkClipboard = "";
  idSala: any;
  players: any[] = [];
  visible: boolean = true;
  virado: boolean = true;
  admin: string;
  tipo: any;
  sala: any;

  constructor(
    private clipboardService: ClipboardService,
    private Route: ActivatedRoute,
    private router: Router,
    private socketIoService: SocketIoService
  ) { }

  ngOnInit(): void {
    this.Route.params.subscribe((data: any) =>{
      this.idSala = data.id
      this.linkClipboard = "http://localhost:4200/"+data.id;
    })

    if(localStorage.getItem('userName') !=undefined){
      this.admin = localStorage.getItem('admin');
      this.socketIoService.GetDadosPlayer().subscribe((data:any) =>{
        if(data.idSala = this.idSala){
          this.sala = data.nomeSala;
          this.tipo = data.tipoCarta;
          this.players = [];
          data.players.forEach(element => {
            this.players.push(element)
          });
        }
      });

      this.socketIoService.GetVote().subscribe((data: any) =>{
        this.players = [];
        this.players = data.players;
      })

      this.socketIoService.GetStatus().subscribe((virar: any) =>{
        this.virado = virar;
      })
    }else{
      this.router.navigate([`${this.idSala}`])
    }
  }
    

  votar(card: any){
    this.visible = false;
    this.virado = true;
    var data = {
      voto: card,
      idSala: this.idSala,
      player: localStorage.getItem('userName')
    }
    this.socketIoService.votar(data);
  }

  virarCartas(){
    this.socketIoService.virar({idSala: this.idSala, virar: false});
  }
  

  copiarLink() {
    this.clipboardService.copyFromContent(this.linkClipboard)
  }

  ngOnDestroy(): void {
    localStorage.clear();
    console.log("Componente destruido")
  }

}
