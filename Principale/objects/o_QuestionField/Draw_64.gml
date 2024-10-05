/// @description Insert description here
/// @author : Angniel Ike
draw_self();

var _x = x;
var _y = y - 32;
var _c = c_white;
var _font  = fnt_question;
var _texte = question;

draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_font(_font);
draw_text_color(_x, _y, _texte, _c, _c, _c, _c, image_alpha);

_y = y + 68;
_c = #17566B;
draw_text_color(_x, _y, number, _c, _c, _c, _c, image_alpha);

draw_set_halign(fa_left);
draw_set_valign(fa_top);
draw_set_font(_font);