/// @description Insert description here
/// @author : Angniel Ike

var _gameState = global.GameState;

switch(_gameState) {

	case INIT_APP :
	#region
		if (keyboard_check_pressed(vk_enter))
			goToWaitingRoom();
			
		var _data = json_stringify({
			message : "request_connection",
			name : "server"
		});

		sendServerRaw(_data);
	#endregion
		break;

	case WAITING_FOR_PLAYERS :
	#region
		if (keyboard_check_pressed(vk_space)) {
			var _idPlayer = irandom(1000);
			var _aPlayer  = {name : "player" + string(_idPlayer), id: _idPlayer};
			array_push(global.WaitingList, _aPlayer);
		}
		
		// Communication serveur
		var _data = json_stringify({
			message : "getwaitinglist",
			name : "server"
		});

		sendServerRaw(_data);
		
		// Check le nombre de player inscrit dans la liste
		var _waitersCount    = getWaitingPlayerCount();
		var _isEnoughPlayers = _waitersCount >= 2;
		
		// S'il y a assez de joueurs on lance la partie
		if (_isEnoughPlayers) {
			global.PlayersList = getGamePlayers();
			
			gameStartCd--; if (gameStartCd <= game_get_speed(gamespeed_fps) * 4) {
				gameStartCd = gameStartCount;
				initGameQuiz();
			}
		}
	#endregion
		break;
		
	case WAITING_FOR_QUIZ_DATAS :
	#region
		var _data = json_stringify({
			message : "getquizdata",
			name : "server"
		});

		sendServerRaw(_data);
		
		if (global.QuizDatas != noone) {
			global.CurrentQuizDatas = global.QuizDatas[global.CurrentQuizID];
			
			gameStartCd--; if (gameStartCd <= 0) {
				gameStartCd = gameStartCount;
				initNewGame();
			}
		}
	#endregion
		break;
		
	case INIT_GAME :
	#region	
	
		// Attribut le tour à un joueur
		global.PlayerOnStage = global.PlayersList[irandom(1)];
		
		var _data = json_stringify({
			message : "start_game",
			name : "server",
			playersList : global.PlayersList,
			playerTurn  : global.PlayerOnStage,
			currentQuiz : global.CurrentQuizDatas
		});
		
		show_debug_message(_data);
		
		sendServerRaw(_data);
		
		// Lance la partie
		//startGame();
	#endregion
		break;
	
	case GAME_STARTED :
	#region
		// Positione les joueurs
		if (instance_number(o_Player) < 2) {
			// pos joueurs (320, 480) | (320, 608)
			var _playersPos = [
				{ x : 320, y : 480 },
				{ x : 320, y : 608 }
			];
			
			// Joueur 1
			instance_create_depth(
				_playersPos[0].x, _playersPos[0].y, 0, o_Player, {
					data : global.PlayersList[0]
				}
			);
			
			// Joueur 2
			instance_create_depth(
				_playersPos[1].x, _playersPos[1].y, 0, o_Player, {
					data : global.PlayersList[1]
				}
			);
			
		}
	
			
		// deb
		if (keyboard_check_pressed(vk_space)) {
			if (global.PlayerOnStage == global.PlayersList[0]) {
				global.PlayerOnStage = global.PlayersList[1];	
			} else {
				global.PlayerOnStage = global.PlayersList[0];
			}
		}
	#endregion
		break;
}

//
if (room == r_winner) {
	if (instance_exists(o_Player))
		instance_destroy(o_Player);
}

// Screen shake
shake = shake * .9;
screenShakeParam[$ "g_Magnitude"] = shake;
fx_set_parameters(screenShakeLayer, screenShakeParam);