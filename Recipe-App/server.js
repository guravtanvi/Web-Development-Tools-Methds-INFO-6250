const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const {v4 : uuidv4} = require('uuid');
const userData = require('./user-details');
const recipeList = require('./recipe-list');
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));

app.get('/home', (req, res) => {
    const uid = req.cookies.uid;
    if( !uid || !userData.usersList[uid] ) {
        res.clearCookie('uid');
        res.status(200).json( {'recipeList': recipeList.recipes} );
        return;
    }
    res.status(200).json({'recipeList': recipeList.recipes, 'uid': uid, 'username': userData.usersList[uid].username});
});

app.get('/session', (req, res) => {
    res.json(recipeList.recipes);
 });
 
 app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    if(!username || username === 'dog' || username.trim() === "" || username === 'DOG') {
      res.status(404).json( { code: 'bad-login'} );
      return;
    }
    const uid = uuidv4();
    userData.usersList[uid] = { username, uid };
    res.cookie('uid', uid);
    res.json(recipeList.recipes);
  });

  app.get('/recipe', (req, res) => {
   const uid = req.cookies.uid;
   if(!uid){
       res.status(401).json( {code : 'illegal-user'} );
       return;
   }
   res.json(uid);
});
  
  app.delete('/session', (req,res) =>{
      const uid = req.cookies.uid;
      if(!uid) {
         res.status(401).json( {code : 'illegal-user'} );
         return;
      }
      delete userData.usersList[uid];
      res.clearCookie('uid');
      res.json(recipeList.recipes);
  });
 
 app.get('/info/:id', (req, res) => {
   const id = req.params.id;
   const recipeId = recipeList.recipes[id];
   res.json(recipeId);
});
 
 app.post('/recipe', express.json(), (req, res) => {
    const uid = req.cookies.uid;
    if(!uid){
       res.status(401).json( {code : 'illegal-user'} );
       return;
    }
    const {title, author, ingredients, instructions} = req.body;

    if(!title || !ingredients || !instructions || title.trim()=== "" || instructions.trim()=== "" || ingredients.trim()===""){
       res.status(404).json( {code : 'mandatory-field'} );
       return;
    }
    const id = recipeList.nextId();
    recipeList.recipes[id] = { title, author, ingredients, instructions };
    res.json(id);
 });
 

 
 app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
