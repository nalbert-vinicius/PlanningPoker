
let games = [];

const criarJogo = (data) =>{
    const gameStatus = {
        nomeSala: data.nomeSala,
        idSala: data.idSala,
        tipoCarta: data.tipoCarta,
        espectador: data.espectador,
        players: [data.nomeUsuario]
    }
    games.push(gameStatus);
    return  games;
}

const verificaGame = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            games[i].players.push(data.nomeUsuario)
            return  games;
        }
    }
}


module.exports = {
    criarJogo,
    verificaGame
}