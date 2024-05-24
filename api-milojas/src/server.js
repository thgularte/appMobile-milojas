const App = require('./app')

const PORT = process.env.PORT || 3001; // Define a porta onde a API irá escutar
const app = new App(); // Crie uma instância da classe App

app.server.listen(PORT, () => { // Inicie o servidor na porta definida
    console.log(`Servidor rodando na porta ${PORT}`);
});