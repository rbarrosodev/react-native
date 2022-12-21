import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import Button from './Button';


export default class Downloader extends Component {
    constructor(){
        super();
        this.state = {
          url: '',
          buttonStatus: false,
          bgButtonColor: '#0000ff'
        }
    }

    downloadFile(){
        this.setState({buttonStatus: true})
        this.setState({bgButtonColor: '#ff0000'})
        const uri = "https://file-examples.com/storage/fe42c8472a63a1f029d7e90/2017/04/file_example_MP4_1920_18MG.mp4"
        let fileUri = FileSystem.documentDirectory + "earth.mp4";
        FileSystem.downloadAsync(uri, fileUri)
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
            console.log("Autorizado");
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            this.setState({uri: fileUri});
          } else {
            console.log("Não autorizado");
          }
        } catch (err) {
          console.warn(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button label={'clique aqui'} action={() => this.downloadFile()} disable={this.state.buttonStatus} bgColor={this.state.bgButtonColor}></Button>
                <Text style={styles.paragraph}>
                Path: 
                {this.state.uri}
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});