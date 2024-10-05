/// @description Insert description here
/// @author : Angniel Ike

var _data = json_stringify({
	message : "getwaitinglist",
	name : "server"
});

buffer_seek(SERVER_BUFFER, buffer_seek_start, 0);
buffer_write(SERVER_BUFFER, buffer_text, _data);
network_send_udp_raw(NETWORK_CLIENT, NETWORK_URL, NETWORK_PORT, SERVER_BUFFER, buffer_tell(SERVER_BUFFER));