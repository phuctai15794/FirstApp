import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants } from './utils';
import Home from './components/Home';
import Counter from './components/Counter';
import TextStyles from './styles/Text';

const Tab = createBottomTabNavigator();

App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName={Constants.ROUTES.LISTS.HOME.NAME}
				screenOptions={({ route }) => ({
					tabBarLabelStyle: {
						paddingBottom: 5,
					},
					tabBarActiveBackgroundColor: '#ececec',
					tabBarInactiveBackgroundColor: '#ffffff',
					tabBarActiveTintColor: TextStyles.clPrimary.color,
					tabBarInactiveTintColor: TextStyles.clSecondary.color,
					tabBarIcon: ({ focused, size, color }) => {
						let iconName;
						size = focused ? 25 : 18;
						// color = focused
						//   ? TextStyles.clDanger.color
						//   : TextStyles.clSecondary.color;

						if (route.name === Constants.ROUTES.LISTS.HOME.NAME) {
							iconName = 'home';
						} else if (route.name === Constants.ROUTES.LISTS.COUNTER.NAME) {
							iconName = 'calculator';
						}

						return <Icon name={iconName} size={size} color={color} style={{ paddingTop: 2 }} />;
					},
				})}
			>
				<Tab.Screen
					name={Constants.ROUTES.LISTS.HOME.NAME}
					options={{
						title: Constants.ROUTES.LISTS.HOME.TITLE,
						...Constants.ROUTES.STYLES,
						tabBarLabel: Constants.ROUTES.LISTS.HOME.NAME,
						tabBarBadge: 5,
						tabBarBadgeStyle: {
							backgroundColor: TextStyles.clDanger.color,
						},
					}}
					component={Home}
				/>
				<Tab.Screen
					name={Constants.ROUTES.LISTS.COUNTER.NAME}
					options={{
						title: Constants.ROUTES.LISTS.COUNTER.TITLE,
						...Constants.ROUTES.STYLES,
						tabBarLabel: Constants.ROUTES.LISTS.COUNTER.NAME,
						tabBarBadge: 9,
						tabBarBadgeStyle: {
							backgroundColor: TextStyles.clDanger.color,
						},
					}}
					component={Counter}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default App;
