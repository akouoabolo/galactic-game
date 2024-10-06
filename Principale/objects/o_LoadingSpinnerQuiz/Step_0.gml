/// @description Insert description here
/// @author : Angniel Ike

var _vit = .02;
alpha = state == 1 ? alpha + _vit : alpha - _vit;
alpha = clamp(alpha, 0, 1);