const { findOne } = require('../models/mygrid')

module.exports = (app)=>{
    //importar as configurações do database
    var conexao = require('../config/database')
    //importar o modelo mygrid
    var modelo = require('../models/mygrid')

    //abrir o formulário mygrid.ejs
    app.get('/mygrid',(req,res)=>{
        //conectar com o database
        conexao()
        //buscar todos os documentos da colecao mygrid
        modelo.find().sort({_id:-1})
        .then((modelo)=>{
            res.render('mygrid.ejs',{dados:modelo})
        })
        .catch(()=>{
            res.render('mygrid.ejs')
        })
    })
    //gravar as informações do formulário
    app.post('/mygrid',(req,res)=>{
        //conectar com o database
        conexao()
        //gravar o documento na coleção mygrid
        var documento = new modelo({
            titulo:req.body.titulo,
            texto:req.body.texto
        }).save()
        .then(()=>{
            res.redirect('/mygrid')
        })
        .catch(()=>{
            res.send('Não foi possível gravar os dados no DB')
        })
    })
    //listar o documento para excluir
    app.get('/mygrid_excluir',async(req,res)=>{
        //recuperando o id da barra de endereços
        var id = req.query.id
        //procurar o documento especifico
        var procurar = await modelo.findOne({_id:id})
        //abrir a view mygrid e enviar a json do documento
        res.render('mygrid_excluir.ejs',{dados:procurar})
    })
    //listar o documento para alterar
    app.get('/mygrid_alterar',async(req,res)=>{
        //recuperando o id da barra de endereços
        var id = req.query.id
        //procurar o documento especifico
        var procurar = await modelo.findOne({_id:id})
        //abrir a view mygrid e enviar a json do documento
        res.render('mygrid_alterar.ejs',{dados:procurar})
    })
    //excluir documento da coleção atual
    app.get('/excluir_mygrid',async(req,res)=>{
        //recuperando o id da barra de endereços
        var id = req.query.id
        //excluindo o documento da coleção
        var excluir = await modelo.findOneAndRemove({_id:id})
        //voltar para a pagina mygrid
        res.redirect('/mygrid')
    })
    //alterar documento da coleção atual
    app.post('/alterar_mygrid',async(req,res)=>{
        //recuperando o id da barra de endereços
        var id = req.query.id
        //recuperar as informações digitadas
        var dados = req.body
        //alterando o documento da coleção
        var alterar = await modelo.findOneAndUpdate(
            {_id:id},
            {titulo:dados.titulo,
            texto:dados.texto})
        //voltar para a pagina mygrid
        res.redirect('/mygrid')
    })
}