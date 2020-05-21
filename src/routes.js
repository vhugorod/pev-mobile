import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

import Header from './components/Header';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        header: () => (<Header />)
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Informações para a Entrega',
      },
    },
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#288B45',
        elevation: 0,
      },
    },
  },
  )
);

export default Routes;
