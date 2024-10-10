const dgram = require('dgram');
const Websocket = require("ws");

require('dotenv').config();


const QUIZ_DATA = JSON.parse(`
[
{    
"question": "Why do astronauts have to cut their hair in space?",
"propositions": [
 "Because they all want a celebrity look",
 "Because they can't go to the hairdresser",
 "no answer is correct",
"To prevent hair from floating everywhere"
],
 "reponse":3
},
{
"question": "How often do astronauts see sunrise in space?",
"propositions": [
 "Every day",
 "Every 90 minutes",
"no answer is correct",
 "Once a week"
],
"reponse":1
},
{
 "question": "What is one of the 'misfortunes' astronauts face in space?",
"propositions": [
"Boredom",
"no answer is correct",
"Lack of Wi-Fi",
"Claustrophobia"
],
 "reponse":3
},
{
 "question": "What do astronauts feel because of zero gravity?",
 "propositions": [
 "They feel light as a feather",
 "They feel like they have a bad cold",
 "They become professional acrobats",
"no answer is correct"
],
"reponse":1
},
{
"question": "What do astronauts need to do to avoid losing muscle in space?",
"propositions": [
"Exercise for two hours a day",
"Dance the Macarena",
"no answer is correct",
"Eat a lot of chocolate"
],
"reponse":0
},
{
 "question": "Why do astronauts not have to worry about germs like on Earth?",
 "propositions": [
 "Because they have anti-germ spray",
 "Because they are on vacation",
 "Because the only germs are the ones they bring with them",
"no answer is correct"
],
"reponse":2
},
{
"question": "What should the crew do if there is a medical emergency in space?",
"propositions": [
"Have an emergency plan ready",
"Hope everything will be fine",
"no answer is correct",
"Call a superhero"
],
"reponse":0
},
{
"question": "What does N. Jan Davis do in her free time in space?",
"propositions": [
"Plays poker",
"Brushes her hair",
"Writes a book about stars",
"no answer is correct"
],
"reponse":1
},
{
"question": "How many hours of sleep do astronauts get after a long workday?",
"propositions": [
"10 hours, like professional sleepers",
 "4 hours, to have more time to work",
"no answer is correct",
"8 hours, like on Earth"
],
"reponse":3
},
{
"question": "Why do astronauts use a sleep mask and earplugs?",
"propositions": [
 "To avoid being disturbed by other astronauts",
 "To have more colorful dreams",
 "To not miss the view of Earth",
"no answer is correct"
],
"reponse":0
},
{
"question": "How do astronauts take a shower in space?",
"propositions": [
 "With a bucket of water",
 "With wipes and no-rinse shampoo",
 "By jumping into a floating bathtub",
"no answer is correct"
],
"reponse":1
},
{
"question": "What happens if astronauts don’t get enough oxygen?",
"propositions": [
 "They start singing",
 "They quietly fall asleep",
 "They can get fatigued and faint",
"no answer is correct"
],
"reponse": 2
},
{
"question": "How do astronauts brush their teeth in space?",
"propositions": [
 "By spitting like at the dentist",
 "By rinsing their mouths with water",
 "By swallowing the toothpaste",
"no answer is correct"
],
"reponse":0
},
{
"question": "What device creates oxygen on the space station?",
"propositions": [
 "A bubble generator",
 "The ECLSS system",
"A giant fan",
"no answer is correct"
],
"reponse":1
},
{
"question": "How does the ECLSS create oxygen aboard the space station?",
"propositions": [
 "By blowing on bubbles",
 "By singing songs about water",
"no answer is correct",
"By using electricity to split water"
],
"reponse":3
},
{
"question": "What does the Russian water processor do on the space station?",
"propositions": [
 "Makes coffee",
 "Turns air humidity into drinking water",
 "Creates sparkling water",
"no answer is correct"
],
"reponse":1
},
{
"question": "What is the most surprising aspect of using toilets in space?",
"propositions": [
"No need for toilet paper",
 "Toilets float",
"no answer is correct",
"No flushing, just fans"
],
"reponse":3
},
{
"question": "How do astronauts position themselves on the toilets in space?",
"propositions": [
"With safety belts",
 "Using leg straps and thigh bars",
 "By doing an acrobatic jump",
"no answer is correct"
],
"reponse":1
},
{
 "question": "Why are food containers disposable in space?",
"propositions": [
"To avoid washing dishes",
 "Because astronauts don't like doing the dishes",
 "To save space",
"no answer is correct"
],
"reponse":0
},
{
"question": "How do astronauts heat their food in space?",
"propositions": [
 "By placing it in the sun",
 "Using the station's microwave",
 "With a module that heats and rehydrates food",
"no answer is correct"
],
"reponse":2
},
{
"question": "How do astronauts clean their kitchen utensils?",
"propositions": [
 "They put them in a dishwasher",
 "They use disinfecting wipes",
 "They rinse them in floating water",
"no answer is correct"
],
"reponse": 1
},
{
"question": "What does astronaut Edward T. Lu eat in the Zvezda module?",
"propositions": [
 "Floating candies",
"Instant noodles in space",
"no answer is correct",
"A normal meal in microgravity"
],
"reponse":3
},
{
"question": "Where do astronauts store their personal items?",
"propositions": [
 "In a large safe",
 "In lockers",
 "In floating backpacks",
"no answer is correct"
],
 "reponse": 1
},
{
"question": "Why do astronauts have to strap themselves when sleeping?",
"propositions": [
 "To avoid having nightmares",
 "To feel like mummies",
"no answer is correct",
"To prevent floating and bumping into things"
],
"reponse":3
},
{
"question": "How do astronauts sleep on the space station?",
"propositions": [
 "On water beds",
 "In sleeping bags attached to the wall or a seat",
 "By napping on floating cushions",
"no answer is correct"
],
"reponse":1
},
{
"question": "Where else can crew members sleep on the shuttle?",
"propositions": [
 "In the cockpit pretending to pilot",
 "In the commander's or pilot's seat",
 "On the floor, like lazy astronauts",
"no answer is correct"
],
"reponse":1
},
{
"question": "What could astronauts do to improve their sleep in space?",
"propositions": [
"Listen to relaxing music",
 "Find a magical mattress",
"Count stars until they fall asleep",
"no answer is correct"
],
"reponse":2
},
{
"question": "What does astronaut C. Michael Foale do in the Zvezda module?",
"propositions": [
 "Plays hide and seek",
 "Maintains a spacesuit",
 "Tries to build a robot",
"no answer is correct"
],
"reponse":1
},
{
"question": "What do astronauts do if they need to repair something on the station?",
"propositions": [

 "Call customer service",
 "Use a space DIY manual",
 "Diagnose and repair it themselves",
"no answer is correct"
],
"reponse": 2
}
]
`);
let currentQuizIndex = 0;


