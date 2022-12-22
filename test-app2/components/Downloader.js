import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import ytdl from 'react-native-ytdl'
import Button from './Button';


export default class Downloader extends Component {
    constructor(){
        super();
        this.state = {
          url: '',
          buttonStatus: false,
          bgButtonColor: '#0000ff',
          buttonText: 'Baixar',
          inputText: ''
        };
    }

    handleVideoInput = (text) => {
      this.setState({inputText: text})
    }

    downloadFromYt = async (youtubeUrl) => {
      this.setState({bgButtonColor: '#F6BE00'})
      this.setState({buttonText: 'Aguarde'})
      const url = await ytdl(youtubeUrl, { quality: 'highestaudio' });
      const info = await ytdl.getBasicInfo(youtubeUrl);
      const uri = url[0]['url']
      const title = info['videoDetails']['title']


      const file = await FileSystem.getInfoAsync(FileSystem.documentDirectory + title + '.mp3');
      if (file.exists) {
        this.setState({bgButtonColor: '#F6BE00'})
        this.setState({buttonText: 'Arquivo já existe'})
      }
      else {
        this.setState({buttonStatus: true})
        this.setState({bgButtonColor: '#ff0000'})
        this.setState({buttonText: 'Baixando...'})
        this.downloadFile(uri, title)
      }
    }

    downloadFile(uri, title){
        const callback = downloadProgress => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          this.setState({
            downloadProgress: progress,
          });
        };

        const downloadResumable = FileSystem.createDownloadResumable(
          uri,
          FileSystem.documentDirectory + title + '.mp3',
          {},
          callback
        );
        downloadResumable.downloadAsync()
        .then(({ uri }) => {
            this.saveFile(uri);
          })
          .catch(error => {
            console.error(error);
          })
    }

    saveFile = async (fileUri) => {
        try {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status === "granted") {
            console.log("Finalizado");
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            this.setState({uri: fileUri});
            this.setState({bgButtonColor: '#228C22'})
            this.setState({buttonText: 'Finalizado'})
          } else {
            console.log("Falha no download");
          }
        } catch (err) {
          console.warn(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                  Youtube Downloader to MP3
                </Text>
                <TextInput style={styles.input} onChangeText={this.handleVideoInput} placeholder="Insira o link aqui"/>
                <Button label={this.state.buttonText} action={() => this.downloadFromYt(this.state.inputText)} disable={this.state.buttonStatus} bgColor={this.state.bgButtonColor}></Button>
                <Text style={styles.paragraph}>
                {isNaN(Math.round(this.state.downloadProgress * 100)) ? '' : 'Progresso: ' + Math.round(this.state.downloadProgress * 100) + '%' }
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  header: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  input: {
    width: 200,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center'
  }
});