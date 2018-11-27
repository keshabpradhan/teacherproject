import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Colors from '../../helpers/Colors';
import AuthHandler from './AuthHandler';
import App from './AppNavigator';
import Auth from './AuthNavigator';
import Register from '../Register';
import homeIcon from '../../assets/ic_home/ic_home.png';
import settingsIcon from '../../assets/ic_settings/ic_settings.png';
import getUser from '../../selectors/UserSelectors';

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

const LoginStack = createSwitchNavigator(
  {
    App,
    Auth,
    AuthHandler
  },
  {
    initialRouteName: 'AuthHandler',
  },
);
const RegisterStack = createStackNavigator({ Register });

const AppStack = createMaterialTopTabNavigator(
  {
    Login: LoginStack,
    Register: RegisterStack,
  },
  {
    tabBarPosition: 'bottom',
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


class Home extends React.Component {
  render() {
    if (this.props.user !== null) {
      return <LoginStack />
    } else {
      return (
        <AppStack />
      );
    }
  }
}

Home.propTypes = {
  user: PropTypes.object,
};

Home.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, null)(Home);