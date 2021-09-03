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
    nomeSala: ['']
  })

  ngOnInit() {
  }

  criarSessao(){

  }

}
