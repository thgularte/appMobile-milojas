const http_status =require('../consts/http-status-enum')
const AuthServices = require('../services/auth-services')
const services = require('../services/loja-services')

class LojasController{
    async login(req,res){
        try{
            const {email,senha} = req.body
            const loja = await services.login({email, senha})
            return res.status(http_status.OK).json(loja)
        } catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async list(req,res){
        try{
            const loja = await services.get(req.id_usuario)
            return res.status(http_status.OK).json(loja)
        } catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async getId(req,res) {
        try{
            const id = parseInt(req.params.id)
            const loja = await services.get(id)
            return res.status(http_status.OK).json(loja)
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async create(req,res){
        try{
            const {cpf_cnpj, nome, email, senha, descricao} = req.body
            const loja = await services.create({cpf_cnpj, nome, email, senha, descricao})
            return res.status(http_status.OK).json(loja)
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async update(req,res){
        try{
            const loja = services.update(req.body,req.id_usuario)
            return res.status(http_status.OK).json(loja)
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
    async novoToken(req, res){
        try{
            const loja = await services.get(req.id_usuario)
            const id = loja.id
            const segredo = process.env.JWT_SECRET
            if(!segredo){
                throw({
                    message: "JWT_SECRET não setado",
                    status: http_status.INTERNAL_ERROR
                })
            }
            const novoToken = AuthServices.gera_jwt_token({id},segredo)

            return res.status(http_status.OK).json({
                cpf_cnpj: id,
                nome: loja.nome,
                email: loja.email,
                descricao: loja.descricao
            })
        }catch(error){
            const statusCode = error.status || http_status.INTERNAL_ERROR
            return res.status(statusCode).json(error)
        }
    }
}

module.exports = LojasController