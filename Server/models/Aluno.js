const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema({
  cep: String,
  logradouro: String,
  cidade: String,
  bairro: String,
  estado: String,
  numero: String,
  complemento: String
});

const AlunoSchema = new mongoose.Schema({
  matricula: String,
  nome: String,
  endereco: EnderecoSchema,
  cursos: [String]
});

module.exports = mongoose.model('Aluno', AlunoSchema);
