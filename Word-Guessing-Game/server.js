const express =  require('express');
const app = express();
const PORT = 3000;

const wordsList = require('./words');
const game = require('./game');
const wordWeb= require('./words-web');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => { 
	let pid = req.query.pid;
	if(!game.players[pid]){
        pid = Math.floor( Math.random() * 10000 );
        game.addNewPlayerData(pid);
        gamePage = game.resetData(pid); 
    }  
	res.send(wordWeb.wordPage(wordsList, game, pid));
});

app.post('/newGame', (req, res) => {
	const {pid} = req.body;
	gamePage = game.resetData(req.body.pid);
	res.redirect('/?pid='+pid);
  });

app.post('/newGuess', (req, res) => {
    const {text} = req.body;
    const {pid} = req.body;
    game.beginGame(text, pid);
    res.redirect('/?pid='+pid);
  });

app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
	console.log("--------------------------------------------------");
	console.log("Welcome to Guess Word Game Tracking Log:");
	console.log("--------------------------------------------------");
});


