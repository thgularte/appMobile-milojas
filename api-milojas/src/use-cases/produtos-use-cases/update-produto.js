const Joi = require('joi')
const Produtos = require('../../models/produtos')
const http_status = require('../../consts/http-status-enum')

const update_produto_schema = Joi.object({
    id_loja: Joi.number().error(new Error('Loja invalida')),
    nome: Joi.string().error(new Error('nome invalido')),
    valor: Joi.number().error(new Error('VAlor invalido')),
    categoria: Joi.string().error(new Error('Categoria invalida')),
    descricao: Joi.string().error(new Error('Descricao invalida'))
})

class UpdateProdutoUseCase{
    static async valida(body){
        try{
            await update_produto_schema.validateAsync(body)
        } catch(error){
            throw({
                message: error.message,
                status: http_status.BAD_REQUEST
            })
        }
    }
    static async executa(body, id_produto){
        try{
            const produto = await Produtos.findByPk(id_produto)

            if(!produto){
                throw({
                    message: `Produto(${id_produto}) não existe`,
                    status: 404
                })
            }

            await produto.update(body)

            return {
                id: produto.id,
                id_loja: produto.id_loja,
                nome: produto.nome,
                valor: produto.valor,
                categoria: produto.categoria,
                descricao: produto.descricao,
                criado_em: produto.criado_em,
                atualizado_em: produto.atualizado_em,
                deletado_em: produto.deletado_em
            }
        }catch(error){
            throw(error)
        }
    }
}

module.exports = UpdateProdutoUseCase