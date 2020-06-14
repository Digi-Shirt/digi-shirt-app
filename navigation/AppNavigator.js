import React from 'react';
import { Platform, StatusBar, SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';


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
import CustomDrawerContent from './DrawerContent';
import LoginScreen from '../screens/LoginScreen';

const INITIAL_ROUTE_NAME = 'Home';

const NewsStack = createStackNavigator();
export const NewsStackNav = () => {

    return(
        <NewsStack.Navigator>
            <NewsStack.Screen name="Contact" component={HomeScreen} />
            <NewsStack.Screen name="NewsItem" component={NewsItemScreen} />
        </NewsStack.Navigator>
    );
};

const ResourcesStack = createStackNavigator();
export const ResourcesStackNav = () => {

    return(
        <ResourcesStack.Navigator>
            <ResourcesStack.Screen name="ResourceCategories" component={ResourceCategoriesScreen} />
            <ResourcesStack.Screen name="ResourceCategory" component={ResourceCategoryScreen} />
        </ResourcesStack.Navigator>
    );
};

const ContactStack = createStackNavigator();
export const ContactStackNav = () => {

    return(
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact" component={ContactScreen} />
        </ContactStack.Navigator>
    );
};

const SettingsStack = createStackNavigator();
export const SettingsStackNav = () => {

    return(
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Contact" component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
};

const LoginStack = createStackNavigator();
export const LoginStackNav = () => {
    return(
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={LoginScreen} />
        </LoginStack.Navigator>
    );
}


const DrawerNavigator = createDrawerNavigator();

export const DrawerNav =({navigation, route}) => {
    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <DrawerNavigator.Screen name="Home" component={NewsStackNav}  />
                <DrawerNavigator.Screen name="Resources" component={ResourcesStackNav} />
                <DrawerNavigator.Screen name="Contact" component={ContactStackNav} />
                <DrawerNavigator.Screen name="Settings" component={SettingsStackNav} />
                <DrawerNavigator.Screen name="Login" component={LoginStackNav} />
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
              <DrawerNav />  
            </NavigationContainer>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
});

export default AppNavigator;
