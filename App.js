import React from 'react';
import HomePage from './components/HomePage';
import Sudoku from './components/Sudoku';
import Minesweeper from './components/Minesweeper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} 
            options={
              {
                title: 'My Games' ,
                headerTitleAlign:'center',
              }} />
        <Stack.Screen name="Sudoku" component={Sudoku} />
        <Stack.Screen name="Minesweeper" component={Minesweeper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
