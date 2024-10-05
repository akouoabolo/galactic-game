/// @description Insert description here
/// @author : Angniel Ike
draw_self();

var _x = x;
var _y = y;
var _c = c_white;
var _font  = noone;
var _texte = "Recommencer";

draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_font(_font);
draw_text_color(_x, _y, _texte, _c, _c, _c, _c, image_alpha);
draw_set_halign(fa_left);
draw_set_valign(fa_top);
draw_set_font(_font);