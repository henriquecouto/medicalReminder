import React, { Component } from 'react'
import { Plataform, StyleSheet, Text, View, Button, TextInput } from 'react-native'
import Voice from 'react-native-voice'

export default class App extends Component {

  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
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
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  componentDidMount() {
    Voice.isAvailable().then(e => alert(JSON.stringify(e)))
  }

  onSpeechStart = e => {
    // eslint-disable-next-line
    console.log('onSpeechStart: ', e)
    this.setState({
      started: '√',
    })
  }

  onSpeechRecognized = e => {
    // eslint-disable-next-line
    console.log('onSpeechRecognized: ', e)
    this.setState({
      recognized: '√',
    })
  }

  onSpeechEnd = e => {
    // eslint-disable-next-line
    console.log('onSpeechEnd: ', e)
    this.setState({
      end: '√',
    })
  }

  onSpeechError = e => {
    // eslint-disable-next-line
    console.log('onSpeechError: ', e)
    this.setState({
      error: JSON.stringify(e.error),
    })
  }

  onSpeechResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechResults: ', e)
    this.setState({
      results: e.value,
    })
  }

  onSpeechPartialResults = e => {
    // eslint-disable-next-line
    console.log('onSpeechPartialResults: ', e)
    this.setState({
      partialResults: e.value,
    })
  }

  onSpeechVolumeChanged = e => {
    // eslint-disable-next-line
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
      partialResults: [],
      end: '',
    })

    try {
      await Voice.start('en-US')
    } catch (e) {
      //eslint-disable-next-line
      console.error(e)
    }
  }

  _stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      //eslint-disable-next-line
      console.error(e)
    }
  }

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel()
    } catch (e) {
      //eslint-disable-next-line
      console.error(e)
    }
  }

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy()
    } catch (e) {
      //eslint-disable-next-line
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
    const { input } = this.state
    return (
      <View style={styles.container}>
        <Button onPress={this._startRecognizing} title='Start' />
        <Text>{JSON.stringify(this.state)}</Text>
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