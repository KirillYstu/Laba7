// перед проектом ввести npm install
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let storage = []; 

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//получение данных для ALL
app.get('/guide', function (req,res){
    res.send(JSON.stringify(storage));
});

//получение данных для ID
app.get('/guide/:id', function (req,res){
    const id = req.params.id;
    const item = storage[id];
    if (item===null|| id>=storage.length) {
        res.sendStatus(404);
    } else res.send(JSON.stringify(storage[id]));

});

//добавление пользователя
app.post('/guide',(req,res)=>{
    const newid = storage.push(req.body)-1;
    res.send(newid.toString());
});

//апгрейд пользователя
app.put('/guide/:id',(req,res) =>{
    const id = req.params.id;
    storage[id] = req.body;
    res.send(id.toString());
});

//удаление пользователя
app.delete('/guide/:id', (req,res) =>{
    const id = req.params.id;
    storage[id] = null;
    res.send(id.toString()  );
});

app.listen(3000);