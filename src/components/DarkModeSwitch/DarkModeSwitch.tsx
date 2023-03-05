import React from 'react';
import { Switch } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../utilitys/hooks';
import { actions as darkModeActions } from '../../features/darkmodeReducer';

export interface State {
  darkMode: boolean;
}

const DarkModeSwitch = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode);

  const handleToggleDarkMode = () => {
    dispatch(darkModeActions.setDarkMode(!darkMode.darkMode));
  };

  return <Switch checked={darkMode.darkMode} onChange={handleToggleDarkMode} />;
};

export default DarkModeSwitch;
