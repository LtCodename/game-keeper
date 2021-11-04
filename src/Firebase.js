import firebase from "firebase";

const config = {
	apiKey: "AIzaSyAupLLqr90XxEG5x_XybSGMIFtmevJgIzo",
	authDomain: "the-game-keeper.firebaseapp.com",
	databaseURL: "https://the-game-keeper.firebaseio.com",
	projectId: "the-game-keeper",
	storageBucket: "the-game-keeper.appspot.com",
};

const fire = firebase.initializeApp(config);
export default fire;
