/// @description Insert description here
/// @author : Angniel Ike

var theresDatas = async_load[? "size"] > 0;

if (!theresDatas) exit;

var _buffer  = async_load[? "buffer"];
buffer_seek(_buffer, buffer_seek_start, 0);
var _reponse = buffer_read(_buffer, buffer_text);

// Opération
var _receivedDatas = json_parse(_reponse);
show_debug_message(_receivedDatas);
//show_debug_message(typeof(_receivedDatas));


switch (_receivedDatas.message) {

	case "in_waiting_room" :
	#region
		global.PlayerDatas = _receivedDatas.data;
		//show_message(global.PlayerDatas);
		global.GameState = WAITING_PLAYERS;
		room = r_waiting;
	#endregion
		break;
	
	case "game_started" :
	#region
		//show_message_async(_reponse);
		
		global.PlayerOnStage = _receivedDatas.data.turn;
		global.CurrentQuiz   = _receivedDatas.data.quiz;
		
		room = isMyTurn() ? r_game : r_game_bouge;
	#endregion
		break;
		
	case "next_question":
	#region
		global.PlayerOnStage = _receivedDatas.data.turn;
		room = isMyTurn() ? r_game : r_game_bouge;
		
		global.CurrentQuiz   = _receivedDatas.data.quiz;
		
		// Maj les réponses
	#endregion
		break;
		
	case "game_reset" :
	#region
		game_restart();
	#endregion
		break;
	
}