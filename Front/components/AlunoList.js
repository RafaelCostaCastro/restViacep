import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchAlunos, deleteAluno } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { commonStyles } from '../styles';

export default function AlunoList({ navigation }) {
  const [alunos, setAlunos] = useState([]);

  const carregar = () => fetchAlunos().then(setAlunos);

  useFocusEffect(
    useCallback(() => { carregar(); }, [])
  );

  const remover = id => { deleteAluno(id).then(carregar); };

  return (
    <View style={commonStyles.screen}>
      <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Form')}>
        <Text style={commonStyles.buttonText}>ADICIONAR ALUNO</Text>
      </TouchableOpacity>

      <FlatList
        data={alunos}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 50 }]}>
            Nenhum aluno cadastrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
            <Text style={commonStyles.text}>{item.nome}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
              <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('Detalhes', { id: item._id })}
              >
                <Text style={commonStyles.buttonText}>VER</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('Form', { id: item._id })}
              >
                <Text style={commonStyles.buttonText}>EDITAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={commonStyles.buttonDanger}
                onPress={() => remover(item._id)}
              >
                <Text style={commonStyles.buttonText}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
