const { Model, DataTypes } = require('sequelize');
const sequelize = require('../orm/sequelize')

class Produtos extends Model {}

Produtos.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_loja: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'Lojas', // Nome da tabela associada ao modelo Loja
            key: 'cpf_cnpj' // Chave primária na tabela referenciada
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nome do produto'
    },
    valor: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: 'Preço do produto'
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Categoria do produto'
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Descrição do produto'
    }
}, { sequelize, modelName: 'produtos' });

module.exports = Produtos;
