/// @description Insert description here
/// @author : Angniel Ike
var theresDatas = async_load[? "size"] > 0;

if (!theresDatas) exit;

var _buffer  = async_load[? "buffer"];
buffer_seek(_buffer, buffer_seek_start, 0);
var _reponse = buffer_read(_buffer, buffer_text);

// Opération
var _receivedDatas = json_parse(_reponse);
//show_debug_message(_receivedDatas);
//show_debug_message(typeof(_receivedDatas));
show_debug_message(_receivedDatas);

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
		global.QuizDatas = _receivedDatas.quiz;
		
		//show_message(global.QuizDatas);
		global.CurrentQuizDatas = global.QuizDatas[0];
	#endregion
		break;
		
	case "player_shake" :
	#region
	if (global.ObjectOnStage != noone && instance_exists(global.ObjectOnStage)) {
		global.ObjectOnStage.addedForce = _receivedDatas.shakeValue;
	}
	#endregion
		break;
		
	case "game_reset" :
	#region
		game_restart();
	#endregion
		break;
		
	case "player_loose_life" :
	#region
	
		if (global.ObjectOnStage.life > 0)
			global.ObjectOnStage.life--;
		else {
			sendServerRaw({
				message : "player_loose_game",
				player  : global.PlayerOnStage
			});
		}
	#endregion
		break;
}