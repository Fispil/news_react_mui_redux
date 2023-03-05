import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import darkModeReducer from '../features/darkmodeReducer';
import userReducer from '../features/userReducer';

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  user: userReducer
});

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
