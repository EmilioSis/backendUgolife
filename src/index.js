const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createPool({
  connectionLimit: 50,
   // host: 'localhost', // O host do banco. Ex: localhost
    //user: 'root', // Um usuário do banco. Ex: user 
    //password: '', // A senha do usuário. Ex: user123
    //database: 'teste' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    host: '54.89.62.203',
    user: 'sistecno_ugolife',
    password: 'inicial2011',
    database: 'sistecno_ugolife',
});


app.get('/funcionarios', (request, response) => {
    connection.getConnection((error, tempCont)=>{
          if(!!error){
            tempCont.release();
            console.log('Error')
          }else{
            console.log('Conected! 🚀 ');

            tempCont.query("SELECT * FROM funcionarios", (error, rows, fields)=>{
                  tempCont.release();
                  if(!!error){
                    console.log('Error in the query!!!  ⚠️');
                  }else{
                    return response.json(rows);
                  }
            })
          }
    });
})

app.get('/treinamentos', (request, response) => {
  connection.getConnection((error, tempCont)=>{
        if(!!error){
          tempCont.release();
          console.log('Error')
        }else{
          console.log('Conected! 🚀');

          tempCont.query("SELECT * FROM treinamentos", (error, rows, fields)=>{
                tempCont.release();
                if(!!error){
                  console.log('Error in the query!!!  ⚠️');
                }else{
                  response.json(rows);
                }
          })
        }
  });
})

app.get('/usuarios', (request, response) => {
  connection.getConnection((error, tempCont)=>{
        if(!!error){
          tempCont.release();
          console.log('Error')
        }else{
          console.log('Conected!  🚀');

          tempCont.query("SELECT * FROM usuarios", (error, rows, fields)=>{
                tempCont.release();
                if(!!error){
                  console.log('Error in the query!!!  ⚠️');
                }else{
                  response.json(rows);
                }
          })
        }
  });
})

app.listen(3333, ()=> {
  console.log('🚀 Back-and started !');
});


