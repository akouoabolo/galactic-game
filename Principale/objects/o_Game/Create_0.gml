/// @description Insert description here
/// @author : Angniel Ike
//room = (room == r_init_app) ? r_waiting_room : r_waiting_room;
alarm[0] = game_get_speed(gamespeed_fps) * 2;

audio_play_sound(snd_theme_main, .5, true, .4);

// From Screen Shake
shake  = false;
shakeForce = 2;
shakeAdd   = 0;
shakeDuration  = game_get_speed(gamespeed_fps);

// Layer du screenShake
shake = 0;

screenShakeLayer = layer_get_fx("efx_screen_shake");
screenShakeParam = fx_get_parameters(screenShakeLayer);

// Pour le network
globalvar NETWORK_URL, NETWORK_PORT, NETWORK_CLIENT, SERVER_BUFFER;

NETWORK_URL    = "192.168.1.145";
NETWORK_PORT   = "4456";
NETWORK_CLIENT = network_create_socket(network_socket_udp);

network_connect_raw(NETWORK_CLIENT, NETWORK_URL, NETWORK_PORT);
SERVER_BUFFER = buffer_create(100, buffer_grow, 100);

// Game state
global.GameState   = INIT_APP;

// Gestion joueur et file attente
global.WaitingList   = [];
global.PlayersList   = [];
global.ObjectOnStage = noone;

// Gestion partie en cours
global.QuizDatas = noone;
global.CurrentQuizID    = 0;
global.CurrentQuizDatas = noone;
global.PlayerOnStage    = noone;

gameStartCount = game_get_speed(gamespeed_fps) * 5;
gameStartCd    = gameStartCount;

// Communique avec serveur
sendServerRaw = function (_data = "") {
	
		show_debug_message(_data);
	
		buffer_seek(SERVER_BUFFER, buffer_seek_start, 0);
		buffer_write(SERVER_BUFFER, buffer_text, _data);

		network_send_udp_raw(NETWORK_CLIENT, NETWORK_URL, NETWORK_PORT, SERVER_BUFFER, buffer_tell(SERVER_BUFFER));
	
}

// Gestion de l'application
goToWaitingRoom = function () {
	global.GameState = WAITING_FOR_PLAYERS;
	room = r_waiting_room;
}

startApplication = function () {
	global.GameState = WAI
	room = r_jeu;
}

// Gestion  de la partie
changeTour = function () {
	var _j1 = global.PlayersList[0].id;

	if (global.PlayerOnStage.id == _j1)
		global.PlayerOnStage = global.PlayersList[1];
	else
		global.PlayerOnStage = global.PlayersList[0];
		
	// On informe le serveur après ici
	
}

initGameQuiz = function () {
	global.GameState = WAITING_FOR_QUIZ_DATAS;	
}

initNewGame = function () {
	global.GameState = INIT_GAME;
}

startGame = function () {
	// Envoies au serveur start_the_game
	
	// Quand les joueurs on répondu ok
	global.GameState = GAME_STARTED;
	room = r_jeu;
}

getQuizDatas = function () {
	// Get les datas du serveur
	var _datasFromServeur = "[{'question':'Et puis quoi ?', 'propositions':['hein', 'oui', 'non', 'maf'], 'reponse':0}]";
	
	// Convertir en Array<Struct>
	var _arrayDatas = json_parse(_datasFromServeur);
	
	return _arrayDatas;
}

setPlayerTurn = function (_playerID) {
	// Send set_player_turn avec l'id du joueur
	
	// Reprend la réponse du seveur
	
	// Set le tour du player ici
	global.PlayerOnStage = _playerID;
}

// Waintig room
getWaitingPlayerCount = function () {
	return array_length(global.WaitingList);	
}

getGamePlayers = function () {
	var _waitingList = global.WaitingList;
	
	var _tempList = [ _waitingList[0], _waitingList[1] ];
	
	return _tempList;
}
	
getWinner = function (playerDatas) {
	if (playerDatas.id == global.PlayersList[0].id)
		return global.PlayersList[1];
	else
		return global.PlayersList[0];
}