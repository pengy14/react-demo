import React from 'react';
import Expo, { AppLoading, Asset, Font } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StyleSheet,View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems  } from 'react-navigation';
import autobind from 'class-autobind';

import Components from './src/drawer/components';
import Ratings from './src/drawer/ratings';
import Pricing from './src/drawer/pricing';
// import Login from './src/drawer/login';
import Profile from './src/drawer/profile';
import Lists from './src/drawer/lists';
import Settings from './src/drawer/settings';

import LoginEntry from './src/views/login';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./src/images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);


const MainRoot = DrawerNavigator(
  {
    // Login: {
    //   path: '/login',
    //   screen: Login,
    // },
    Profile: {
      path: '/profile',
      screen: Profile,
    },
    Articles: {
      path: '/lists',
      screen: Lists,
    },
    // Components: {
    //   path: '/components',
    //   screen: Components,
    // },
    // Ratings: {
    //   path: '/ratings',
    //   screen: Ratings,
    // },
    // Pricing: {
    //   path: '/pricing',
    //   screen: Pricing,
    // },
    // Settings: {
    //   path: '/settings',
    //   screen: Settings,
    // },
  },
  {
    initialRouteName: 'Articles',
    // initialRouteParams: this.props.screenProps,
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);


// const MainRoot = LoginEntry;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}



function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoginedin: false,
      isChief: false,
      editorID:0
    };

    autobind(this);
  }


  changeLogin() {
    this.setState({ isLoginedin: !this.state.isLoginedin });
  }

  checkChief(isChief,editorID){
    console.log(`main editorID ${editorID}`);
    this.setState({isChief : isChief,editorID:editorID});
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/bg_screen1.jpg'),
      require('./assets/images/bg_screen2.jpg'),
      require('./assets/images/bg_screen3.jpg'),
      require('./assets/images/bg_screen4.jpg'),
      require('./assets/images/user-cool.png'),
      require('./assets/images/user-hp.png'),
      require('./assets/images/user-student.png'),
      require('./assets/images/avatar1.jpg'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    const loginedIn = this.state.isLoginedin;

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        // onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        {!loginedIn && <LoginEntry changeLogin={this.changeLogin} checkChief = {this.checkChief}/>}
        {loginedIn && <MainRoot screenProps = {{isChief:this.state.isChief,editorID:this.state.editorID}}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

Expo.registerRootComponent(AppContainer);
