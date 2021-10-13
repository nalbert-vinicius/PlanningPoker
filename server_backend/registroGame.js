
let games = [];

const criarJogo = (data) =>{
    const gameStatus = {
        nomeSala: data.nomeSala,
        idSala: data.idSala,
        tipoCarta: data.tipoCarta,
        espectador: data.espectador,
        players: [{player: data.nomeUsuario, carta: 0, status: ''}],
    }
    games.push(gameStatus);
    return  gameStatus;
}

const inserirPlayer = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            games[i].players.push({player: data.nomeUsuario, carta: 0, status: ''})
            return  games[i];
        }
    }
}

const inserirVoto = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            for (let k = 0; k < games[i].players.length; k++) {
                if(games[i].players[k].player == data.player){
                    games[i].players[k].carta = data.voto;
                    games[i].players[k].status = 'voting';
                    return games[i];
                }
            }
            games[i].players.push({player: data.player, carta: data.voto,  status: 'voting'})
            return games[i];  
        }
    }
}


module.exports = {
    criarJogo,
    inserirPlayer,
    inserirVoto
}