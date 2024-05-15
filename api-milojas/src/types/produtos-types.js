const CriarProdutoBody = {
    id: 0,
    id_loja: 0,
    nome: '',
    valor: 0,
    categoria: '',
    descricao: ''
}

const CriarProdutoResponse = {
    id: 0,
    id_loja: 0,
    nome: '',
    valor: 0,
    categoria: '',
    descricao: ''
}

const GetProdutoResponse = {
    id: 0,
    id_loja: 0,
    nome: '',
    valor: 0,
    categoria: '',
    descricao: '',
    criado_em: new Date(),
    atualizado_em: new Date(),
    deletado_em: new Date()
}

const UpdateProdutoBody = {
    id: undefined,
    id_loja: undefined,
    nome: undefined,
    valor: undefined,
    categoria: undefined,
    descricao: undefined
}

const UpdateProdutoResponse = {
    id: 0,
    id_loja: 0,
    nome: '',
    valor: 0,
    categoria: '',
    descricao: '',
    criado_em: new Date(),
    atualizado_em: new Date(),
    deletado_em: new Date()
}

const ListProdutosQueryRequest = {
    limit: 0,
    offset: 0
};

// Definição do tipo de dados da resposta ao listar armadilhas
const ListProdutosResponse = {
    produtos: [],
    total: 0
};


