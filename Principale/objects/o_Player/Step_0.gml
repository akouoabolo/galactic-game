/// @description Insert description here
/// @author : Angniel Ike

life = clamp(life, 0, 3);

// Check si c'est mon tour
var _isMyTurn = global.PlayerOnStage.id == data.id;
state = _isMyTurn ? JOUEUR_QUIZ : JOUEUR_MVTS;

if (!_isMyTurn) {
	global.ObjectOnStage = id;	
}