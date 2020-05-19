import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Pontos de entrega de materiais',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Informações para a entrega',
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
