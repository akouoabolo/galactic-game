/// @description Insert description here
/// @author : Angniel Ike

switch (global.GameState) {
	
	case WAITING_CONNECTION :
	#region
	//** On demande la connexion **//
	#endregion
		break;
	
	case WAITING_PLAYERS :
	#region
	
	if (isMyTurn()) exit;
	
	// On va gérer le shake
	// [ TEST ]
	
	// Accel o m
	var _accel = {
		x : device_get_tilt_x(),	
		y : device_get_tilt_y(),	
		z : device_get_tilt_z(),	
	};
	
	var _force = sqrt(_accel.x * _accel.x + _accel.y * _accel.y + _accel.z * _accel.z);
	global.DeviceShakeForce = _force;
		
	//
	var _requireForceLow  = 1.5//2.5;
	var _requireForceHigh = 1.6//4.5;
	var _shake = (_force > _requireForceLow && _force < _requireForceHigh) ? 2 : 0;
	_shake = (_force > _requireForceHigh) ? 3 : 0;
	
	// Send to server
	sendServerRaw(json_stringify({
		message : "player_shake",
		shakeValue : _shake,
		player  : global.PlayerDatas,
		device  : global.InAppID 
	}));
	
	
	#endregion
		break;
	
}