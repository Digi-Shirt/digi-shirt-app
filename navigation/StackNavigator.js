import { createStackNavigator, createAppContainer } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';

const StackNavigator = createStackNavigator({
  Categories: CategoriesScreen,
});

export default createAppContainer(MealsNavigator);
  