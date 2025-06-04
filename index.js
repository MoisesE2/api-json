const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3008;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('API com JSON como banco de dados!');
});

app.listen(port, () => {
  console.log(`Servidor rodando: http://localhost:${port}`);
});
