type SetLoginAction = {
  type: 'user/SET_Login';
  payload: string;
};

type SetPasswordAction = {
  type: 'user/SET_Password';
  payload: string;
};

type SetIsLogginedAction = {
  type: 'user/SET_IsLoggined';
  payload: boolean;
};

const setLoggin = (login: string): SetLoginAction => ({
  type: 'user/SET_Login',
  payload: login
});

const setPassword = (password: string): SetPasswordAction => ({
  type: 'user/SET_Password',
  payload: password
});

const setIsLoggined = (isLoggined: boolean): SetIsLogginedAction => ({
  type: 'user/SET_IsLoggined',
  payload: isLoggined
});

type Action = SetLoginAction | SetPasswordAction | SetIsLogginedAction;

export const actions = { setLoggin, setIsLoggined, setPassword };

type State = {
  login: string;
  password: string;
  isLoggined: boolean;
};

const defaultState: State = {
  login: '',
  password: '',
  isLoggined: false
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const userReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case 'user/SET_Login':
      return {
        ...state,
        login: action.payload
      };

    case 'user/SET_Password':
      return {
        ...state,
        password: action.payload
      };

    case 'user/SET_IsLoggined':
      return {
        ...state,
        isLoggined: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
