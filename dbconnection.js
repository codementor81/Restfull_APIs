const mysql =require('mysql');
const express = require('express');
var app =express();
var port = 3308;
//server = require('http').createServer(app);
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var mysqlConnection =mysql.createConnection({
    host: 'localhost',
    port: "3306",
    user: 'root',
    password: '12345',
    database: 'user'
});
mysqlConnection.connect((error) => {
          if(!error){
          console.log('you have succesfully connected with your database');
          //console.log(error); 
    }
   else {
        console.log('can not connect to database!! \n error:', +JSON.stringify(error, undefined, 2));
       console.log(error);
   }
});

//module.exorts=mysqlConnection;


app.listen(3308, () => console.log('server listening on 3308!'));

//get the whole data from database//
 app.get('/employee', (req, res) =>{
        mysqlConnection.query("SELECT * FROM employee", (error, rows, fields)=> {
         // request.end(JSON.stringify(result));
        return res.json(rows);
          if (error) 
          console.log(error);
         else
          console.log(rows);
        });
      });
  //GET data using ID//

  app.get("/employee/:employee_id", (req, res) =>{
    mysqlConnection.query("SELECT * FROM employee WHERE employee_id =?",[req.params.employee_id], (error, rows, fields)=> {
     // request.end(JSON.stringify(result));
      return res.json(rows);
      if (error) 
      console.log(error);
      else
        console.log(rows);
    });
  });
 
  //post the data into table//
       app.post('/employee', (req, res) =>{
         //checking if email or username are exist
         mysqlConnection.query( "SELECT name, email_id FROM employee", (error, rows) => {
          if (error) {

            console.log('Signup error');
            }
        //if user found.
       if (!rows.length==0) { 
         console.log(!rows.length==0);
        if(rows[0].name=req.body.name){
          console.log(rows[0].name=req.body.name);
          console.log('Username  already exists username: '+rows[0].name+'' ); 
        
       // text: ''+req.body.name+' Username already exists'
                           
           }
           else 
          mysqlConnection.query("INSERT INTO employee (name, salary, email_id, password) VALUES(?,?,?,?)", [req.body.name, req.body.salary, req.body.email_id, req.body.password], (error, rows, fields)=> {
            return res.json({
              text: 'data has been inserted successfully in database'
              });
            return res.json(rows);
              if (error) 
              console.log(error);
             else
              console.log(rows);
              
            });

           if(rows[0].email_id=req.body.email_id) {
             console.log(rows[0].email_id=req.body.email_id)
            console.log('EMAIL already exists, email: '+rows[0].email_id+'');  
         
           }  
           else 
           mysqlConnection.query("INSERT INTO employee (name, salary, email_id, password) VALUES(?,?,?,?)", [req.body.name, req.body.salary, req.body.email_id, req.body.password], (error, rows, fields)=> {
            return res.json({
              text: 'data has been inserted successfully in database'
              });
             // if(email_id)
              return res.json(rows);
              if (error) 
              console.log(error);
             else
              console.log(rows);
              
            });

           }
        });
      });
      //delete the whole data from database using postman//

      app.delete('/employee', (req, res) =>{
        mysqlConnection.query("delete FROM employee", (error, rows, fields)=> {
         // request.end(JSON.stringify(result));
        return res.json(rows);
          if (error) 
          console.log(error);
         else
          console.log(rows);
        });
      });

      //delete data from database by id//

        app.delete('/employee/:employee_id', (req, res) =>{
        mysqlConnection.query("DELETE FROM employee WHERE employee_id =?",[req.params.employee_id],  (error, rows, fields)=> {
         // request.end(JSON.stringify(result));
        return res.json(rows);
          if (error) 
          console.log(error);
         else
          console.log(rows);
        });
      });

      //update the existing table using nodejs
        app.put('/employee', (req, res) =>{
        mysqlConnection.query("UPDATE  employee SET name =?, salary =?, email_id =?, password =? WHERE employee_id =?", [req.body.employee_id, req.body.name, req.body.salary, req.body.email_id, req.body.password,], (error, rows, fields)=> {
         // request.end(JSON.stringify(result));
        return res.json(rows);
          if (error) 
          console.log(error);
         else
          console.log(rows);
        });
      });
