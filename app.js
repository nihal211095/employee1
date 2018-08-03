var express = require('express');
var http = require('http');
var testtable = require('./routes/testtable');
var path = require('path');
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
console.log(process.env.PORT);

 /* app.get('/apps.html', function(req, res) {
    res.sendFile(__dirname + "/" + "apps.html");
}); */ 

app.use(
    connection(mysql,{

        host: 'localhost',
        user: 'root',
        password : 'root',
      //  port : 3000,
        database:'mark1'
},'pool')
);
app.get('/apps.html', function(){
    app.send(__dirname+"/" +"apps.html");
});
app.get('/employee?', testtable.list);
app.use(app.router);
// app.writeHead(200, {'Content-Type': 'text/html'});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``


var connection = mysql.createConnection({  
    host     : 'localhost',  
    user     : 'root',  
    password : 'root',  
    database : 'mark1'  
  });        
  app.get('/apps.html', function(){
    app.send(__dirname+"/" +"apps.html");
});
  
  app.get('/api/details', function (req, res) {
  
      if(!req.url==='/api/details')
      {
        res.writeHead(404, {'Content-Type': 'text/html'});
          res.status(400).send('/api url is needed');
          return;
      }
    // connection.connect();  
  
    connection.query('SELECT * FROM employee', function(err, rows, fields)   
    {  
       // connection.end();
  
        if (err) throw err;  
  
        res.status(200).json(rows); 
  
    });
  });