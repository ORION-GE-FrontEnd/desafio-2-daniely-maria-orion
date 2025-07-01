// para rodar a aplicação, tirei no app.js
const app = require('./app'); // Importa a instância do app
const port = 3001;

app.listen(port, () => {
  console.log(`Servidor de E-commerce rodando em http://localhost:${port}`);
});