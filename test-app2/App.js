import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Downloader from './components/Downloader';

import Button from './components/Button';

export default function App() {
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#fff');

  function changeColor(color) {
    setBgColor(color)
  }

  function changeText(newText){
    setText(newText)
    console.log(text)
  }

  return (
    <Downloader></Downloader>
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10
  }
});
