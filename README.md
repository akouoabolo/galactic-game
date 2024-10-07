This is the source code of the project Space Race, Divided in three(03) parts.

### Mobile & Principale
Represent respectivily the <b>android mobile application</b> and the <b>desktop one</b>.
All of them are made using the game engine [Gamemaker](https://gamemaker.io), owned by Opera.<br/>
[Download mobile App](https://github.com/akouoabolo/galactic-game/releases/download/Microgravity/Space.App.Mobile.apk)<br/>
[Download Desktop App](https://github.com/akouoabolo/galactic-game/releases/download/MicrogravityWin/Space.Race.Windows.exe)<br/><br/>

This project is designed to run with a UDP server made with <b>NodeJs</b>.

### Deloyment of the server side
There you just have to clone de project, go to the <b>serveur</b> folder by a terminal and run these commands:<br/>
<b>[ npm init ]</b> to install all dependencies neccessary to run the server.<br/>
<b>[ npm start ]</b> to run the server.<br/><br/>

<b>IMPORTANT : </b> The server side run on two ports that can be changed in the <b>.env</> file. <b>MAIN_PORT</b> represents the
port used by <b>The desktop App</b> and <b>SUB_PORT</b> the port used by <b>The mobile App</b>. Once changed, you need to specify it
in both the mobile and desktop app in the <b>Create Event</b> found in the <b>o_Game</b> object. <br/><br/>
![Capture d'écran 2024-10-07 093106](https://github.com/user-attachments/assets/96087684-57a9-472d-8716-112dfb5a9543)
