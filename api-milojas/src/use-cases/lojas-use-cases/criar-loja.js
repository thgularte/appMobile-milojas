
// Criar perfil da loja

const Joi = require('joi')
const Lojas = require('../../models/Lojas');
const http_status = require('../../consts/http-status-enum')
const AuthServices = require('../../services/auth-services')

const create_body_schema = Joi.object({
    cpf_cnpj: Joi.string().regex(/^\d{11,14}$/).required().error(new Error("Documento inválido")),
    nome: Joi.string().required().error(new Error("Nome inválido")),
    email: Joi.string().email().required().error(new Error("Email inválido")),
    senha: Joi.string().min(8).required().error(new Error("Senha inválida")),
    descricao: Joi.string().min(30).required().error(new Error("Descrição inválido")),
});

class LoginLojaUseCase {
    static async valida(body){
        try {
            await create_body_schema.validateAsync(body, { abortEarly: false });
        } catch (err) {
            throw { message: err.details.map(d => d.message).join(', '), status: http_status.BAD_REQUEST };
        }
    }
    static async executa(body) {
        try {
            const { cpf_cnpj, nome, email, senha, descricao } = body;
            const checa_email = await Lojas.findOne({ where: { email } });
            if (checa_email) {
                throw {
                    message: `E-mail ${email} já foi cadastrado`,
                    status: http_status.CONFLICT
                };
            }
            const loja = await Lojas.create({
                cpf_cnpj,
                nome,
                email,
                senha: await AuthServices.hash_senha(senha),
                descricao
            });
            const segredo = process.env.JWT_SECRET;
            if (!segredo) {
                throw {
                    message: "JWT_SECRET não definido",
                    status: http_status.INTERNAL_ERROR
                };
            }
            const token = AuthServices.gera_jwt_token({ id: loja.id }, segredo);
            return {
                cpf_cnpj: loja.cpf_cnpj,
                nome,
                email,
                descricao,
                token
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LoginLojaUseCase;