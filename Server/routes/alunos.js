const express = require('express');
const axios = require('axios');
const Aluno = require('../models/Aluno');
const router = express.Router();

// Criar novo aluno (com busca ViaCEP)
router.post('/', async (req, res) => {
  try {
    const { matricula, nome, endereco, cursos } = req.body;
    const { cep, numero, complemento } = endereco;

    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (data.erro) return res.status(404).json({ error: 'CEP inválido' });

    const aluno = new Aluno({
      matricula,
      nome,
      endereco: {
        cep,
        logradouro: data.logradouro,
        cidade: data.localidade,
        bairro: data.bairro,
        estado: data.uf,
        numero,
        complemento
      },
      cursos
    });

    await aluno.save();
    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos
router.get('/', async (req, res) => {
  res.json(await Aluno.find());
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(aluno);
});

// Atualizar
router.put('/:id', async (req, res) => {
  const { matricula, nome, endereco, cursos } = req.body;
  let updateData = { matricula, nome, cursos };
  if (endereco && endereco.cep) {
    const { data } = await axios.get(`https://viacep.com.br/ws/${endereco.cep}/json/`);
    updateData.endereco = {
      cep: endereco.cep,
      logradouro: data.logradouro,
      cidade: data.localidade,
      bairro: data.bairro,
      estado: data.uf,
      numero: endereco.numero,
      complemento: endereco.complemento
    };
  }
  const aluno = await Aluno.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(aluno);
});

// Excluir
router.delete('/:id', async (req, res) => {
  const aluno = await Aluno.findByIdAndDelete(req.params.id);
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json({ status: 'deletado com sucesso' });
});

module.exports = router;
