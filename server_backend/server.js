const socketConst = require('./socket-constants');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').Server(app);


const gameService = require('./registroGame');



app.use(cors());

const io = require('socket.io')(http, {cors: {origin: '*'}});

io.on('connection', (socket) =>{

    socket.on(socketConst.CRIAR_GAME, (data) =>{
        var gameStatus = gameService.criarJogo(data)
        socket.join(data.idSala);
        io.to(data.idSala).emit(socketConst.ENTRAR_GAME, gameStatus)
    })

    socket.on(socketConst.ENTRAR_GAME, (data) =>{
      var gameStatus = gameService.inserirPlayer(data)
      socket.join(data.idSala);
      //emite para a sala do id especifico
      io.to(data.idSala).emit(socketConst.ENTRAR_GAME, gameStatus)
    })

    socket.on(socketConst.VOTAR_GAME, (data) =>{
        var gameStatus = gameService.inserirVoto(data)
        io.to(data.idSala).emit(socketConst.VOTAR_GAME, gameStatus);
    })



    socket.on('disconnect', () =>{
        console.log("Usuário desconectado!")
    })
})




http.listen(port, () =>{
    console.log("Servidor rodando na porta", port)
})