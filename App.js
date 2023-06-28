import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function App() {
  const [ notification , setNotification ] = react.useState('Player X to start')
  const [ refresh, setRefresh ] = react.useState(false)

  const [ board, setBoard ] = react.useState(
    [
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ]
  )

  const [ currentPlayer, setCurrentPlayer ] = react.useState('X')

  const pressField = (index) => {
    let newBoard = board
    if (newBoard[index] !== 'X' && newBoard[index] !== 'O') {
      if (currentPlayer == 'X') {
        newBoard[index] = 'X'
        setCurrentPlayer('O')
        setNotification('Player O to move')
      } 
      else {
        newBoard[index] = 'O'
        setCurrentPlayer('X')
        setNotification('Player X to move')
      }
      setBoard(newBoard)
      setRefresh(!refresh)
      checkWinner()
    }
  }

  const checkWinner = () => {
    if (board[0] == board[1] && board[1] == board[2] && board[0] !== " ") {
      playerWon(board[0], 'win')
    } else if (board[3] == board[4] && board[4] == board[5] && board[3] !== " ") {
      playerWon(board[3], 'win')
    } else if (board[6] == board[7] && board[7] == board[8] && board[6] !== " ") {
      playerWon(board[6], 'win')
    } else if (board[0] == board[3] && board[3] == board[6] && board[0] !== " ") {
      playerWon(board[0], 'win')
    } else if (board[1] == board[4] && board[4] == board[7] && board[1] !== " ") {
      playerWon(board[1], 'win')
    } else if (board[2] == board[5] && board[5] == board[8] && board[2] !== " ") {
      playerWon(board[2], 'win')
    } else if (board[0] == board[4] && board[4] == board[8] && board[0] !== " ") {
      playerWon(board[0], 'win')
    } else if (board[2] == board[4] && board[4] == board[6] && board[2] !== " ") {
      playerWon(board[2], 'win')
    } else if (!board.includes(" ")) {
      playerWon(currentPlayer, 'tie')
    }
  }

  const playerWon = async (symbol, bool) => {
    if (bool == 'win') {
      setNotification("Player " + symbol + ' won!')
    } else {
      setNotification("It's a tie!")
    }
    
    await delay(2000)
    setBoard([
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ])
    if (symbol == '0') {
      setNotification('Player X to move')
    } else {
      setNotification('Player O to move')
    }
  }

  return (
    <View style={styles.container}>
      <Image 
          source={require('./assets/background.jpg')}
          style={styles.background}
        ></Image>
      <StatusBar style="auto" /> 
      <Text style={styles.txt1}>Tic-Tac-Toe</Text>
      <Text style={styles.txt2}>{notification}</Text>
      <View style={styles.flatlistContainer}>
        <Image 
          source={require('./assets/bg.png')}
          style={styles.image}
        ></Image>
        <FlatList
        style={styles.list}
        data ={board}
        numColumns={3}
        refreshing={true}
        extraData={refresh}
        renderItem={ ({ item, index }) => 
          <TouchableOpacity 
            style={styles.square}
            onPress={() => pressField(index)}
          >
            <Text style={styles.txtXO}>{item}</Text>
          </TouchableOpacity>
        }>
        </FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 450,
    width: '100%',
  },
  txt1: {
    fontSize: 45,
    position: 'absolute',
    top: 60,
    color: 'white',
  },
  txt2: {
    fontSize: 20,
    position: 'absolute',
    top: 180,
    color: 'white',
  },  
  txtXO: {
    fontSize: 50,
    color: 'white',
  },
  list: {
    width: 450,
    height: 450,
  },  
  square: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  image: {
    width: 450,
    height: 450,
    position: 'absolute'
  },  
  background: {
    width: '100%',
    height: '100%', 
    zIndex: -1, 
    position: 'absolute',  
  },
});
