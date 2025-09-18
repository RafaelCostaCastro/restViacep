const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const alunosRouter = require('./routes/alunos');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexao com MongoDB
mongoose.connect('mongodb://localhost:27017/FatecVotorantim')
  .then(() => console.log('MongoDB connected...'))
  .catch(() => console.log('Erro de conexao!'));

// Rotas
app.use('/alunos', alunosRouter);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
