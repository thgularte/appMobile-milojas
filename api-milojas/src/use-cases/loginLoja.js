const Joi = require('joi');
const http_status = require('../consts/http-status-enum');
const Lojas = require('../models/Lojas');
const AuthServices = require('../services/auth-services');

const login_body_schema = Joi.object({
    email: Joi.string().email().required().error(new Error("Email inválido")),
    senha: Joi.string().required().error(new Error("Senha inválida"))
});

class LoginUseCase {
    static async valida(body) {
        try {
            await login_body_schema.validateAsync(body);
        } catch (err) {
            throw { message: err.message, status: http_status.BAD_REQUEST };
        }
    }

    static async executa(body) {
        try {
            const { email, senha } = body;
            const loja = await Lojas.findOne({ where: { email } });
            if (!loja) {
                throw {
                    message: `E-mail ${email} não encontrado`,
                    status: http_status.NOT_FOUND
                };
            }
            const { senha: hash } = loja;
            const senha_valida = await AuthServices.compara_senha_com_hash(senha, hash);
            if (!senha_valida) {
                throw {
                    message: "Senha incorreta",
                    status: http_status.UNAUTHORIZED
                };
            }
            const jwt_secret = process.env.JWT_SECRET;
            if (!jwt_secret) {
                throw {
                    message: "JWT_SECRET não foi definido",
                    status: http_status.INTERNAL_ERROR
                };
            }
            const token = AuthServices.gera_jwt_token({ id: loja.id }, jwt_secret);
            return {
                cpf_cnpj: loja.cpf_cnpj,
                nome: loja.nome,
                email: loja.email,
                criado_em: loja.criado_em,
                atualizado_em: loja.atualizado_em,
                token
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LoginUseCase;
