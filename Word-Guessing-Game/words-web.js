const wordWeb = {

    wordPage: function(wordList, game, pid) {
        return `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="word-app.css"/>
            <title>Word Guessing Game</title>
        </head>
            <body>
                <div id="word-app">
                <h1>- Word Guess Wizard -</h1>
                    <div class="input-panel"> 
                        ${wordWeb.getMatchePanel(game, pid)}
                        ${wordWeb.getInputPanelState(game.players[pid].isMatch, pid)}
                        ${wordWeb.getPlayAgainBtnState(game.players[pid].isMatch, pid)} 
                    </div>
                    <div class="display-panel">
                        <div class="guess-words">
                        <span>${wordWeb.getGuessWordList(game, pid)}</span>
                        </div>
                        <div class="valid-words">
                        <span>${wordWeb.getValidWordList(wordList)}</span>
                        </div>
                    </div>
                </div>
            </body>
        </html>`;
    },

    getInputPanelState : function(isMatch, pid) {
        if(isMatch) {	
            return wordWeb.getInputWord("disabled",pid);  
        }
        return wordWeb.getInputWord("enabled", pid);
    },

    getInputWord: function(state, pid) {
        return `<div class="input-word">
        <form action="/newGuess" method="POST">
          <input class="to-send" name="text" value="" placeholder="Enter word to be guessed"  ${state} />
          <input name="pid" type="hidden" value=${pid} />
          <button class="submit" type="submit"${state}>Check</button>
        </form>
        </div>`;
    },

    getPlayAgainBtnState: function(isMatch, pid) {
        if(isMatch){
            return wordWeb.getPlayAgainBtn("enabled", pid);
         }
            return wordWeb.getPlayAgainBtn("disabled", pid);

    },

    getPlayAgainBtn : function(state, pid) {
        return `<div class="outgoing">
            <form action="/newGame" method="POST">
                <input name="pid" type="hidden" value=${pid} />
                <button type="submit" id="new-game"${state}>New Game</button>
            </form>                    
        </div>`;
    },

    getMatchePanel: function(game, pid) {
        return `<div class="word-match">
                    <label class="match-label">${wordWeb.getMatchLabel(game, pid)}</label>
                </div>`;
    },

    getValidWordList: function(wordList) {
        return `<span class="word-bank">Pick a word from the below list</span>
        <ul class="valid-word">` + 
        wordList.map( word => `
            <li>
                <div class="word">   
                    <span class="each-word">${word}</span>
                </div>
            </li>
            `).join('') +
            `</ul>`;
    },


    getGuessWordList: function(game, pid) {
        if(gamePage.players[pid].pid == pid) {
        return `<span class="guess-history">Your Guess History</span>
            <ol class="guess-word">` +
            Object.values(game.players[pid]['guessList']).map( word => `
            <li>
                <div class="guess">
                    <span class="each-guess">${word}</span>
                </div>
            </li>
            `).join('') +
            `</ol>`;
        }
    },


    getMatchLabel: function(game, pid) {
        if(game.players[pid].isMatch){
            return "Congratulations! You guessed the word right. Turns required: "+ game.players[pid].turns +" | Correct word: '"+ gamePage.players[pid].word +"'";
        }
        else if(game.players[pid].numberOfMatches > 0){
            return "Almost there! You matched "+ game.players[pid].numberOfMatches+" letters out of "+ game.players[pid].word.length;
        }
        else if(!game.players[pid].isValid){
            return "Invalid Word! Kindly select a word from word list";
        }
        else{
            return "Let's Get Started!";
        }
    },
};



module.exports = wordWeb;