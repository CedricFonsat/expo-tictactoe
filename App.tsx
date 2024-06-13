import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export const themes = {
  color: {
    primary: '#171F38',
    secondary: '#756EDC',
    grey: '#264258',
    white: '#FFFFFF',
  },
  font: {
    primary: 'Roboto',
  },
  size: {
    small: 14,
    medium: 16,
    large: 18,
    spacing: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

}

export default function App() {
  const [plato, setPlato] = useState(['','','','','','','','','']);
  const [changePlayer, setChangePlayer] = useState(true);
  const [pointX, setPointX] = useState(0);
  const [pointO, setPointO] = useState(0);
  const [pointNull, setPointNull] = useState(0);
  const playerX = 'X';
  const playerO = 'O';

  // Les combinaisons gagnantes dans un jeu de tic-tac-toe
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Fonction pour vérifier si un joueur a gagné
function checkWin(board: string[]): string | null {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Utilisation de la fonction checkWin avec le tableau plato
const winner = checkWin(plato);
if (winner) {
  Alert.alert(`Le joueur ${winner} a gagné!`);
  if (winner === 'X') {
    setPointX(pointX + 1);
  } else {
    setPointO(pointO + 1);
  }
  setPlato(['','','','','','','','','']);
} else if (!plato.includes('')) {
  Alert.alert('Match nul!');
  setPointNull(pointNull + 1);
  setPlato(['','','','','','','','','']);
}else {
  console.log('Le jeu est toujours en cours');
}


  const handlePlay = (index: number) => {
    if (plato[index] !== '') {
      return;
    }
    setChangePlayer(!changePlayer);
    const newPlato = [...plato];
    newPlato[index] = changePlayer ? playerX : playerO;
    setPlato(newPlato);
  }

  //console.log(plato,'hhhh');
  
  return (
    <View style={styles.container}>
      <Text style={{ color: themes.color.white, fontSize: themes.size.large, fontWeight: 'bold'}}>Expo Tic Tac Toe</Text>
      <Text style={{color: themes.color.white}}>by Cedric</Text>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: themes.size.width,
        height: themes.size.width,
        borderWidth: 1,
        borderColor: themes.color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: themes.size.spacing * 3
      }}>
      {plato.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handlePlay(index)}
        style={{
          width: themes.size.width / 3.5,
          height: themes.size.width / 3.5,
          backgroundColor: themes.color.grey,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        >
          <Text>
            {item == "X" && (<Image style={{
              width: 100,
              height: 100,
              zIndex: 1
            
            }} source={require('./assets/tac.png')} />)}

            {item == "O" && (<Image style={{
              width: 80,
              height: 80,
              zIndex: 1
            
            }} source={require('./assets/tic.png')} />)}
          </Text>
        </TouchableOpacity>
      ))}
      </View>
      <StatusBar style="auto" />
      <View style={{ flexDirection: 'row', gap: 20}}>
        <View 
        style={{
          width: 100,
          height: 100,
          backgroundColor: themes.color.grey,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        ><Text style={{color: themes.color.white, fontSize: 40, fontWeight: 'bold'}}>{pointO}</Text></View>
         <View 
        style={{
          width: 100,
          height: 100,
          backgroundColor: themes.color.grey,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        ><Text style={{color: themes.color.white, fontSize: 40, fontWeight: 'bold'}}>{pointNull}</Text></View>
         <View 
        style={{
          width: 100,
          height: 100,
          backgroundColor: themes.color.grey,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        ><Text style={{color: themes.color.white, fontSize: 40, fontWeight: 'bold'}}>{pointX}</Text></View>
      </View>
      <View style={{ flexDirection: 'row', gap: 20}}>
        <View 
        style={{
          width: 100,
          height: 50,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        ><Text style={{color: themes.color.white, fontSize: 20}}>Player O</Text></View>
         <View 
        style={{
          width: 100,
          height: 50,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        ><Text style={{color: themes.color.white, fontSize: 20}}>Match nul</Text></View>
         <View 
        style={{
          width: 100,
          height: 50,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: themes.color.primary,
          borderRadius: 8
        }}
        ><Text style={{color: themes.color.white, fontSize: 20}}>Player X</Text></View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.color.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
