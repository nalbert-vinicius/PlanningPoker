import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private socketIoService: SocketIoService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) { }

  formCriaSessao: FormGroup = this.formBuilder.group({
    nomeUsuario: [''],
    nomeSala: [''],
    tipoCarta: [''],
    espectador: ['']
  })

  formEntrarSessao: FormGroup = this.formBuilder.group({
    nomeUsuario: [''],
    idSala: ['']
  }) 

  ngOnInit() {
  }

  criarSessao(){
    var sala = {
      nomeUsuario: this.formCriaSessao.value.nomeUsuario,
      nomeSala: this.formCriaSessao.value.nomeSala,
      tipoCarta: this.formCriaSessao.value.tipoCarta,
      espectador: this.formCriaSessao.value.espectador,
      idSala: this.uuid()
    }
    console.log(sala)
    this.socketIoService.criarSessao(sala)
  }

  entrarSessao(){
    var sessao = {
      nomeUsuario: this.formEntrarSessao.value.nomeUsuario,
      idSala: this.formEntrarSessao.value.idSala,
    }
    this.socketIoService.entrarSessao(sessao)
  }

  uuid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
