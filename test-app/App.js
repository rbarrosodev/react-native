import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Button from './components/Button';

export default function App() {
  const [bgColor, setBgColor] = useState('#000000');

  function changeColor(color) {
    console.log(bgColor)
    if(color == '#000000') {
      setBgColor('#ff0000')
    }
    else if(color == '#ff0000') {
      setBgColor('#00ff00')
    }
    else if(color == '#00ff00') {
      setBgColor('#0000ff')
    }
    else if(color == '#0000ff') {
      setBgColor('#000000')
    }
  }

  return (
    <View style={{backgroundColor: bgColor, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.firstText}>oi barroso</Text>
      <Button label={"clique aqui!"} action={() => changeColor(bgColor)}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstText: {
    color: '#fff'
  }
});
