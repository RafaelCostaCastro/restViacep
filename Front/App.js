import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AlunoList from './components/AlunoList';
import AlunoForm from './components/AlunoForm';
import AlunoDetails from './components/AlunoDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={NavigationDarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Alunos" component={AlunoList} />
        <Stack.Screen name="Form" component={AlunoForm} />
        <Stack.Screen name="Detalhes" component={AlunoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
