import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


import AppNavigator from './navigation/AppNavigator';
//import useLinking from './navigation/useLinking';


//import redux store
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Load reducers
import settingsReducer from './store/reducers/settings';
import newsItemsReducer from './store/reducers/newsItems';
import resourceCategoriesReducer from './store/reducers/resourceCategories';
import contactsReducer from './store/reducers/contacts';
import userReducer from './store/reducers/user';
import messagesReducer from './store/reducers/messages';

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
    'resourceCategories',
    'userInfo',
    'messages'
  ],

};

const rootReducer = combineReducers({
  settings: settingsReducer,
  newsItems: newsItemsReducer,
  resourceCategories: resourceCategoriesReducer,
  unitContacts: contactsReducer,
  userInfo: userReducer,
  messages: messagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
    applyMiddleware(
      ReduxThunk,
     // createLogger()
    ),
  );

const persistor = persistStore(store); 



export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  // const [initialNavigationState, setInitialNavigationState] = React.useState();
  // const containerRef = React.useRef();
  // const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        
        // Load our initial navigation state
        //setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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
            <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

