const Produtos = require('../../models/produtos')

class GetProdutosUseCase{
    static async executa(id_produto){
        try{
            const produto = await Produtos.findByPk(id_produto)

            if(!produto){
                throw({message: `Produto(${id_produto}) não encontrado`})
            }

            return {
                id: produto.id,
                id_loja: produto.id_loja,
                nome: produto.nome,
                valor: produto.valor,
                categoria: produto.categoria,
                descricao: produto.descricao
            }
        } catch(error){
            throw(error)
        }
    }
}

module.exports = GetProdutosUseCase