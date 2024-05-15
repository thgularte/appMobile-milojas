const AuthServices = require('../../../../appMobile-milojas/api-milojas/src/services/auth-services');
const http_status = require('../consts/http-status-enum');

function checa_token(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header) {
            throw {
                message: "O cabeçalho de autorização está indefinido",
                status: http_status.UNAUTHORIZED
            };
        }
        const [, token] = header.split(" ");
        if (!token) {
            throw {
                message: "O token está indefinido",
                status: http_status.UNAUTHORIZED
            };
        }
        const segredo = process.env.JWT_SECRET;
        if (!segredo) {
            throw {
                message: "O segredo JWT não está definido",
                status: http_status.INTERNAL_ERROR
            };
        }
        const usuario = AuthServices.decoda_jwt_token(token, segredo);
        const { id } = usuario;
        req.id_usuario = id;
        next();
    } catch (err) {
        const statusCode = err.status || http_status.INTERNAL_ERROR;
        return res.status(statusCode).json(err);
    }
}

module.exports = checa_token;
