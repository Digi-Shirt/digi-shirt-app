import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import NewsItemScreen from './screens/NewsItemScreen';
import HomeScreen from './screens/HomeScreen';
import ResourceCategoryScreen from './screens/ResourcesCategoryScreen';

//import redux store
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import settingsReducer from './store/reducers/settings';
import newsItemsReducer from './store/reducers/newsItems';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

// Redux Persist Config
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: storage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'settings',
    'newsItems',
  ],

};

const rootReducer = combineReducers({
  settings: settingsReducer,
  newsItems: newsItemsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
    applyMiddleware(
      ReduxThunk,
      createLogger()
    ),
  );

const persistor = persistStore(store); 

//import db helper functions
// import { init } from './helpers/db';

// //attempt to initialize the database
// init().then(() => {
//   console.log('Initialized local database');
// })
// .catch((err) => {
//   console.log('Initializing local db failed.');
//   console.log(err);
// });

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
                <Stack.Screen name="NewsItem" component={NewsItemScreen} options={({ route }) => ({ title: route.params.title })} />
                <Stack.Screen name="ResourceCategory" component={ResourceCategoryScreen} options={({ route }) => ({ title: route.params.title })} />
                <Stack.Screen name="Home" component={HomeScreen} />
              </Stack.Navigator>  
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});