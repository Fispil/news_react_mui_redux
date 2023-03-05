type SetDarkModeAction = {
  type: 'darkmode/SET_DarkMode';
  payload: boolean;
};

const setDarkMode = (darkMode: boolean): SetDarkModeAction => ({
  type: 'darkmode/SET_DarkMode',
  payload: darkMode
});

type Action = SetDarkModeAction;

export const actions = { setDarkMode };

type State = {
  darkMode: boolean;
};

const defaultDarkMode: State = {
  darkMode: true
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const userReducer = (state: State = defaultDarkMode, action: Action) => {
  switch (action.type) {
    case 'darkmode/SET_DarkMode':
      return {
        ...state,
        darkMode: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
