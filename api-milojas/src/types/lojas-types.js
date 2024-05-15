const LojaLoginRequestBody = {
    email: '',
    senha: ''
}

const LojaLoginResponseBody ={
    cpf_cnpj: 0,
    nome: '',
    email: '',
    criado_em: new Date(),
    atualizado_em: newDate(),
    token: ''
}

const CriarLojaBody = {
    cpf_cnpj: 0,
    nome: '',
    email: '',
    senha: '',
    descricao: ''
}

const CriarLojaResponse = {
    cpf_cnpj: 0,
    nome: '',
    email: '',
    descricao: '',
    token: ''
}

const GetLojaResponse = {
    cpf_cnpj: 0,
    nome: '',
    email: '',
    senha: '',
    descricao: '',
    criado_em: new Date(),
    atualizado_em: new Date(),
    deletado_em: new Date(),
    produtos: [
       { id: 0,
        nome: '',
        valor: 0,
        categoria: '',
        descricao: ''}
    ]
}

const UpdateLojaBody = {
    cpf_cnpj: undefined,
    nome: undefined,
    email: undefined,
    senha: undefined,
    descricao: undefined
}

const UpdateLojaResponse = {
    cpf_cnpj: 0,
    nome: '',
    email: '',
    senha: '',
    descricao: '',
    criado_em: new Date(),
    atualizado_em: new Date(),
    deletado_em: new Date()
}

const ListLojasQueryRequest = {
    limit: 0,
    offset: 0
};

const ListLojasResponse = {
    lojas: [],
    total: 0
};


