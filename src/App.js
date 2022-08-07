import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store';
import { Constants } from './utils';
import Home from './components/Home';
import User from './components/User';
import Counter from './components/Counter';

const Stack = createNativeStackNavigator();

App = () => {
	return (
		<Provider store={store}>
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
						name={Constants.ROUTES.LISTS.USER.NAME}
						options={{
							title: Constants.ROUTES.LISTS.USER.TITLE,
							...Constants.ROUTES.STYLES,
						}}
						component={User}
					/>
					<Stack.Screen
						name={Constants.ROUTES.LISTS.COUNTER.NAME}
						options={{
							title: Constants.ROUTES.LISTS.COUNTER.TITLE,
							headerBackVisible: false,
							...Constants.ROUTES.STYLES,
						}}
						component={Counter}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
