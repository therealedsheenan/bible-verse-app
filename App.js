import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ActivityIndicator } from 'antd-mobile';
import { AppRegistry } from 'react-native';
import axios from 'axios';


export default class BibleVerse extends React.Component {
  constructor(props) {
    super(props);
    this.getBibleVerse = this.getBibleVerse.bind(this);
    this.state = {
      bibleVerse: '',
      isLoading: false
    }
  }

  getBibleVerse () {
    const _self = this;
    this.setState({ isLoading: true })
    axios.get('http://www.ourmanna.com/verses/api/get?format=text&order=random')
      .then(function (response) {
        if (response.data) {
          _self.setState({
            isLoading: !_self.state.isLoading,
            bibleVerse: response.data
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { isLoading, bibleVerse } = this.state;
    return (
      <View style={styles.container}>
        <Button onClick={this.getBibleVerse}>Get Daily Bible Verse</Button>
        {isLoading ? <ActivityIndicator size="large" /> : <Text>{bibleVerse}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('BibleVerse', () => BibleVerse);
