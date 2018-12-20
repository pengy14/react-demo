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
      moreThan2Editors: false,
      Articles: [],
      avaliableEditors: [],
      toAssignArticles: [],
      editornames: [],
      articleIndex: 0,
      isReviewed: false
    };

    autobind(this);

  }

  reviewed() {
    console.log(`我被调用了 reviewd`);

    const url = `${baseUrl}editor/reviewlist?editorid=${this.props.screenProps.editorID}`;
    this.setState({Articles:[]});
    axios.get(url)
    .then(response => {
      this.setState({ Articles: response.data.reviewlist, isReviewed: !this.state.isReviewed });
    })
    .catch(error => {
      console.log(error);
    })
  }

  async componentWillMount() {
    serverArticles = await this.getReviewList(this.props.screenProps.editorID);
    avaliableEditors = await this.getAvalEditor();
    editornames = avaliableEditors.map(editor => editor.editorname);
    // name2ID = avaliableEditors.map(editor=>{this.state.name2ID[editor.editorname]=editor.id});
    // console.log(JSON.stringify(name2ID));
    this.getToAssignList();
    this.setState({ Articles: serverArticles, avaliableEditors: avaliableEditors, editornames: editornames });
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

  async getToAssignList() { // TODO  等好了换成真实的
    const url = `${baseUrl}editor/assignlist`;  //真实的.
    try {
      const result = await axios.get(url);
      // result =JSON.parse(result);
      // console.log(`result ${JSON.stringify(result.data.assignList)}`);
      if (result.data.statuscode === 200) {
        // console.log(` editors  ${result.data.editors}`);
        // console.log(`come in avaliable`);

        this.setState({ toAssignArticles: result.data.assignlist.reverse() }); // 

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAvalEditor() {
    const url = `${baseUrl}chiefeditor/editors`;
    try {
      const result = await axios.get(url);
      // result =JSON.parse(result);
      // console.log(`result ${JSON.stringify(result)}`);
      if (result.data.statuscode === 200) {
        // console.log(` editors  ${result.data.editors}`);
        // console.log(`come in avaliable`);
        return result.data.editors;

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getReviewList(editorID) {
    const url = `${baseUrl}editor/reviewlist?editorid=${editorID}`;
    try {
      const result = await axios.get(url);
      if (result.data.statuscode === 200) {
        return result.data.reviewlist.reverse();
      }
    } catch (error) {
      console.log(error);
    }

  }

  openAssignModal() {
    console.log('openAssign has been invoked');

    this.refs.assignArticle.open();
  }

  closeModalAssign() { // TODO 等好了就 axios请求注释掉
    // console.log(this.state.selectedEditors);
    // console.log(`length ${this.state.selectedEditors.length}`);
    if (this.state.selectedEditors.length > 2) return

    //做一些关于这些被选择的编辑的操作
    const data = {
      "article": {
        "articleid": this.state.toAssignArticles[this.state.articleIndex].id,
        "editor1name": this.state.selectedEditors[0].value || ' ',
        "editor2name": this.state.selectedEditors[1].value || ' '
      }
    };
    console.log(`articleIndex  ${JSON.stringify(data)}`);

    axios({
      method: 'post',
      url: `${baseUrl}chiefeditor/assign`,
      data: data

    }).then(response => {
      console.log(`assign res ${JSON.stringify(response.data)}`);
      // console.log(`ultimate  editor ${this.state.selectedEditors[0]}`);

      this.setState({ selectedEditors: [], isModalOpen: false })
      this.props.navigation.navigate('Home');
    }).catch(error => {
      console.log(error);
    });


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
    // console.log(`this.state.isAssignArticles ${this.state.isAssignArticles}`);
    // console.log(`list screen tag ${l.taglist}`);
    // console.log(`list editorid ${this.props.screenProps.editorID}`);
    const paramToDetail = l.editor1? {
      'title': l.title,
      'author': l.author,
      'body': l.body,
      'articleid': l.id,
      'editorid': this.props.screenProps.editorID,
      'tagList': l.taglist, // TODO 等拿到文章了就有
      review: this.reviewed,
      'editor1':l.editor1.remark,
      'editor1decision':l.editor1.decision,
      'editor2':l.editor2.remark,
      'editor2decision':l.editor2.decision,
      'reviewArticleIndex':index
    }:{
      'title': l.title,
      'author': l.author,
      'body': l.body,
      'articleid': l.id,
      'editorid': this.props.screenProps.editorID,
      'tagList': l.taglist, // TODO 等拿到文章了就有
      review: this.reviewed,
      'reviewArticleIndex':index
    };
    return (
      <View key={index} style={{ height: 60, marginHorizontal: 20, marginTop: 10, backgroundColor: 'white', borderRadius: 5 }}>
        <View >
          <ListItem
            // leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
            key={index}
            onPress={this.state.isAssignArticles ? () => this.setState({ articleIndex: index, isModalOpen: true }) : () => navigator.navigate('ArticleDetail', paramToDetail)}
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
    // const url = `${baseUrl}editor/reviewlist?editorid=${this.props.screenProps.editorID}`;
    // let Articles  = [];

    // axios.get(url)
    //   .then(response => {
    //      Articles = response.data.reviewlist;

    //     console.log(`response ${response.data}`);
    //     console.log(`Articles get real ${Articles}`);

    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })

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
              {!this.state.isAssignArticles && this.renderListCards(this.state.Articles)}
              {this.state.isAssignArticles && this.renderListCards(this.state.toAssignArticles)}
            </ScrollView>
          </View> :
          <Text>Loading...</Text>
        }

        <Modal style={[styles.modal, styles.modal4]} position={"center"} ref={"assignArticle"} swipeArea={10} isOpen={this.state.isModalOpen}>
          {/* <Header leftComponent={{text:'可分配编辑列表',color:'#fff'}} backgroundColor='green'/> */}
          <View style={{ flex: 1 }}>
            <SelectMultiple
              items={this.state.editornames}
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
