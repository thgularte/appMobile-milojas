const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthServices {
    static async hash_senha(senha) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(senha, salt);
    }

    static async compara_senha_com_hash(senha, hash) {
        return await bcrypt.compare(senha, hash);
    }

    static gera_jwt_token(payload, segredo) {
        return jwt.sign(payload, segredo, { expiresIn: "360d" });
    }

    static decoda_jwt_token(token, segredo) {
        const payload = jwt.verify(token, segredo);
        if (typeof payload === 'string') {
            throw new Error("JWT payload não pode ser uma string");
        }
        return {
            id: payload.id,
            ...payload
        };
    }
}

module.exports = AuthServices;
