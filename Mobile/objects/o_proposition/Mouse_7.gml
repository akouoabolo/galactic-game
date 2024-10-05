/// @description Insert description here
/// @author : Angniel Ike

var _reponse = global.CurrentQuiz.reponse;
var _reponseCorrect = index == global.CurrentQuiz.reponse;
o_Game.sendReponseStatus(index == global.CurrentQuiz.reponse);

if (!_reponseCorrect) {
	global.InAppHeart--;	
}