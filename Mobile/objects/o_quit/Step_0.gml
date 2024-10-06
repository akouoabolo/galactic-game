/// @description Insert description here
/// @author : Angniel Ike
var _mouseHover = position_meeting(mouse_x, mouse_y, id);
var _mousePress = mouse_check_button(mb_left);

if (_mouseHover && _mousePress) {
	image_blend = #D51C00;
} else {
	image_blend = -1;
}