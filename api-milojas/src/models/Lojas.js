const {Model, DataTypes} = require('sequelize')
const sequelize = require('../orm/sequelize')
const Produtos  = require('./produtos')

class Lojas extends Model {}

Lojas.init({
    cpf_cnpj: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        Comment: 'Nome da loja'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        Comment: 'E-mail da loja'
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        Comment: 'Descrição da loja'
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      atualizado_em: {
        type: DataTypes.DATE,
      },
      deletado_em: {
        type: DataTypes.DATE,
      },
}, {sequelize, modelName: 'lojas'})

Lojas.hasMany(Produtos, { foreignKey: 'id_loja', as: 'produtos' });

module.exports = Lojas