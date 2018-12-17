import _ from 'lodash';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Avatar, Button, ListItem, CheckBox, Header } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple'
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;
import autobind from 'class-autobind';
import Modal from 'react-native-modalbox';
import colors from 'HSColors';

const axios = require('axios');
const screen = Dimensions.get('window');
const baseUrl = 'http://45.76.75.242/api/';

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

const toAssignArticles = [
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

const editors = ['aty Friedson1', 'aty Friedson2', '3aty Friedson', '4aty Friedson', '5aty Friedson', '6aty Friedson', '7aty Friedson',
  '8aty Friedson', '9aty Friedson']



export default class ListsScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      isAssignArticles: false,
      checked: false,
      selectedEditors: [],
      isModalOpen: false,
      moreThan2Editors: false
    };

    autobind(this);

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


  onSelectionsChange = (selectedEditors) => { this.setState({ moreThan2Editors: false, selectedEditors }); }

  async getReviewList(editorID) {
    const url = `${baseUrl}editor/reviewlist?editorid=${editorID}`;
    try {
      const result = await axios.get(url);
      if (result.data.statuscode === 200) {
        return result.data.reviewlist;
      }
    } catch (error) {
      console.log(error);
    }

  }

  openAssignModal() {
    console.log('openAssign has been invoked');

    this.refs.assignArticle.open();
  }

  closeModalAssign() {
    console.log(this.state.selectedEditors);
    console.log(`length ${this.state.selectedEditors.length}`);
    if (this.state.selectedEditors.length > 2) return

    //做一些关于这些被选择的编辑的操作
    console.log(`ultimate  editor ${this.state.selectedEditors}`);

    this.setState({ selectedEditors: [], isModalOpen: false })
  }

  closeModalCancel() {
    this.setState({ selectedEditors: [], isModalOpen: false });
  }


  renderRemind() {
    if (this.state.selectedEditors.length > 2) {
      return (
        <Text>最多只能选择两个编辑</Text>
      )
    }
  }

  renderCheckedBox(editor, index) {
    return (
      <View key={index} style={{ height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5 }}>
        <View >
          {/* <ListItem key={index} > */}

          <CheckBox
            right
            title='分配'
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
          {/* </ListItem> */}
        </View>

      </View>
    );
  }

  renderCheckedBoxList(editors) {
    return _.map(editors, (editor, index) => {
      return this.renderCheckedBox(editor, index);
    });
  }

  renderCard(l, index) {
    // const { Author, avatar } = l;
    const navigator = this.props.navigation;
    console.log(`this.state.isAssignArticles ${this.state.isAssignArticles}`);
    return (
      <View key={index} style={{ height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5 }}>
        <View >
          <ListItem
            // leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
            key={index}
            onPress={this.state.isAssignArticles ? () => this.setState({ isModalOpen: true }) : () => navigator.navigate('ArticleDetail', { 'title': l.title, 'author': l.Author })}
            title={l.title}
            subtitle={l.author}
            chevron
            bottomDivider
          />
        </View>

      </View>
    );
  }

  renderListCards(Articles) {
    return _.map(Articles, (l, index) => {
      return this.renderCard(l, index);
    });
  }

   render() {
      
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ?
          <View style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
            <View style={{ flex: 0.5, flexDirection: 'column', backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10 }}>
              <View style={{ flex: 3, flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar
                    width={105}
                    height={105}
                    source={{
                      uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
                    }}
                    activeOpacity={0.7}
                    avatarStyle={{ borderRadius: 105 / 2 }}
                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flex: 1, marginTop: 10, justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15 }}>
                      Paul Allen
                      </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10 }} />
              {this.props.screenProps.isChief &&
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Button
                      title='待审核的文章'
                      buttonStyle={{ height: 33, width: 120, backgroundColor: this.state.isAssignArticles ? 'rgba(113, 154, 112, 1)' : 'rgba(222, 223, 226, 1)', borderRadius: 5 }}
                      titleStyle={{ fontFamily: 'regular', fontSize: 13, color: this.state.isAssignArticles ? 'white' : 'gray' }}
                      onPress={() => this.setState({ isAssignArticles: false })}
                      underlayColor="transparent"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button
                      title='分配编辑'
                      buttonStyle={{ height: 33, width: 120, backgroundColor: this.state.isAssignArticles ? 'rgba(222, 223, 226, 1)' : 'rgba(113, 154, 112, 1)', borderRadius: 5 }}
                      titleStyle={{ fontFamily: 'regular', fontSize: 13, color: this.state.isAssignArticles ? 'gray' : 'white' }}
                      onPress={() => this.setState({ isAssignArticles: true })}
                      underlayColor="transparent"
                    />
                  </View>
                </View>}
            </View>
            <ScrollView style={{ flex: 2, marginBottom: 20 }}>
              {/* {console.log(`editorid ${this.props.screenProps.editorID}`)} */}
              {/* {this.getReviewList(this.props.screenProps.editorID)} */}
              {!this.state.isAssignArticles && this.renderListCards(Articles)}
              {this.state.isAssignArticles && this.renderListCards(toAssignArticles)}
            </ScrollView>
          </View> :
          <Text>Loading...</Text>
        }

        <Modal style={[styles.modal, styles.modal4]} position={"center"} ref={"assignArticle"} swipeArea={10} isOpen={this.state.isModalOpen}>
          {/* <Header leftComponent={{text:'可分配编辑列表',color:'#fff'}} backgroundColor='green'/> */}
          <View style={{ flex: 1 }}>
            <SelectMultiple
              items={editors}
              selectedItems={this.state.selectedEditors}
              onSelectionsChange={this.onSelectionsChange}
            />

            {this.renderRemind()}

            <View style={[styles.buttonsContainer]}>
              <Button
                title="Assign"
                buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
                containerStyle={{ height: 40 }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={this.closeModalAssign}
              />
              <Button
                title="Cancel"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                containerStyle={{ height: 40 }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={this.closeModalCancel}
              />
            </View>
          </View>
        </Modal>

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
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  modal: {
    flex: 0.5
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  modal4: {
    height: 400
  },
  buttonsContainer: {
    // flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // marginTop: 10,
    // backgroundColor:'green'
  },
});
