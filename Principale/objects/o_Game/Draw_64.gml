/// @description Insert description here
/// @author : Angniel Ike

if (room == r_waiting_room) {
	
	// Texte qui est en attente de joueur
	var _x = room_width  / 2;
	var _y = room_height / 2 - TUILE * 4;
	var _c = c_white;
	var _font  = fnt_question;
	var _texte = "En attente de nouveaux joueurs";
	
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_font(_font);
	
	draw_text_color(_x, _y, _texte, _c, _c, _c, _c, 1);
	
	// Draw les players
	var _waitingPlayers = global.WaitingList;
	var _posx = _x;
	var _posy = _y + TUILE * 4;
	var _boxH = sprite_get_height(propositionField);
	var _index = 0; repeat(array_length(_waitingPlayers)) {
		var _currentPlayer = _waitingPlayers[_index];draw_set_halign(fa_center);
		
	draw_set_valign(fa_middle);
	draw_set_font(_font);
	
	draw_text_color(_x, _y, _texte, _c, _c, _c, _c, 1);
		
		var _xx = _posx;
		var _yy = _posy + (_boxH + TUILE) * _index;
		draw_sprite(propositionField, 0, _xx, _yy)
		draw_text(_xx, _yy, _currentPlayer.name);
		
		_index++;
	}
	
	// Quand on attend le qcm
	if (global.GameState == WAITING_FOR_QUIZ_DATAS) {
		o_LoadingSpinnerQuiz.state = 1;
		draw_text_color(_x, room_height - TUILE * 4.5, "Chargement du quiz",
		-1, -1, -1, -1, o_LoadingSpinnerQuiz.alpha);
	}
	
	draw_set_halign(fa_left);
	draw_set_valign(fa_top);
	draw_set_font(_font);
	
}