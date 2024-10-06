/// @description Insert description here
/// @author : Angniel Ike

var _s = choose(.2, .4, .6, .8, 1);
var _x = room_width + (1024 * _s);
var _y = irandom_range(0, room_height);
var _speed  = -2 * _s;
var _sprite = [
_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11,
_12, _13, _14, _15, _16, _17, _18, _19, _20
];

var _planet = instance_create_layer(_x, _y, "planet", o_Planete);
_planet.sprite_index = _sprite[irandom_range(0, array_length(_sprite) - 1)];
_planet.image_xscale = _s;
_planet.image_yscale = _s;
_planet.speed = _speed;
_planet.depth = -_s;


alarm[0] = game_get_speed(gamespeed_fps) * irandom_range(10, 20);