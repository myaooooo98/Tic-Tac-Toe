import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  // const [ number1, setNumber1 ] = react.useState(0)

  // const addNumber = () => {
  //   let newNumber = number1 + 1
  //   setNumber1(newNumber)
  // }

  // const subtractNumber = () => {
  //   let newNumber = number1 - 1
  //   setNumber1(newNumber)
  // } 

  const [ notification , setNotification ] = react.useState('Player X to start')

  const [ board, setBoard ] = react.useState(
    [
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ]
  )

  return (
    <View style={styles.container}>
      <StatusBar style="auto" /> 

      <Text style={styles.txt1}>Tic Tac Toe</Text>
      <Text style={styles.txt2}>{notification}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: 50,
  },
  txt2: {
    fontSize: 20,
  },  
});
