"use strict";

const wordList = require('./words');

const players ={};

function beginGame( guess, pid ) {
  if( !players[pid].isMatch ) {
    getTurns(guess, pid);
    addGuessWordToList(guess, pid);
  }
}

function getTurns( guess, pid ) {
  if( guess.length != players[pid].word.length || !wordList.includes(guess.toUpperCase()) || !guess ) {
    players[pid].isValid = false;
    players[pid].numberOfMatches = 0;
  }
  else{
    players[pid].turns++;
    if(getExactWordMatch(players[pid].word, guess)) {
      players[pid].isMatch = true;
      return;
    }
    players[pid].numberOfMatches = compare(players[pid].word, guess);
    players[pid].isValid = true;
  }
}

function getExactWordMatch( word, guess ) {
  return word.toUpperCase() === guess.toUpperCase();
}

function getRandomWord( wordList ) {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function compare( word, guess ) {  
    let match = 0;
    const letterCount = {};

    for( let letter of word.toLowerCase() ) {
        letterCount[letter] = letterCount + 1 || 1;
    }
    for( let letter of guess.toLowerCase() ) {
        if( letterCount[letter] ) {
            letterCount[letter] -= 1;
            match += 1;
        }
    }
    return match;
}

function addGuessWordToList( guess, pid ) {
    if( players[pid].numberOfMatches > 0 && !players[pid].isMatch ){
      let word = guess.toUpperCase() +" - LETTERS MATCHED: "+ players[pid].numberOfMatches;
      players[pid].guessList.push(word);
    }
}

function deleteWordGuessList( pid ) {
  players[pid].guessList.splice(0, players[pid].guessList.length);
}

function addNewPlayerData( pid ) {
    if( !checkPlayerExists(pid) ){
      players[pid] = {pid: pid, word : " ", totalTurns : 0, guessList : [], numberOfMatches : 0, isValid : true, isMatch : false};
    }
}

function checkPlayerExists( pid ) {
  const check = Object.values(players).includes(pid);
  return (check);
}

function resetData( pid ){
  this.deleteWordGuessList(pid);
  this.players[pid].word = getRandomWord(wordList);
  this.players[pid].turns = 0;
  this.players[pid].isMatch = false;
  this.players[pid].numberOfMatches = 0;
  this.players[pid].isValid = true;  
  console.log("Game ID: "+ this.players[pid].pid +" | Secret word: "+ this.players[pid].word);
  console.log("--------------------------------------------------");
  return this;
}

const gamePage = {
    beginGame,
    compare,
    getRandomWord,
    getExactWordMatch,
    resetData,
    players,
    addNewPlayerData,
    deleteWordGuessList,
    addGuessWordToList,
    checkPlayerExists
    
}

module.exports = gamePage;