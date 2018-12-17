import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import { Font } from 'expo';
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import AppContainer from '../../../main';
import Login from '../login';

const axios = require('axios');
// const baseUrl = 'http://149.248.3.53';
const baseUrl = 'http://119.23.241.119:8080/Entity/U3306a6d35762f/TNS/user/';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_screen4.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default class LoginScreen2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      fontLoaded: false,
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    // this.props.changeLogin = Login.changeLogin.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../../../assets/fonts/Georgia.ttf'),
      'regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../../../assets/fonts/Montserrat-Light.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  async login() {
    const {
      name,
      email,
      password,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call

    console.log('im innnnnnn');
    // axios.get('http://119.23.241.119:8080/Entity/U3306a6d35762f/TNS/user/1544094054117').then(response=>{
    //   console.log(response.data);
    //   if(response.data.password===password){
    //     console.log(this);
    //     this.props.changeLogin();
    //   }
    // });
    console.log(`username ffff ${name}`)
    console.log(`${baseUrl}1544344751850`);
    console.log(password);
    try{
    const result = await axios({
      method: 'post',
      url: `http://45.76.75.242/api/editor/login`,
      data: {

        "editor": {
          "editorname": name,
          "password": password
        }
      }

    });
    console.log(result.data);
    if(result.data.statuscode===200){
      console.log('pwd eq');
      if(password==='admin'){
        this.props.checkChief(true,result.data.editor.id);
      }
    this.props.changeLogin();
    }
  }catch(error){
    console.log(`handle error`);
    console.log(error);
      this.setState({isPasswordValid:false});
  }


    // console.log('2222');
   
   

    //TODO
    if (true) {
      
    }

    // if(result.data.password===password){
    //   console.log('pwd eq');
    //   console.log(this);
    // }
    // console.log(result.data);

  }

  async signUp() {
    const {
      name,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    console.log(`${baseUrl}`);
    const result = await axios({
      method: 'post',
      url: `${baseUrl}`,
      data: {
        name: name,
        password: password,
        email: email
      }
    });

    console.log(result.data);
    if (result.data.type === 'user') {
      console.log('ininiin');
      this.setState({ selectedCategory: 0, isLoading: false });
    }

  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      name,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        >
          {this.state.fontLoaded ?
            <View>
              <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior='position'>
                <View style={styles.titleContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titleText}>Travel</Text>
                  </View>
                  <View style={{ marginTop: -10, marginLeft: 10 }}>
                    <Text style={styles.titleText}>VOYAGES</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    disabled={isLoading}
                    clear
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
                    title={'Login'}
                  />
                  <Button
                    disabled={isLoading}
                    clear
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                    title={'Sign up'}
                  />
                </View>
                <View style={styles.rowSelector}>
                  <TabSelector selected={isLoginPage} />
                  <TabSelector selected={isSignUpPage} />
                </View>
                <View style={styles.formContainer}>
                  <Input // username
                    leftIcon={
                      <Icon
                        name='user-o'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={name}
                    keyboardAppearance='light'
                    autoFocus={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='default'
                    returnKeyType='next'
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'username'}
                    containerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
                    // ref={input => this.emailInput = input}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={name => this.setState({ name })}
                  // errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
                  />

                  {isSignUpPage &&
                    <Input
                      leftIcon={
                        <Icon
                          name='envelope-o'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{ backgroundColor: 'transparent' }}
                        />
                      }
                      value={email}
                      keyboardAppearance='light'
                      autoFocus={false}
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType='next'
                      inputStyle={{ marginLeft: 10 }}
                      placeholder={'Email'}
                      containerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
                      // ref={input => this.emailInput = input}
                      onSubmitEditing={() => this.passwordInput.focus()}
                      onChangeText={email => this.setState({ email })}
                      errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
                    />}

                  <Input
                    leftIcon={
                      <SimpleIcon
                        name='lock'
                        color='rgba(0, 0, 0, 0.38)'
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    value={password}
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                    blurOnSubmit={true}
                    containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Password'}
                    // ref={input => this.passwordInput = input}
                    onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                    onChangeText={(password) => this.setState({ password })}
                    errorMessage={isPasswordValid ? null : 'Please enter correct password or username'}
                  />

                  {isSignUpPage &&
                    <Input
                      leftIcon={
                        <SimpleIcon
                          name='lock'
                          color='rgba(0, 0, 0, 0.38)'
                          size={25}
                          style={{ backgroundColor: 'transparent' }}
                        />
                      }
                      value={passwordConfirmation}
                      secureTextEntry={true}
                      keyboardAppearance='light'
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='default'
                      returnKeyType={'done'}
                      blurOnSubmit={true}
                      containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
                      inputStyle={{ marginLeft: 10 }}
                      placeholder={'Confirm password'}
                      // ref={input => this.confirmationInput = input}
                      onSubmitEditing={this.signUp}
                      onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                      errorMessage={isConfirmationValid ? null : 'Please enter the same password'}
                    />}
                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{ marginTop: 32, flex: 0 }}
                    activeOpacity={0.8}
                    title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                    onPress={isLoginPage ? this.login : this.signUp}
                    titleStyle={styles.loginTextButton}
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </View>
              </KeyboardAvoidingView>
              <View style={styles.helpContainer}>
                <Button
                  title={'Need help ?'}
                  titleStyle={{ color: 'white' }}
                  buttonStyle={{ backgroundColor: 'transparent' }}
                  underlayColor='transparent'
                  onPress={() => console.log('Account created')}
                />
              </View>
            </View>
            :
            <Text>Loading...</Text>
          }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
    // justifyContent: 'space-around'
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
