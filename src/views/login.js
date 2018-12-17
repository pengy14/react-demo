import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// :fire: this is v good, @xavier-villelegier
import LoginScreen3 from './login/screen3';
import AppContainer from '../../main';

export default class Login extends Component {

  // constructor(props){
  //   super(props);
  //   this.props.changeLogin = AppContainer.changeLogin.bind(this);
  // }

  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={1}
        > */}
          <LoginScreen3 changeLogin={this.props.changeLogin} checkChief = {this.props.checkChief}/>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});
