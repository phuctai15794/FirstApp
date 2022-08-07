import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Constants } from './utils';
import Home from './components/Home';
import Counter from './components/Counter';

const Stack = createNativeStackNavigator();

App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={Constants.ROUTES.LISTS.HOME.NAME}>
				<Stack.Screen
					name={Constants.ROUTES.LISTS.HOME.NAME}
					options={{
						title: Constants.ROUTES.LISTS.HOME.TITLE,
						...Constants.ROUTES.STYLES,
					}}
					component={Home}
				/>
				<Stack.Screen
					name={Constants.ROUTES.LISTS.COUNTER.NAME}
					options={{
						title: Constants.ROUTES.LISTS.COUNTER.TITLE,
						...Constants.ROUTES.STYLES,
					}}
					component={Counter}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
