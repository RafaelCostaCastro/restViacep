import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { addAluno, updateAluno, fetchAlunoById } from '../services/api';
import { commonStyles } from '../styles';

export default function AlunoForm({ navigation, route }) {
  const id = route.params?.id;
  const [form, setForm] = useState({
    matricula: '',
    nome: '',
    endereco: {
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      numero: '',
      complemento: ''
    },
    cursos: ''
  });

  useEffect(() => {
    if (id) {
      fetchAlunoById(id).then(aluno => {
        setForm({
          matricula: aluno.matricula,
          nome: aluno.nome,
          endereco: {
            cep: aluno.endereco.cep,
            logradouro: aluno.endereco.logradouro,
            bairro: aluno.endereco.bairro,
            cidade: aluno.endereco.cidade,
            estado: aluno.endereco.estado,
            numero: aluno.endereco.numero,
            complemento: aluno.endereco.complemento
          },
          cursos: aluno.cursos.join(', ')
        });
      });
    }
  }, [id]);

  const buscarCep = async (cep) => {
    if (!cep || cep.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        Alert.alert('CEP não encontrado');
        setForm(prev => ({
          ...prev,
          endereco: { ...prev.endereco, logradouro: '', bairro: '', cidade: '', estado: '', cep }
        }));
      } else {
        setForm(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            cep,
            logradouro: data.logradouro ?? '',
            bairro: data.bairro ?? '',
            cidade: data.localidade ?? '',
            estado: data.uf ?? ''
          }
        }));
      }
    } catch (e) {
      Alert.alert('Erro ao buscar CEP');
      console.log('Erro ViaCEP:', e);
    }
  };

  const handleChange = (field, value) => {
    if (
      ['cep', 'logradouro', 'bairro', 'cidade', 'estado', 'numero', 'complemento'].includes(field)
    ) {
      setForm({
        ...form,
        endereco: { ...form.endereco, [field]: value }
      });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const salvar = async () => {
    if (!form.endereco.cep || form.endereco.cep.length !== 8) {
      Alert.alert('Digite um CEP válido com 8 dígitos!');
      return;
    }

    const aluno = {
      matricula: form.matricula,
      nome: form.nome,
      endereco: { ...form.endereco },
      cursos: form.cursos.split(',').map(s => s.trim())
    };
    console.log('Enviando aluno ao backend:', aluno);

    try {
      if (id) {
        await updateAluno(id, aluno);
      } else {
        await addAluno(aluno);
      }
      navigation.navigate('Alunos'); // Troca o goBack por navegação segura para lista principal
    } catch (e) {
      Alert.alert('Erro ao salvar aluno', e.message || 'Erro desconhecido');
      console.log('Erro salvar aluno:', e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#181818' }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        style={commonStyles.screen}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ... os campos do formulário ... */}
        <Text style={commonStyles.label}>Matrícula:</Text>
        <TextInput
          value={form.matricula}
          onChangeText={t => handleChange('matricula', t)}
          style={commonStyles.input}
          placeholder="Matrícula"
          placeholderTextColor="#888"
        />
        <Text style={commonStyles.label}>Nome:</Text>
        <TextInput
          value={form.nome}
          onChangeText={t => handleChange('nome', t)}
          style={commonStyles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
        />
        <Text style={commonStyles.label}>CEP:</Text>
        <TextInput
          value={form.endereco.cep}
          onChangeText={t => {
            const raw = t.replace(/\D/g, '');
            handleChange('cep', raw);
            if (raw.length === 8) buscarCep(raw);
          }}
          style={commonStyles.input}
          placeholder="CEP"
          placeholderTextColor="#888"
          keyboardType="numeric"
          maxLength={8}
        />
        <Text style={commonStyles.label}>Logradouro:</Text>
        <TextInput
          value={form.endereco.logradouro}
          style={commonStyles.input}
          placeholder="Logradouro"
          placeholderTextColor="#888"
          editable={false}
        />
        <Text style={commonStyles.label}>Bairro:</Text>
        <TextInput
          value={form.endereco.bairro}
          style={commonStyles.input}
          placeholder="Bairro"
          placeholderTextColor="#888"
          editable={false}
        />
        <Text style={commonStyles.label}>Cidade:</Text>
        <TextInput
          value={form.endereco.cidade}
          style={commonStyles.input}
          placeholder="Cidade"
          placeholderTextColor="#888"
          editable={false}
        />
        <Text style={commonStyles.label}>Estado:</Text>
        <TextInput
          value={form.endereco.estado}
          style={commonStyles.input}
          placeholder="UF"
          placeholderTextColor="#888"
          editable={false}
        />
        <Text style={commonStyles.label}>Número:</Text>
        <TextInput
          value={form.endereco.numero}
          onChangeText={t => handleChange('numero', t)}
          style={commonStyles.input}
          placeholder="Número"
          placeholderTextColor="#888"
        />
        <Text style={commonStyles.label}>Complemento:</Text>
        <TextInput
          value={form.endereco.complemento}
          onChangeText={t => handleChange('complemento', t)}
          style={commonStyles.input}
          placeholder="Complemento"
          placeholderTextColor="#888"
        />
        <Text style={commonStyles.label}>Cursos (separados por vírgula):</Text>
        <TextInput
          value={form.cursos}
          onChangeText={t => handleChange('cursos', t)}
          style={commonStyles.input}
          placeholder="Cursos"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={commonStyles.button} onPress={salvar}>
          <Text style={commonStyles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
