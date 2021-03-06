const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const connection = mysql.createPool({
  connectionLimit: 50,
    //host: 'localhost', // O host do banco. Ex: localhost
    //user: 'root', // Um usuário do banco. Ex: user 
    //password: '', // A senha do usuário. Ex: user123
    //database: 'ugo' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
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
                  //tempCont.release();
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

app.get('/treinamentos_realizados', (request, response) => {
  connection.getConnection((error, tempCont)=>{
        if(!!error){
          tempCont.release();
          console.log('Error')
        }else{
          console.log('Conected!  🚀');

          tempCont.query("SELECT * FROM treinamentos_realizados", (error, rows, fields)=>{
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

app.post('/save', (request, response) => {
  const recebe = request.body;

  console.log(recebe);

  connection.getConnection((error, tempCont)=>{
        if(!!error){
          tempCont.release();
          console.log('Error')
        }else{
          console.log('Conected!  🚀');
          //console.log('Dentro do else', recebe);
          try {
            recebe.map(async(value) => {
              await tempCont.query(`INSERT INTO recebe_app (nome_usuario,senha_usuario, funcao_usuario, usuario_usuario, email_usuario ) VALUES ('${value.nome_usuario}', '${value.senha_usuario}','${value.funcao_usuario}','${value.usuario_usuario}','${value.email_usuario}')`, (error, rows, fields)=>{
                
                if(!!error){
                  console.log('Error in the query!!!  ⚠️');
                }else{
                  console.log('Gravou o item: ', value.nome_usuario);
                }
              })
  
             });
             tempCont.release();
          } catch (error) {
            console.log(error);
          } 

        }
  });
})

app.listen(3001, ()=> {
  console.log('🚀 Back-and started !');
});


