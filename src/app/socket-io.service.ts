import { Injectable } from '@angular/core';
import socketIO from 'socket.io-client';
import { Subject } from 'rxjs';
import { createOfflineCompileUrlResolver } from '@angular/compiler';


@Injectable({
    providedIn: 'root'
})
export class SocketIoService {

    private url = 'http://localhost:5000';
    private socket = socketIO(this.url);

    constructor(

    ){}

    criarSessao(data: string){
        return new Promise((resolve, reject) =>{
            this.socket.emit('criarSessao', data)
        })
    }

}