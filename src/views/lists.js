import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListsScreen1 from './lists/screen1';
import ArticleDetail from './lists/articleDetail'

const routeConfigs = {
  Home: {
    screen: ListsScreen1,
    path: './lists/screen1'
  },
  ArticleDetail: {
    screen: ArticleDetail,
    path: './lists/articleDetail'
  },
};

const stackNavigatorConfig = {
  initialRootName: 'ListsScreen1'
};

const MainRoot = StackNavigator(routeConfigs,stackNavigatorConfig);

const test = () => <View>Hello</View>

export default class Lists extends Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <ScrollView
      //     horizontal
      //     pagingEnabled
      //     decelerationRate={0.993}
      //   >
      //     <ListsScreen1 />
      //   </ScrollView>

      // </View>       
      <MainRoot />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});
