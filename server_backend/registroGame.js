
let games = [];

const criarJogo = (data) =>{
    const gameStatus = {
        nomeSala: data.nomeSala,
        idSala: data.idSala,
        tipoCarta: data.tipoCarta,
        espectador: data.espectador,
        players: [data.nomeUsuario],
        votacao: []
    }
    games.push(gameStatus);
    return  games;
}

const inserirPlayer = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            games[i].players.push(data.nomeUsuario)
            return  games;
        }
    }
}

const inserirVotacao = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            games[i].votacao.push([data.voto, data.nomeUsuario])
        }
    }
}


module.exports = {
    criarJogo,
    inserirPlayer,
    inserirVotacao
}