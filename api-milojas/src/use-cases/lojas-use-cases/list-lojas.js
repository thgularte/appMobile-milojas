const Joi = require('joi');
const http_status = require('../../consts/http-status-enum');
const Lojas = require('../../models/Lojas');

const req_query_schema = Joi.object({
    limit: Joi.number().default(10).error(() => new Error("Limit inválido")),
    offset: Joi.number().default(0).error(() => new Error("Offset inválido"))
});

class ListLojasUseCase {
    static async valida(query) {
        try {
            await req_query_schema.validateAsync(query);
        } catch (err) {
            throw { message: err.message, status: http_status.BAD_REQUEST };
        }
    }

    static async executa(query) {
        try {
            const { limit, offset } = query;
            const { rows, count } = await Lojas.findAndCountAll({ limit, offset });
            return {
                lojas: rows,
                total: count
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ListLojasUseCase;
