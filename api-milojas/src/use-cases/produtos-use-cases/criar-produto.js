const http_status = require('../../consts/http-status-enum')
const Produtos = require('../../models/produtos')
const Joi = require('joi')

const create_body_schema = Joi.object({
    id_loja: Joi.number().required().error(new Error('Loja invalida')),
    nome: Joi.string().required().error(new Error('Nome invalido')),
    valor: Joi.number().required().error(new Error('valor invalido')),
    categoria: Joi.string().required().error(new Error('categoria invalida')),
    descricao: Joi.string().min(30).required().error(new Error('descriçao invalida'))
})

class CriarProdutoUseCase{
    static async valida(body){
        try{
            await  create_body_schema.validateAsync(body, {abortEarly: false})
        } catch(err){
            throw({message: err.details.map(d => d.message).join(', '), status: http_status.BAD_REQUEST})
        }
    }

    static async executa(body){
        try{
            const {id_loja, nome, valor,categoria,descricao} = body
            const checa_nome = await CriarProdutoUseCase.findOne({where: {nome}})

            if(checa_nome){
                throw{
                    message: `Produto ${nome} já cadastrado`,
                    status: http_status.CONFLICT
                }
            }

            const produto = await Produtos.create({
                id_loja,
                nome,
                valor,
                categoria,
                descricao
            })

            return {
                id: produto.id,
                id_loja,
                nome, 
                valor,
                categoria,
                descricao
            }

        } catch(error){
            throw(error)
        }
    }
}

module.exports = CriarProdutoUseCase