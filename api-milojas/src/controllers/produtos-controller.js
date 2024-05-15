const http_status =require('../consts/http-status-enum')
const CriarProduto = require('../use-cases/produtos-use-cases/criar-produto')
const GetProduto = require('../use-cases/produtos-use-cases/get-produtos')
const ListProduto = require('../use-cases/produtos-use-cases/list-produtos')
const UpdateProduto = require('../use-cases/produtos-use-cases/update-produto')

class ProdutosController{
    async list(req,res){
        try{
            let {limit,offset}=req.query
            if(limit&&typeof limit!=='string'){
                throw({})
            }
            if(offset&&typeof offset!=='string'){
                throw({})
            }
            const query={
                limit: limit ? parseInt(limit):10000,
                offset: offset ? parseInt(offset):0
            }
            await ListProduto.valida(query)
            const lista=await ListProduto.executa(query)
            return res.status(http_status.OK).json(lista)
        } catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async getId(req,res) {
        try{
            const { id }=req.params
            await GetProduto.valida({id:parseInt(id)})
            const embarcacao = await GetProduto.executa({id:parseInt(id)})
            return res.status(http_status.OK).json(embarcacao)
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async create(req,res){
        try{
            await CriarProduto.valida(req.body)
            const produto = await CriarProduto.executa(req.body)
            return res.status(http_status.OK).json(produto)
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async update(req,res){
        try{
            await UpdateProduto.valida(req.body)
            const update = await UpdateProduto.executa(req.body, req.body.id)
            return res.status(http_status.OK).json(update)
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
}

module.exports = ProdutosController