const login_use_case = require('../use-cases/loginLoja')
const criar_use_case = require('../use-cases/lojas-use-cases/criar-loja')
const get_use_case = require('../use-cases/lojas-use-cases/get-lojas')
const update_use_case = require('../use-cases/lojas-use-cases/update-loja')

class LojasService {
    static async login(body) {
        try {
            await LoginUseCase.valida(body);
            return await login_use_case.executa(body);
        } catch (err) {
            throw ({
                message: `Erro ${err} no Login`
            })
        }
    }
    static async create(body) {
        try {
            await criar_use_case.valida(body);
            return await criar_use_case.executa(body);
        } catch (err) {
            throw ({
                message: `Erro ${err} ao cadastrar perfil`
            })
        }
    }

    static async get(id_usuario) {
        try {
            return await get_use_case.executa(id_usuario);
        } catch (err) {
             throw ({
                message: `Erro ${err} ao buscar perfil`
            })
        }
    }

    static async update(body, id_usuario) {
        try {
            await update_use_case.valida(body);
            return await update_use_case.executa(body, id_usuario);
        } catch (err) {
             throw ({
                message: `Erro ${err} ao atualizar`
            })
        }
    }
}

module.exports = LojasService;