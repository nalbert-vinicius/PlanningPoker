
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
    return  gameStatus;
}

const inserirPlayer = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            games[i].players.push(data.nomeUsuario)
            return  games[i];
        }
    }
}

const inserirVoto = (data) =>{
    for (let i = 0; i < games.length; i++) {
        if(games[i].idSala == data.idSala){
            if(games[i].votacao.length == 0){
                //Insere primeiro voto
                games[i].votacao.push({carta: data.voto, player: data.player})
                return games[i];
            }else{
                for (let k = 0; k < games[i].votacao.length; k++) {
                    // Verifica se o player já votou
                    if(games[i].votacao[k].player == data.player){
                        games[i].votacao[k].carta = data.voto
                        return games[i];
                    }
                }
                // Insere primeiro voto de outros players
                games[i].votacao.push({carta: data.voto, player: data.player})
                return games[i];               
            }
        }
    }
}


module.exports = {
    criarJogo,
    inserirPlayer,
    inserirVoto
}