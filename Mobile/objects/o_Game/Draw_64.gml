/// @description Insert description here
/// @author : Angniel Ike

var _isInWaitingRoom = room = r_waiting;
var _isInInitRoom    = room = r_init;

if (_isInInitRoom) {
	
	var _x = room_width  / 2;
	var _y = room_height / 2;
	var _c = c_white;
	var _fnt = fnt_waitingMsg;
	var _txt = "En attente de connexion";

	// Message attente
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_font(_fnt);
	
	draw_text_color(_x, _y, _txt, _c, _c, _c, _c, 1);
	
	draw_set_font(noone);
	draw_set_halign(fa_left);
	draw_set_valign(fa_top);
	
}

if (_isInWaitingRoom) {
	
	var _x = room_width  / 2;
	var _y = room_height / 2;
	var _c = c_white;
	var _fnt = fnt_waitingMsg;
	var _txt = "En attente d'un joueur";

	// Message attente
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_font(_fnt);
	
	draw_text_color(_x, _y, _txt, _c, _c, _c, _c, 1);
	
	draw_set_font(noone);
	draw_set_halign(fa_left);
	draw_set_valign(fa_top);
	
}

if (room == r_game_bouge) {
	
	var _x = room_width  / 2;
	var _y = room_height / 2 + (32 * 4);
	var _c = c_white;
	var _fnt = fnt_waitingMsg;
	var _txt = global.DeviceShakeForce;

	// Message attente
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_font(_fnt);
	
	draw_text_color(_x, _y, _txt, _c, _c, _c, _c, 1);
	
	draw_set_font(noone);
	draw_set_halign(fa_left);
	draw_set_valign(fa_top);
	
}