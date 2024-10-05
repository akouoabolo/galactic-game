/// @description Insert description here
/// @author : Angniel Ike
/// @description Insert description here
/// @author : Angniel Ike
global.InAppID = irandom_range(100000001, 199999999);

// mes données
global.PlayerDatas   = noone;
global.PlayerOnStage = noone;

// Statu du jeu
global.CurrentQuiz = noone;
global.GameState   = WAITING_CONNECTION;

global.DeviceShakeForce = 0;

// Pour le network
globalvar NETWORK_URL, NETWORK_PORT, NETWORK_CLIENT, SERVER_BUFFER;

NETWORK_URL    = "192.168.1.145";//"127.0.0.1";
NETWORK_PORT   = "3345";
NETWORK_CLIENT = network_create_socket(network_socket_udp);

network_set_timeout(NETWORK_CLIENT, 3000, 3000);
network_connect_raw(NETWORK_CLIENT, NETWORK_URL, NETWORK_PORT);
SERVER_BUFFER = buffer_create(100, buffer_grow, 100);

//** Pour Communiquer avec le serveur **//
sendServerRaw = function (_data = "") {
	
	buffer_seek(SERVER_BUFFER, buffer_seek_start, 0);
	buffer_write(SERVER_BUFFER, buffer_text, _data);

	network_send_udp_raw(NETWORK_CLIENT, NETWORK_URL, NETWORK_PORT, SERVER_BUFFER, buffer_tell(SERVER_BUFFER));
}

//
sendServerRaw(json_stringify({
	message : "search_a_match",
	device  : global.InAppID 
}));

// Meths
isMyTurn = function () {
	
	var _mesDatas  = global.PlayerDatas;
	var _tourDatas = global.PlayerOnStage;
	
	if (_mesDatas == noone || _tourDatas == noone)
		return false;
		
	return _mesDatas.id == _tourDatas.id;
}

sendReponseStatus = function (_verdict) {
	
	sendServerRaw(json_stringify({
		message : "player_reponse",
		verdict : _verdict,
		player  : global.PlayerOnStage,
		device  : global.InAppID 
	}));
	
}