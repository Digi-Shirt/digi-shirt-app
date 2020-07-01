/**
 *  Custom Drawer List Item 
 *  Converted TypeScript from original react-navigation library
 *  this component checks for a 'hidden' option and skips
 *  the render on that navigation link, thus keeping the item 
 *  navigable, but not cluttering up the drawer navigation.
 * 
 *  NOTE: some code that was part of the original is commented out,
 *  may need to implement later. In initial testing this component
 *  seems to work without LinkBuilder.
 */
 
import * as React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import {
    CommonActions,
    DrawerActions,
   // DrawerNavigationState,
   // useLinkBuilder
  } from '@react-navigation/native';

/**
 * Component that renders the navigation list in the drawer.
 */
export default function CustomDrawerItemList({ 
      state,
      navigation,
      descriptors,
      activeTintColor,
      inactiveTintColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      itemStyle,
      labelStyle, }){
  
  //const buildLink = useLinkBuilder();

  return (state.routes.map((route, i) => {
    const focused = i === state.index;
    const { title, drawerLabel, drawerIcon, hidden } = descriptors[route.key].options;

    if(hidden === true){
        return null;
    }

    return (
        <DrawerItem
          key={route.key}
          label={
            drawerLabel !== undefined
              ? drawerLabel
              : title !== undefined
              ? title
              : route.name
          }
          icon={drawerIcon}
          focused={focused}
          activeTintColor={activeTintColor}
          inactiveTintColor={inactiveTintColor}
          activeBackgroundColor={activeBackgroundColor}
          inactiveBackgroundColor={inactiveBackgroundColor}
          labelStyle={labelStyle}
          style={itemStyle}
          //to={buildLink(route.name, route.params)}
          onPress={() => {
            navigation.dispatch({
              ...(focused
                ? DrawerActions.closeDrawer()
                : CommonActions.navigate(route.name)),
              target: state.key,
            });
          }}
        />
      );
   
  }))
}