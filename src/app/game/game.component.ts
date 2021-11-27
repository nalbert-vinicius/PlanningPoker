import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketIoService } from '../socket-io.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-in')),
      transition('inactive => active', animate('500ms ease-out'))
    ])
  ]
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
  media: any;
  flip: string = 'active';
  reverse: string = 'inactive';
  verifica: boolean = false;
  clickedIndex: number;
  travarCarta: boolean;


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
            console.log(element)
            if(element.player == localStorage.getItem('userName')){
              this.travarCarta = element.travarCarta;
            }
            this.players.push(element)
          });
        }
      });

      this.socketIoService.GetVote().subscribe((data: any) =>{
        this.players = [];
        this.players = data.players;
      })

      this.socketIoService.GetStatus().subscribe((data: any) =>{
        this.travarCarta = data.travarCarta;
        this.virado = data.virar;
        this.media = data.media;
      })

      this.socketIoService.ReiniciarGame().subscribe((data: any) =>{
        this.players = data.players;
        this.media = undefined;
        this.clickedIndex = null;
      })

    }else{
      this.router.navigate([`${this.idSala}`])
    }
  }
    

  votar(card: any,i){
    this.clickedIndex = i;
    this.visible = false;
    this.virado = true;
    var data = {
      voto: card,
      idSala: this.idSala,
      player: localStorage.getItem('userName'),
    }
    this.socketIoService.votar(data);
  }

  virarCartas(){
    this.travarCarta = true;
    this.verifica = true;
    this.media = 0;
    this.players.forEach(element => {
      this.media = this.media + element.carta
    });
  
    if(this.media!=0){
      this.media = this.media/this.players.length;
    }
    this.socketIoService.virar({idSala: this.idSala, virar: false, media: this.media, travarCarta: this.travarCarta});
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
  

  copiarLink() {
    this.clipboardService.copyFromContent(this.linkClipboard)
  }

  reiniciarGame(){
    this.clickedIndex = null;
    this.socketIoService.restart(this.idSala)
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

}
