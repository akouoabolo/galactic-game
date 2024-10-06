/// @description Insert description here
/// @author : Angniel Ike

var _vit = 5;
spinnerR1 += _vit;
spinnerR2 -= _vit;

var _x = x;
var _y = y;

if (instance_exists(global.ObjectOnStage)) {
	var _follow = global.ObjectOnStage;
	depth = _follow.depth + 1;
	_x = _follow.x;
	_y = _follow.y;
}

var _vitLerp = .2;
xto = lerp(xto, _x, _vitLerp);
yto = lerp(yto, _y, _vitLerp);

draw_sprite_ext(spinnerBg, 0, xto, yto, scale, scale, spinnerR1, -1, 1);
draw_sprite_ext(spinnerSm, 0, xto, yto, scale, scale, spinnerR2, -1, 1);