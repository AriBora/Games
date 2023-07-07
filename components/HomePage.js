import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, SafeAreaView, Image, Platform, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const HomePage=({navigation})=> {
  return (
    <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sudoku')}>
                <Text style={styles.buttonText}>Sudoku</Text>
                <Image source={require("../assets/sudoku_icon.webp")} style={styles.image}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Minesweeper')}>
                <Text style={styles.buttonText}>Minesweeper</Text>
                <Image source={require("../assets/minesweeper.png")} style={styles.image}></Image>
            </TouchableOpacity>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    margin: Platform.OS=='android'? StatusBar.currentHeight:0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth:5,
    height:300,
    width:300,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    alignSelf:'center',
    justifyContent:'flex-start',
  },
  image: {
    alignSelf:'center',
  },
});

export default HomePage;
