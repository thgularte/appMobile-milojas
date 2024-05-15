
// Retorna loja selecionada por ID(cpf_cnpj)

const Lojas = require('../../models/Lojas')
const Produtos = require('../../models/produtos')

class GetLojaUseCase {
    static async executa(id_loja){
        try{
            const loja = await Lojas.findbyPk(id_loja)
            const produtos = await Produtos.findAll({
                where: {id_loja: id_loja}
            })

            if(!loja){
                throw({
                    message: `Loja(${id_loja}) não encontrada`,
                    status: 404
                })
            }

            return {
                cpf_cnpj: loja.cpf_cnpj,
                nome: loja.nome,
                email: loja.email,
                descricao: loja.descricao,
                produtos: produtos
            }
        }
        catch(err){
            throw(err)
        }
    }
}

module.exports = GetLojaUseCase