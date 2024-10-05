let dgram = require('dgram');
let quizDataGlobal = null;

const QUIZ_DATA = JSON.parse(`
[
{
"question":"quel est l' objet le plus gros de l' univers",
"propositions":[
"le soleil",
"la terre",
"la lune",
"un trou noir"
],
"reponse":0
},
{
"question":"quel est le premier homme à avoir marché sur la lune",
"propositions":[
"neil armstrong",
"buzz aldrin",
"michael collins",
"johen glenn"
],
"reponse":0
},
{
"question":"quel est l'avion le plus rapide du monde",
"propositions":[
"concorde",
"boeing 747",
"airbus a380",
"lockheed sr-71"
],
"reponse":3
},
{
"question":"quel est l'avion le plus grand du monde",
"propositions":[
"airbus a380",
"boeing 747",
"antonov an-225",
"c-5 galaxy"
],
"reponse":2
},
{
"question":"quel est la première femme à avoir voyagé dans l'espace",
"propositions":[
"valentina tereshkova",
"sally ride",
"mae jemison",
"yuri gagarine"
],
"reponse":0
},
{
"question":"quel est l'astronaute le plus âgé",
"propositions":[
"johen glenn",
"scott kelly",
"neil armstrong",
"yuri gagarine"
],
"reponse":0
},
{
"question":"quel est la planète la plus éloignée du soleil",
"propositions":[
"neptune",
"uranus",
"saturne",
"pluton"
],
"reponse":0
},
{
"question":"quel est la planète la plus chaude du système solaire",
"propositions":[
"mercure",
"vénus",
"mars",
"jupiter"
],
"reponse":1
},
{
"question":"quelle est la planète la plus proche du soleil",
"propositions":[
"mercure",
"vénus",
"terre",
"mars"
],
"reponse":0
},
{
"question":"quelle est la planète la plus éloignée du soleil",
"propositions":[
"neptune",
"uranus",
"saturne",
"pluton"
],
"reponse":0
},
{
"question":"combien de kilomètre séparent la terre du soleil",
"propositions":[
"10 millions",
"50 millions",
"150 millions",
"300 millions"
],
"reponse":2
},
{
"question":"quelle planète a la plus forte gravité du système solaire",
"propositions":[
"jupiter",
"saturne",
"uranus",
"neptune"
],
"reponse":0
},
{
"question":"quelle est la planète a la plus faible gravité du système solaire",
"propositions":[
"mercure",
"mars",
"pluton",
"éris"
],
"reponse":2
},
{
"question":"quelle est la gravité de la terre",
"propositions":[
"5m/s2",
"10m/s2",
"9,8m/s2",
"20m/s2"
],
"reponse":2
},
{
"question":"quelle est la planète la plus rapide en termes de rotation",
"propositions":[
"jupiter",
"saturne",
"uranus",
"neptune"
],
"reponse":0
},
{
"question":"quelle est la planète la plus lente en termes de rotation",
"propositions":[
"vénus",
"mars",
"terre",
"uranus"
],
"reponse":0
},
{
"question":"combien de voyages lunaires ont été effectués",
"propositions":[
"5",
"6",
"7",
"8"
],
"reponse":1
},
{
"question":"quel est le record de duréee dans l'espace pour un astronaute",
"propositions":[
"1 an",
"2 ans",
"3 ans",
"4 ans"
],
"reponse":0
},
{
"question":"combien de femmes ont volé dans l'espace",
"propositions":[
"10",
"20",
"30",
" plus de 60"
],
"reponse":3
},
{
"question":"quelle est la fusée la plus puissante jamais construite",
"propositions":[
"saturn v",
"space shuttle",
"falcon heavy",
"ariane 5"
],
"reponse":0
},
{
"question":"quelle fusée a transporté le premier homme sur la lune",
"propositions":[
"appollo 11",
 "gemini 12",   
"mercury 7",
"saturn v"
],
"reponse":0
},
{
"question":"quelle est la fusée la plus réutilisable",
"propositions":[
"space shuttle",
"falcon 9",
"ariane 5",
"vega"
],
"reponse":1
},
{
"question":"combien de personne ont volé dans l'espace",
"propositions":[
"100",
"500",
"100",
"plus de 600"
],
"reponse":3
},
{
"question":"quel est le record de personnes à bord d'un vaisseau spatial",
"propositions":[
"5",
"7",
"10",
"14"
],
"reponse":1
},
{
"question":"quelle est la sperficie de la station spatiale internationale",
"propositions":[
"1000 m2",
"5000 m2",
"10000 m2",
"15000 m2"
],
"reponse":2
},
{
"question":"quelle est la longeur de la fusée saturn v",
"propositions":[
"50 m",
"100 m",
"110 m",
"120 m"
],
"reponse":2
},
{
"question":"qui est la premiére femme à avoir volé dans l'espace",
"propositions":[
"valentina tereshkova",
"sally ride",
"mae jemison",
"yuri gagarine"
],
"reponse":0
},
{
"question":"quelle  femme a passé le plus de temps dans l'espace ",
"propositions":[
"peggy whitson",
"sally ride",
"mae jemison",
"valentina tereshkova"
],
"reponse":0
},
{
"question":"quelle femme a réalisé le première pas dans l'espace   ",
"propositions":[
"valentina tereshkova",
"sally ride",
"mae jemison",
"peggy whitson"
],
"reponse":0
},
{
"question":"quelle femme a effectué la première sortie extravéhiculaire",
"propositions":[
"sally ride",
"mae jemison",
"peggy whitson",
"svetlana savitskaya"
],
"reponse":3
}
]  
`);
let currentQuizIndex = 0;


