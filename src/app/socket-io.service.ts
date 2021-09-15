import { Injectable } from '@angular/core';
import socketIO from 'socket.io-client';
import { Router } from '@angular/router';
import * as socketConst from './shared/socket-constants.js';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SocketIoService {

    private url = 'http://localhost:5000';
    private socket = socketIO(this.url);

    private subData: Subject<any> = new Subject<any>();

    constructor(
        private route: Router,
    ){
        this.socket.on(socketConst.ENTRAR_GAME, (data: any) =>{
            this.subData.next(data);
        })
    }

    async criarSessao(data: any){
        return await new Promise((resolve, reject) =>{
            this.socket.emit(socketConst.CRIAR_GAME, data)
            this.route.navigate([`room/${data.idSala}`])
        })
    }

    async entrarSessao(data: any){
        return await new Promise((resolve, reject) =>{
            this.socket.emit(socketConst.ENTRAR_GAME, data)
            this.route.navigate([`room/${data.idSala}`])
        })
    }

    GetDadosPlayer(){
        return this.subData.asObservable();  
    }
}