import _ from 'lodash';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Avatar, Button, ListItem } from 'react-native-elements'

import { Font } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;

import colors from 'HSColors';

const Articles = [
  {
    Author: 'Johh Smith',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    title: 'yiuyuiyyyiyiu'
  },
  {
    Author: 'Sarah Parker',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg',
    title: 'hiuashiyrewuo',
    positive: true
  },
  {
    Author: 'Paul Allen',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
    title: 'yy98r7w98e7',
    positive: true
  },
  {
    Author: 'Terry Andrews',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/talhaconcepts/128.jpg',
    title: '897yhkjgkgk',
    positive: false
  },
  {
    Author: 'Andy Vitale',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/andyvitale/128.jpg',
    title: 'yyew8urowh',
    positive: false
  },
  {
    Author: 'Katy Friedson',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
    title: 'hiuyhehnwbkrhn',
    positive: true
  },
];

export default class ListsScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'georgia': require('../../../assets/fonts/Georgia.ttf'),
      'regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../../../assets/fonts/Montserrat-Light.ttf'),
      'bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  

  renderCard(l, index) {
    const { Author, avatar } = l;

    return (
      <View key={index} style={{ height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5}}>
          <View >
            <ListItem
              leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
              key={index}
              onPress={console.log('pressed')}
              title={l.title}
              subtitle={l.Author}
              chevron
              bottomDivider
            />
          </View>

      </View>
    );
  }

  renderListCards() {
    return _.map(Articles, (l, index) => {
      return this.renderCard(l, index);
    });
  }

  render() {
    return (
      <View>
        {this.state.fontLoaded ?
          <View style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>
                Review
              </Text>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
              <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10}}>
                <View style={{flex: 3, flexDirection: 'row'}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Avatar
                      width={145}
                      height={145}
                      source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
                      }}
                      activeOpacity={0.7}
                      avatarStyle={{borderRadius: 145/2}}
                      overlayContainerStyle={{backgroundColor: 'transparent'}}
                    />
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ flex: 1, marginTop: 10, justifyContent: 'center'}}>
                      <Text style={{ fontFamily: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15}}>
                        Paul Allen
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <Button
                      title='to edit'
                      buttonStyle={{height: 33, width: 120, backgroundColor: 'rgba(222, 223, 226, 1)', borderRadius: 5}}
                      titleStyle={{fontFamily: 'regular', fontSize: 13, color: 'gray'}}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Button
                      title='already edited'
                      buttonStyle={{height: 33, width: 120, backgroundColor: 'rgba(113, 154, 112, 1)', borderRadius: 5}}
                      titleStyle={{fontFamily: 'regular', fontSize: 13, color: 'white'}}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                </View>
              </View>
              {this.renderListCards()}
            </ScrollView>
          </View> :
          <Text>Loading...</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  // list: {
  //   marginTop: 20,
  //   borderTopWidth: 1,
  //   borderColor: colors.greyOutline,
  //   backgroundColor: '#fff',
  // },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'regular',
    marginLeft: 20
  }
});
