import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Calculator() {
  const [historyText, setHistoryText] = useState('');
  const [resultText, setResultText] = useState('');

  const buttons = [
    ['C', 'DEL', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '', '']
  ];

  const handleOnPress = (button: string) => {
    if (button === 'C') {
      setHistoryText('');
      setResultText('');
      return;
    }
    if (button === 'DEL') {
      setResultText(resultText.slice(0, -1));
      return;
    }
    if (button === '=') {
      calculateResult();
      return;
    }
    setResultText(resultText + button);
  };

  const calculateResult = () => {
    try {
      setHistoryText(resultText);
      setResultText(eval(resultText).toString());
    } catch (error) {
      setResultText('Error');
    }
  };

  return (
    <View style={styles.container}>
      {/* View kết quả */}
      <View style={styles.containerResult}>
        <Text style={styles.historyText}>{historyText}</Text>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>

      {/* View các nút */}
      <View style={styles.containerButtons}>
        {/* Cột bên trái */}
        <View style={styles.containerButtonLeft}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((button, buttonIndex) => (
                <TouchableOpacity
                  key={buttonIndex}
                  style={styles.button}
                  onPress={() => handleOnPress(button)}
                >
                  {button !== '' ? (
                    <Text style={styles.buttonText}>{button}</Text>
                  ) : (
                    <Text style={styles.buttonText}></Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Cột bên phải */}
        <View style={styles.containerButtonRight}>
          <TouchableOpacity style={styles.buttonSpecial}>
            <Entypo name="light-up" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22252D',
  },
  containerResult: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  historyText: {
    fontSize: 24,
    color: '#7c7c7c',
  },
  resultText: {
    fontSize: 48,
    color: 'white',
  },
  containerButtons: {
    flex: 5,
    flexDirection: 'row',
  },
  containerButtonLeft: {
    flex: 3,
    backgroundColor: '#292D36',
  },
  containerButtonRight: {
    flex: 1,
    backgroundColor: '#272B33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272B33',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  buttonSpecial: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff9500',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
