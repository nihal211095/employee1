  exports.list = function(req, res){

    req.getConnection(function(err,connection){   
        var query = connection.query('SELECT name,salary,dept FROM employee',function(err,rows){
          if(err){
            res.status(500);
            console.log("Error Selecting : %s ",err );          
          }else
          res.status(200);
          res.render('testtable',{page_title:"Test Table",data:rows});
        });
    });
  };

  