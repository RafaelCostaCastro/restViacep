import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchAlunoById } from '../services/api';
import { commonStyles } from '../styles';

export default function AlunoDetails({ route }) {
  const { id } = route.params;
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    fetchAlunoById(id).then(setAluno);
  }, [id]);

  if (!aluno) return <Text style={commonStyles.text}>Carregando...</Text>;

  return (
    <View style={commonStyles.screen}>
      <Text style={commonStyles.label}>Matrícula:</Text>
      <Text style={commonStyles.text}>{aluno.matricula}</Text>
      <Text style={commonStyles.label}>Nome:</Text>
      <Text style={commonStyles.text}>{aluno.nome}</Text>
      <Text style={commonStyles.label}>CEP:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.cep}</Text>
      <Text style={commonStyles.label}>Logradouro:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.logradouro}</Text>
      <Text style={commonStyles.label}>Número:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.numero}</Text>
      <Text style={commonStyles.label}>Bairro:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.bairro}</Text>
      <Text style={commonStyles.label}>Cidade:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.cidade}</Text>
      <Text style={commonStyles.label}>Estado:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.estado}</Text>
      <Text style={commonStyles.label}>Complemento:</Text>
      <Text style={commonStyles.text}>{aluno.endereco.complemento}</Text>
      <Text style={commonStyles.label}>Cursos:</Text>
      <Text style={commonStyles.text}>{aluno.cursos && aluno.cursos.join(', ')}</Text>
    </View>
  );
}
