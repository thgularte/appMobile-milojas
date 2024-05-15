const Joi = require('joi')
const Lojas = require('../../models/Lojas')
const AuthServices = require('../../services/auth-services')
const http_status = require('../../consts/http-status-enum')

const update_loja_schema = Joi.object({
    cpf_cnpj: Joi.string().error(new Error('Documento não é valido(nao é string)')),
    nome:Joi.string().error(new Error("'nome' não é uma string")),
    email:Joi.string().email().error(new Error("'email' não é uma string ou um email válido")),
    descricao: Joi.string().error(new Error('Descricao nao é string'))
})

class UpdateLojaUseCase{
    static async valida(body){
        try{
            await update_loja_schema.validateAsync(body)
        }catch(error){
            throw({message:error.message,status:http_status.BAD_REQUEST})
        }
    }
    static async executa(body, id_loja){
        try{
            const loja = await Lojas.findBypk(id_loja)

            if(!loja){
                throw({
                    message: `Loja(${id_loja}) não encontrada`,
                    status: 404
                })
            }

            if(body.senha){
                if(!body.antiga_senha){
                    throw({
                        message:"Quando o campo 'senha' for enviado o campo 'antiga_senha' também deve ser enviado",
                        status: 404
                    })
                }
                const antiga_senha_eh_valida=await AuthServices.compara_senha_com_hash(body.antiga_senha,usuario.senha)
                if(!antiga_senha_eh_valida){
                    throw({
                        message:" 'antiga_senha' está incorreta",
                        status:401
                    })
                }
                body.senha=await AuthServices.hash_senha(body.senha)
            }
            if(body.email){
                const email_cadastrado=await Usuarios.findOne({where:{
                    email:body.email
                }})
                if(email_cadastrado){
                    throw({
                        message:"Email Já Cadastrado",
                        status:409
                    })
                }
            }
            await usuario.update(body)
            
            return {
                cpf_cnpj: loja.cpf_cnpj,
                nome: loja.nome,
                email: loja.email,
                descricao: loja.descricao,
                criado_em: loja.criado_em,
                atualizado_em: loja.atualizado_em,
                deletado_em: loja.deletado_em
            }

        }catch(error){
            throw(error)
        }
    }
}

module.exports = UpdateLojaUseCase