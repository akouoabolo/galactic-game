/// @description Insert description here
/// @author : Angniel Ike
draw_self();

// Le texte
var _x = x;
var _y = y;
var _c = c_white;
var _fnt = fnt_propositions;

var _mouseHover = position_meeting(mouse_x, mouse_y, id);
var _mousePress = mouse_check_button(mb_left);

if (_mouseHover && _mousePress) {
	image_blend = #D51C00;
} else {
	image_blend = -1;
}

// Message attente
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_font(_fnt);
	
draw_text_color(_x, _y, texte, _c, _c, _c, _c, 1);
	
draw_set_font(noone);
draw_set_halign(fa_left);
draw_set_valign(fa_top);
	