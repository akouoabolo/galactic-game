let dgram = require('dgram');
let quizDataGlobal = null;

const res = fetch('tempquestions.json', { method: 'GET' });
const QUIZ_DATA = res.json();
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

        /*case 'getquizdata':
            responseData = JSON.stringify({
                status: "ok",
                message: "quiz_list",
                quiz: [
                    {
                        "question": "Quel est l'objet le plus gros de l'univers",
                        "propositions": [
                            "Le soleil",
                            "La terre",
                            "La lune",
                            "Un trou noir"
                        ],
                        "reponse": 0
                    },
                ]
            });*/

            case 'getquizdata':
              responseData = JSON.stringify({
                status: "ok",
                message: "quiz_list",
                quiz: quizDataGlobal
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

    }

}); MainServer.bind(MainPort, () => console.log("Main serveur a démarré"));

// Controlleur des clie
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

            if (!deviceRegistered(parsedMessage.device)) { // S'il n'est pas encore enregistré
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
            console.log(parsedMessage.verdict);
            console.log(parsedMessage.player);

            if (parsedMessage.verdict == true) { // S'il a trouvé la réponse
                let player = getPlayerNextTo(parsedMessage.player.id);

                sendMessageToPlayers("next_question", {
                    turn: player
                });

                // Informe le main de la question next
                MainServer.send(JSON.stringify({
                    message: "next_question",
                    turn: player
                }), SERVER_DATA.port, SERVER_DATA.ip);
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
    }

}); ClieServer.bind(CliePort, () => { console.log('Clies server a démarré') });