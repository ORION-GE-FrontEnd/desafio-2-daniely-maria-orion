const express = require('express'); 
const app = express();             
const port = 3001;     // Alterado para 3001 para consistência com o material do curso e evitar conflito padrão do React

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

// Importa as rotas
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');


app.get('/', (req, res) => {
  res.send('<h1>testando</h1>');
});

// Monta os roteadores
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', checkoutRoutes); // Rotas de pedidos também usam o roteador de checkout

// Tratamento de rotas desconhecidas.
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Rota desconhecida' });
};

app.use(unknownEndpoint);

app.listen(port, () => {
  console.log(`Servidor de E-commerce rodando em http://localhost:${port}`);
});

// Tratamento global de erros para evitar queda do servidor
process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada:', reason);
});