const { parse } = require('path');

// Données joueurs
let WAITING_LIST = [];
let PLAYERS_LIST = [];
let SERVER_DATA  = {};

// Infos
const MainPort = 4456;
const CliePort = 3345;

const MainServer = dgram.createSocket("udp4");
const ClieServer = dgram.createSocket("udp4");

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendMessageToPlayers(msg, dat) {
    PLAYERS_LIST.forEach((player) => {

        let port = player.port;
        let addr = player.addr;

        let datas = {
            message: msg,
            data: dat
        }

        ClieServer.send(JSON.stringify(datas), port, addr);

    });
}

function deviceRegistered(deviceId) {

    for (let i = 0; i < WAITING_LIST.length; i++) {
        if (deviceId == WAITING_LIST[i].device) {
            return true;
        }
    }

    return false;
}

function getPlayerRegister(deviceId) {

    for (let i = 0; i < WAITING_LIST.length; i++) {
        if (deviceId == WAITING_LIST[i].device) {
            return WAITING_LIST[i];
        }
    }

    return false;
}

function getPlayerNextTo(playerId) {
    for (let i = 0; i < PLAYERS_LIST.length; i++) {
        if (playerId != PLAYERS_LIST[i].id) {
            return PLAYERS_LIST[i];
        }
    }

    return false;
}

// Controlleur du space
MainServer.on('message', (msg, res) => {

    let incomingMessage = msg.toString();
    console.log(incomingMessage);

    let parsedMessage = JSON.parse(incomingMessage);

    // Comportement fonction du msg
    let responseData = "";

    switch (parsedMessage.message) {

        case 'request_connection':
            responseData = JSON.stringify({
                status: "ok",
                message: "to_waiting_room"
            });

            SERVER_DATA = { ip : res.address, port : res.port };

            MainServer.send(responseData, res.port, res.address);
            break;

        case 'getwaitinglist':
            responseData = JSON.stringify({
                status: "ok",
                message: "waiting_list",
                waitingList: WAITING_LIST
            });

            MainServer.send(responseData, res.port, res.address);
            break;

        case 'getquizdata':
            responseData = JSON.stringify({
                status: "ok",
                message: "quiz_list",
                quiz: [QUIZ_DATA[currentQuizIndex]]
            });
            
            MainServer.send(responseData, res.port, res.address);
            break;

        case 'start_game':

            PLAYERS_LIST = parsedMessage.playersList;
            sendMessageToPlayers("game_started", { turn: parsedMessage.playerTurn, quiz: parsedMessage.currentQuiz });

            MainServer.send(JSON.stringify({
                message: "players_ready"
            }), res.port, res.address);
            break;

            case 'reinit_game':
        // Code pour gérer la réinitialisation
        console.log("Reinitialisation de la partie");
            initNewGame();
           
             break;

           
    }

}); MainServer.bind(MainPort, () => console.log("Main serveur a démarré"));

