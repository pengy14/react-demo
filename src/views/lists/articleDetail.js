import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Textarea from 'react-native-textarea';
import { Button, ButtonGroup } from 'react-native-elements';
import autobind from 'class-autobind';
import Modal from 'react-native-modalbox';

class articleDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isReview: false,
      isTag: false,
      isModalOpen: false,
      position: 'center'
    }

    autobind(this);
  }

  renderComment() {
    return (
      <View style={styles.container}>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          padding={10}
          onChangeText={this.onChange}
          defaultValue={this.state.text}
          maxLength={120}
          placeholder={'好玩有趣的，大家同乐，伤感忧闷的，大家同哭。。。'}
          placeholderTextColor={'#c7c7c7'} />

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

  }

  accept() {
    // TODO 处理评论提交
    this.setState({ isModalOpen: false, isReview: false });
  }

  reject() {
    // TODO 处理拒绝
    this.setState({ isModalOpen: false, isReview: false });
  }

  openCommentModal() {
    this.setState({ position: 'bottom', isModalOpen: true,isReview:true})
  }

  openTagModal() {
    this.setState({ position: 'center', isModalOpen: true })
  }



  render() {
    const { params } = this.props.navigation.state;
    console.log(params)
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.3, flexDirection: 'row', marginHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ flex: 1, fontSize: 26, color: 'white', fontFamily: 'bold' }}>
            {params.title}
          </Text>
          <Text style={{ flex: 0.5, fontSize: 19, color: 'gray', fontFamily: 'bold', textAlign: 'right' }}>
            {params.author}
          </Text>
        </View>

        <ScrollView style={{ flex: 2, marginBottom: 5, padding: 20 }}>
          <Text>
            But there is one aspect of Apple’s success in China that could mean it's spared Beijing’s wrath - even if Ms Meng finds herself extradited and even jailed.

  Apple of course doesn’t just sell products to China, it makes them there. In 2017, Apple estimated that between manufacture, retail, distribution - not to mention those developing for its software - it was responsible for 4.8m jobs in China.

  Further, the company has opened research centres that are providing a home in China for the country’s brightest graduates.

  "They have relationships with the Chinese government because they’ve been a massive employer,” Mr Ives said, suggesting Beijing might be limited in what action it could take as result.

  "By hurting Apple, it would to some extent be almost like burning down your own house."

  Apple did not respond to requests for comment.
          </Text>
        </ScrollView>

        <View style={styles.container}>
          <View style={[styles.buttonsContainer, { marginBottom: 5 }]}>
            <Button
              title="Review"
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              containerStyle={{ height: 40 }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress={this.openCommentModal}
            />
            <Button
              title="Tag"
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              containerStyle={{ height: 40 }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress={this.openTagModal}
            />
          </View>
        </View>


        <Modal style={[styles.modal, styles.modal4]} position={this.state.position} swipeArea={10} isOpen={this.state.isModalOpen}>
          {/* <Header leftComponent={{text:'可分配编辑列表',color:'#fff'}} backgroundColor='green'/> */}
          {this.state.isReview && this.renderComment()}
          {this.state.isTag && this.renderTag()}
        </Modal>

      </View>
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
});

export default articleDetail;