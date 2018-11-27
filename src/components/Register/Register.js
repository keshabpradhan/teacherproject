import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import TextField from '../common/TextField';
import ErrorView from '../common/ErrorView';
import ShadowStyles from '../../helpers/ShadowStyles';
import TextStyles from '../../helpers/TextStyles';
import strings from '../../localization';
import { register, actionTypes } from '../../actions/UserActions';
import getUser from '../../selectors/UserSelectors';
import loadingSelector from '../../selectors/LoadingSelector';
import { errorsSelector } from '../../selectors/ErrorSelector';
import styles from './styles';

class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor(props) {
    super(props);
    // this.navigateToHomeIfLogged();
  }

  state = {
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    confirmPassword:''
  };

//   componentDidUpdate() {
//     this.navigateToHomeIfLogged();
//     return null;
//   }

//   navigateToHomeIfLogged = () => {
//     if (this.props.user !== null) {
//       this.props.navigation.navigate('App');
//     }
//   }

  passwordChanged = value => this.setState({ password: value });

  emailChanged = value => this.setState({ email: value });
  firstNameChanged = value => this.setState({ firstName: value });
  lastNameChanged = value => this.setState({ lastName: value });
  confirmPasswordChanged = value => this.setState({ confirmPassword: value });

  register = () => {
    this.props.register({...this.state});
  }

  render() {
    const { isLoading, errors } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.formContainer, ShadowStyles.shadow]}>
          <Text style={TextStyles.fieldTitle}>
            {strings.firstName}
          </Text>
          <TextField
            placeholder={strings.firstName}
            onChangeText={this.firstNameChanged}
            value={this.state.firstName}
          />

          <Text style={TextStyles.fieldTitle}>
            {strings.lastName}
          </Text>
          <TextField
            placeholder={strings.lastName}
            onChangeText={this.lastNameChanged}
            value={this.state.lastName}
          />

        <Text style={TextStyles.fieldTitle}>
            {strings.email}
          </Text>
          <TextField
            placeholder={strings.email}
            onChangeText={this.emailChanged}
            value={this.state.email}
          />

          <Text style={TextStyles.fieldTitle}>
            {strings.password}
          </Text>
          <TextField
            placeholder={strings.password}
            value={this.state.password}
            onChangeText={this.passwordChanged}
            secureTextEntry
          />

          <Text style={TextStyles.fieldTitle}>
            {strings.confirmPassword}
          </Text>
          <TextField
            placeholder={strings.confirmPassword}
            value={this.state.confirmPassword}
            onChangeText={this.confirmPasswordChanged}
            secureTextEntry
          />

          <ErrorView errors={errors} />
          <Button
            onPress={this.register}
            title='Register'
          />
        </View>
      </View>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  navigation: PropTypes.object.isRequired,
};

Register.defaultProps = {
  user: null,
  errors: [],
};

const mapStateToProps = state => ({
  user: getUser(state),
  isLoading: loadingSelector([actionTypes.LOGIN])(state),
  errors: errorsSelector([actionTypes.LOGIN])(state),
});

const mapDispatchToProps = dispatch => ({
  register: (userData) => dispatch(register(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
