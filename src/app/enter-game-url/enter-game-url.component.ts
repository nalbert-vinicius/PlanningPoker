import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketIoService } from '../socket-io.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-game-url',
  templateUrl: './enter-game-url.component.html',
  styleUrls: ['./enter-game-url.component.css']
})
export class EnterGameUrlComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private socketIoService: SocketIoService,
    private Route: ActivatedRoute
  ) { }

  
  formEntrarSessao: FormGroup = this.formBuilder.group({
    nomeUsuario: ['', Validators.required],
    idSala: ['', Validators.required],
    espectador: [false]
  }) 

  ngOnInit(): void {
    this.Route.params.subscribe((data: any) =>{
      this.formEntrarSessao.controls['idSala'].setValue(data.id);
    })
  }

  entrarSessao(){
    localStorage.setItem('userName', this.formEntrarSessao.value.nomeUsuario)
    var sessao = {
      nomeUsuario: this.formEntrarSessao.value.nomeUsuario,
      idSala: this.formEntrarSessao.value.idSala,
    }
    this.socketIoService.entrarSessao(sessao)
  }

  ngOnDestroy(): void {
    localStorage.clear();
    console.log("Componente destruido")
  }
}