const { parse } = require('path');

// Données joueurs
let WAITING_LIST = [];
let PLAYERS_LIST = [];
let SERVER_DATA = {};

// Infos
const MainPort = process.env.MAIN_PORT;
const CliePort = process.env.SUB_PORT;

/** Websocket Server | Web */
const MainServerWs = new Websocket.Server({
   // host: "13.38.172.41",
    port: MainPort
});

let WebApp = null;

MainServerWs.on("connection", (ws) => {
    console.log("Nouvelle connection détectée");
    WebApp = ws;
    // Les msg du client
    ws.on("message", (message) => {
        console.log("Message client : " + message);

        let parsedMessage = JSON.parse(message);

        // Comportement fonction du msg
        let responseData = "";

        switch (parsedMessage.message) {

            case 'request_connection':
                responseData = JSON.stringify({
                    status: "ok",
                    message: "to_waiting_room"
                });

                ws.send(responseData);
                break;

            case 'getwaitinglist':
                responseData = JSON.stringify({
                    status: "ok",
                    message: "waiting_list",
                    waitingList: WAITING_LIST
                });

                ws.send(responseData);
                break;

            case 'getquizdata':
                responseData = JSON.stringify({
                    status: "ok",
                    message: "quiz_list",
                    quiz: [QUIZ_DATA[currentQuizIndex]]
                });

                ws.send(responseData);
                break;

            case 'start_game':

                PLAYERS_LIST = parsedMessage.playersList;
                sendMessageToPlayers("game_started", { turn: parsedMessage.playerTurn, quiz: parsedMessage.currentQuiz });

                ws.send(JSON.stringify({
                    message: "players_ready"
                }));
                break;

            case 'reinit_game':
                // Code pour gérer la réinitialisation
                console.log("Reinitialisation de la partie");
                initNewGame();
                break;

            case 'player_loose_game':
                sendLooseGameMessage(parsedMessage.player);
                console.log('Joueur qui a perdu la partie');
                break;

            case 'player_win_game':
                // Gérer la victoire du joueur ici
                console.log('Joueur a gagné la partie');
                // Envoyer un message au joueur gagnant
                sendWinGameMessage(parsedMessage.player);
                break;


        }
    });
}); console.log(`Serveur a démarré sur ${MainServerWs.host}:${MainServerWs.port}`);

/** UDP SERVER | mobile + pc */
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

            SERVER_DATA = { ip: res.address, port: res.port };

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

        case 'player_loose_game':
            sendLooseGameMessage(parsedMessage.player);
            console.log('Joueur qui a perdu la partie');
            break;

        case 'player_win_game':
            // Gérer la victoire du joueur ici
            console.log('Joueur a gagné la partie');
            // Envoyer un message au joueur gagnant
            sendWinGameMessage(parsedMessage.player);
            break;


    }

}); //MainServer.bind(MainPort, () => console.log("Main serveur a démarré"));

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
                name: "player" + newPlayerID,
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
                WebApp.send(JSON.stringify({
                    message: "next_question",
                    turn: player,
                    quiz: [QUIZ_DATA[currentQuizIndex]],
                    index: currentQuizIndex
                }));

                console.log("Next question : ");
            }
            break;

        case 'player_shake':
            // Informe le main de la question next
            WebApp.send(JSON.stringify({
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

        case 'player_loose_game':
            sendLooseGameMessage(parsedMessage.player);
            console.log('Joueur qui a perdu la partie');
            break;

        case 'player_win_game':
            // Gérer la victoire du joueur ici
            console.log('Joueur a gagné la partie');
            // Envoyer un message au joueur gagnant
            sendWinGameMessage(parsedMessage.player);
            break;

        case 'reinit_game':
            // Code pour gérer la réinitialisation
            console.log("Reinitialisation de la partie");
            initNewGame();
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


    WebApp.send(JSON.stringify({
        message: "game_reset"
    }));
}

function sendLooseLifeMessage() {
    WebApp.send(JSON.stringify({
        message: 'player_loose_life'
    }));
}

function sendLooseGameMessage(player) {
    WebApp.send(JSON.stringify({
        message: 'player_loose_game',
        player: player
    }));

    sendMessageToPlayers("player_loose_game", {
        message: 'player_loose_game',
        player: player
    });

    console.log('Joueur qui a perdu la partie');
}

function sendWinGameMessage(_player) {
    WebApp.send(JSON.stringify({
        message: 'player_win_game',
        player: _player
    }), SERVER_DATA.port, SERVER_DATA.ip);

    sendMessageToPlayers("player_win_game", {
        message: 'player_win_game',
        player: _player
    });

    console.log('Joueur qui a gagné la partie');
}