import React, { Component } from 'react'
import { Plataform, StyleSheet, Text, View, Button, TextInput } from 'react-native'
import Voice from 'react-native-voice'
import Tts from 'react-native-tts'

export default class App extends Component {

  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
    chat: []
  }

  constructor(props) {
    super(props)
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechRecognized = this.onSpeechRecognized
    Voice.onSpeechEnd = this.onSpeechEnd
    Voice.onSpeechError = this.onSpeechError
    Voice.onSpeechResults = this.onSpeechResults
    Voice.onSpeechPartialResults = this.onSpeechPartialResults
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged

    Tts.setDefaultLanguage('pt-BR')
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  componentDidMount() {
    Voice.isAvailable().then(e => alert(JSON.stringify(e)))
  }

  onSpeechStart = e => {
    console.log('onSpeechStart: ', e)
    this.setState({
      started: '√',
    })
  }

  onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e)
    this.setState({
      recognized: '√',
    })
  }

  onSpeechEnd = e => {
    const { chat, partialResults } = this.state
    console.log('onSpeechEnd: ', e)
    this.setState({
      end: '√',
      chat: [...chat, partialResults]
    })
    Tts.speak(partialResults[0])
  }

  onSpeechError = e => {
    console.log('onSpeechError: ', e)
    this.setState({
      error: JSON.stringify(e.error),
    })
  }

  onSpeechResults = e => {
    console.log('onSpeechResults: ', e)
    this.setState({
      results: e.value,
    })
  }

  onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e)
    this.setState({
      partialResults: e.value,
    })
  }

  onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e)
    this.setState({
      pitch: e.value,
    })
  }

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      // partialResults: [],
      end: '',
    })

    try {
      await Voice.start('pt-BR')
    } catch (e) {
      console.error(e)
    }
  }

  _stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel()
    } catch (e) {
      console.error(e)
    }
  }

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy()
    } catch (e) {
      console.error(e)
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    })
  }

  render() {
    const { started, results, partialResults, error, end, chat } = this.state
    return (
      <View style={styles.container}>
        <Button onPress={this._startRecognizing} title='Start' />
        <Text style={styles.speaker}>Started: {started}</Text>
        <Text style={styles.speaker}>End: {end}</Text>
        <Text style={styles.speaker}>PartialResults: {partialResults.map(v => `${v}, `)}</Text>
        <Text style={styles.speaker}>Chat: {chat.map(v => `${v}, `)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})