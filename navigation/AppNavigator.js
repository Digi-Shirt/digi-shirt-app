import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {useSelector} from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import useLinking from './useLinking';

import NewsItemScreen from '../screens/NewsItemScreen';
import HomeScreen from '../screens/HomeScreen';
import ResourceCategoriesScreen from '../screens/ResourceCategoriesScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ResourceCategoryScreen from '../screens/ResourcesCategoryScreen';
import CustomDrawerContent from './DrawerContent';
import LoginScreen from '../screens/LoginScreen';
import MessagesScreen from '../screens/MessagesScreen';
import InviteCodeScreen from '../screens/InviteCodeScreen';
import { Ionicons } from '@expo/vector-icons';

const NewsStack = createStackNavigator();
export const NewsStackNav = () => {

    return(
        <NewsStack.Navigator>
            <NewsStack.Screen name="News" component={HomeScreen} />
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
            <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
};

const WelcomeStack = createStackNavigator();
export const WelcomeStackNav = () => {

    return(
        <WelcomeStack.Navigator>
            <WelcomeStack.Screen name="Welcome" component={InviteCodeScreen} />
        </WelcomeStack.Navigator>
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

const MessagesStack = createStackNavigator();
export const MessageStackNav = () => {
    return(
        <MessagesStack.Navigator>
            <LoginStack.Screen name="Messages" component={MessagesScreen} />
        </MessagesStack.Navigator>
    );
}


const DrawerNavigator = createDrawerNavigator();

export const DrawerNav =({navigation, route}) => {

    const messageCount = useSelector(state => state.messages.messages).length;
    const messageLabel = messageCount !== undefined ?
                        "Messages (" + messageCount + ")" :
                        "Messages";

    const user = useSelector(state => state.userInfo);

    const username =    user.userInfo !== undefined &&
                        user.userInfo.hasOwnProperty("user") &&
                        user.userInfo.user.hasOwnProperty("username") ? 
                        user.userInfo.user.username :  false;

    const icon = <Ionicons
    name="md-menu"
    size={30}
     />;
    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <DrawerNavigator.Screen name="Welcome" component={WelcomeStackNav}  options={{hidden: true}} />
                <DrawerNavigator.Screen 
                    name="Home" 
                    component={NewsStackNav} 
                    options={{
                        drawerIcon: props => (<Ionicons 
                                              name="md-home" 
                                              size={24}
                                              color={props.color} />)
                    }} 
                />
                <DrawerNavigator.Screen 
                    name="Resources" 
                    component={ResourcesStackNav} 
                    options={{
                        drawerIcon: props => (<Ionicons 
                                              name="ios-help-buoy" 
                                              size={24}
                                              color={props.color} />)
                    }}  
                />
                <DrawerNavigator.Screen 
                    name="Contact"
                    component={ContactStackNav}
                    options={{
                        drawerIcon: props => (<Ionicons 
                                              name="ios-paper-plane" 
                                              size={24}
                                              color={props.color} />)
                    }}
                />
                <DrawerNavigator.Screen 
                    name="Settings" 
                    component={SettingsStackNav}  
                    options={{
                        drawerIcon: props => (<Ionicons 
                                              name="md-settings" 
                                              size={24}
                                              color={props.color} />)
                    }}
                />
                                
                {username && 
                    <DrawerNavigator.Screen name="Messages"
                        options={{
                            drawerLabel: messageLabel, 
                            drawerIcon: props => (<Ionicons 
                                name="md-mail" 
                                size={24}
                                color={props.color} />) }}  
                        component={MessageStackNav}  
                    /> 
                }
                {username &&  
                    <DrawerNavigator.Screen 
                        name="Logout" 
                        component={LoginStackNav}
                        options={{
                            drawerIcon: props => (<Ionicons 
                                name="md-log-out" 
                                size={24}
                                color={props.color} />) }} 
                    />
                }
                {!username && 
                    <DrawerNavigator.Screen 
                        name="Login" 
                        component={LoginStackNav}
                        options={{
                             drawerIcon: props => (<Ionicons 
                                name="md-log-in" 
                                size={24}
                                color={props.color} />) }} 
                    /> 
                }
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
