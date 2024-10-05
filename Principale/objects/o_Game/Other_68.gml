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
show_debug_message(typeof(_receivedDatas));

switch (_receivedDatas.message) {

	case "to_waiting_room" :
	#region 
		goToWaitingRoom();
	#endregion
		break;
		
	case "waiting_list" :
	#region
		show_debug_message(_receivedDatas.waitingList);
		
		try {
			
			global.WaitingList = _receivedDatas.waitingList;
			
			
		} catch (_e) {
			
			show_debug_message("Waiting For Players");
			
		}
	#endregion
		break;
	
	case "quiz_list" :
	#region
		global.QuizDatas = _receivedDatas.quiz;
	#endregion
		break;
		
	case "players_ready" :
		startGame();
		break;
		
	case "next_question" :
	#region
		global.PlayerOnStage = _receivedDatas.turn;
	#endregion
		break;
		
	case "player_shake" :
	#region
	if (global.ObjectOnStage != noone) {
		
		global.ObjectOnStage.addedForce = _receivedDatas.shakeValue;
	}
	#endregion
		break;
}