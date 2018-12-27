import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Textarea from 'react-native-textarea';
import { Button, ButtonGroup, Input } from 'react-native-elements';
import autobind from 'class-autobind';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import Markdown from 'react-native-markdown-renderer';

const axios = require('axios');
const baseUrl = 'http://45.76.75.242/api/';

class CustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,
      // index:0
    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected
    });
  }

  render() {
    const { title } = this.props;
    const { selected } = this.state;

    return (
      <Button
        title={title}
        titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
        buttonStyle={{ backgroundColor: 'rgba(213, 100, 140, 1)', borderRadius: 100, width: 100 }}
        containerStyle={{ marginRight: 10, marginTop: 5 }}
      // onPress={() => this.setState({ selected: !selected })}
      />
    );
  }
}

class articleDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isReview: false,
      isTag: false,
      isModalOpen: false,
      position: 'center',
      trust: '0',
      tagList: ['none']
    }

    autobind(this);
  }

  onChange() {
    this.setState()
  }

  renderComment() {
    let comment = '';
    let trust = '0';
    return (
      <View style={styles.container}>
        <Textarea
          containerStyle={styles.textareaContainer}
          value={comment}
          style={styles.textarea}
          padding={10}
          onChangeText={comment => this.setState({ text: comment })}
          defaultValue={this.state.text}
          maxLength={120}
          placeholder={'好玩有趣的，大家同乐，伤感忧闷的，大家同哭。。。'}
          placeholderTextColor={'#c7c7c7'} />

        <Text>置信度:</Text>
        <Input // username

          value={trust}
          keyboardAppearance='light'
          autoFocus={false}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
          inputStyle={{ marginLeft: 10 }}
          placeholder={'0-100'}
          containerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
          // ref={input => this.emailInput = input}
          // onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={trust => this.setState({ trust })}
        // errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
        />

        <View style={[styles.buttonsContainer, { marginBottom: 5 }]}>

          <Button
            title="Accept"
            buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
            containerStyle={{ height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={this.accept}
          />
          <Button
            title="Reject"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            containerStyle={{ height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={this.reject}
          />
        </View>
      </View>
    )
  }

  renderTag() {
    let tag = this.defaultTag();
    return (
      <View style={styles.container}>
        <Input // username
          value={tag}
          keyboardAppearance='light'
          autoFocus={false}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='default'
          returnKeyType='next'
          inputStyle={{ marginLeft: 10 }}
          placeholder={'tag'}
          containerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
          // ref={input => this.emailInput = input}
          // onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={tag => this.processTag2List(tag)}
        // errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
        />

        <View style={[styles.buttonsContainer, { marginBottom: 5 }]}>

          <Button
            title="Submit"
            buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
            containerStyle={{ height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={this.addtag}
          />
          <Button
            title="Cancel"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            containerStyle={{ height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={this.cancelTag}
          />
        </View>
      </View>

    )
  }

  processTag2List(tag) {
    console.log(`processed  `)
    const tagList = tag.split(' ');
    this.setState({ tagList: tagList });
  }

  defaultTag() {
    // console.log(`defaultTag ${this.props.navigation.state.params.tagList.join(' ')}`);
    // console.log(`this.props.navigation.state.params.tagList  ${this.props.navigation.state.params.tagList}`);


    return this.props.navigation.state.params.tagList.length == 0 ? this.state.tagList : this.props.navigation.state.params.tagList;
  }

  accept() {
    // TODO 处理评论提交
    // console.log('come into accept');
    // console.log(`comment ${this.state.text}`);
    console.log(`faf  ${this.props.navigation.state.params.editorid}`);
    const data = {
      'review': {
        'articleid': this.props.navigation.state.params.articleid,
        'editorid': this.props.navigation.state.params.editorid,
        'decision': 'accept',
        'remark': this.state.text,
        'trust': Number(this.state.trust)
      }
    }

    console.log(data);
    axios({
      method: 'post',
      url: `${baseUrl}editor/review`,
      data: data

    }).then(response => {
      // console.log(response.data);
      // this.setState({ isModalOpen: false, isReview: false });
      // this.props.navigation.navigate('Home');
      // this.props.navigation.dispatch(NavigationActions.back())
      this.props.navigation.state.params.review();
      this.props.navigation.goBack();
    }).catch(error => {
      console.log(error);
    });


  }

  reject() {
    // TODO 处理拒绝
    // console.log('come into accept');
    // console.log(`comment ${this.state.text}`);
    // console.log(`faf  ${this.props.navigation.state.articleid}`);
    const data = {
      'review': {
        'articleid': this.props.navigation.state.params.articleid,
        'editorid': this.props.navigation.state.params.editorid,
        'decision': 'reject',
        'remark': this.state.text,
        'trust': Number(this.state.trust)
      }
    }

    // console.log(data);
    axios({
      method: 'post',
      url: `${baseUrl}editor/review`,
      data: data

    }).then(response => {
      // console.log(response.data);
      // this.props.navigation.navigate('Home');
      // console.log(`this.props.navigation.state.params.reviewArticleIndex  ${this.props.navigation.state.params.reviewArticleIndex}`);
      this.props.navigation.state.params.review();
      this.props.navigation.goBack();
    }).catch(error => {
      console.log(error);
    });
  }

  openCommentModal() {
    this.setState({ position: 'bottom', isModalOpen: true, isReview: true })
  }

  openTagModal() {
    this.setState({ position: 'center', isModalOpen: true, isTag: true })
  }

  addtag() {
    // const taglist = this.state.tag.split(/[\s\n]/);
    console.log(this.state.tagList);
    this.setState({ isModalOpen: false });

  }

  cancelTag() {
    this.setState({ isModalOpen: false });
  }

  renderArticleTag(tag, index) {
    // console.log('render single tag');
    console.log(`tag ${tag}`)
    return (
      <CustomButton title={tag} selected={true} key={index} />
    )
  }

  renderArticleTagLists() {
    // console.log('rendertaglisets');
    const tagList = this.defaultTag();
    return _.map(tagList, (tag, index) => {
      return this.renderArticleTag(tag, index);
    })
  }

  render() {
    const { params } = this.props.navigation.state;
    // console.log(`params ${params.editorid}`);
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2, flexDirection: 'row', marginHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ flex: 1, fontSize: 26, color: 'black', fontFamily: 'bold' }}>
            {params.title}
          </Text>
          <Text style={{ flex: 0.5, fontSize: 19, color: 'gray', fontFamily: 'bold', textAlign: 'right' }}>
            {params.author}
          </Text>
        </View>

        // TODO

        <View style={{ flex: 0.5, flexDirection: 'column', height: 130, marginLeft: 40, marginRight: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.renderArticleTagLists()}
            {/* <CustomButton title={this.state.tagList[0]} selected={true} /> */}
          </View>
        </View>

        <ScrollView style={{ flex: 1, marginBottom: 2, padding: 25 }}>
          <Markdown>
            {params.body}
          </Markdown>
          {params.editor1&&<Text>
            {`remark: ${params.editor1}  decision:${params.editor1decision}`}
          </Text>}
          {params.editor2&&<Text>
          {`remark: ${params.editor2}  decision:${params.editor2decision}`}
          </Text>}
        </ScrollView>

        <View style={{flex:0.3}}>
          <View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
            <Button
              buttonStyle={styles.loginButton}
              title="Review"
              containerStyle={{marginTop:32,flex:0}}
              titleStyle={styles.loginTextButton}
              // buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              containerStyle={{ height: 40 }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress={this.openCommentModal}
            />
            {/* <Button
              title="Tag"
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              containerStyle={{ height: 40 }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress={this.openTagModal}
            /> */}
          </View>
        </View>


        <Modal style={[styles.modal, styles.modal4]} position={this.state.position} swipeArea={10} isOpen={this.state.isModalOpen}>
          {/* <Header leftComponent={{text:'可分配编辑列表',color:'#fff'}} backgroundColor='green'/> */}
          {this.state.isReview && this.renderComment()}
          {this.state.isTag && this.renderTag()}
        </Modal>

      </View >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black'
  },
  textareaContainer: {
    flex: 0.5,
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    marginTop: 10
  },
  textarea: {
    // textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  buttonsContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  modal: {
    flex: 0.5
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  modal4: {
    height: 400
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default articleDetail;