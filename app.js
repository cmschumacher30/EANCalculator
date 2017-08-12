var express = require('express');
var app = express();

app.use(express.static('html'));
app.use(express.static('lib'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));



app.get('/',(req,res) => {res.end();});

app.listen(3000,(req,res) => {console.log("Listening on port 3000.");});
