import React from 'react';
import { Image } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import homeIcon from '../../assets/ic_home/ic_home.png';
import settingsIcon from '../../assets/ic_settings/ic_settings.png';
import Colors from '../../helpers/Colors';
import Profile from '../Profile';
import Home from '../Home';

const iconForTab = ({ state }) => {
  switch (state.routeName) {
    case 'Home':
      return homeIcon;
    case 'Profile':
      return settingsIcon;
    default:
      return null;
  }
};

const TabIcon = ({ icon, tintColor }) => (// eslint-disable-line
  <Image
    source={icon}
    style={{ tintColor }}
  />
);


const ProfileStack = createStackNavigator({ Profile });
const HomeStack = createStackNavigator({ Home });
const AppStack = createMaterialTopTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.gray,
      style: {
        backgroundColor: Colors.White,
      },
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (// eslint-disable-line
        <TabIcon
          icon={iconForTab(navigation)}
          tintColor={tintColor}
        />
      ),
    }),
  },
);

export default AppStack;
