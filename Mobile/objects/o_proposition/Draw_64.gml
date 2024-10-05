/// @description Insert description here
/// @author : Angniel Ike
draw_self();

// Le texte
var _x = x;
var _y = y;
var _c = c_white;
var _fnt = fnt_propositions;

// Message attente
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_font(_fnt);
	
draw_text_color(_x, _y, texte, _c, _c, _c, _c, 1);
	
draw_set_font(noone);
draw_set_halign(fa_left);
draw_set_valign(fa_top);
	