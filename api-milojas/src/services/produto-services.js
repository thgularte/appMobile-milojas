const criar_use_case = require('../use-cases/produtos-use-cases/criar-produto')
const get_use_case = require('../use-cases/produtos-use-cases/get-produtos')
const update_use_case = require('../use-cases/produtos-use-cases/update-produto')

class ProdutoServices {
    static async create(body) {
        try {
            await criar_use_case.valida(body);
            return await criar_use_case.executa(body);
        } catch (err) {
            throw ({
                message: `Erro ${err} ao cadastrar produto`
            })
        }
    }

    static async get(id_usuario) {
        try {
            return await get_use_case.executa(id_usuario);
        } catch (err) {
             throw ({
                message: `Erro ${err} ao buscar produto`
            })
        }
    }

    static async update(body, id_usuario) {
        try {
            await update_use_case.valida(body);
            return await update_use_case.executa(body, id_usuario);
        } catch (err) {
             throw ({
                message: `Erro ${err} ao atualizar produto`
            })
        }
    }
}

module.exports = ProdutoServices;