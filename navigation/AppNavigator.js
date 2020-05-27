import React from 'react';
import { Platform, StatusBar, SafeAreaView, StyleSheet, View, Text } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import useLinking from './useLinking';
import BottomTabNavigator from './BottomTabNavigator';

import NewsItemScreen from '../screens/NewsItemScreen';
import HomeScreen from '../screens/HomeScreen';
import ResourceCategoriesScreen from '../screens/ResourceCategoriesScreen';
import newsItems from '../components/__mock__/newsItems';
import ContactScreen from '../screens/ContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ResourceCategoryScreen from '../screens/ResourcesCategoryScreen';


const Stack = createStackNavigator();

export const StackNav = ({ navigation, route }) => {
    //const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    //console.log(routeName);



    function getHeaderTitle(route) {
        const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
      
        switch (routeName) {
          case 'Contact':
            return 'Contact';
          case 'Home':
            return 'News Feed';
          case 'Resources':
            return 'Resources';
          case 'Settings':
              return 'Settings';
        }
    }
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Drawer" component={DrawerNav} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="ResourceCategory" component={ResourceCategoryScreen} />
            <Stack.Screen name="NewsItem" component={NewsItemScreen} />
        </Stack.Navigator>
    );
    


}


const DrawerNavigator = createDrawerNavigator();

export const DrawerNav =({navigation, route}) => {
    return (
        <DrawerNavigator.Navigator>
                <DrawerNavigator.Screen name="Digi-Shirt" component={BottomTabNavigator} />
                <DrawerNavigator.Screen name="Settings" component={SettingsScreen} />    
        </DrawerNavigator.Navigator>
    );
};

const AppNavigator = ({navigation, route}) => {

    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);


    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <StackNav />    
            </NavigationContainer>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});

export default AppNavigator;
