/// @description Insert description here
/// @author : Angniel Ike

draw_self();

// Life
var _lx = x - (sprite_width + TUILE * 3)
var _ly = y;
var _lt = s_Heart;
var _ls = .6;

draw_sprite_ext(_lt, 0, _lx, _ly, _ls, _ls, 0, -1, 1);

draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_font(fnt_question);

draw_text_color(_lx, _ly, life, -1, -1, -1, -1, 1);

draw_set_halign(fa_left);
draw_set_valign(fa_top);
draw_set_font(noone);

// Draw roadLine
var _lineT = roadLine;
var _linex = x + sprite_width;
var _liney = y;
		
draw_sprite(_lineT, 0, _linex, _liney);
draw_sprite(Flag, 0, _linex + sprite_get_width(_lineT), _liney);

// Barre de chargement
var _x1 = _linex;
var _y1 = _liney - 10;
var _x2 = _x1 + addedParcours;
var _y2 = _liney + 10;
var _c  = c_white;

switch (state) {
	
	case JOUEUR_MVTS :
		sprite_index = Jump;
		
		var _parcoursEnd = _x2 - _x1 >= sprite_get_width(_lineT);
		
		if (_parcoursEnd) {
			
			// Ecran gagnant
			room = r_winner;
			global.Winner = data;
			
			// Victorieux vers le serveur data.id
			o_Game.sendServerRaw(json_stringify({
				message : "player_win_game",
				player  : data
			}));
			
		} else {
			addedParcours += addedForce;
		}
		break;
	
	case JOUEUR_QUIZ :
		sprite_index = Standing_Man;
		
		/*
			Gérer les réponse envoyé par le joueur qui répond
			Gérer Le changement de tour 		
		
		*/
		
		break;
}


draw_rectangle_color(_x1, _y1, _x2, _y2, _c, _c, _c, _c, false);
// Nom
draw_set_halign(fa_center);
draw_set_font(noone);
draw_text(x, y + sprite_height/2, data.name);