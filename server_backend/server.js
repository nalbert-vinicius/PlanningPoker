const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').Server(app);


app.use(cors());

const io = require('socket.io')(http, {cors: {origin: '*'}});

io.on('connection', (socket) =>{
    
})




http.listen(port, () =>{
    console.log("Servidor rodando na porta", port)
})