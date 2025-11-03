/***************************************************************************************************************************************************************************************** 
 * Obgetivo: arquivo responsavel para criar a API de contatos
 * Data 25/09/2025
 * Autor: Davi de Almeida Santos 
 * Versão 1.0 
 **********************************************************************************************************************************************************************************/

const contatosData = require('./contatos.js')
const MESSAGE_ERRO = {status: false, statuscode: 500, developament: 'Davi de Almeida Santos'}

const getListAllDados = function () {
    let message = {status: true, statuscode: 200, developament: 'Davi de Almeida Santos', dados: []}
    contatosData.contatos['whats-users'].forEach( function (item){
        message.dados.push(item.id)
        message.dados.push(item.account)
        message.dados.push(item.nickname)
        message.dados.push(item['created-since'])
        message.dados.push(item['profile-image'])
        message.dados.push(item.number)
        message.dados.push(item.background)
        message.dados.push(item.contacts)

 

    })
    return message
    

        
    }
    
 

 


const getListDadosByNumber  = function(number){
let numero = !isNaN(number)

let message = {status: true, statuscode: 200, development: 'Davi de Almeida',nome: '', contatos: [] }

contatosData.contatos['whats-users'].forEach(function(item){

    if(item.number == number){
        message.nome = item.account
    
item.contacts.forEach(function(contato){
                message.contatos.push({
                nome: contato.name,
                numero: contato.number,
                foto: contato.image,
                descricao: contato.description,
            

             })
             
        })
    }
})
return message
}





const getListMessagesUser = function (numeroUsuario) {
    let numero = String(numeroUsuario);

    let message = { status: false, statuscode: 404, developament: "Davi de Almeida Santos", dados: numero, mensagem: [] };
    
    contatosData.contatos["whats-users"].forEach(function (item) {
        if (item.number === numero) {
            let todasMensagens = [];
            
            item.contacts.forEach(function (contato) {
                if (contato.messages) {
                    contato.messages.forEach(function (msg) {
                        todasMensagens.push(msg);
                    })
                }
            })
      
            message.status = true
            message.statuscode = 200
      
            message.nome = item.nickname || item.name
            message.mensagem = todasMensagens
        }
        
    })

    return message
}




const getListMessageContactUser = function(number){
let numero = !isNaN(number)

let message = {status: true, statuscode: 200, development: 'Davi de Almeida',nome: '', contatos: [] }

contatosData.contatos['whats-users'].forEach(function(item){

    if(item.number == number){
        message.nome = item.account
    
item.contacts.forEach(function(contato){
                message.contatos.push({
                nome: contato.name,
                numero: contato.number,
                foto: contato.image,
                descricao: contato.description,
                mensagens: contato.messages,

             })
            
        })
    }
})
 return message
}






const encontrarUsuarioPorNumero = function(number1,  number2){
let message = {status: true, statuscode: 200, development: 'Davi de Almeiad Santos',nomeDoUsuario:'', nomeDoContato: '', conversas: [] }

contatosData.contatos['whats-users'].forEach(function(item){
    item.contacts.forEach(function(contacts){
    if(item.number == number1 && contacts.number == number2){
        message.nomeDoUsuario = item.account
        message.nomeDoContato = contacts.name

        let nomeDoContato = contacts.name

        contacts.messages.forEach(function(mensagens){
            if(mensagens.sender == nomeDoContato || mensagens.sender == "me"){
                       let conversas = {enviado_para: mensagens.sender,
                            conteudo: mensagens.content,
                            horario: mensagens.time
                    }
                    message.conversas.push(conversas)
                }
            })
        }
    })
})
  return message
}



const getPalavrasChaves = function (numero1, numero2, palavraChave) {
    let message = {status: true, statuscode:200, development: 'Davi de Almeida Santos', nome_do_contato:'', nome_do_recebedor:'', conversas: []}

    contatosData.contatos['whats-users'].forEach(function (item) {
        item.contacts.forEach(function (contacts) {
        if (item.number === numero1 && contacts.number === numero2) {
            message.nome_do_contato = item.account
            message.nome_do_recebedor = contacts.name
                    contacts.messages.forEach(function (mensagens) {
                        if(mensagens.content.toUpperCase().includes(palavraChave.toUpperCase())){
                            let conversa = { enviado_para: mensagens.sender,
                                conteudo: mensagens.content,
                                horario: mensagens.time
                            }
                        message.conversas.push(conversa)
                        }
                    })
                }
            })
        })

      return message
    }
  console.log( getPalavrasChaves('11987876567', '26999999963', 'Hi'))

    module.exports = {
     getListAllDados,
      getListDadosByNumber,
       getListMessagesUser,
       getListMessageContactUser,
       encontrarUsuarioPorNumero,
       getPalavrasChaves
       



    }
    