// Controlleur des client
ClieServer.on('message', (msg, res) => {

    let incomingMessage = msg.toString();
    let parsedMessage = "";

    try {
        parsedMessage = JSON.parse(incomingMessage);
    } catch {
        parsedMessage = JSON.parse(JSON.stringify({ message: "nodata" }));
    }

    switch (parsedMessage.message) {

        case 'search_a_match': // Joueurs are looking for a match

            // Add new to the waiting list
            let newPlayerID = getRandomInteger(1001, 1999);

            let newPlayer = {
                id: newPlayerID,
                name: "joueur " + newPlayerID,
                addr: res.address,
                port: res.port,
                device: parsedMessage.device
            }

            if (true) { // S'il n'est pas encore enregistré
                WAITING_LIST.push(newPlayer);

                console.log("Un nouveau joueur", newPlayer);

                ClieServer.send(JSON.stringify({
                    message: 'in_waiting_room',
                    data: newPlayer
                }), res.port, res.address, (err) => {
                    if (err) {
                        console.log("Erreur de réponse ", err.message);
                    } else {
                        console.log("Message sent successfully");
                    }
                });

            } else { // Si c'est le cas

                let playerData = getPlayerRegister(parsedMessage.device);

                ClieServer.send(JSON.stringify({
                    message: 'in_waiting_room',
                    data: playerData
                }), res.port, res.address);
            }

            break;

        case 'player_reponse': // Joueurs infofrme de sa réponse
         if (parsedMessage.verdict == false) {
            sendLooseLifeMessage();
            console.log(parsedMessage.verdict)
        }
            // console.log(parsedMessage.verdict);
            // console.log(parsedMessage.player);

            if (parsedMessage.verdict == true) { // S'il a trouvé la réponse
                let player = getPlayerNextTo(parsedMessage.player.id);

                currentQuizIndex++;
                sendMessageToPlayers("next_question", {
                    turn: player,
                    quiz: QUIZ_DATA[currentQuizIndex],
                    index: currentQuizIndex
                });

                // Informe le main de la question next
                MainServer.send(JSON.stringify({
                    message: "next_question",
                    turn: player,
                    quiz: [QUIZ_DATA[currentQuizIndex]],
                    index: currentQuizIndex
                }), SERVER_DATA.port, SERVER_DATA.ip);

                console.log("Next question : ");
            }
            break;
    
        case 'player_shake' :
                // Informe le main de la question next
                MainServer.send(JSON.stringify({
                    message: "player_shake",
                    player: parsedMessage.player,
                    shakeValue: parsedMessage.shakeValue
                }), SERVER_DATA.port, SERVER_DATA.ip);

                console.log("Shake Force : " + parsedMessage.shakeValue);
            break;

            case 'player_loose_life':
                // Gérer la perte de vie ici
                sendLooseLifeMessage();
                console.log('Joueur a perdu une vie');
                break;

    }

}); ClieServer.bind(CliePort, () => { console.log('Clies server a démarré') });



function initNewGame() {
   
    // Réinitialiser les données de jeu
    WAITING_LIST = [];
    currentQuizIndex = Math.floor(Math.random() * QUIZ_DATA.length);
    sendMessageToPlayers("game_reset", {});
   
    // ...
    // Envoyer un message aux clients pour les informer que le jeu a été réinitialisé
    

    MainServer.send(JSON.stringify({
        message: "game_reset"
    }), SERVER_DATA.port, SERVER_DATA.ip);
}

function sendLooseLifeMessage() {
  MainServer.send(JSON.stringify({
    message: 'player_loose_life'
  }), SERVER_DATA.port, SERVER_DATA.ip);
}