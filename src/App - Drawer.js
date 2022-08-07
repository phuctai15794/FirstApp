import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from './utils';
import Home from './components/Home';
import Counter from './components/Counter';

const Drawer = createDrawerNavigator();

App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				useLegacyImplementation
				initialRouteName={Constants.ROUTES.LISTS.HOME.NAME}
				drawerPosition="left"
				drawerType="front"
				edgeWidth={100}
				hideStatusBar={false}
				overlayColor="#00000090"
				drawerStyle={{
					backgroundColor: '#e6e6e6',
					width: 250,
				}}
				screenOptions={{
					headerShown: true,
					swipeEnabled: true,
					gestureEnabled: true,
					headerTitleAlign: 'center',
					headerStyle: {
						backgroundColor: '#0080ff',
					},
					headerTintColor: '#ffffff',
					headerTitleStyle: {
						fontSize: 25,
						fontWeight: 'bold',
					},
				}}
			>
				<Drawer.Screen
					name={Constants.ROUTES.LISTS.HOME.NAME}
					options={{
						title: Constants.ROUTES.LISTS.HOME.TITLE,
						headerTitle: Constants.ROUTES.LISTS.HOME.NAME,
						drawerIcon: ({ focused }) => (
							<Icon name="home" size={focused ? 25 : 20} color={focused ? '#0080ff' : '#999999'} />
						),
					}}
					component={Home}
				/>
				<Drawer.Screen
					name={Constants.ROUTES.LISTS.COUNTER.NAME}
					options={{
						title: Constants.ROUTES.LISTS.COUNTER.TITLE,
						headerTitle: Constants.ROUTES.LISTS.COUNTER.NAME,
						drawerIcon: ({ focused }) => (
							<Icon name="calculator" size={focused ? 25 : 20} color={focused ? '#0080ff' : '#999999'} />
						),
					}}
					component={Counter}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

export default App;
