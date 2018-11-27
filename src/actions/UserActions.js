import UserController from '../controllers/UserController';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR'
};

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const registerRequest = () => ({
  type: actionTypes.REGISTER_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
});

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user,
});

const registerError = error => ({
  type: actionTypes.REGISTER_ERROR,
  error,
});

const registerSuccess = user => ({
  type: actionTypes.REGISTER_SUCCESS,
  user,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await UserController.login(email, password);
    if(response.success) {
      dispatch(loginSuccess({user:response.user}));
    } else {
      dispatch(loginError('Username or Password not matched.'));
    }
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await UserController.register(userData);
    if(response.success) {
      dispatch(registerSuccess(user));
    } else {
      dispatch(registerError(response.msg));
    }
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

export const logout = () => (dispatch) => {
  UserController.logout();
  dispatch(logoutRequest());
};
