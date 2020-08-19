"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
	
	let result = 0;
	let word1 = word.toUpperCase().split('');
	let word2 = guess.toUpperCase().split('');
	
	for(let i=0;i<word1.length;i++) {
		
		if(word2.includes(word1[i])){
			result++;
			word2.splice(word2.indexOf(word1[i]),0);
		}
	}	
	return result;
}


