/// @description Insert description here
/// @author : Angniel Ike

var _vit = 5;
spinnerR1 += _vit;
spinnerR2 -= _vit;

draw_sprite_ext(spinnerBg, 0, x, y, scale, scale, spinnerR1, -1, alpha);
draw_sprite_ext(spinnerSm, 0, x, y, scale, scale, spinnerR2, -1, alpha);