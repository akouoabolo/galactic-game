/// @description Insert description here
/// @author : Angniel Ike
o_Game.sendServerRaw(json_stringify({
	message: "reinit_game",
	player : global.PlayerDatas
}));

game_end();