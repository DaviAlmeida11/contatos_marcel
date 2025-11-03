/*************************************************************************************************************************************************************************************
 * Data: 24/09/2025
 * autor: Davi de Almeida Santos
 * Versão 1.0
 * 
 * 
 * Observações =: instalar dependencias para criar api
 *  express     - npm install express     -- save instala as dependencias para criar um API
 *  cors        - npm isntall cors        -- save instala as dependencias para configurar os protocoos de uma API
 *  body-parser - npm install body-parser -- save  instala as dependencias para receber os tipos de dados por via POST ou PUT
 **********************************************************************************************************************************************************************************************/
const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')

const dados     = require('./modulo/funcoes')
const PORT      = process.PORT || 8080  

const app = express()

app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')
      app.use(cors())
    next()                  
})


app.get('/v1/dados', function(request, response) {

    let contatosInfo = dados.getListAllDados()
    
    response.status(contatosInfo.statuscode)
    response.json(contatosInfo)
})



app.get('/v1/mensagens/usuario/contatos/:number', function(request, response) {
    
    let number = request.params.number

    let usuarioMensagens = dados.getListDadosByNumber(number)
    
    response.status(usuarioMensagens.statuscode)
    response.json(usuarioMensagens)
})


app.get('/v1/dados/usuario/contatos/mensagens/:number', function(request, response){
      let number = request.params.number

    let usuarioMensagens = dados.getListMessagesUser(number)
    
    response.status(usuarioMensagens.statuscode)
    response.json(usuarioMensagens)
})



app.get('/v1/dados/conversas/:number', function(request, response){
       let numero = request.params.number
  

    let mesagensTrocadas = dados.getListMessageContactUser(numero)
    
    response.status(mesagensTrocadas.statuscode)
    response.json(mesagensTrocadas)
})

app.get('/v1/dados/conversas/:number1/:number2', function(request, response){
       let numero1 = request.params.number1
       let numero2 = request.params.number2

    let mesagensTrocadas = dados.encontrarUsuarioPorNumero(numero1, numero2)
    
    response.status(mesagensTrocadas.statuscode)
    response.json(mesagensTrocadas)
})


 app.get('/v1/dados/usuario/conversa/filtro/:number1/:number2', function(request, response){
    let numero = request.params.number1
    let numero2  = request.params.number2
    let palavraChave = request.query.palavraChave
    let filtragem = dados.getPalavrasChaves(numero, numero2, palavraChave)

    response.status(filtragem.statuscode)
    response.json(filtragem)
})








app.listen(PORT, function(){
    console.log('api aguardando...')
})