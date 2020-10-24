import { useLinking } from '@react-navigation/native';
//import { Linking } from 'expo';
import * as Linking from 'expo-linking';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'home',
          Links: 'resources',
          Settings: 'contact',
        },
      },
    },
  });
}
