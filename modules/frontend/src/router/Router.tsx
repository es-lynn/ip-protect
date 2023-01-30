import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import React from 'react'

import { DebugPage } from '../pages/debug/DebugPage'
import { HomePage } from '../pages/home/HomePage'
import { LoginPage } from '../pages/login/LoginPage'
import { ProjectPage } from '../pages/project/ProjectPage'
import { navigationRef } from './nav'

const Stack = createNativeStackNavigator()

export const Router = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={{
        prefixes: [],
        enabled: true,
        config: {
          screens: {
            debug: 'debug',
            login: 'login',
            home: 'home',
            'project/:projectFriendlyId': 'project/:projectFriendlyId'
          }
        }
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name={'login'} component={LoginPage} />
        <Stack.Screen name={'debug'} component={DebugPage} />
        <Stack.Screen name={'home'} component={HomePage} />
        <Stack.Screen name={'project/:projectFriendlyId'} component={ProjectPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
