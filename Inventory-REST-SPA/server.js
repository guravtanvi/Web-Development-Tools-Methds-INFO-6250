const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const users = require('./users');

const app = express();
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

const items = {};

const counter = () =>  {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};

const itemId = counter();


app.get('/mainPage', (req, res) => {
    let sId =  users.checkUserExists(req.cookies.sid);
    res.json("/home");
});

app.get('/session', (req, res) => {
    let sId =  users.checkUserExists(req.cookies.sid);
    if(sId && users.getUserName(sId) === undefined){
        res.status(404).json({ code: 'bad-login'});
        return;
    }
    res.json(sId);
});

app.post('/session/:name', (req,res) =>{
    const name  = req.params.name;
    if(!name || name.length === 0 || name.toLowerCase().includes('dog') || name.trim() === ""){
        res.status(404).json({ code: 'bad-login'});
        return;
     } else if (name) {
        const sid = users.addNewUser(name);
        res.cookie('sid', sid);
        res.json(name); 
    }    
});

app.post('/items', express.json(), (req, res) => {
    const {name, quantity} = req.body;
    let exists = Object.values(items).filter(item => item.name.toLowerCase() === name.toLowerCase());

    if(!req.cookies.sid){
        res.status(401).json({code : 'login-unauthorize'});
        return;
    } else if(name.length === 0 || name.trim() === ""){
        res.status(404).json({code : 'item-required'});
        return;
    } else if(exists.length !== 0){
        res.status(409).json({ code: 'duplicate-item' }); 
        return;       
    }
    items[itemId()] = req.body;
    res.json(items);    
});

app.get('/items', (req, res) =>{
    if(!req.cookies.sid){
        res.status(401).json({code : 'login-unauthorize'});
        return;
    }
    res.json(items);
});

app.delete('/session', (req,res) =>{
    const sid = req.cookies.sid;
    if(!req.cookies.sid){
        res.status(401).json({code : 'login-unauthorize'});
        return;
    }
    users.removeUser(sid);
    res.clearCookie('sid');
    res.json("Cookie Deleted");
});

app.delete('/items/:itemId', (req,res) =>{
    const id = req.params.itemId;
    if(!req.cookies.sid){
        res.status(401).json({code : 'login-unauthorize'});
        return;
    } else if (!items[id]) {
        res.status(404).json({ code : 'item-does-not-exists', 'items': items});
        return;
    }
    delete items[id];
    res.json(items);
});

app.patch('/items/:itemId', express.json(), (req, res) => {
    const id = req.params.itemId;
    if(!req.cookies.sid){
        res.status(401).json({code : 'login-unauthorize'});
        return;
    } else if(!items[id]){
        res.status(404).json({ code : 'item-does-not-exists', 'items': items});
        return;
    }
    items[id].quantity = req.body.quantity;
    res.json(items);
});


    
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));